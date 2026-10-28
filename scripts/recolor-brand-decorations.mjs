import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = 'C:/Users/tanvi/.gemini/antigravity/brain/0c706edb-ff32-4a09-9d72-b1dce15e8550/extracted_artwork';
const publicDir = 'c:/Users/tanvi/OneDrive/Desktop/NiSquare/public/assets/decorations';
const previewDir = 'C:/Users/tanvi/.gemini/antigravity/brain/0c706edb-ff32-4a09-9d72-b1dce15e8550/artwork_previews/brand_palette';

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

/*
 * NI SQUARE LUXURY BRAND PALETTE RECOLORING:
 * 
 * 1. Flower Petals & Bird Breast -> Rich Velvet Burgundy & Wine
 *    Base: #681827 / #861F32, Highlights: #C45A6D / #D5B8B5, Shadows: #4A101B
 * 
 * 2. Leaves, Stems, Foliage & Branches -> Radiant Champagne Gold
 *    Base: #B99A66, Shimmer: #D4B47D / #E8CE9B, Depth: #967A4B
 * 
 * 3. Bird Wings (previously teal) -> Royal Burgundy & Deep Wine
 *    Wing Base: #55121E, Mid-tone: #78192A, Accents: Wine-Plum
 * 
 * 4. Bird Head / Crown & Dots / Stardust -> Luminous Warm Gold (#D4B47D / #B99A66)
 * 
 * 5. Linework & Highlights -> Crisp Warm Ivory (#FFFDF8) and Deep Oxblood (#380C14)
 */
function recolorToBrandPalette(r, g, b, itemName) {
  const [h, s, l] = rgbToHsl(r, g, b);

  // 1. Preserve crisp ivory petal stamens, inner line highlights
  if (l > 0.84 && s < 0.28) {
    return [255, 252, 246]; // Warm Ivory
  }

  // 2. Preserve ultra-deep line art, eye pupil, claw edges
  if (l < 0.16) {
    // Deep rich charcoal-oxblood for crisp definition
    return [52, 16, 24];
  }

  // 3. Stardust constellation dots: Radiant champagne gold
  if (itemName && itemName.startsWith('stardust-constellation')) {
    const factor = Math.max(0.65, Math.min(1.35, l / 0.50));
    return [
      Math.min(255, Math.round(212 * factor)),
      Math.min(255, Math.round(180 * factor)),
      Math.min(255, Math.round(124 * factor)),
    ];
  }

  // 4. Teal wing feathers (h: 165 - 225) -> Royal Velvet Burgundy & Wine
  if (h > 165 && h <= 225 && s >= 0.15) {
    const factor = Math.max(0.45, Math.min(1.4, l / 0.42));
    // Deep luxurious burgundy feathering
    const nr = Math.min(255, Math.round(116 * factor));
    const ng = Math.min(255, Math.round(24 * factor));
    const nb = Math.min(255, Math.round(42 * factor));
    return [nr, ng, nb];
  }

  // 5. Foliage, leaves, branches, stems (h: 65 - 165) -> Radiant Champagne Gold
  if (h >= 65 && h <= 165 && s >= 0.10) {
    const factor = Math.max(0.55, Math.min(1.35, l / 0.48));
    // Rich Champagne Gold (#B99A66 with luminous tones)
    const nr = Math.min(255, Math.round(188 * factor));
    const ng = Math.min(255, Math.round(156 * factor));
    const nb = Math.min(255, Math.round(104 * factor));
    return [nr, ng, nb];
  }

  // 6. Amber / Honey / Ochre (flower center stamen core, bird head crown, dots):
  //    Radiant Champagne Gold
  if (h > 36 && h < 65 && s >= 0.18) {
    const factor = Math.max(0.6, Math.min(1.4, l / 0.50));
    const nr = Math.min(255, Math.round(208 * factor));
    const ng = Math.min(255, Math.round(174 * factor));
    const nb = Math.min(255, Math.round(118 * factor));
    return [nr, ng, nb];
  }

  // 7. Flower petals, bird breast & belly (h: 6 - 36, s >= 0.20):
  //    Rich Velvet Burgundy & Wine (#681827 / #861F32 / #D5B8B5)
  if ((h <= 36 || h >= 345) && s >= 0.20) {
    if (l > 0.62) {
      // Petal highlight / soft rose sheen (#C9687C)
      const factor = Math.min(1.3, l / 0.62);
      const nr = Math.min(255, Math.round(196 * factor));
      const ng = Math.min(255, Math.round(82 * factor));
      const nb = Math.min(255, Math.round(104 * factor));
      return [nr, ng, nb];
    } else {
      // Core velvet Burgundy & Wine
      const factor = Math.max(0.48, Math.min(1.35, l / 0.44));
      const nr = Math.min(255, Math.round(136 * factor));
      const ng = Math.min(255, Math.round(28 * factor));
      const nb = Math.min(255, Math.round(48 * factor));
      return [nr, ng, nb];
    }
  }

  // Fallback for neutral/transitional tones: blend towards champagne gold / warm ivory
  if (l > 0.5) {
    const factor = l / 0.5;
    return [
      Math.min(255, Math.round(195 * factor)),
      Math.min(255, Math.round(170 * factor)),
      Math.min(255, Math.round(135 * factor)),
    ];
  }

  return [r, g, b];
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

async function processItem(item) {
  const filePath = path.join(inputDir, item.file);
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return;
  }

  console.log(`Processing ${item.name} (${item.file})...`);
  const { data, info } = await sharp(filePath).raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  const isBgCandidate = (idx) => {
    return data[idx] >= 238 && data[idx+1] >= 238 && data[idx+2] >= 238;
  };

  const isOuterBg = new Uint8Array(w * h);
  const queue = new Int32Array(w * h);
  let qHead = 0, qTail = 0;

  // Seed boundary
  for (let x = 0; x < w; x++) {
    if (isBgCandidate(x * 4) && !isOuterBg[x]) {
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

  // BFS flood fill
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

  // Bounding box
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
        const [nr, ng, nb] = recolorToBrandPalette(r, g, b, item.name);
        croppedData[cropIdx] = nr;
        croppedData[cropIdx + 1] = ng;
        croppedData[cropIdx + 2] = nb;
        croppedData[cropIdx + 3] = 255;
      }
    }
  }

  // Edge smoothing
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

  const scale = Math.min(1, item.maxDim / Math.max(cropW, cropH));
  const targetW = Math.round(cropW * scale);
  const targetH = Math.round(cropH * scale);

  const webpDest = path.join(publicDir, `${item.name}.webp`);
  const pngDest = path.join(publicDir, `${item.name}.png`);
  const previewDest = path.join(previewDir, `${item.name}.png`);

  await sharp(croppedData, { raw: { width: cropW, height: cropH, channels: 4 } })
    .resize(targetW, targetH, { fit: 'inside' })
    .webp({ quality: 92, alphaQuality: 100, effort: 6 })
    .toFile(webpDest);

  await sharp(croppedData, { raw: { width: cropW, height: cropH, channels: 4 } })
    .resize(targetW, targetH, { fit: 'inside' })
    .png({ compressionLevel: 9 })
    .toFile(pngDest);

  // Save preview on white background
  await sharp({
    create: {
      width: targetW + 40,
      height: targetH + 40,
      channels: 4,
      background: { r: 253, g: 251, b: 247, alpha: 1 } // Luxury warm ivory canvas
    }
  })
  .composite([{ input: pngDest, top: 20, left: 20 }])
  .png()
  .toFile(previewDest);

  console.log(`✓ ${item.name}: ${targetW}x${targetH}`);
}

async function run() {
  for (const item of items) {
    await processItem(item);
  }
  console.log('Finished recoloring to brand palette!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

