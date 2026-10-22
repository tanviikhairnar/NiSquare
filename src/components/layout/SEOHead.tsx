import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getOrganizationStructuredData, getSeoMetadata } from '../../data/seo';

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
    let siteOrigin = window.location.origin;
    try {
      if (import.meta.env.VITE_SITE_URL) siteOrigin = new URL(import.meta.env.VITE_SITE_URL).origin;
    } catch {
      siteOrigin = window.location.origin;
    }

    const canonicalUrl = new URL(page.canonicalPath, siteOrigin).href;
    const imageUrl = new URL(page.image, siteOrigin).href;
    document.title = page.title;
    setMeta('name', 'description', page.description);
    setMeta('name', 'robots', page.robots);
    setMeta('name', 'referrer', 'strict-origin-when-cross-origin');
    setMeta('name', 'author', 'NI Square Packaging');
    setMeta('name', 'theme-color', '#5b101e');
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', 'NI Square Packaging');
    setMeta('property', 'og:title', page.title);
    setMeta('property', 'og:description', page.description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', imageUrl);
    setMeta('property', 'og:image:alt', 'Thoughtful hampers and gifting by NI Square Packaging');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', page.title);
    setMeta('name', 'twitter:description', page.description);
    setMeta('name', 'twitter:image', imageUrl);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    let schema = document.head.querySelector<HTMLScriptElement>('script[data-site-structured-data="true"]');
    if (pathname === '/') {
      if (!schema) {
        schema = document.createElement('script');
        schema.type = 'application/ld+json';
        schema.dataset.siteStructuredData = 'true';
        document.head.appendChild(schema);
      }
      schema.textContent = JSON.stringify(getOrganizationStructuredData(siteOrigin)).replace(/</g, '\\u003c');
    } else if (schema) {
      schema.remove();
    }
  }, [pathname, search]);

  return null;
}

