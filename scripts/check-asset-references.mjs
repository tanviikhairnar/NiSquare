import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
const files = ['index.html'];
for (const file of await readdir('src', { recursive: true })) if (/\.(?:js|jsx|ts|tsx|css)$/.test(file)) files.push(resolve('src', file));
const paths = new Set();
const quotedPath = /[\x27\x22\x60](\/assets\/[^\x27\x22\x60]+)[\x27\x22\x60]/g;
const cssPath = /url\(\s*[\x27\x22]?(\/assets\/[^)\x27\x22\s]+)[\x27\x22]?\s*\)/g;
for (const file of files) {
  const source = await readFile(file, 'utf8');
  for (const pattern of [quotedPath, cssPath]) for (const match of source.matchAll(pattern)) paths.add(match[1].split(/[?#]/)[0]);
}
const missing = [...paths].filter((url) => {
  try { return !existsSync(resolve('public', decodeURIComponent(url.slice(1)))); }
  catch { return true; }
}).sort();
if (missing.length) {
  console.error('Missing public asset references:');
  for (const url of missing) console.error(' - ' + url);
  process.exitCode = 1;
} else console.log('Asset references checked: ' + paths.size + '; none are missing.');
