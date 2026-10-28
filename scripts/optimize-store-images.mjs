import sharp from 'sharp';
import { existsSync } from 'node:fs';
import { mkdir, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const root = process.cwd();
const publicAssets = resolve(root, 'public/assets');
const archiveAssets = resolve(root, 'media-source-archive/public/assets');

async function findSource(relative) {
  const candidates = [resolve(publicAssets, relative), resolve(archiveAssets, relative)];
  const source = candidates.find((candidate) => existsSync(candidate));
  if (!source) throw new Error('Image source is missing: ' + relative);
  return source;
}

async function webp(sourceRelative, outputRelative, width, quality, alphaQuality = 100) {
  const source = await findSource(sourceRelative);
  const output = resolve(publicAssets, outputRelative);
  await mkdir(dirname(output), { recursive: true });
  await sharp(source).rotate().resize({ width, height: width, fit: 'inside', withoutEnlargement: true }).webp({ quality, alphaQuality, effort: 5 }).toFile(output);
  const [sourceInfo, outputInfo] = await Promise.all([stat(source), stat(output)]);
  console.log(sourceRelative + ': ' + Math.round(sourceInfo.size / 1024) + ' KB -> ' + Math.round(outputInfo.size / 1024) + ' KB');
}

const catalog = [
  ['IMG_1167.jpeg', 'IMG_1167.webp'], ['IMG_2897 3.jpeg', 'IMG_2897-3.webp'],
  ['IMG_0035.jpeg', 'IMG_0035.webp'], ['IMG_1169.jpeg', 'IMG_1169.webp'],
  ['IMG_1773.jpeg', 'IMG_1773.webp'], ['IMG_4525.jpeg', 'IMG_4525.webp'],
  ['IMG_4525 2.jpeg', 'IMG_4525-2.webp'], ['IMG_4533.jpeg', 'IMG_4533.webp'],
  ['IMG_2117.jpeg', 'IMG_2117.webp'], ['IMG_2118.jpeg', 'IMG_2118.webp'],
  ['IMG_4846.jpeg', 'IMG_4846.webp'], ['IMG_1151.jpeg', 'IMG_1151.webp'],
  ['IMG_3596.jpeg', 'IMG_3596.webp'], ['IMG_4531.jpeg', 'IMG_4531.webp'],
  ['IMG_4537.jpeg', 'IMG_4537.webp'], ['IMG_3740.jpeg', 'IMG_3740.webp'],
  ['IMG_3743.jpeg', 'IMG_3743.webp'], ['IMG_4949.jpeg', 'IMG_4949.webp'],
  ['IMG_2149.jpeg', 'IMG_2149.webp'], ['IMG_4544.jpeg', 'IMG_4544.webp']
];
for (const [source, name] of catalog) {
  await webp('images/' + source, 'images/optimized/catalog/' + name, 1500, 80);
  await webp('images/' + source, 'images/optimized/previews/' + name, 720, 74);
}

const cards = ['category-festive-card', 'category-ring-platter-card', 'category-trousseau-card'];
for (const name of cards) {
  await webp('images/optimized/' + name + '.jpg', 'images/optimized/' + name + '.webp', 1400, 78);
  await webp('images/optimized/' + name + '.jpg', 'images/optimized/previews/' + name + '.webp', 720, 74);
}

// Hero images are built from authentic client photos via scripts/build-hero-images.mjs

const reels = ['C2phJ92pJEZ', 'C34YbeoI0oq', 'C43PVooJ0aM', 'DP3OMVrEhOA', 'DQB1R3MEvle', 'DQcPTtYgvTY', 'DQgmQuZkni8', 'DRM51Y8En-f', 'DTfb2PBkj8-', 'DXwzDzWzUwD'];
for (const id of reels) await webp('instagram-reels/' + id + '.jpg', 'instagram-reels/' + id + '.webp', 640, 76);

await webp('logo/NI square cream revised (2).png', 'logo/ni-square-logo-cream.webp', 800, 90, 100);
const faviconSource = await findSource('logo/favicon.png');
const faviconOutput = resolve(publicAssets, 'logo/favicon-optimized.png');
await mkdir(dirname(faviconOutput), { recursive: true });
await sharp(faviconSource).resize({ width: 64, height: 64, fit: 'inside', withoutEnlargement: true }).png({ compressionLevel: 9, palette: true }).toFile(faviconOutput);
await webp('images/optimized/catalog/chocolate-khoncha-table.webp', 'images/optimized/previews/chocolate-khoncha-table.webp', 720, 74);
