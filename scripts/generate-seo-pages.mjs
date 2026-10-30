import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  BRAND_NAME,
  DEFAULT_SITE_URL,
  getPageStructuredData,
  getSeoMetadata,
  getSeoRoutes,
} from '../src/data/seo.ts';

const distDirectory = path.resolve('dist');
const publicDirectory = path.resolve('public');
const template = await readFile(path.join(distDirectory, 'index.html'), 'utf8');

const configuredUrl = (process.env.VITE_SITE_URL || process.env.SITE_URL || DEFAULT_SITE_URL).trim();
let siteOrigin = DEFAULT_SITE_URL;
try {
  siteOrigin = new URL(configuredUrl).origin;
} catch {
  siteOrigin = DEFAULT_SITE_URL;
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeXml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function preparePage(route) {
  const metadata = getSeoMetadata(route.path);
  const imageUrl = siteOrigin ? new URL(metadata.image, siteOrigin).href : metadata.image;
  const canonicalUrl = new URL(metadata.canonicalPath, siteOrigin).href;

  let html = template.replace(/<title>[\s\S]*?<\/title>/i, '<title>' + escapeHtml(metadata.title) + '</title>');
  html = html.replace(/<meta\s+(?:name|property)="(?:description|keywords|robots|referrer|theme-color|author|geo\.[^"]+|ICBM|og:[^"]+|twitter:[^"]+)"[^>]*\/?>/gi, '');
  html = html.replace(/<link\b[^>]*\brel="canonical"[^>]*\/?>/gi, '');
  html = html.replace(/<script\b[^>]*data-site-structured-data="true"[^>]*>[\s\S]*?<\/script>/gi, '');

  const tags = [
    '<meta name="description" content="' + escapeHtml(metadata.description) + '" />',
    '<meta name="robots" content="' + escapeHtml(metadata.robots || 'index, follow') + '" />',
    '<meta name="referrer" content="strict-origin-when-cross-origin" />',
    '<meta name="author" content="' + escapeHtml(BRAND_NAME) + '" />',
    '<meta name="theme-color" content="#5b101e" />',
    '<meta name="geo.region" content="IN-MH" />',
    '<meta name="geo.placename" content="Nashik, Maharashtra, India" />',
    '<meta name="geo.position" content="19.9975;73.7898" />',
    '<meta name="ICBM" content="19.9975, 73.7898" />',
  ];

  // OpenGraph
  tags.push(
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="' + escapeHtml(BRAND_NAME) + '" />',
    '<meta property="og:locale" content="en_IN" />',
    '<meta property="og:title" content="' + escapeHtml(metadata.title) + '" />',
    '<meta property="og:description" content="' + escapeHtml(metadata.description) + '" />',
    '<meta property="og:url" content="' + escapeHtml(canonicalUrl) + '" />',
    '<meta property="og:image" content="' + escapeHtml(imageUrl) + '" />',
    '<meta property="og:image:alt" content="' + escapeHtml(`${metadata.title} - ${BRAND_NAME}`) + '" />',
  );

  // Twitter
  tags.push(
    '<meta name="twitter:card" content="summary_large_image" />',
    '<meta name="twitter:title" content="' + escapeHtml(metadata.title) + '" />',
    '<meta name="twitter:description" content="' + escapeHtml(metadata.description) + '" />',
    '<meta name="twitter:image" content="' + escapeHtml(imageUrl) + '" />',
    '<meta name="twitter:image:alt" content="' + escapeHtml(`${metadata.title} - ${BRAND_NAME}`) + '" />',
  );

  // Canonical
  tags.push('<link rel="canonical" href="' + escapeHtml(canonicalUrl) + '" />');

  // Schema.org Structured Data
  const schemas = getPageStructuredData(route.path, siteOrigin);
  for (let i = 0; i < schemas.length; i++) {
    const jsonLd = JSON.stringify(schemas[i]).replace(/</g, '\\u003c');
    tags.push('<script type="application/ld+json" data-site-structured-data="true" data-schema-index="' + i + '">' + jsonLd + '</script>');
  }

  return html.replace('</head>', '    ' + tags.join('\n    ') + '\n  </head>');
}

const routes = getSeoRoutes();

// 1. Generate Static HTML Pages for all canonical routes
for (const route of routes) {
  const html = preparePage(route);
  const destination = route.path === '/'
    ? path.join(distDirectory, 'index.html')
    : path.join(distDirectory, route.path.slice(1), 'index.html');
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, html, 'utf8');
}

// Vercel serves dist/404.html with an HTTP 404 status for unknown paths. Keep
// the same React bundle and visual 404 component used by client-side routing.
const notFoundHtml = template
  .replace(/<title>[\s\S]*?<\/title>/i, '<title>Page Not Found | ' + escapeHtml(BRAND_NAME) + '</title>')
  .replace(/<meta\s+(?:name|property)="(?:description|keywords|robots|referrer|theme-color|author|geo\.[^"]+|ICBM|og:[^"]+|twitter:[^"]+)"[^>]*\/?>/gi, '')
  .replace(/<link\b[^>]*\brel="canonical"[^>]*\/?>/gi, '')
  .replace(/<script\b[^>]*data-site-structured-data="true"[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace('</head>', '    <meta name="robots" content="noindex, follow" />\n  </head>');
await writeFile(path.join(distDirectory, '404.html'), notFoundHtml, 'utf8');

// 2. Generate Search Engine Robots.txt
const robotsContent = [
  'User-agent: *',
  'Allow: /',
  'Disallow: /api/',
  '',
  `Sitemap: ${siteOrigin}/sitemap.xml`,
  '',
].join('\n');

await writeFile(path.join(distDirectory, 'robots.txt'), robotsContent, 'utf8');
await writeFile(path.join(publicDirectory, 'robots.txt'), robotsContent, 'utf8');

// 3. Generate XML Sitemap with Image Sitemap extensions
const sitemapUrlEntries = routes.map((route) => {
  const fullUrl = new URL(route.canonicalPath, siteOrigin).href;
  const imageUrl = new URL(route.image, siteOrigin).href;

  return [
    '  <url>',
    `    <loc>${escapeXml(fullUrl)}</loc>`,
    `    <changefreq>${route.changefreq || 'weekly'}</changefreq>`,
    `    <priority>${(route.priority || 0.8).toFixed(2)}</priority>`,
    '    <image:image>',
    `      <image:loc>${escapeXml(imageUrl)}</image:loc>`,
    `      <image:title>${escapeXml(route.title)}</image:title>`,
    '    </image:image>',
    '  </url>',
  ].join('\n');
}).join('\n');

const sitemapXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
  sitemapUrlEntries,
  '</urlset>',
  '',
].join('\n');

await writeFile(path.join(distDirectory, 'sitemap.xml'), sitemapXml, 'utf8');
await writeFile(path.join(publicDirectory, 'sitemap.xml'), sitemapXml, 'utf8');

console.log(`SEO: Successfully generated metadata and static HTML for ${routes.length} canonical routes.`);
console.log(`SEO: Generated rich sitemap.xml with image extensions at ${siteOrigin}/sitemap.xml.`);
console.log(`SEO: Updated robots.txt with sitemap reference.`);
