/**
 * Reads AR_TARGETS from ar-config.js and dynamically builds the A-Frame scene.
 * You should never need to edit this file — all customisation lives in ar-config.js.
 */

(function () {
  const scene      = document.getElementById('ar-scene');
  const assets     = scene.querySelector('a-assets');
  const loadingEl  = document.getElementById('loading-screen');
  const loadingMsg = document.getElementById('loading-msg');
  const scanHint   = document.getElementById('scan-hint');
  const foundBadge = document.getElementById('found-badge');
  const corners    = document.getElementById('corners');
  const debugLog   = document.getElementById('debug-log');

  let activeTargets = 0;
  let badgeTimer    = null;

  function log(msg) {
    console.log('[AR]', msg);
    if (debugLog) {
      const line = document.createElement('div');
      line.textContent = msg;
      debugLog.appendChild(line);
      debugLog.scrollTop = debugLog.scrollHeight;
    }
    if (loadingMsg) loadingMsg.textContent = msg;
  }

  log('Script loaded');

  // ── 1. Set a-assets timeout to 0 so a slow/missing asset never blocks startup
  assets.setAttribute('timeout', '0');

  // ── 2. Inject assets and target entities ──────────────────────────────────

  AR_TARGETS.forEach(function (target) {
    log('Building target ' + target.index + ' (' + target.type + ')');

    switch (target.type) {

      case 'video': {
        const vid = document.createElement('video');
        vid.id       = 'vid-' + target.index;
        vid.src      = target.src;
        vid.loop     = target.loop !== false;
        vid.muted    = true;
        vid.setAttribute('playsinline', '');
        vid.setAttribute('webkit-playsinline', '');
        vid.preload  = 'auto';
        vid.crossOrigin = 'anonymous';
        assets.appendChild(vid);

        const entity = makeTargetEntity(target);
        const plane  = document.createElement('a-plane');
        plane.setAttribute('src',      '#vid-' + target.index);
        plane.setAttribute('width',    target.width  || 1);
        plane.setAttribute('height',   target.height || 0.5625);
        plane.setAttribute('position', target.position || '0 0 0.001');
        plane.setAttribute('rotation', target.rotation || '0 0 0');
        if (target.animation) plane.setAttribute('animation', target.animation);
        entity.appendChild(plane);

        entity.addEventListener('targetFound', function () { vid.play().catch(function(){}); });
        entity.addEventListener('targetLost',  function () { vid.pause(); });

        scene.appendChild(entity);
        break;
      }

      case 'model': {
        const entity = makeTargetEntity(target);
        const model  = document.createElement('a-entity');
        model.setAttribute('gltf-model', target.src);
        model.setAttribute('scale',    target.scale    || '0.1 0.1 0.1');
        model.setAttribute('position', target.position || '0 0 0');
        model.setAttribute('rotation', target.rotation || '0 0 0');
        if (target.animation) model.setAttribute('animation', target.animation);
        entity.appendChild(model);
        scene.appendChild(entity);
        break;
      }

      case 'image': {
        const img = document.createElement('img');
        img.id  = 'img-' + target.index;
        img.src = target.src;
        img.crossOrigin = 'anonymous';
        assets.appendChild(img);

        const entity = makeTargetEntity(target);
        const plane  = document.createElement('a-plane');
        plane.setAttribute('src',      '#img-' + target.index);
        plane.setAttribute('width',    target.width  || 1);
        plane.setAttribute('height',   target.height || 1);
        plane.setAttribute('position', target.position || '0 0 0.001');
        plane.setAttribute('rotation', target.rotation || '0 0 0');
        plane.setAttribute('material', 'transparent: true; alphaTest: 0.1');
        if (target.animation) plane.setAttribute('animation', target.animation);
        entity.appendChild(plane);
        scene.appendChild(entity);
        break;
      }
    }
  });

  // ── 3. Helper: mindar-image-target entity ─────────────────────────────────

  function makeTargetEntity(target) {
    const entity = document.createElement('a-entity');
    entity.setAttribute('mindar-image-target', 'targetIndex: ' + target.index);
    entity.dataset.targetName = target.name || ('Target ' + target.index);

    entity.addEventListener('targetFound', function () {
      activeTargets++;
      showFoundBadge(entity.dataset.targetName);
      corners.classList.add('detected');
      scanHint.classList.add('hidden');
    });

    entity.addEventListener('targetLost', function () {
      activeTargets = Math.max(0, activeTargets - 1);
      if (activeTargets === 0) {
        scanHint.classList.remove('hidden');
        foundBadge.classList.remove('visible');
      }
      corners.classList.remove('detected');
    });

    return entity;
  }

  // ── 4. Found badge helper ─────────────────────────────────────────────────

  function showFoundBadge(name) {
    foundBadge.textContent = '🎯 ' + name;
    foundBadge.classList.add('visible');
    clearTimeout(badgeTimer);
    badgeTimer = setTimeout(function () {
      if (activeTargets > 0) return;
      foundBadge.classList.remove('visible');
    }, 3000);
  }

  // ── 5. AR lifecycle events ────────────────────────────────────────────────

  // ── Diagnostics ───────────────────────────────────────────────────────────

  // 1. Check WebGL
  try {
    var canvas = document.createElement('canvas');
    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    log('WebGL: ' + (gl ? 'OK' : 'NOT AVAILABLE'));
  } catch(e) {
    log('WebGL error: ' + e.message);
  }

  // 2. Check targets.mind is reachable
  fetch('targets.mind')
    .then(function(r) {
      log('targets.mind: HTTP ' + r.status + ', size ~' + r.headers.get('content-length') + ' bytes');
    })
    .catch(function(e) {
      log('targets.mind FAILED: ' + e.message);
    });

  // 3. Timeout: if scene never loads in 12s, say so
  var sceneLoadTimeout = setTimeout(function() {
    log('TIMEOUT: scene never fired loaded event after 12s');
  }, 12000);

  log('Waiting for A-Frame scene to load…');

  scene.addEventListener('loaded', function () {
    clearTimeout(sceneLoadTimeout);
    log('A-Frame scene loaded — MindAR starting…');
  });

  scene.addEventListener('arReady', function () {
    log('arReady — camera is live!');
    loadingEl.classList.add('hidden');
  });

  scene.addEventListener('arError', function (e) {
    log('arError: ' + (e.detail || JSON.stringify(e)));
    loadingMsg.textContent = 'Camera error. Allow camera access and reload.';
    loadingMsg.style.color = '#f87171';
  });

  // Catch any uncaught errors and show them on screen
  window.addEventListener('error', function (e) {
    log('JS Error: ' + e.message);
  });

  window.addEventListener('unhandledrejection', function(e) {
    log('Promise error: ' + e.reason);
  });

})();
