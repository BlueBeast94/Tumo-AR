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
  // ── TARGET 0 ── Video ──────────────────────────────────────────────────────
  {
    index: 0,
    name: "Tumo AR Video",
    type: "video",
    src: "assets/videos/inicio_optimizado.mp4",
    width: 1,
    height: 0.5625,   // 16:9 — adjust if your video is a different ratio
    position: "0 0 0.001",
    rotation: "0 0 0",
    autoplay: true,
    loop: true,
  },

  // ── ADD MORE TARGETS HERE when you have the files ready ───────────────────
  // Copy a block below and increment the index:
  //
  // {
  //   index: 1,
  //   name: "My Second Target",
  //   type: "video",           // "video" | "model" | "image"
  //   src: "assets/videos/myvideo.mp4",
  //   width: 1,
  //   height: 0.5625,
  //   autoplay: true,
  //   loop: true,
  // },
];
