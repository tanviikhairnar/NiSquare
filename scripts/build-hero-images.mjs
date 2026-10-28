import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const outDir = path.resolve(root, 'public/assets/images/optimized');

const slidesConfig = [
  {
    prefix: 'hero-trousseau-curation',
    src: 'public/assets/images/Trousseau & Wedding Hampers-20261027T173444Z-1-001/Trousseau & Wedding Hampers/Room Hampers/IMG_4595.JPG',
    fit: 'cover',
    position: 'center',
  },
  {
    prefix: 'hero-festive-occasions',
    src: 'public/assets/images/Trousseau & Wedding Hampers-20261027T173444Z-1-001/Trousseau & Wedding Hampers/Room Hampers/IMG_5762.JPG',
    fit: 'cover',
    position: 'center',
  },
  {
    prefix: 'hero-celebrations-baby',
    src: 'public/assets/images/Trousseau & Wedding Hampers-20261027T173444Z-1-001/Trousseau & Wedding Hampers/Baby/IMG_4732.JPG',
    fit: 'cover',
    position: 'center',
  },
  {
    prefix: 'hero-return-favours',
    src: 'public/assets/images/Trousseau & Wedding Hampers-20261027T173444Z-1-001/Trousseau & Wedding Hampers/Room Hampers/IMG_5768.jpg',
    fit: 'cover',
    position: 'center',
  },
  {
    prefix: 'hero-custom-curation',
    src: 'public/assets/images/Trousseau & Wedding Hampers-20261027T173444Z-1-001/Trousseau & Wedding Hampers/Trousseau/IMG_1169.jpg',
    fit: 'cover',
    position: 'center',
  },
];

async function generate() {
  for (const item of slidesConfig) {
    const fullPath = path.resolve(root, item.src);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Source not found: ${item.src}`);
    }
    const buffer = fs.readFileSync(fullPath);

    const desktopOut = path.join(outDir, `${item.prefix}-desktop.webp`);
    const mobileOut = path.join(outDir, `${item.prefix}-mobile.webp`);

    // Desktop: 1920x1080 (16:9 widescreen) with high quality
    await sharp(buffer)
      .rotate()
      .resize({
        width: 1920,
        height: 1080,
        fit: item.fit || 'cover',
        position: item.position || 'center',
      })
      .webp({ quality: 90, effort: 5 })
      .toFile(desktopOut);

    // Mobile: 960x1280 (3:4 portrait)
    await sharp(buffer)
      .rotate()
      .resize({
        width: 960,
        height: 1280,
        fit: item.fit || 'cover',
        position: item.position || 'center',
      })
      .webp({ quality: 88, effort: 5 })
      .toFile(mobileOut);

    const dStat = fs.statSync(desktopOut);
    const mStat = fs.statSync(mobileOut);
    console.log(`✓ ${item.prefix}: Desktop ${(dStat.size / 1024).toFixed(1)} KB, Mobile ${(mStat.size / 1024).toFixed(1)} KB`);
  }
  console.log('Hero master images generated successfully!');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
