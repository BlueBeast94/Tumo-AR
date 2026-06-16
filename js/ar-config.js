/**
 * AR TARGETS CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 * Each entry in AR_TARGETS maps to one image in your compiled targets.mind file.
 * The order here MUST match the order you compiled the images in MindAR compiler.
 *
 * HOW TO GENERATE targets.mind
 * 1. Go to https://hiukim.github.io/mind-ar-js-doc/tools/compile
 * 2. Upload your target images IN THE SAME ORDER as listed here (index 0 first)
 * 3. Download the generated targets.mind file
 * 4. Drop it in the root of this project (same folder as ar.html)
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * TYPE OPTIONS:
 *   "video"  → plays a video on top of the target
 *   "model"  → shows a 3D GLB/GLTF model
 *   "image"  → shows a flat image overlay
 *
 * ASSET FOLDERS:
 *   Videos  → assets/videos/
 *   Models  → assets/models/   (use .glb format)
 *   Images  → assets/images/
 */

const AR_TARGETS = [
  // ── TARGET 0 ── Video example ──────────────────────────────────────────────
  {
    index: 0,
    name: "Product Launch Video",
    type: "video",
    src: "assets/videos/inicio_optimizado.mp4",
    // Width in "target units" — 1 = same width as the target image.
    // Height should match the video aspect ratio (e.g. 16:9 = 0.5625).
    width: 1,
    height: 0.5625,
    position: "0 0 0.001",   // slight z-offset so it renders above the marker
    rotation: "0 0 0",
    autoplay: true,
    loop: true,
  },

  // ── TARGET 1 ── 3D Model example ───────────────────────────────────────────
  {
    index: 1,
    name: "3D Product Model",
    type: "model",
    src: "assets/models/model1.glb",
    scale: "0.15 0.15 0.15",
    position: "0 0.1 0",
    rotation: "-90 0 0",
    // Spin animation — remove the animation property to disable
    animation: "property: rotation; from: -90 0 0; to: -90 360 0; loop: true; dur: 4000; easing: linear",
  },

  // ── TARGET 2 ── Image overlay example ──────────────────────────────────────
  {
    index: 2,
    name: "Image Overlay",
    type: "image",
    src: "assets/images/overlay1.png",
    width: 1,
    height: 1,
    position: "0 0 0.001",
    rotation: "0 0 0",
    // Optional fade-in animation
    animation: "property: material.opacity; from: 0; to: 1; dur: 600; easing: easeInQuad",
  },

  // ── TARGET 3 ── Another video ──────────────────────────────────────────────
  {
    index: 3,
    name: "Behind the Scenes",
    type: "video",
    src: "assets/videos/video2.mp4",
    width: 1,
    height: 0.5625,
    position: "0 0 0.001",
    rotation: "0 0 0",
    autoplay: true,
    loop: false,
  },

  // ── TARGET 4 ── Another 3D model ───────────────────────────────────────────
  {
    index: 4,
    name: "3D Logo",
    type: "model",
    src: "assets/models/model2.glb",
    scale: "0.2 0.2 0.2",
    position: "0 0 0",
    rotation: "0 0 0",
    animation: "property: position; from: 0 0 0; to: 0 0.05 0; dir: alternate; loop: true; dur: 1500; easing: easeInOutSine",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ADD MORE TARGETS BELOW — just copy one of the blocks above and increment
  // the index. Remember: index must match the order in your targets.mind file.
  // ─────────────────────────────────────────────────────────────────────────
];
