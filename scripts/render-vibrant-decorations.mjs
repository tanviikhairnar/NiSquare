import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = 'C:/Users/tanvi/.gemini/antigravity/brain/0c706edb-ff32-4a09-9d72-b1dce15e8550/extracted_artwork';
const publicDir = 'c:/Users/tanvi/OneDrive/Desktop/NiSquare/public/assets/decorations';

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

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

function hslToRgb(h, s, l) {
  h /= 360;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// Enhance authentic colors to ensure they are vivid, rich and vibrant (not dull)
function enhanceColor(r, g, b) {
  const [h, s, l] = rgbToHsl(r, g, b);

  // Preserve fine outlines and dark lines
  if (l < 0.20) {
    return [Math.round(r * 0.9), Math.round(g * 0.9), Math.round(b * 0.9)];
  }

  // Preserve warm ivory details
  if (l > 0.88 && s < 0.20) {
    return [255, 252, 246];
  }

  let newH = h;
  let newS = s;
  let newL = l;

  // 1. Terracotta / Rust Orange (petals, bird breast):
  // Make rich, warm and saturated
  if (h >= 8 && h <= 36 && s >= 0.25) {
    newS = Math.min(0.92, s * 1.25 + 0.08);
    newL = Math.max(0.38, Math.min(0.55, l * 1.02));
    newH = Math.min(24, Math.max(14, h)); // Rich terracotta
  }
  // 2. Sage Green (leaves, branches):
  // Fresh, earthy, botanical
  else if (h >= 75 && h <= 165 && s >= 0.12) {
    newS = Math.min(0.75, s * 1.30 + 0.08);
    newL = Math.max(0.38, Math.min(0.58, l));
  }
  // 3. Jewel Teal (bird wings):
  // Brilliant deep jewel teal
  else if (h > 165 && h <= 215 && s >= 0.20) {
    newS = Math.min(0.95, s * 1.28 + 0.10);
    newL = Math.max(0.28, Math.min(0.52, l));
    newH = Math.min(185, Math.max(170, h)); // Emerald/jewel teal
  }
  // 4. Warm Honey Gold / Amber (bird head, pollen/stardust dots):
  else if (h > 36 && h < 75 && s >= 0.20) {
    newS = Math.min(0.88, s * 1.22 + 0.08);
    newL = Math.max(0.44, Math.min(0.62, l));
  }

  return hslToRgb(newH, newS, newL);
}

const items = [
  { file: 'Untitled_Artwork-2.png', name: 'bird-flying', maxDim: 900 },
  { file: 'Untitled_Artwork-3.png', name: 'bird-perched', maxDim: 900 },
  { file: 'Untitled_Artwork-4.png', name: 'botanical-branch-curved', maxDim: 750 },
  { file: 'Untitled_Artwork-5.png', name: 'botanical-branch-horizontal', maxDim: 900 },
  { file: 'Untitled_Artwork-6.png', name: 'botanical-bloom-hanging', maxDim: 850 },
  { file: 'Untitled_Artwork-7.png', name: 'stardust-constellation-a', maxDim: 850 },
  { file: 'Untitled_Artwork-8.png', name: 'stardust-constellation-b', maxDim: 850 },
  { file: 'Untitled_Artwork-9.png', name: 'botanical-bloom-upright', maxDim: 900 },
  { file: 'Untitled_Artwork-10.png', name: 'botanical-foliage-sprig', maxDim: 800 },
];

async function processArtwork(item) {
  const filePath = path.join(inputDir, item.file);
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return;
  }

  console.log(`Processing ${item.name} from ${item.file}...`);
  // Load raw image
  const trimmed = await sharp(filePath).raw().toBuffer({ resolveWithObject: true });
  const { data, info } = trimmed;
  const w = info.width, h = info.height;

  // Background threshold: canvas is pale off-white (r, g, b all >= 238)
  const isBgCandidate = (idx) => {
    return data[idx] >= 238 && data[idx+1] >= 238 && data[idx+2] >= 238;
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

  // BFS Flood Fill
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

  // Find tight bounding box of artwork (non-outer-bg pixels)
  let minX = w, maxX = 0, minY = h, maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = y * w + x;
      if (!isOuterBg[p]) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Add small 4px margin
  minX = Math.max(0, minX - 4);
  maxX = Math.min(w - 1, maxX + 4);
  minY = Math.max(0, minY - 4);
  maxY = Math.min(h - 1, maxY + 4);

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;

  const croppedData = Buffer.alloc(cropW * cropH * 4);

  for (let y = 0; y < cropH; y++) {
    for (let x = 0; x < cropW; x++) {
      const origX = minX + x;
      const origY = minY + y;
      const origP = origY * w + origX;
      const origIdx = origP * 4;
      const cropIdx = (y * cropW + x) * 4;

      if (isOuterBg[origP]) {
        croppedData[cropIdx] = 0;
        croppedData[cropIdx + 1] = 0;
        croppedData[cropIdx + 2] = 0;
        croppedData[cropIdx + 3] = 0;
      } else {
        const r = data[origIdx];
        const g = data[origIdx + 1];
        const b = data[origIdx + 2];
        const [nr, ng, nb] = enhanceColor(r, g, b);
        croppedData[cropIdx] = nr;
        croppedData[cropIdx + 1] = ng;
        croppedData[cropIdx + 2] = nb;
        croppedData[cropIdx + 3] = 255;
      }
    }
  }

  // Anti-aliasing soften border
  for (let y = 1; y < cropH - 1; y++) {
    for (let x = 1; x < cropW - 1; x++) {
      const p = y * cropW + x;
      const idx = p * 4;
      if (croppedData[idx + 3] > 0) {
        const hasTransparentNeighbor =
          croppedData[(p - 1) * 4 + 3] === 0 ||
          croppedData[(p + 1) * 4 + 3] === 0 ||
          croppedData[(p - cropW) * 4 + 3] === 0 ||
          croppedData[(p + cropW) * 4 + 3] === 0;

        if (hasTransparentNeighbor) {
          const origX = minX + x;
          const origY = minY + y;
          const origIdx = (origY * w + origX) * 4;
          const l = (data[origIdx] + data[origIdx + 1] + data[origIdx + 2]) / 3;
          if (l > 215) {
            croppedData[idx + 3] = Math.max(0, Math.min(255, Math.round(255 - ((l - 215) / 28) * 220)));
          }
        }
      }
    }
  }

  // Scale to target max dimension
  const scale = Math.min(1, item.maxDim / Math.max(cropW, cropH));
  const targetW = Math.round(cropW * scale);
  const targetH = Math.round(cropH * scale);

  const webpDest = path.join(publicDir, `${item.name}.webp`);
  const pngDest = path.join(publicDir, `${item.name}.png`);

  await sharp(croppedData, { raw: { width: cropW, height: cropH, channels: 4 } })
    .resize(targetW, targetH, { fit: 'inside' })
    .webp({ quality: 92, alphaQuality: 100, effort: 6 })
    .toFile(webpDest);

  await sharp(croppedData, { raw: { width: cropW, height: cropH, channels: 4 } })
    .resize(targetW, targetH, { fit: 'inside' })
    .png({ compressionLevel: 9 })
    .toFile(pngDest);

  const wStat = fs.statSync(webpDest);
  console.log(`✓ ${item.name}: ${targetW}x${targetH} (${(wStat.size / 1024).toFixed(1)} KB)`);
}

async function run() {
  for (const item of items) {
    await processArtwork(item);
  }
  console.log('All vibrant decorations generated successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

