import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const root = process.cwd();
const images = [
  ['IMG_1167.jpeg', 'IMG_1167.webp'],
  ['IMG_2897 3.jpeg', 'IMG_2897-3.webp'],
  ['IMG_0035.jpeg', 'IMG_0035.webp'],
  ['IMG_1169.jpeg', 'IMG_1169.webp'],
  ['IMG_1773.jpeg', 'IMG_1773.webp'],
  ['IMG_4525.jpeg', 'IMG_4525.webp'],
  ['IMG_4525 2.jpeg', 'IMG_4525-2.webp'],
  ['IMG_4533.jpeg', 'IMG_4533.webp'],
  ['IMG_2117.jpeg', 'IMG_2117.webp'],
  ['IMG_2118.jpeg', 'IMG_2118.webp'],
  ['IMG_4846.jpeg', 'IMG_4846.webp'],
  ['IMG_1151.jpeg', 'IMG_1151.webp'],
  ['IMG_3596.jpeg', 'IMG_3596.webp'],
  ['IMG_4531.jpeg', 'IMG_4531.webp'],
  ['IMG_4537.jpeg', 'IMG_4537.webp'],
  ['IMG_3740.jpeg', 'IMG_3740.webp'],
  ['IMG_3743.jpeg', 'IMG_3743.webp'],
  ['IMG_4949.jpeg', 'IMG_4949.webp'],
  ['IMG_2149.jpeg', 'IMG_2149.webp'],
  ['IMG_4544.jpeg', 'IMG_4544.webp'],
];

for (const [sourceName, outputName] of images) {
  const source = resolve(root, 'public/assets/images', sourceName);
  const catalogOutput = resolve(root, 'public/assets/images/optimized/catalog', outputName);
  const previewOutput = resolve(root, 'public/assets/images/optimized/previews', outputName);
  await mkdir(dirname(catalogOutput), { recursive: true });
  await mkdir(dirname(previewOutput), { recursive: true });
  await sharp(source).rotate().resize({ width: 1500, height: 1500, fit: 'inside', withoutEnlargement: true }).webp({ quality: 80, effort: 5 }).toFile(catalogOutput);
  await sharp(source).rotate().resize({ width: 720, height: 720, fit: 'inside', withoutEnlargement: true }).webp({ quality: 74, effort: 5 }).toFile(previewOutput);
  const [original, catalog, preview] = await Promise.all([stat(source), stat(catalogOutput), stat(previewOutput)]);
  console.log(`${sourceName}: ${(original.size / 1024 / 1024).toFixed(2)} MB -> ${(catalog.size / 1024).toFixed(0)} KB gallery, ${(preview.size / 1024).toFixed(0)} KB card`);
}