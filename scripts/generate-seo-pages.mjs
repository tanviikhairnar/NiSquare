import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { getOrganizationStructuredData, getSeoMetadata, getSeoRoutes } from '../src/data/seo.js';

const distDirectory = path.resolve('dist');
const template = await readFile(path.join(distDirectory, 'index.html'), 'utf8');
const configuredUrl = (process.env.VITE_SITE_URL || process.env.SITE_URL || '').trim();
let siteOrigin = '';

if (configuredUrl) {
  try {
    siteOrigin = new URL(configuredUrl).origin;
  } catch {
    console.warn('SEO: VITE_SITE_URL must be a full URL such as https://example.com. Canonical URLs and sitemap were skipped.');
  }
} else {
  console.warn('SEO: set VITE_SITE_URL in the production build environment to generate absolute canonical URLs and sitemap.xml.');
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeXml(value) {
  return escapeHtml(value).replace(/'/g, '&apos;');
}

function preparePage(route) {
  const metadata = getSeoMetadata(route.path);
  const imageUrl = siteOrigin ? new URL(metadata.image, siteOrigin).href : metadata.image;
  let html = template.replace(/<title>[\s\S]*?<\/title>/i, '<title>' + escapeHtml(metadata.title) + '</title>');
  html = html.replace(/<meta\s+(?:name|property)="(?:description|robots|referrer|theme-color|author|og:[^"]+|twitter:[^"]+)"[^>]*\/?>/gi, '');
  html = html.replace(/<link\b[^>]*\brel="canonical"[^>]*\/?>/gi, '');
  html = html.replace(/<script\b[^>]*data-site-structured-data="true"[^>]*>[\s\S]*?<\/script>/gi, '');

  const tags = [
    '<meta name="description" content="' + escapeHtml(metadata.description) + '" />',
    '<meta name="robots" content="' + escapeHtml(metadata.robots) + '" />',
    '<meta name="referrer" content="strict-origin-when-cross-origin" />',
    '<meta name="author" content="NI Square Packaging" />',
    '<meta name="theme-color" content="#5b101e" />',
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="NI Square Packaging" />',
    '<meta property="og:title" content="' + escapeHtml(metadata.title) + '" />',
    '<meta property="og:description" content="' + escapeHtml(metadata.description) + '" />',
    '<meta property="og:image" content="' + escapeHtml(imageUrl) + '" />',
    '<meta property="og:image:alt" content="Thoughtful hampers and gifting by NI Square Packaging" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    '<meta name="twitter:title" content="' + escapeHtml(metadata.title) + '" />',
    '<meta name="twitter:description" content="' + escapeHtml(metadata.description) + '" />',
    '<meta name="twitter:image" content="' + escapeHtml(imageUrl) + '" />',
  ];

  if (siteOrigin) {
    const canonicalUrl = new URL(metadata.canonicalPath, siteOrigin).href;
    tags.push('<link rel="canonical" href="' + escapeHtml(canonicalUrl) + '" />');
    tags.push('<meta property="og:url" content="' + escapeHtml(canonicalUrl) + '" />');
    if (route.path === '/') {
      const structuredData = JSON.stringify(getOrganizationStructuredData(siteOrigin)).replace(/</g, '\\u003c');
      tags.push('<script type="application/ld+json" data-site-structured-data="true">' + structuredData + '</script>');
    }
  }

  return html.replace('</head>', tags.join('\n    ') + '\n  </head>');
}

const routes = getSeoRoutes();
for (const route of routes) {
  const html = preparePage(route);
  const destination = route.path === '/'
    ? path.join(distDirectory, 'index.html')
    : path.join(distDirectory, route.path.slice(1), 'index.html');
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, html, 'utf8');
}

const robots = 'User-agent: *\nAllow: /\n' + (siteOrigin ? 'Sitemap: ' + siteOrigin + '/sitemap.xml\n' : '');
await writeFile(path.join(distDirectory, 'robots.txt'), robots, 'utf8');

if (siteOrigin) {
  const sitemapUrls = routes.map((route) => {
    const url = new URL(route.canonicalPath, siteOrigin).href;
    return '  <url><loc>' + escapeXml(url) + '</loc></url>';
  }).join('\n');
  const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    sitemapUrls + '\n</urlset>\n';
  await writeFile(path.join(distDirectory, 'sitemap.xml'), sitemap, 'utf8');
}

console.log('SEO: generated metadata for ' + routes.length + ' routes.');