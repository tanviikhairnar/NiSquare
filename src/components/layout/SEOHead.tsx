import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BRAND_NAME, DEFAULT_SITE_URL, getPageStructuredData, getSeoMetadata } from '../../data/seo.ts';

function setMeta(attribute: string, key: string, value?: string): void {
  if (!value) return;
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', value);
}

export default function SEOHead(): null {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const page = getSeoMetadata(pathname);
    let siteOrigin = DEFAULT_SITE_URL;
    try {
      if (typeof window !== 'undefined' && window.location.origin) {
        siteOrigin = window.location.origin;
      }
      if (import.meta.env.VITE_SITE_URL) {
        siteOrigin = new URL(import.meta.env.VITE_SITE_URL).origin;
      }
    } catch {
      siteOrigin = DEFAULT_SITE_URL;
    }

    const canonicalUrl = new URL(page.canonicalPath, siteOrigin).href;
    const imageUrl = new URL(page.image, siteOrigin).href;

    document.title = page.title;
    setMeta('name', 'description', page.description);
    setMeta('name', 'robots', page.robots);
    setMeta('name', 'referrer', 'strict-origin-when-cross-origin');
    setMeta('name', 'author', BRAND_NAME);
    setMeta('name', 'theme-color', '#5b101e');

    // Geo & Local SEO Tags
    setMeta('name', 'geo.region', 'IN-MH');
    setMeta('name', 'geo.placename', 'Nashik, Maharashtra, India');
    setMeta('name', 'geo.position', '19.9975;73.7898');
    setMeta('name', 'ICBM', '19.9975, 73.7898');

    // Keywords
    if (page.keywords && page.keywords.length > 0) {
      setMeta('name', 'keywords', page.keywords.join(', '));
    }

    // OpenGraph Tags
    setMeta('property', 'og:type', pathname === '/' ? 'website' : 'article');
    setMeta('property', 'og:site_name', BRAND_NAME);
    setMeta('property', 'og:locale', 'en_IN');
    setMeta('property', 'og:title', page.title);
    setMeta('property', 'og:description', page.description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', imageUrl);
    setMeta('property', 'og:image:alt', `${page.title} - ${BRAND_NAME}`);

    // Twitter Card Tags
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', page.title);
    setMeta('name', 'twitter:description', page.description);
    setMeta('name', 'twitter:image', imageUrl);

    // Canonical link
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // Structured Data (JSON-LD)
    // Remove previous dynamic JSON-LD scripts
    document.head.querySelectorAll('script[data-site-structured-data="true"]').forEach((el) => el.remove());

    const schemas = getPageStructuredData(pathname, siteOrigin);
    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.siteStructuredData = 'true';
      script.dataset.schemaIndex = String(index);
      script.textContent = JSON.stringify(schema).replace(/</g, '\\u003c');
      document.head.appendChild(script);
    });
  }, [pathname, search]);

  return null;
}
