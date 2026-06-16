# Tumo AR Experience

Web-based augmented reality — no app install needed.  
Built with **MindAR.js** (image tracking) + **A-Frame** (3D/video rendering).

---

## Project structure

```
index.html          ← Landing page
ar.html             ← AR camera experience
targets.mind        ← Compiled target file (YOU generate this — see below)
js/
  ar-config.js      ← ✏️  Edit this to add/change targets & content
  ar-builder.js     ← Engine — no need to touch this
assets/
  targets/          ← Drop your target images here (for reference)
  videos/           ← .mp4 video files
  models/           ← .glb 3D model files
  images/           ← .png/.jpg image overlays
```

---

## Step-by-step setup

### 1. Add your target images
Drop your reference images (the physical images/posters you'll point the camera at) into `assets/targets/`.  
Supported formats: JPG, PNG. Higher contrast = better tracking.

### 2. Compile targets.mind
1. Go to **https://hiukim.github.io/mind-ar-js-doc/tools/compile**
2. Upload your images **in order** (image 0 first, then 1, 2…)
3. Click **Start** and wait for compilation
4. Download the `.mind` file and save it as **`targets.mind`** in the project root

### 3. Add your media assets
| Type   | Folder           | Format         |
|--------|------------------|----------------|
| Video  | `assets/videos/` | `.mp4` (H.264) |
| 3D     | `assets/models/` | `.glb`         |
| Image  | `assets/images/` | `.png` / `.jpg`|

### 4. Configure targets
Open **`js/ar-config.js`** and edit the `AR_TARGETS` array.  
Each entry has:
- `index` — must match the image position in targets.mind (0-based)
- `type` — `"video"` | `"model"` | `"image"`
- `src` — path to the asset file
- `width` / `height` — size in "target units" (1 = same width as target image)

### 5. Serve the project
The app must be served over **HTTPS** (camera API requirement).

**Quick local test:**
```bash
npx serve .
# then open https://localhost:3000 on your device
```

**Deploy options:**
- Vercel — drag and drop the folder, get an HTTPS URL instantly
- Netlify — same drag and drop experience
- GitHub Pages — push this repo and enable Pages in settings

---

## Adding more targets

1. Add the image to `assets/targets/`
2. Re-compile `targets.mind` with the new image included
3. Add a new entry to `AR_TARGETS` in `ar-config.js` with the correct `index`

---

## Tips for good tracking
- Use images with **lots of detail and contrast** — blank areas confuse the tracker
- Avoid **repeating patterns** (stripes, grids)
- Print targets at **A4 size or larger** for best range
- Good lighting helps a lot
