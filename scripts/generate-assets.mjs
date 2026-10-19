import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const sourceBurgundy = 'C:/Users/tanvi/.gemini/antigravity/brain/0c706edb-ff32-4a09-9d72-b1dce15e8550/.user_uploaded/media_1792397620072_c15f2f89.jpg';
const sourceMonogram = 'C:/Users/tanvi/.gemini/antigravity/brain/0c706edb-ff32-4a09-9d72-b1dce15e8550/.user_uploaded/media_1792397638257_392e6290.jpg';
const outDir = path.resolve('public/assets/textures');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  console.log('Generating texture and merge assets...');

  // 1. Watermark-free burgundy master
  // Star watermark is located at bottom right around x: 915, y: 505 (size ~60x60)
  // We extract a clean texture patch from x: 750, y: 460 and composite over it.
  const cleanPatch = await sharp(sourceBurgundy)
    .extract({ left: 750, top: 460, width: 140, height: 100 })
    .toBuffer();

  const cleanBurgundyBuffer = await sharp(sourceBurgundy)
    .composite([{ input: cleanPatch, left: 860, top: 460, blend: 'over' }])
    .toBuffer();

  // Save Burgundy Texture
  await sharp(cleanBurgundyBuffer)
    .resize(2048, 1142, { fit: 'cover' })
    .webp({ quality: 92 })
    .toFile(path.join(outDir, 'fabric-burgundy.webp'));

  await sharp(cleanBurgundyBuffer)
    .resize(2048, 1142, { fit: 'cover' })
    .jpeg({ quality: 90 })
    .toFile(path.join(outDir, 'fabric-burgundy.jpg'));

  // Save Deep Velvet Wine Texture (richer dark for Footer / Dark elements)
  await sharp(cleanBurgundyBuffer)
    .resize(2048, 1142, { fit: 'cover' })
    .modulate({ brightness: 0.72, saturation: 1.12 })
    .webp({ quality: 92 })
    .toFile(path.join(outDir, 'fabric-deep-wine.webp'));

  await sharp(cleanBurgundyBuffer)
    .resize(2048, 1142, { fit: 'cover' })
    .modulate({ brightness: 0.72, saturation: 1.12 })
    .jpeg({ quality: 90 })
    .toFile(path.join(outDir, 'fabric-deep-wine.jpg'));

  // 2. Grayscale luminance extraction to map exact drape folds to Cream and Blush
  const { data: grayData, info } = await sharp(cleanBurgundyBuffer)
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const numPixels = info.width * info.height;
  const creamRgb = Buffer.alloc(numPixels * 3);
  const blushRgb = Buffer.alloc(numPixels * 3);

  for (let i = 0; i < numPixels; i++) {
    const val = grayData[i];
    // Dynamic range expansion and smooth gamma
    const t = Math.pow(Math.min(1, Math.max(0, (val - 12) / 165)), 0.85);

    // Pure White Silk / Linen drapery:
    // Shadow folds: #E4E5E8 (soft natural cloth shadow)
    // Highlights: #FFFFFF (pure crisp white)
    creamRgb[i * 3 + 0] = Math.round(228 + t * (255 - 228));
    creamRgb[i * 3 + 1] = Math.round(229 + t * (255 - 229));
    creamRgb[i * 3 + 2] = Math.round(232 + t * (255 - 232));

    // Blush / Rose Nude:
    // Shadow crevice: #D0B5B0
    // Midtones: #F0E2DE
    // Highlights: #FAF3F0
    blushRgb[i * 3 + 0] = Math.round(208 + t * (251 - 208));
    blushRgb[i * 3 + 1] = Math.round(181 + t * (243 - 181));
    blushRgb[i * 3 + 2] = Math.round(176 + t * (240 - 176));
  }

  // Save White Fabric (also alias to fabric-cream for backwards compatibility)
  await sharp(creamRgb, { raw: { width: info.width, height: info.height, channels: 3 } })
    .resize(2048, 1142, { fit: 'cover' })
    .webp({ quality: 94 })
    .toFile(path.join(outDir, 'fabric-white.webp'));

  await sharp(creamRgb, { raw: { width: info.width, height: info.height, channels: 3 } })
    .resize(2048, 1142, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(outDir, 'fabric-white.jpg'));

  await sharp(creamRgb, { raw: { width: info.width, height: info.height, channels: 3 } })
    .resize(2048, 1142, { fit: 'cover' })
    .webp({ quality: 94 })
    .toFile(path.join(outDir, 'fabric-cream.webp'));

  await sharp(creamRgb, { raw: { width: info.width, height: info.height, channels: 3 } })
    .resize(2048, 1142, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(outDir, 'fabric-cream.jpg'));

  // Save Blush Fabric
  await sharp(blushRgb, { raw: { width: info.width, height: info.height, channels: 3 } })
    .resize(2048, 1142, { fit: 'cover' })
    .webp({ quality: 92 })
    .toFile(path.join(outDir, 'fabric-blush.webp'));

  await sharp(blushRgb, { raw: { width: info.width, height: info.height, channels: 3 } })
    .resize(2048, 1142, { fit: 'cover' })
    .jpeg({ quality: 90 })
    .toFile(path.join(outDir, 'fabric-blush.jpg'));

  console.log('Finished generating fabric background textures in Burgundy, Deep Wine, Cream, and Blush!');

  // 3. Section Merge Curve Assets (SVG & Rendered)
  // A) Cream to Burgundy Drape Transition
  const creamToBurgundySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none" class="merge-curve">
  <defs>
    <linearGradient id="drapeShadowCB" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#240508" stop-opacity="0.55" />
      <stop offset="60%" stop-color="#3A080E" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#5C111C" stop-opacity="0" />
    </linearGradient>
  </defs>
  <rect width="1440" height="120" fill="#5C111C" />
  <path d="M0,0 C320,75 520,30 760,70 C1020,115 1220,35 1440,80 L1440,0 L0,0 Z" fill="url(#drapeShadowCB)" />
  <path d="M0,0 L0,62 C280,102 480,42 740,82 C1040,122 1260,52 1440,72 L1440,0 Z" fill="#FBF8F2" />
  <path d="M0,62 C280,102 480,42 740,82 C1040,122 1260,52 1440,72" fill="none" stroke="#E6D7C3" stroke-width="2" stroke-opacity="0.75" />
</svg>`;

  // B) Burgundy to Cream Drape Transition
  const burgundyToCreamSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none" class="merge-curve">
  <defs>
    <linearGradient id="burgundyFoldShadowBC" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#240508" stop-opacity="0.6" />
      <stop offset="70%" stop-color="#240508" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#240508" stop-opacity="0" />
    </linearGradient>
  </defs>
  <rect width="1440" height="120" fill="#FBF8F2" />
  <path d="M0,0 L0,78 C260,118 540,55 820,95 C1100,135 1320,68 1440,88 L1440,0 Z" fill="url(#burgundyFoldShadowBC)" />
  <path d="M0,0 L0,68 C260,108 540,45 820,85 C1100,125 1320,58 1440,78 L1440,0 Z" fill="#5C111C" />
  <path d="M0,68 C260,108 540,45 820,85 C1100,125 1320,58 1440,78" fill="none" stroke="#B89A63" stroke-width="1.8" stroke-opacity="0.5" />
</svg>`;

  // C) Blush to Cream Drape Transition
  const blushToCreamSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" preserveAspectRatio="none" class="merge-curve">
  <rect width="1440" height="80" fill="#FBF8F2" />
  <path d="M0,0 L0,48 C340,78 620,28 920,63 C1200,90 1340,42 1440,54 L1440,0 Z" fill="#F1E8E4" />
  <path d="M0,48 C340,78 620,28 920,63 C1200,90 1340,42 1440,54" fill="none" stroke="#E2D0C8" stroke-width="1.5" stroke-opacity="0.8" />
</svg>`;

  // D) Hero (Dark Wine) to Blush Transition
  const heroToBlushSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none" class="merge-curve">
  <defs>
    <linearGradient id="heroFoldShadowHB" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#140205" stop-opacity="0.75" />
      <stop offset="100%" stop-color="#140205" stop-opacity="0" />
    </linearGradient>
  </defs>
  <rect width="1440" height="100" fill="#F1E8E4" />
  <path d="M0,0 L0,70 C300,105 580,48 880,88 C1180,125 1350,55 1440,68 L1440,0 Z" fill="url(#heroFoldShadowHB)" />
  <path d="M0,0 L0,58 C300,93 580,36 880,76 C1180,113 1350,43 1440,56 L1440,0 Z" fill="#1C0407" />
  <path d="M0,58 C300,93 580,36 880,76 C1180,113 1350,43 1440,56" fill="none" stroke="#B89A63" stroke-width="1.4" stroke-opacity="0.45" />
</svg>`;

  // E) Cream to Footer Deep Wine Transition
  const creamToFooterSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none" class="merge-curve">
  <defs>
    <linearGradient id="footerShadowCF" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1F0407" stop-opacity="0.65" />
      <stop offset="100%" stop-color="#400A12" stop-opacity="0" />
    </linearGradient>
  </defs>
  <rect width="1440" height="120" fill="#4A0B14" />
  <path d="M0,0 C360,78 640,32 940,74 C1200,112 1360,38 1440,76 L1440,0 L0,0 Z" fill="url(#footerShadowCF)" />
  <path d="M0,0 L0,62 C340,98 620,40 920,80 C1180,118 1340,46 1440,64 L1440,0 Z" fill="#FBF8F2" />
  <path d="M0,62 C340,98 620,40 920,80 C1180,118 1340,46 1440,64" fill="none" stroke="#E6D7C3" stroke-width="2" stroke-opacity="0.75" />
</svg>`;

  fs.writeFileSync(path.join(outDir, 'merge-cream-to-burgundy.svg'), creamToBurgundySvg.trim());
  fs.writeFileSync(path.join(outDir, 'merge-burgundy-to-cream.svg'), burgundyToCreamSvg.trim());
  fs.writeFileSync(path.join(outDir, 'merge-blush-to-cream.svg'), blushToCreamSvg.trim());
  fs.writeFileSync(path.join(outDir, 'merge-hero-to-blush.svg'), heroToBlushSvg.trim());
  fs.writeFileSync(path.join(outDir, 'merge-cream-to-footer.svg'), creamToFooterSvg.trim());

  console.log('Saved all merge curve SVGs successfully!');

  // Also extract the clean high-resolution gold monogram emblem from sourceMonogram for subtle flourishes!
  const emblemMeta = await sharp(sourceMonogram).metadata();
  console.log('Monogram dimensions:', emblemMeta.width, emblemMeta.height);

  // We can save a web-optimized emblem badge
  await sharp(sourceMonogram)
    .resize(600, 600)
    .webp({ quality: 92 })
    .toFile(path.join(outDir, 'brand-monogram-embossed.webp'));

  console.log('Done with all asset generations!');
}

run().catch(console.error);

