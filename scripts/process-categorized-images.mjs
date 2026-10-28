import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import convert from 'heic-convert';

const root = process.cwd();
const imagesBase = path.resolve(root, 'public/assets/images');
const catalogOut = path.resolve(imagesBase, 'optimized/catalog');
const previewOut = path.resolve(imagesBase, 'optimized/previews');
const videosOut = path.resolve(root, 'public/assets/videos/catalog');

fs.mkdirSync(catalogOut, { recursive: true });
fs.mkdirSync(previewOut, { recursive: true });
fs.mkdirSync(videosOut, { recursive: true });

// Exact mapping to exact folders
const mappings = [
  {
    key: 'festival-gifting-hampers',
    collectionSlug: 'festive-hampers',
    title: 'Festival Gifting Hampers',
    folders: [
      path.join(imagesBase, 'Festive Hampers-20261027T173436Z-1-001/Festive Hampers'),
    ],
  },
  {
    key: 'birthday-return-favours',
    collectionSlug: 'return-favours',
    title: 'Birthday Return Favours',
    folders: [
      path.join(imagesBase, 'Return favours-20261027T173440Z-1-001/Return favours/Birthday Return Favours'),
    ],
  },
  {
    key: 'wedding-return-favours',
    collectionSlug: 'return-favours',
    title: 'Wedding Return Favours',
    folders: [
      path.join(imagesBase, 'Return favours-20261027T173440Z-1-001/Return favours/Wedding Return Favours'),
    ],
  },
  {
    key: 'ring-platters',
    collectionSlug: 'ring-platters',
    title: 'Ring Platters',
    folders: [
      path.join(imagesBase, 'Ring platter-20261027T173441Z-1-001/Ring platter'),
    ],
  },
  {
    key: 'corporate-gifting-hampers',
    collectionSlug: 'corporate-hampers',
    title: 'Corporate Gifting Hampers',
    folders: [
      path.join(imagesBase, 'Corporate Hampers-20261027T172532Z-1-001/Corporate Hampers'),
      path.join(imagesBase, 'Trousseau & Wedding Hampers-20261027T173444Z-1-001/Trousseau & Wedding Hampers/Room Hampers/Corporate Hampers'),
    ],
  },
  {
    key: 'baby-hampers',
    collectionSlug: 'trousseau-wedding-hampers',
    title: 'Baby Hampers',
    folders: [
      path.join(imagesBase, 'Trousseau & Wedding Hampers-20261027T173444Z-1-001/Trousseau & Wedding Hampers/Baby'),
    ],
  },
  {
    key: 'bridesmaid-gifts',
    collectionSlug: 'trousseau-wedding-hampers',
    title: 'Bridesmaid Gifts',
    folders: [
      path.join(imagesBase, 'Trousseau & Wedding Hampers-20261027T173444Z-1-001/Trousseau & Wedding Hampers/Bridesmaid'),
    ],
  },
  {
    key: 'room-hampers',
    collectionSlug: 'trousseau-wedding-hampers',
    title: 'Room Hampers',
    folders: [
      path.join(imagesBase, 'Trousseau & Wedding Hampers-20261027T173444Z-1-001/Trousseau & Wedding Hampers/Room Hampers'),
    ],
    excludeDirs: ['Corporate Hampers'],
  },
  {
    key: 'trousseau',
    collectionSlug: 'trousseau-wedding-hampers',
    title: 'Trousseau',
    folders: [
      path.join(imagesBase, 'Trousseau & Wedding Hampers-20261027T173444Z-1-001/Trousseau & Wedding Hampers/Trousseau'),
    ],
  },
  {
    key: 'father-s-day',
    collectionSlug: 'seasonal-occasion-gifting',
    title: 'Father\u2019s Day',
    folders: [
      path.join(imagesBase, 'Yearly  Seasonal Gifting-20261027T173448Z-1-001/Yearly  Seasonal Gifting/Father\u2019s Day'),
    ],
  },
  {
    key: 'mom-to-be',
    collectionSlug: 'seasonal-occasion-gifting',
    title: 'Mom-to-be',
    folders: [
      path.join(imagesBase, 'Yearly  Seasonal Gifting-20261027T173448Z-1-001/Yearly  Seasonal Gifting/Mom-to-be'),
    ],
  },
  {
    key: 'mother-s-day',
    collectionSlug: 'seasonal-occasion-gifting',
    title: 'Mother\u2019s Day',
    folders: [
      path.join(imagesBase, 'Yearly  Seasonal Gifting-20261027T173448Z-1-001/Yearly  Seasonal Gifting/Mother\u2019s Day'),
    ],
  },
  {
    key: 'valentine-s-day',
    collectionSlug: 'seasonal-occasion-gifting',
    title: 'Valentine\u2019s Day',
    folders: [
      path.join(imagesBase, 'Yearly  Seasonal Gifting-20261027T173448Z-1-001/Yearly  Seasonal Gifting/Valentine\u2019s Day'),
    ],
  },
];

function sanitizeName(baseName, categoryKey, index) {
  const clean = baseName
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9_-]/g, '')
    .trim();
  // If it's a UUID or weird hash
  if (/^[0-9a-fA-F-]{20,}$/.test(baseName) || /^[0-9a-fA-F]{32}$/.test(baseName)) {
    return `${categoryKey}-${index + 1}`;
  }
  return clean;
}

async function convertImageToWebp(inputPath, outputWebpName) {
  const ext = path.extname(inputPath).toLowerCase();
  let buffer;

  if (ext === '.heic') {
    const rawHeic = fs.readFileSync(inputPath);
    const convertedJpeg = await convert({
      buffer: rawHeic,
      format: 'JPEG',
      quality: 0.92,
    });
    buffer = Buffer.from(convertedJpeg);
  } else {
    buffer = fs.readFileSync(inputPath);
  }

  const catalogDest = path.join(catalogOut, `${outputWebpName}.webp`);
  const previewDest = path.join(previewOut, `${outputWebpName}.webp`);

  await sharp(buffer)
    .rotate()
    .resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(catalogDest);

  await sharp(buffer)
    .rotate()
    .resize({ width: 720, height: 720, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 76 })
    .toFile(previewDest);

  return `/assets/images/optimized/catalog/${outputWebpName}.webp`;
}

function findFilesInFolder(folderPath, excludeDirs = []) {
  let results = [];
  if (!fs.existsSync(folderPath)) return results;
  const list = fs.readdirSync(folderPath);
  for (const item of list) {
    const full = path.join(folderPath, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (excludeDirs.some((ex) => item.toLowerCase().includes(ex.toLowerCase()))) {
        continue;
      }
      results = results.concat(findFilesInFolder(full, excludeDirs));
    } else {
      results.push(full);
    }
  }
  return results;
}

const categorizedResults = {};

for (const map of mappings) {
  categorizedResults[map.key] = {
    ...map,
    images: [],
    videos: [],
  };

  let allFiles = [];
  for (const fld of map.folders) {
    if (fs.existsSync(fld)) {
      allFiles = allFiles.concat(findFilesInFolder(fld, map.excludeDirs || []));
    } else {
      console.warn(`Folder not found: ${fld}`);
    }
  }

  console.log(`Processing ${map.key} (${allFiles.length} files)...`);
  let imgIndex = 0;

  for (const f of allFiles) {
    const actualExt = path.extname(f);
    const ext = actualExt.toLowerCase();
    const baseName = path.basename(f, actualExt);

    if (['.jpg', '.jpeg', '.png', '.heic'].includes(ext)) {
      const cleanName = sanitizeName(baseName, map.key, imgIndex++);
      try {
        const webpUrl = await convertImageToWebp(f, cleanName);
        if (!categorizedResults[map.key].images.includes(webpUrl)) {
          categorizedResults[map.key].images.push(webpUrl);
        }
      } catch (err) {
        console.error(`Error converting ${f}:`, err.message);
      }
    } else if (['.mp4', '.mov'].includes(ext)) {
      const videoCleanName = `${map.key}-${path.basename(f)}`;
      const destPath = path.join(videosOut, videoCleanName);
      fs.copyFileSync(f, destPath);
      categorizedResults[map.key].videos.push({
        src: `/assets/videos/catalog/${videoCleanName}`,
        originalName: path.basename(f),
      });
    }
  }
}

fs.writeFileSync(
  path.resolve(root, 'scripts/categorized-assets.json'),
  JSON.stringify(categorizedResults, null, 2),
  'utf8'
);

console.log('Finished processing all images! Output written to scripts/categorized-assets.json');
