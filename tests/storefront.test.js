import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { collectionPath, searchCollections, storeCollections, subcategoryPath } from '../src/data/storeCatalog.js';
import { buildWhatsAppEnquiryMessage, whatsappLink, WHATSAPP_FOUNDERS } from '../src/lib/whatsapp.js';

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

test('subcategory links use stable normalized anchors', () => {
  assert.equal(subcategoryPath('trousseau-wedding-hampers', 'Baby Hampers'), '/collections/trousseau-wedding-hampers#subcategory-baby-hampers');
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
