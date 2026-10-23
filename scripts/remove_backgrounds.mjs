import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = 'C:/Users/tanvi/.gemini/antigravity/brain/0c706edb-ff32-4a09-9d72-b1dce15e8550/extracted_artwork';
const publicDir = 'c:/Users/tanvi/OneDrive/Desktop/NiSquare/public/assets/decorations';
const previewDir = 'C:/Users/tanvi/.gemini/antigravity/brain/0c706edb-ff32-4a09-9d72-b1dce15e8550/artwork_previews/transparent';

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
if (!fs.existsSync(previewDir)) fs.mkdirSync(previewDir, { recursive: true });

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [h * 360, s, l];
}

// Recolor into NI Square approved Brand Palette:
// Royal Oxblood (#5B101E) & Wine (#861F32) + Antique Champagne Gold (#B99A66)
function recolorBrandPalette(r, g, b) {
  const [h, s, l] = rgbToHsl(r, g, b);

  // Outlines: crisp ivory
  if (l > 0.88 && s < 0.22) {
    return [255, 253, 249];
  }

  // Terracotta / rust orange (flower petals, bird breast)
  if (h >= 8 && h <= 45 && s > 0.30 && l < 0.65) {
    const factor = Math.max(0.3, Math.min(1.3, l / 0.42));
    const nr = Math.min(255, Math.round(91 * factor));  // #5B101E
    const ng = Math.min(255, Math.round(16 * factor));
    const nb = Math.min(255, Math.round(30 * factor));
    return [nr, ng, nb];
  }

  // Ochre / Tan (flower centers, bird head, dots)
  if (h >= 28 && h <= 55 && s >= 0.20 && l >= 0.40) {
    const factor = Math.max(0.4, Math.min(1.4, l / 0.52));
    const nr = Math.min(255, Math.round(185 * factor)); // #B99A66
    const ng = Math.min(255, Math.round(154 * factor));
    const nb = Math.min(255, Math.round(102 * factor));
    return [nr, ng, nb];
  }

  // Foliage Green (leaves, stems)
  if (h >= 75 && h <= 170) {
    // Antique Champagne Gold foliage
    const factor = Math.max(0.4, Math.min(1.3, l / 0.48));
    const nr = Math.min(255, Math.round(175 * factor));
    const ng = Math.min(255, Math.round(145 * factor));
    const nb = Math.min(255, Math.round(92 * factor));
    return [nr, ng, nb];
  }

  // Teal / Cyan feathers
  if (h > 170 && h <= 215) {
    // Deep Wine/Burgundy wing feathers
    const factor = Math.max(0.3, Math.min(1.3, l / 0.45));
    const nr = Math.min(255, Math.round(112 * factor)); // #701C2B
    const ng = Math.min(255, Math.round(24 * factor));
    const nb = Math.min(255, Math.round(40 * factor));
    return [nr, ng, nb];
  }

  return [r, g, b];
}

const items = [
  { file: 'Untitled_Artwork-2.png', name: 'bird-flying', maxDim: 850 },
  { file: 'Untitled_Artwork-3.png', name: 'bird-perched', maxDim: 850 },
  { file: 'Untitled_Artwork-4.png', name: 'botanical-branch-curved', maxDim: 700 },
  { file: 'Untitled_Artwork-5.png', name: 'botanical-branch-horizontal', maxDim: 850 },
  { file: 'Untitled_Artwork-6.png', name: 'botanical-bloom-hanging', maxDim: 800 },
  { file: 'Untitled_Artwork-7.png', name: 'stardust-constellation-a', maxDim: 800 },
  { file: 'Untitled_Artwork-8.png', name: 'stardust-constellation-b', maxDim: 800 },
  { file: 'Untitled_Artwork-9.png', name: 'botanical-bloom-upright', maxDim: 850 },
  { file: 'Untitled_Artwork-10.png', name: 'botanical-foliage-sprig', maxDim: 750 },
];

async function processArtwork(item) {
  const filePath = path.join(inputDir, item.file);
  const trimmed = await sharp(filePath).trim().raw().toBuffer({ resolveWithObject: true });
  const { data, info } = trimmed;
  const w = info.width, h = info.height;

  // 1. Identify Background via Flood Fill
  // The background canvas is near-white (r >= 248, g >= 248, b >= 248)
  const isBgCandidate = (idx) => {
    return data[idx] >= 245 && data[idx+1] >= 245 && data[idx+2] >= 245;
  };

  const isOuterBg = new Uint8Array(w * h);
  const queue = new Int32Array(w * h);
  let qHead = 0, qTail = 0;

  // Seed boundary pixels
  for (let x = 0; x < w; x++) {
    const topIdx = x * 4;
    if (isBgCandidate(topIdx) && !isOuterBg[x]) {
      isOuterBg[x] = 1;
      queue[qTail++] = x;
    }
    const botIdx = ((h - 1) * w + x) * 4;
    const botP = (h - 1) * w + x;
    if (isBgCandidate(botIdx) && !isOuterBg[botP]) {
      isOuterBg[botP] = 1;
      queue[qTail++] = botP;
    }
  }
  for (let y = 0; y < h; y++) {
    const leftP = y * w;
    if (isBgCandidate(leftP * 4) && !isOuterBg[leftP]) {
      isOuterBg[leftP] = 1;
      queue[qTail++] = leftP;
    }
    const rightP = y * w + w - 1;
    if (isBgCandidate(rightP * 4) && !isOuterBg[rightP]) {
      isOuterBg[rightP] = 1;
      queue[qTail++] = rightP;
    }
  }

  // BFS
  while (qHead < qTail) {
    const curr = queue[qHead++];
    const cx = curr % w;
    const cy = Math.floor(curr / w);

    if (cx > 0) {
      const left = curr - 1;
      if (!isOuterBg[left] && isBgCandidate(left * 4)) {
        isOuterBg[left] = 1;
        queue[qTail++] = left;
      }
    }
    if (cx < w - 1) {
      const right = curr + 1;
      if (!isOuterBg[right] && isBgCandidate(right * 4)) {
        isOuterBg[right] = 1;
        queue[qTail++] = right;
      }
    }
    if (cy > 0) {
      const up = curr - w;
      if (!isOuterBg[up] && isBgCandidate(up * 4)) {
        isOuterBg[up] = 1;
        queue[qTail++] = up;
      }
    }
    if (cy < h - 1) {
      const down = curr + w;
      if (!isOuterBg[down] && isBgCandidate(down * 4)) {
        isOuterBg[down] = 1;
        queue[qTail++] = down;
      }
    }
  }

  // 2. Build RGBA Buffer with True Alpha Transparency
  const outData = Buffer.alloc(w * h * 4);

  for (let p = 0; p < w * h; p++) {
    const i = p * 4;
    const r = data[i], g = data[i+1], b = data[i+2];

    if (isOuterBg[p]) {
      // 100% transparent background
      outData[i] = 0;
      outData[i+1] = 0;
      outData[i+2] = 0;
      outData[i+3] = 0;
    } else {
      // Motif pixel: recolor to approved Brand Palette
      const [nr, ng, nb] = recolorBrandPalette(r, g, b);
      outData[i] = nr;
      outData[i+1] = ng;
      outData[i+2] = nb;
      outData[i+3] = 255;
    }
  }

  // Anti-aliasing soften border: if a motif pixel borders a transparent pixel and is very light, blend alpha
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const p = y * w + x;
      const i = p * 4;
      if (outData[i+3] > 0) {
        // check if neighbors are transparent
        const hasTransparentNeighbor =
          outData[(p - 1) * 4 + 3] === 0 ||
          outData[(p + 1) * 4 + 3] === 0 ||
          outData[(p - w) * 4 + 3] === 0 ||
          outData[(p + w) * 4 + 3] === 0;

        if (hasTransparentNeighbor) {
          const l = (data[i] + data[i+1] + data[i+2]) / 3;
          if (l > 220) {
            // Smooth edge alpha
            outData[i+3] = Math.max(0, Math.min(255, Math.round(255 - ((l - 220) / 25) * 200)));
          }
        }
      }
    }
  }

  // Scale bounds
  const scale = Math.min(1, item.maxDim / Math.max(w, h));
  const targetW = Math.round(w * scale);
  const targetH = Math.round(h * scale);

  // Write WebP transparent asset to public
  await sharp(outData, { raw: { width: w, height: h, channels: 4 } })
    .resize(targetW, targetH, { fit: 'inside' })
    .webp({ quality: 92, alphaQuality: 100, effort: 6 })
    .toFile(path.join(publicDir, `${item.name}.webp`));

  // Write PNG fallback
  await sharp(outData, { raw: { width: w, height: h, channels: 4 } })
    .resize(targetW, targetH, { fit: 'inside' })
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(path.join(publicDir, `${item.name}.png`));

  // Write a preview on a checkerboard or card for inspection
  await sharp(outData, { raw: { width: w, height: h, channels: 4 } })
    .resize(Math.min(600, targetW), null)
    .png()
    .toFile(path.join(previewDir, `${item.name}.png`));

  console.log(`Saved transparent motif: ${item.name} (${targetW}x${targetH})`);
}

async function run() {
  for (const item of items) {
    await processArtwork(item);
  }
  console.log('All motifs processed with pure transparent backgrounds!');
}

run().catch(console.error);

