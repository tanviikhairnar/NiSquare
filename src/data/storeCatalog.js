import { featuredDinnerSet, newArrivals, topPicks } from './products';

const uniqueByHref = new Map();
[...topPicks, ...newArrivals, featuredDinnerSet].forEach((product) => {
  uniqueByHref.set(product.href, product);
});

export const catalogProducts = [...uniqueByHref.values()];

export const storeCollections = [
  {
    title: 'Trousseau & Wedding Hampers', slug: 'trousseau-wedding-hampers', image: '/assets/images/image1.jpeg',
    description: 'Personal celebrations and wedding gifting.',
    subcategories: [
      { title: 'Trousseau', image: '/assets/images/image1.jpeg' },
      { title: 'Wedding Hampers', image: '/assets/images/WhatsApp Image 2026-10-11 at 21.52.02.jpeg' },
      { title: 'Baby Hampers', image: '/assets/images/WhatsApp Image 2026-10-11 at 16.05.17.jpeg' },
      { title: 'Room Hampers', image: '/assets/images/WhatsApp Image 2026-10-11 at 16.05.18 (1).jpeg' },
      { title: 'Bridesmaid Gifts', image: '/assets/images/WhatsApp Image 2026-10-11 at 21.52.04 (1).jpeg' },
    ],
  },
  {
    title: 'Return Favours', slug: 'return-favours', image: '/assets/images/WhatsApp Image 2026-10-11 at 16.05.18.jpeg',
    description: 'Gifts for guests and special occasions.',
    subcategories: [
      { title: 'Wedding Return Favours', image: '/assets/images/WhatsApp Image 2026-10-11 at 16.05.18.jpeg' },
      { title: 'Birthday Return Favours', image: '/assets/images/WhatsApp Image 2026-10-11 at 16.05.19.jpeg' },
      { title: 'Housewarming Favours', image: '/assets/images/WhatsApp Image 2026-10-11 at 21.52.00.jpeg' },
    ],
  },
  {
    title: 'Seasonal & Occasion Gifting', slug: 'seasonal-occasion-gifting', image: '/assets/images/WhatsApp Image 2026-10-11 at 16.05.19.jpeg',
    description: 'Thoughtful gifts for seasonal moments and personal milestones.',
    subcategories: [
      { title: 'Mother’s Day', image: '/assets/images/WhatsApp Image 2026-10-11 at 21.52.11.jpeg' },
      { title: 'Father’s Day', image: '/assets/images/WhatsApp Image 2026-10-11 at 21.52.04.jpeg' },
      { title: 'Valentine’s Day', image: '/assets/images/WhatsApp Image 2026-10-11 at 21.51.57.jpeg' },
      { title: 'Mom-to-be', image: '/assets/images/WhatsApp Image 2026-10-11 at 16.05.18 (2).jpeg' },
    ],
    note: 'More occasions can be added later.',
  },
  {
    title: 'Ring Platters', slug: 'ring-platters', image: '/assets/images/WhatsApp Image 2026-10-11 at 21.52.04.jpeg',
    description: 'A special presentation for the ring ceremony.',
    subcategories: [{ title: 'Ring Platters', image: '/assets/images/WhatsApp Image 2026-10-11 at 21.52.02.jpeg' }],
  },
  {
    title: 'Festive Hampers', slug: 'festive-hampers', image: '/assets/images/WhatsApp Image 2026-10-11 at 21.52.11.jpeg',
    description: 'Festival gifting hampers, thoughtfully put together.',
    subcategories: [{ title: 'Festival Gifting Hampers', image: '/assets/images/WhatsApp Image 2026-10-11 at 16.05.19.jpeg' }],
  },
{
    title: 'Corporate Hampers', slug: 'corporate-hampers', image: '/assets/images/WhatsApp Image 2026-10-11 at 21.52.17.jpeg',
    description: 'Corporate gifting hampers.',
    subcategories: [{ title: 'Corporate Gifting Hampers', image: '/assets/images/WhatsApp Image 2026-10-11 at 21.52.17.jpeg' }],
  },
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
