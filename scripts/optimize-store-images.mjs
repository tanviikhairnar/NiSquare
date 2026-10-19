import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const root = process.cwd();
const images = [
  ['IMG_1167.jpeg', 'IMG_1167.webp'],
  ['IMG_2897 3.jpeg', 'IMG_2897-3.webp'],
  ['IMG_0035.jpeg', 'IMG_0035.webp'],
  ['IMG_1169.jpeg', 'IMG_1169.webp'],
  ['IMG_4525.jpeg', 'IMG_4525.webp'],
  ['IMG_4846.jpeg', 'IMG_4846.webp'],
  ['IMG_1151.jpeg', 'IMG_1151.webp'],
  ['IMG_3596.jpeg', 'IMG_3596.webp'],
  ['IMG_4949.jpeg', 'IMG_4949.webp'],
  ['IMG_2149.jpeg', 'IMG_2149.webp'],
  ['chocolate-khoncha-table.jpg', 'chocolate-khoncha-table.webp'],
];

for (const [sourceName, outputName] of images) {
  const source = resolve(root, 'public/assets/images', sourceName);
  const output = resolve(root, 'public/assets/images/optimized/catalog', outputName);
  await mkdir(dirname(output), { recursive: true });
  await sharp(source)
    .rotate()
    .resize({ width: 1800, height: 1800, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 84, effort: 5 })
    .toFile(output);
  const [original, optimized] = await Promise.all([stat(source), stat(output)]);
  console.log(`${sourceName}: ${(original.size / 1024 / 1024).toFixed(2)} MB -> ${(optimized.size / 1024).toFixed(0)} KB`);
}