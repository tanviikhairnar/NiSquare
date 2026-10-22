import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { collectionPath, searchCollections, storeCollections, subcategoryPath } from '../src/data/storeCatalog.ts';
import { buildWhatsAppEnquiryMessage, whatsappLink, WHATSAPP_FOUNDERS } from '../src/lib/whatsapp.ts';

test('catalog collections have unique valid routes and local images', () => {
  const slugs = storeCollections.map(({ slug }) => slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const collection of storeCollections) {
    assert.equal(collectionPath(collection.slug), '/collections/' + collection.slug);
    for (const image of [collection.image, ...collection.subcategories.map(({ image: itemImage }) => itemImage)]) {
      assert.ok(existsSync(resolve('public', image.slice(1))), 'missing catalog image: ' + image);
    }
  }
});

test('subcategory links use stable normalized routes', () => {
  assert.equal(subcategoryPath('trousseau-wedding-hampers', 'Baby Hampers'), '/collections/trousseau-wedding-hampers/baby-hampers');
});

test('catalog search trims and matches case-insensitively', () => {
  assert.ok(searchCollections('  RING PLATTERS  ').some(({ href }) => href === '/collections/ring-platters'));
  assert.deepEqual(searchCollections('   '), []);
});

test('enquiry message includes required details and omits empty optional fields', () => {
  const result = buildWhatsAppEnquiryMessage('Plan a hamper', { fullName: '  Asha Rao ', email: '', category: 'Festive Hampers', eventDate: '', requirements: '  Gold and ivory  ' });
  assert.equal(result, 'Plan a hamper\nFull Name: Asha Rao\nCategory: Festive Hampers\nMessage or Custom Requirements: Gold and ivory');
});

test('WhatsApp links encode messages and founder numbers', () => {
  const message = 'Hello there\nI need a hamper & card';
  const link = new URL(whatsappLink(message, WHATSAPP_FOUNDERS[1].phone));
  assert.equal(link.pathname, '/91' + WHATSAPP_FOUNDERS[1].phone);
  assert.equal(link.searchParams.get('text'), message);
});

test('storeCatalog schema validation conforms to collection contracts', () => {
  for (const collection of storeCollections) {
    assert.ok(typeof collection.title === 'string' && collection.title.length > 0);
    assert.ok(typeof collection.slug === 'string' && collection.slug.length > 0);
    assert.ok(typeof collection.description === 'string' && collection.description.length > 0);
    assert.ok(Array.isArray(collection.subcategories) && collection.subcategories.length > 0);
    for (const sub of collection.subcategories) {
      assert.ok(typeof sub.title === 'string' && sub.title.length > 0);
      assert.ok(typeof sub.image === 'string' && sub.image.length > 0);
      if (sub.galleryImages) assert.ok(Array.isArray(sub.galleryImages));
      if (sub.galleryVideos) assert.ok(Array.isArray(sub.galleryVideos));
    }
  }
});

test('modularized pages and common components are structurally exported', async () => {
  const { readFileSync } = await import('node:fs');
  const modularFiles = [
    { path: 'src/pages/CollectionsPage.tsx', exportMatch: /export default function CollectionsPage/ },
    { path: 'src/pages/CollectionPage.tsx', exportMatch: /export default function CollectionPage/ },
    { path: 'src/pages/SubcategoryPage.tsx', exportMatch: /export default function SubcategoryPage/ },
    { path: 'src/pages/SearchPage.tsx', exportMatch: /export default function SearchPage/ },
    { path: 'src/pages/StoryPage.tsx', exportMatch: /export default function StoryPage/ },
    { path: 'src/pages/ServicesPage.tsx', exportMatch: /export default function ServicesPage/ },
    { path: 'src/pages/ContactPage.tsx', exportMatch: /export default function ContactPage/ },
    { path: 'src/pages/PolicyPage.tsx', exportMatch: /export default function PolicyPage/ },
    { path: 'src/pages/NotFoundPage.tsx', exportMatch: /export default function NotFoundPage/ },
    { path: 'src/components/common/PageTitle.tsx', exportMatch: /export default function PageTitle/ },
    { path: 'src/components/common/Breadcrumbs.tsx', exportMatch: /export default function Breadcrumbs/ },
    { path: 'src/context/WhatsAppModalProvider.tsx', exportMatch: /export default function WhatsAppModalProvider/ },
  ];

  for (const file of modularFiles) {
    const fullPath = resolve(file.path);
    assert.ok(existsSync(fullPath), `Missing modular file: ${file.path}`);
    const content = readFileSync(fullPath, 'utf-8');
    assert.ok(file.exportMatch.test(content), `Missing default export in ${file.path}`);
  }

  const { useWhatsAppModal } = await import('../src/context/useWhatsAppModal.ts');
  assert.equal(typeof useWhatsAppModal, 'function');
});

