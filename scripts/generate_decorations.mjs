import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = 'C:/Users/tanvi/.gemini/antigravity/brain/0c706edb-ff32-4a09-9d72-b1dce15e8550/extracted_artwork';
const publicDir = 'c:/Users/tanvi/OneDrive/Desktop/NiSquare/public/assets/decorations';
const previewDir = 'C:/Users/tanvi/.gemini/antigravity/brain/0c706edb-ff32-4a09-9d72-b1dce15e8550/artwork_previews/processed';

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

// Brand Luxury Palette:
// Petals & bird breast -> Royal Oxblood (#5B101E) & Wine (#861F32)
// Leaves & stems -> Antique Champagne Gold (#B99A66 / #C2A574)
// Head & floral stamen centers -> Radiant Gold (#D0B480)
// Teal wing feathers -> Deep Burgundy / Plum (#4A101B / #681827)
// Outlines -> Warm Ivory (#FFFDF9)
function recolorBrandPalette(r, g, b, a) {
  if (a < 15) return [0, 0, 0, 0];

  const [h, s, l] = rgbToHsl(r, g, b);

  // Outlines: crisp warm ivory
  if (l > 0.88 && s < 0.22) {
    return [255, 253, 249, a];
  }

  // Terracotta / rust orange (flower petals, bird breast)
  if (h >= 8 && h <= 45 && s > 0.30 && l < 0.65) {
    const factor = Math.max(0.3, Math.min(1.3, l / 0.42));
    const nr = Math.min(255, Math.round(91 * factor));  // #5B101E
    const ng = Math.min(255, Math.round(16 * factor));
    const nb = Math.min(255, Math.round(30 * factor));
    return [nr, ng, nb, a];
  }

  // Ochre / Tan (flower centers, bird head, dots)
  if (h >= 28 && h <= 55 && s >= 0.20 && l >= 0.40) {
    const factor = Math.max(0.4, Math.min(1.4, l / 0.52));
    const nr = Math.min(255, Math.round(185 * factor)); // #B99A66
    const ng = Math.min(255, Math.round(154 * factor));
    const nb = Math.min(255, Math.round(102 * factor));
    return [nr, ng, nb, a];
  }

  // Foliage Green (leaves, stems)
  if (h >= 75 && h <= 170) {
    // Antique Champagne Gold foliage
    const factor = Math.max(0.4, Math.min(1.3, l / 0.48));
    const nr = Math.min(255, Math.round(175 * factor));
    const ng = Math.min(255, Math.round(145 * factor));
    const nb = Math.min(255, Math.round(92 * factor));
    return [nr, ng, nb, a];
  }

  // Teal / Cyan feathers
  if (h > 170 && h <= 215) {
    // Deep rich Wine/Burgundy wing feathers
    const factor = Math.max(0.3, Math.min(1.3, l / 0.45));
    const nr = Math.min(255, Math.round(112 * factor)); // #701C2B
    const ng = Math.min(255, Math.round(24 * factor));
    const nb = Math.min(255, Math.round(40 * factor));
    return [nr, ng, nb, a];
  }

  // Fallback
  return [r, g, b, a];
}

// Monochrome Champagne Gold Foil
function recolorGoldFoil(r, g, b, a) {
  if (a < 15) return [0, 0, 0, 0];
  const [_h, s, l] = rgbToHsl(r, g, b);
  if (l > 0.90 && s < 0.20) {
    return [255, 255, 255, a];
  }
  const factor = Math.max(0.4, Math.min(1.3, l / 0.48));
  const nr = Math.min(255, Math.round(185 * factor));
  const ng = Math.min(255, Math.round(154 * factor));
  const nb = Math.min(255, Math.round(102 * factor));
  return [nr, ng, nb, a];
}

const items = [
  { file: 'Untitled_Artwork-2.png', name: 'bird-flying', maxDim: 900 },
  { file: 'Untitled_Artwork-3.png', name: 'bird-perched', maxDim: 900 },
  { file: 'Untitled_Artwork-4.png', name: 'botanical-branch-curved', maxDim: 700 },
  { file: 'Untitled_Artwork-5.png', name: 'botanical-branch-horizontal', maxDim: 900 },
  { file: 'Untitled_Artwork-6.png', name: 'botanical-bloom-hanging', maxDim: 850 },
  { file: 'Untitled_Artwork-7.png', name: 'stardust-constellation-a', maxDim: 800 },
  { file: 'Untitled_Artwork-8.png', name: 'stardust-constellation-b', maxDim: 800 },
  { file: 'Untitled_Artwork-9.png', name: 'botanical-bloom-upright', maxDim: 900 },
  { file: 'Untitled_Artwork-10.png', name: 'botanical-foliage-sprig', maxDim: 750 },
];

async function processItem(item) {
  const filePath = path.join(inputDir, item.file);
  const trimmed = await sharp(filePath).trim().raw().toBuffer({ resolveWithObject: true });
  const { data, info } = trimmed;

  // Calculate target resize dimensions
  const scale = Math.min(1, item.maxDim / Math.max(info.width, info.height));
  const targetW = Math.round(info.width * scale);
  const targetH = Math.round(info.height * scale);

  // 1. Process Brand Palette
  const brandData = Buffer.from(data);
  for (let i = 0; i < brandData.length; i += 4) {
    const [nr, ng, nb, na] = recolorBrandPalette(
      brandData[i], brandData[i+1], brandData[i+2], brandData[i+3]
    );
    brandData[i] = nr;
    brandData[i+1] = ng;
    brandData[i+2] = nb;
    brandData[i+3] = na;
  }

  // Save WebP transparent for web
  await sharp(brandData, { raw: info })
    .resize(targetW, targetH, { fit: 'inside' })
    .webp({ quality: 90, alphaQuality: 95, effort: 6 })
    .toFile(path.join(publicDir, `${item.name}.webp`));

  // Save PNG as fallback
  await sharp(brandData, { raw: info })
    .resize(targetW, targetH, { fit: 'inside' })
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(path.join(publicDir, `${item.name}.png`));

  // Save luxury ivory preview for inspection
  await sharp(brandData, { raw: info })
    .resize(Math.min(600, targetW), null)
    .flatten({ background: '#FDFBF7' })
    .jpeg({ quality: 85 })
    .toFile(path.join(previewDir, `${item.name}-brand.jpg`));

  // 2. Process Gold Foil Edition
  const goldData = Buffer.from(data);
  for (let i = 0; i < goldData.length; i += 4) {
    const [nr, ng, nb, na] = recolorGoldFoil(
      goldData[i], goldData[i+1], goldData[i+2], goldData[i+3]
    );
    goldData[i] = nr;
    goldData[i+1] = ng;
    goldData[i+2] = nb;
    goldData[i+3] = na;
  }

  await sharp(goldData, { raw: info })
    .resize(targetW, targetH, { fit: 'inside' })
    .webp({ quality: 90, alphaQuality: 95, effort: 6 })
    .toFile(path.join(publicDir, `${item.name}-gold.webp`));

  await sharp(goldData, { raw: info })
    .resize(Math.min(600, targetW), null)
    .flatten({ background: '#FDFBF7' })
    .jpeg({ quality: 85 })
    .toFile(path.join(previewDir, `${item.name}-gold.jpg`));

  console.log(`Processed: ${item.name} (${targetW}x${targetH})`);
}

async function run() {
  for (const item of items) {
    await processItem(item);
  }
  console.log('All decorations generated successfully!');
}

run().catch(console.error);
