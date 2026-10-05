import { featuredDinnerSet, newArrivals, topPicks } from './products';

const uniqueByHref = new Map();
[...topPicks, ...newArrivals, featuredDinnerSet].forEach((product) => {
  uniqueByHref.set(product.href, product);
});

export const catalogProducts = [...uniqueByHref.values()];

export const storeCollections = [
  { title: 'Tableware', slug: 'tableware', image: 'https://www.studio13.co.in/cdn/shop/files/tableware.jpg?v=1683441484&width=1200', description: 'Pieces for gathering, serving, and everyday rituals.' },
  { title: 'Collections', slug: 'collections', image: 'https://www.studio13.co.in/cdn/shop/files/full-collection_927b913c-43f3-4103-90a0-fc8ed4a30727.jpg?v=1717495993&width=1200', description: 'Explore products across our collections.' },
  { title: 'Stationery', slug: 'all-stationery', image: 'https://www.studio13.co.in/cdn/shop/files/stationerynavy2.jpg?v=1695884131&width=1200', description: 'Thoughtful paper goods and keepsakes.' },
  { title: 'Gifting', slug: 'gifting', image: 'https://www.studio13.co.in/cdn/shop/files/box1_96a6c2d3-7c09-4621-9f7c-e9d7053954d9.jpg?v=1763449735&width=1200', description: 'Personal gifts and ready-to-give sets.' },
];

const matches = (product, expression) => expression.test(product.name);

export function getCollectionProducts(handle = '') {
  const key = decodeURIComponent(handle).toLowerCase();
  if (key === 'bestsellers' || key === 'best-sellers') return topPicks;
  if (key === 'new-arrivals') return newArrivals;
  if (key === 'collections' || key === 'tableware' || key === 'dining' || key === 'sets' || key === 'cutlery' || key === 'dessert-cups' || key === 'mugs-cups') {
    return catalogProducts.filter((product) => !matches(product, /stationery/i));
  }
  if (key.includes('kid') || key === 'childrens') return catalogProducts.filter((product) => matches(product, /children|kids|safari|solar system|adventure|under the sea/i));
  if (key.includes('gift') || key.includes('candle')) return catalogProducts.filter((product) => matches(product, /gift|candle|happiness box/i));
  if (key.includes('stationery')) return [];
  const collectionName = key.replace(/-/g, ' ');
  const collectionResults = catalogProducts.filter((product) => product.name.toLowerCase().includes(collectionName));
  return collectionResults;
}

export function getProductByHandle(handle = '') {
  const key = decodeURIComponent(handle).toLowerCase();
  return catalogProducts.find((product) => product.href.split('/').filter(Boolean).at(-1) === key)
    || catalogProducts.find((product) => product.id === key)
    || null;
}

export function searchProducts(query = '') {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [];
  return catalogProducts.filter((product) => `${product.name} ${product.id}`.toLowerCase().includes(normalizedQuery));
}

export const formatPrice = (price) => `Rs. ${Number(price || 0).toLocaleString('en-IN')}.00`;
