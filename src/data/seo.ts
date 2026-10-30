import { storeCollections, subcategorySlug } from './storeCatalog.ts';

// Set VITE_SITE_URL to the production origin when deploying. Until the custom
// domain is confirmed, Vercel's deployed URL is the canonical site origin.
export const DEFAULT_SITE_URL = 'https://ni-square.vercel.app';
export const BRAND_NAME = 'NI Square Packaging';

export interface SeoMetadata {
  title: string;
  description: string;
  image: string;
  canonicalPath: string;
  robots?: string;
  category?: string;
}

const home: SeoMetadata = {
  title: 'NI² Packaging | Luxury Gift & Wedding Trousseau Packaging | NI Square Packaging',
  description: 'Discover premium gift packaging, customized hampers, wedding trousseau packaging, and corporate gifting solutions from NI² Packaging. Explore our work and enquire about custom designs.',
  image: '/assets/images/optimized/hero-what-a-story-desktop.webp',
  canonicalPath: '/',
};

const pages: Record<string, { title: string; description: string; image: string }> = {
  '/pages/our-story': {
    title: 'Our Story & Founders | Nikita & Nikita | NI Square Packaging',
    description: 'Meet founders Nikita Kochar Ostwal (Interior Designer) & Nikita Anil Chordiya (Textile Designer). Discover the artisanal story behind NI Square.',
    image: '/assets/images/optimized/catalog/IMG_1167.webp',
  },
  '/pages/services': {
    title: 'Bespoke Packaging & Gifting Services | NI² Packaging',
    description: 'Personalised wedding hampers, customized packaging, trousseau trunks, and corporate gifting, designed around your occasion and preferences.',
    image: '/assets/images/optimized/catalog/IMG_3596.webp',
  },
  '/pages/contact': {
    title: 'Contact Founders on WhatsApp | Plan a Hamper | NI Square Packaging',
    description: 'Connect directly with our founders on WhatsApp to discuss your wedding, milestone, or corporate hamper ideas. Quick consultation & quotes.',
    image: '/assets/images/optimized/catalog/IMG_1167.webp',
  },
  '/policies/privacy-policy': {
    title: 'Privacy Policy | NI Square Packaging',
    description: 'Read how NI Square Packaging protects your personal data and handles information shared via website enquiries and WhatsApp.',
    image: '/assets/images/optimized/hero-what-a-story-desktop.webp',
  },
  '/policies/terms-of-service': {
    title: 'Terms & Conditions | Order & Delivery Policy | NI Square Packaging',
    description: 'Review our advance booking, payment terms, custom design approvals, transit guidelines, and cancellation policies.',
    image: '/assets/images/optimized/hero-what-a-story-desktop.webp',
  },
};

const collectionSeo: Record<string, { title: string; description: string; image: string }> = {
  'trousseau-wedding-hampers': {
    title: 'Wedding Hampers & Trousseau Packing | NI Square Packaging',
    description: 'Explore trousseau trunks, bride and groom hampers, and bridesmaid gifts designed for wedding celebrations.',
    image: '/assets/images/optimized/category-trousseau-card.webp',
  },
  'return-favours': {
    title: 'Wedding & Celebration Return Favours | Luxury Gift Packaging',
    description: 'Thoughtful return favours for weddings, milestones, and housewarmings. Customised around your theme, color palette, and guest count.',
    image: '/assets/images/optimized/catalog/IMG_4846.webp',
  },
  'seasonal-occasion-gifting': {
    title: 'Seasonal & Milestone Gift Hampers | NI Square Packaging',
    description: 'Celebrate Mother’s Day, Father’s Day, Valentine’s Day, baby announcements & personal milestones with bespoke curated hampers.',
    image: '/assets/images/optimized/catalog/IMG_2149.webp',
  },
  'ring-platters': {
    title: 'Designer Ring Ceremony Platters & Trays | NI Square Packaging',
    description: 'Handcrafted engagement and sagai ring platters styled with florals, velvets, and bespoke color themes for your ring exchange ceremony.',
    image: '/assets/images/optimized/ring-platters.webp',
  },
  'festive-hampers': {
    title: 'Festive Gift Hampers | Diwali & Celebration Packaging',
    description: 'Luxurious festive hampers curated with artisanal sweets, decor, dry fruits, and custom embellishments for family and corporate clients.',
    image: '/assets/images/optimized/category-festive-card.webp',
  },
  'corporate-hampers': {
    title: 'Executive Corporate Gift Hampers | NI² Packaging',
    description: 'Custom corporate hampers for employee recognition, clients, festive gifting, and events, with personalized finishing options.',
    image: '/assets/images/optimized/catalog/IMG_4949.webp',
  },
};

const aliases: Record<string, string> = {
  '/about': '/pages/our-story',
  '/services': '/pages/services',
  '/contact': '/pages/contact',
  '/pages/corporate-gifting': '/pages/services',
  '/pages/birth-announcement-gifts': '/pages/services',
};

export function getSeoMetadata(pathname: string): SeoMetadata {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') {
    return {
      ...home,
      robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    };
  }

  if (path === '/search') {
    return {
      title: 'Search Gifting Categories | NI Square Packaging',
      description: 'Search NI Square Packaging gifting categories, occasions, and custom hampers.',
      image: home.image,
      canonicalPath: '/search',
      robots: 'noindex, follow',
    };
  }

  if (path === '/collections' || path === '/work' || path === '/pages/work') {
    return { ...home, canonicalPath: '/', robots: 'noindex, follow' };
  }

  const canonicalPath = aliases[path] || path;
  if (pages[canonicalPath]) {
    return {
      ...pages[canonicalPath],
      canonicalPath,
      robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    };
  }

  const subcategoryMatch = path.match(/^\/collections\/([^/]+)\/([^/]+)$/);
  if (subcategoryMatch) {
    const category = storeCollections.find((item) => item.slug === subcategoryMatch[1]);
    const subcategory = category?.subcategories.find((item) => subcategorySlug(item.title) === subcategoryMatch[2]);
    if (category && subcategory) {
      return {
        title: `${subcategory.title} | ${category.title} | ${BRAND_NAME}`,
        description: `Explore handcrafted ${subcategory.title.toLowerCase()} gifting and packaging by NI Square Packaging, designed for celebrations and personal occasions.`,
        image: subcategory.galleryImages?.[0] || subcategory.image,
        canonicalPath: path,
        category: category.title,
        robots: 'index, follow, max-image-preview:large',
      };
    }
  }

  const collectionMatch = path.match(/^\/collections\/([^/]+)$/);
  if (collectionMatch) {
    const category = storeCollections.find((item) => item.slug === collectionMatch[1]);
    if (category) {
      const seo = collectionSeo[category.slug] || {
        title: `${category.title} | ${BRAND_NAME}`,
        description: category.description,
        image: category.image,
      };
      return {
        ...seo,
        canonicalPath: '/collections/' + category.slug,
        category: category.title,
        robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      };
    }
  }

  if (path.startsWith('/policies/')) {
    return {
      ...pages['/policies/terms-of-service'],
      canonicalPath: path,
      robots: 'index, follow',
    };
  }

  return {
    title: 'Page Not Found | ' + BRAND_NAME,
    description: 'The page you are looking for may have moved. Explore NI Square Packaging luxury hampers and gifting collections.',
    image: home.image,
    canonicalPath: path,
    robots: 'noindex, follow',
  };
}

export function getSeoRoutes(): Array<{ path: string; priority: number; changefreq: string } & SeoMetadata> {
  const routes: Array<{ path: string; priority: number; changefreq: string } & SeoMetadata> = [
    { path: '/', priority: 1.0, changefreq: 'weekly', ...getSeoMetadata('/') },
    { path: '/pages/our-story', priority: 0.8, changefreq: 'monthly', ...getSeoMetadata('/pages/our-story') },
    { path: '/pages/services', priority: 0.9, changefreq: 'weekly', ...getSeoMetadata('/pages/services') },
    { path: '/pages/contact', priority: 0.85, changefreq: 'monthly', ...getSeoMetadata('/pages/contact') },
    { path: '/policies/privacy-policy', priority: 0.4, changefreq: 'yearly', ...getSeoMetadata('/policies/privacy-policy') },
    { path: '/policies/terms-of-service', priority: 0.4, changefreq: 'yearly', ...getSeoMetadata('/policies/terms-of-service') },
  ];

  for (const category of storeCollections) {
    routes.push({
      path: '/collections/' + category.slug,
      priority: 0.85,
      changefreq: 'weekly',
      ...getSeoMetadata('/collections/' + category.slug),
    });

    for (const subcategory of category.subcategories) {
      const subPath = '/collections/' + category.slug + '/' + subcategorySlug(subcategory.title);
      routes.push({
        path: subPath,
        priority: 0.8,
        changefreq: 'weekly',
        ...getSeoMetadata(subPath),
      });
    }
  }

  return routes;
}

export function getOrganizationStructuredData(siteOrigin: string = DEFAULT_SITE_URL): object {
  const siteUrl = new URL('/', siteOrigin).href;
  const logoUrl = new URL('/assets/logo/ni-square-logo-cream.webp', siteOrigin).href;
  const imageUrl = new URL(home.image, siteOrigin).href;
  const organizationId = siteUrl + '#organization';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: BRAND_NAME,
        legalName: 'NI Square Packaging',
        url: siteUrl,
        logo: logoUrl,
        image: imageUrl,
        description: home.description,
        alternateName: ['NI² Packaging', 'NI Square'],
        sameAs: [
          'https://www.instagram.com/nisquarepackaging',
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+91-9673283594',
            contactType: 'customer service',
            areaServed: 'IN',
            availableLanguage: ['en', 'hi', 'mr'],
          },
          {
            '@type': 'ContactPoint',
            telephone: '+91-7083348221',
            contactType: 'customer service',
            areaServed: 'IN',
            availableLanguage: ['en', 'hi', 'mr'],
          },
        ],
        areaServed: [
          { '@type': 'City', name: 'Nashik' },
          { '@type': 'City', name: 'Pune' },
          { '@type': 'City', name: 'Mumbai' },
          { '@type': 'AdministrativeArea', name: 'Maharashtra' },
          { '@type': 'Country', name: 'India' },
        ],
        founder: [
          {
            '@type': 'Person',
            name: 'Nikita Kochar Ostwal',
            jobTitle: 'Interior Designer & Co-Founder',
          },
          {
            '@type': 'Person',
            name: 'Nikita Anil Chordiya',
            jobTitle: 'Textile Designer & Co-Founder',
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': siteUrl + '#website',
        url: siteUrl,
        name: BRAND_NAME,
        alternateName: ['NI² Packaging', 'NI Square'],
        description: home.description,
        publisher: { '@id': organizationId },
        inLanguage: 'en-IN',
      },
    ],
  };
}

export function getBreadcrumbStructuredData(pathname: string, siteOrigin: string = DEFAULT_SITE_URL): object | null {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return null;

  const siteUrl = new URL('/', siteOrigin).href.replace(/\/$/, '');
  const items: Array<{ '@type': 'ListItem'; position: number; name: string; item: string }> = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl + '/' },
  ];

  const subcategoryMatch = path.match(/^\/collections\/([^/]+)\/([^/]+)$/);
  if (subcategoryMatch) {
    const category = storeCollections.find((item) => item.slug === subcategoryMatch[1]);
    const subcategory = category?.subcategories.find((item) => subcategorySlug(item.title) === subcategoryMatch[2]);
    if (category && subcategory) {
      items.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Gifting Collections',
        item: `${siteUrl}/#home-categories`,
      });
      items.push({
        '@type': 'ListItem',
        position: 3,
        name: category.title,
        item: `${siteUrl}/collections/${category.slug}`,
      });
      items.push({
        '@type': 'ListItem',
        position: 4,
        name: subcategory.title,
        item: `${siteUrl}${path}`,
      });
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items,
      };
    }
  }

  const collectionMatch = path.match(/^\/collections\/([^/]+)$/);
  if (collectionMatch) {
    const category = storeCollections.find((item) => item.slug === collectionMatch[1]);
    if (category) {
      items.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Gifting Collections',
        item: `${siteUrl}/#home-categories`,
      });
      items.push({
        '@type': 'ListItem',
        position: 3,
        name: category.title,
        item: `${siteUrl}${path}`,
      });
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items,
      };
    }
  }

  return null;
}

export function getCollectionStructuredData(slug: string, siteOrigin: string = DEFAULT_SITE_URL): object | null {
  const category = storeCollections.find((item) => item.slug === slug);
  if (!category) return null;

  const siteUrl = new URL('/', siteOrigin).href.replace(/\/$/, '');
  const url = `${siteUrl}/collections/${category.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.title,
    description: category.description,
    url,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: category.subcategories.map((sub, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteUrl}/collections/${category.slug}/${subcategorySlug(sub.title)}`,
        name: sub.title,
        image: new URL(sub.image, siteOrigin).href,
      })),
    },
  };
}

export function getSubcategoryStructuredData(categorySlug: string, subcategoryTitle: string, siteOrigin: string = DEFAULT_SITE_URL): object | null {
  const category = storeCollections.find((item) => item.slug === categorySlug);
  const subcategory = category?.subcategories.find((item) => item.title.toLowerCase() === subcategoryTitle.toLowerCase());
  if (!category || !subcategory) return null;

  const siteUrl = new URL('/', siteOrigin).href.replace(/\/$/, '');
  const pageUrl = `${siteUrl}/collections/${category.slug}/${subcategorySlug(subcategory.title)}`;
  const imageUrls = [...new Set([subcategory.image, ...(subcategory.galleryImages || [])])]
    .map((image) => new URL(image, siteOrigin).href);

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${subcategory.title} | ${category.title}`,
    description: `Examples of handcrafted ${subcategory.title.toLowerCase()} gifting and packaging by ${BRAND_NAME}.`,
    url: pageUrl,
    isPartOf: {
      '@type': 'CollectionPage',
      name: category.title,
      url: `${siteUrl}/collections/${category.slug}`,
    },
    mainEntity: {
      '@type': 'ImageGallery',
      name: `${subcategory.title} gifting and packaging work`,
      image: imageUrls,
    },
  };
}

export function getPageStructuredData(pathname: string, siteOrigin: string = DEFAULT_SITE_URL): object[] {
  const path = pathname.replace(/\/+$/, '') || '/';
  const siteUrl = new URL('/', siteOrigin).href.replace(/\/$/, '');
  const schemas: object[] = [];

  // 1. Always provide breadcrumb if applicable
  const breadcrumbs = getBreadcrumbStructuredData(path, siteOrigin);
  if (breadcrumbs) schemas.push(breadcrumbs);

  // 2. Route-specific rich schemas
  if (path === '/') {
    schemas.push(getOrganizationStructuredData(siteOrigin));
  } else if (path === '/pages/services') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Custom Gifting & Bespoke Packaging Services',
      provider: {
        '@type': 'Organization',
        name: BRAND_NAME,
        url: siteUrl,
      },
      serviceType: 'Bespoke Wedding & Corporate Hamper Packaging',
      description: 'Handcrafted luxury hampers, bridal trousseau trunks, ring ceremony platters, and personalised corporate packaging.',
      areaServed: [
        { '@type': 'City', name: 'Nashik' },
        { '@type': 'City', name: 'Pune' },
        { '@type': 'City', name: 'Mumbai' },
        { '@type': 'AdministrativeArea', name: 'Maharashtra' },
        { '@type': 'Country', name: 'India' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'NI Square Packaging Services Catalog',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Custom-Made Gifting & Hampers',
              description: 'Made to order around your occasion, color theme, preferences, and budget.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Wedding Trousseau & Bridal Hamper Packaging',
              description: 'Designer bridal trunks, groom trousseau, and luxury wedding gift presentations.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Engagement & Sagai Ring Platters',
              description: 'Handcrafted ring ceremony trays styled with florals, velvets, and bespoke accents.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Wedding Return Favours & Keepsakes',
              description: 'Thoughtful return gifts tailored for wedding guests, milestones, and celebrations.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Corporate & Executive Gift Hampers',
              description: 'Curated corporate gifting for clients, teams, and festive occasions across Maharashtra.',
            },
          },
        ],
      },
    });
  } else if (path === '/pages/contact') {
    schemas.push(getOrganizationStructuredData(siteOrigin));
  } else {
    const subMatch = path.match(/^\/collections\/([^/]+)\/([^/]+)$/);
    if (subMatch) {
      const category = storeCollections.find((item) => item.slug === subMatch[1]);
      const subcategory = category?.subcategories.find((item) => subcategorySlug(item.title) === subMatch[2]);
      if (category && subcategory) {
        const subcategoryPage = getSubcategoryStructuredData(category.slug, subcategory.title, siteOrigin);
        if (subcategoryPage) schemas.push(subcategoryPage);
      }
    } else {
      const colMatch = path.match(/^\/collections\/([^/]+)$/);
      if (colMatch) {
        const col = getCollectionStructuredData(colMatch[1], siteOrigin);
        if (col) schemas.push(col);
      }
    }
  }

  return schemas;
}
