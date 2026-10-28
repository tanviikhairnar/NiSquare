import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const catalogDir = 'public/assets/images/optimized/catalog';
const files = fs.readdirSync(catalogDir).filter(f => f.endsWith('.webp'));

async function run() {
  const meta = [];
  for (const f of files) {
    const full = path.join(catalogDir, f);
    const m = await sharp(full).metadata();
    meta.push({
      file: f,
      width: m.width,
      height: m.height,
      aspect: (m.width / m.height).toFixed(2),
    });
  }

  // Let's also check categorized assets mapping to see where each image belongs
  const mapping = JSON.parse(fs.readFileSync('scripts/categorized-assets.json', 'utf8'));
  const fileToCat = {};
  for (const [cat, data] of Object.entries(mapping)) {
    for (const img of data.images) {
      const base = path.basename(img);
      fileToCat[base] = cat;
    }
  }

  console.log('--- ALL IMAGES WITH THEIR CATEGORIES & SIZES ---');
  for (const item of meta) {
    const cat = fileToCat[item.file] || 'unmatched/existing';
    console.log(item.file.padEnd(30), cat.padEnd(28), `${item.width}x${item.height}`, `(${item.aspect})`);
  }
}

run();

