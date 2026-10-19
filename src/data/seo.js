import { storeCollections } from './storeCatalog.js';

const brand = 'NI Square Packaging';
const home = {
  title: 'Wedding and Corporate Hampers | NI Square Packaging',
  description: 'Handcrafted wedding hampers, Jain, Marwari and Sindhi wedding gifting, return favours and corporate gifts for Nashik, Pune and Mumbai.',
  image: '/assets/images/optimized/hero-what-a-story-desktop.jpg',
  canonicalPath: '/',
};

const pages = {
  '/collections': {
    title: 'Custom Gift Hampers and Favours | NI Square Packaging',
    description: 'Explore handcrafted wedding hampers, trousseau gifts, return favours, festive gifting and corporate hampers made around your occasion.',
    image: '/assets/images/optimized/hero-what-a-story-desktop.jpg',
  },
  '/pages/our-story': {
    title: 'Our Story and Founders | NI Square Packaging',
    description: 'Meet the two founders behind NI Square Packaging and discover their thoughtful approach to custom hampers and personalised gifting.',
    image: '/assets/images/optimized/hero-what-a-story-desktop.jpg',
  },
  '/pages/services': {
    title: 'Wedding and Corporate Gifting in Nashik, Pune and Mumbai',
    description: 'Plan personalised wedding hampers and corporate gifts for teams, clients and events across Nashik, Pune and Mumbai.',
    image: '/assets/images/optimized/catalog/IMG_3596.webp',
  },
  '/pages/contact': {
    title: 'Contact NI Square Packaging | Plan a Custom Hamper',
    description: 'Contact the NI Square founders to plan a custom wedding hamper, return favour, festive gift or corporate order.',
    image: '/assets/images/optimized/hero-what-a-story-desktop.jpg',
  },
  '/policies/privacy-policy': {
    title: 'Privacy Policy | NI Square Packaging',
    description: 'Read how NI Square Packaging uses and protects information shared through website enquiries and WhatsApp.',
    image: '/assets/images/optimized/hero-what-a-story-desktop.jpg',
  },
  '/policies/terms-of-service': {
    title: 'Terms and Conditions | NI Square Packaging',
    description: 'Review NI Square Packaging order, custom design, cancellation, delivery and damage claim terms.',
    image: '/assets/images/optimized/hero-what-a-story-desktop.jpg',
  },
};

const collectionSeo = {
  'trousseau-wedding-hampers': {
    title: 'Wedding Hampers and Trousseau Gifts | NI Square Packaging',
    description: 'Custom wedding hampers, trousseau gifts and wedding favours for Jain, Marwari and Sindhi celebrations in Nashik, Pune and Mumbai.',
    image: '/assets/images/optimized/catalog/IMG_1167.webp',
  },
  'return-favours': {
    title: 'Wedding and Celebration Return Favours | NI Square Packaging',
    description: 'Thoughtful wedding, birthday and celebration return favours, planned around your guests, theme and budget.',
    image: '/assets/images/optimized/catalog/IMG_4846.webp',
  },
  'seasonal-occasion-gifting': {
    title: 'Seasonal and Occasion Gift Hampers | NI Square Packaging',
    description: 'Explore handcrafted gift hampers for festivals, birthdays, family milestones and other special occasions.',
    image: '/assets/images/optimized/catalog/IMG_4949.webp',
  },
  'ring-platters': {
    title: 'Custom Ring Ceremony Platters | NI Square Packaging',
    description: 'Make the ring ceremony personal with a custom platter styled around your wedding colours and celebration.',
    image: '/assets/images/optimized/catalog/chocolate-khoncha-table.webp',
  },
  'festive-hampers': {
    title: 'Festive Gift Hampers | NI Square Packaging',
    description: 'Personalised festive hampers for family, clients and teams, thoughtfully packed for the season.',
    image: '/assets/images/optimized/catalog/IMG_4949.webp',
  },
  'corporate-hampers': {
    title: 'Corporate Gift Hampers in Nashik, Pune and Mumbai',
    description: 'Custom corporate gift hampers for employees, clients and office events in Nashik, Pune and Mumbai.',
    image: '/assets/images/optimized/catalog/IMG_3596.webp',
  },
};

const aliases = {
  '/about': '/pages/our-story',
  '/services': '/pages/services',
  '/pages/work': '/pages/services',
  '/work': '/collections',
  '/contact': '/pages/contact',
  '/pages/corporate-gifting': '/pages/services',
  '/pages/birth-announcement-gifts': '/pages/services',
};

export function getSeoMetadata(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return { ...home, robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' };

  if (path === '/search') {
    return {
      title: 'Search Gifting Categories | NI Square Packaging',
      description: 'Search NI Square Packaging gifting categories and occasions.',
      image: home.image,
      canonicalPath: '/search',
      robots: 'noindex, follow',
    };
  }

  const canonicalPath = aliases[path] || path;
  if (pages[canonicalPath]) {
    return { ...pages[canonicalPath], canonicalPath, robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' };
  }

  const collectionMatch = path.match(/^\/collections\/([^/]+)$/);
  if (collectionMatch) {
    const category = storeCollections.find((item) => item.slug === collectionMatch[1]);
    if (category) {
      const seo = collectionSeo[category.slug] || {
        title: category.title + ' | ' + brand,
        description: category.description + ' Thoughtfully made in Nashik District.',
        image: category.image,
      };
      return { ...seo, canonicalPath: '/collections/' + category.slug, robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' };
    }
  }

  if (path.startsWith('/policies/')) {
    return { ...pages['/policies/terms-of-service'], canonicalPath: path, robots: 'index, follow' };
  }

  return {
    title: 'Page not found | ' + brand,
    description: 'The page you are looking for may have moved. Explore NI Square Packaging hampers and gifting categories.',
    image: home.image,
    canonicalPath: path,
    robots: 'noindex, follow',
  };
}

export function getSeoRoutes() {
  const paths = [
    '/',
    '/collections',
    '/pages/our-story',
    '/pages/services',
    '/pages/contact',
    '/policies/privacy-policy',
    '/policies/terms-of-service',
    ...storeCollections.map((category) => '/collections/' + category.slug),
  ];
  return paths.map((path) => ({ path, ...getSeoMetadata(path) }));
}

export function getOrganizationStructuredData(siteOrigin) {
  const siteUrl = new URL('/', siteOrigin).href;
  const logoUrl = new URL('/assets/logo/ni-square-logo-cream.png', siteOrigin).href;
  const imageUrl = new URL(home.image, siteOrigin).href;
  const organizationId = siteUrl + '#organization';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: brand,
        url: siteUrl,
        logo: { '@type': 'ImageObject', url: logoUrl },
        image: imageUrl,
        description: home.description,
        sameAs: ['https://www.instagram.com/nisquarepackaging/'],
        founder: [
          { '@type': 'Person', name: 'Nikita Kochar Ostwal' },
          { '@type': 'Person', name: 'Nikita Anil Chordiya' },
        ],
        areaServed: ['Nashik', 'Pune', 'Mumbai'].map((name) => ({ '@type': 'City', name })),
        contactPoint: [
          { '@type': 'ContactPoint', telephone: '+919673283594', contactType: 'customer service' },
          { '@type': 'ContactPoint', telephone: '+917083348221', contactType: 'customer service' },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': siteUrl + '#website',
        url: siteUrl,
        name: brand,
        publisher: { '@id': organizationId },
        inLanguage: 'en-IN',
      },
    ],
  };
}