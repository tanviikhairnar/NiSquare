import { storeCollections, subcategorySlug } from './storeCatalog.ts';

export const DEFAULT_SITE_URL = 'https://nisquarepackaging.com';
export const BRAND_NAME = 'NI Square Packaging';

export interface SeoMetadata {
  title: string;
  description: string;
  image: string;
  canonicalPath: string;
  robots?: string;
  category?: string;
  keywords?: string[];
}

const home: SeoMetadata = {
  title: 'NI Square Packaging | Luxury Wedding & Corporate Hampers in Nashik, Pune & Mumbai',
  description: 'Handcrafted wedding hampers, trousseau packing, return favours, and bespoke corporate gifting in Nashik, Pune, Mumbai. Designed with love by two founders.',
  image: '/assets/images/optimized/hero-trousseau-curation-desktop.webp',
  canonicalPath: '/',
  keywords: [
    'wedding hampers Nashik',
    'trousseau packing Pune',
    'wedding trousseau Mumbai',
    'luxury wedding hampers',
    'return favours India',
    'custom gift hampers',
    'bespoke gifting Pune',
    'corporate hampers Mumbai',
    'Jain wedding hampers',
    'Marwari wedding packaging',
    'Sindhi wedding gifting',
  ],
};

const pages: Record<string, { title: string; description: string; image: string; keywords?: string[] }> = {
  '/pages/our-story': {
    title: 'Our Story & Founders | Nikita & Nikita | NI Square Packaging',
    description: 'Meet founders Nikita Kochar Ostwal (Interior Designer) & Nikita Anil Chordiya (Textile Designer). Discover the artisanal story behind NI Square.',
    image: '/assets/images/optimized/catalog/IMG_1167.webp',
    keywords: ['NI Square founders', 'Nikita Kochar Ostwal', 'Nikita Anil Chordiya', 'boutique packaging studio'],
  },
  '/pages/services': {
    title: 'Bespoke Packaging & Gifting Services | Nashik, Pune & Mumbai',
    description: 'Personalised wedding hampers, customized packaging, trousseau trunks, and executive corporate orders. Hand-finished details across Maharashtra.',
    image: '/assets/images/optimized/catalog/IMG_3596.webp',
    keywords: ['wedding gifting services', 'custom hamper design', 'corporate gifting services Pune', 'trousseau packing services'],
  },
  '/pages/contact': {
    title: 'Contact Founders on WhatsApp | Plan a Hamper | NI Square Packaging',
    description: 'Connect directly with our founders on WhatsApp to discuss your wedding, milestone, or corporate hamper ideas. Quick consultation & quotes.',
    image: '/assets/images/optimized/catalog/IMG_1167.webp',
    keywords: ['contact NI Square', 'WhatsApp hamper order', 'plan a wedding hamper', 'gift consultation'],
  },
  '/policies/privacy-policy': {
    title: 'Privacy Policy | NI Square Packaging',
    description: 'Read how NI Square Packaging protects your personal data and handles information shared via website enquiries and WhatsApp.',
    image: '/assets/images/optimized/hero-trousseau-curation-desktop.webp',
  },
  '/policies/terms-of-service': {
    title: 'Terms & Conditions | Order & Delivery Policy | NI Square Packaging',
    description: 'Review our advance booking, payment terms, custom design approvals, transit guidelines, and cancellation policies.',
    image: '/assets/images/optimized/hero-trousseau-curation-desktop.webp',
  },
};

const collectionSeo: Record<string, { title: string; description: string; image: string; keywords?: string[] }> = {
  'trousseau-wedding-hampers': {
    title: 'Wedding Hampers & Trousseau Packing | NI Square Packaging',
    description: 'Exquisite trousseau trunks, bride & groom hampers, and bridesmaid gifts for Jain, Marwari & Sindhi weddings across Nashik, Pune & Mumbai.',
    image: '/assets/images/optimized/category-trousseau-card.webp',
    keywords: ['trousseau packing', 'wedding hampers', 'bridesmaid hampers', 'room hampers wedding', 'trousseau trunks'],
  },
  'return-favours': {
    title: 'Wedding & Celebration Return Favours | Luxury Gift Packaging',
    description: 'Thoughtful return favours for weddings, milestones, and housewarmings. Customised around your theme, color palette, and guest count.',
    image: '/assets/images/optimized/catalog/IMG_4846.webp',
    keywords: ['wedding return favours', 'return gifts Pune', 'birthday favours', 'housewarming favours'],
  },
  'seasonal-occasion-gifting': {
    title: 'Seasonal & Milestone Gift Hampers | NI Square Packaging',
    description: 'Celebrate Mother’s Day, Father’s Day, Valentine’s Day, baby announcements & personal milestones with bespoke curated hampers.',
    image: '/assets/images/optimized/catalog/IMG_2149.webp',
    keywords: ['mothers day hampers', 'fathers day gift', 'baby shower hampers', 'valentines day gift box'],
  },
  'ring-platters': {
    title: 'Designer Ring Ceremony Platters & Trays | NI Square Packaging',
    description: 'Handcrafted engagement and sagai ring platters styled with florals, velvets, and bespoke color themes for your ring exchange ceremony.',
    image: '/assets/images/optimized/category-ring-platter-card.webp',
    keywords: ['ring ceremony platter', 'engagement tray design', 'sagai ring platter', 'custom ring box'],
  },
  'festive-hampers': {
    title: 'Festive Gift Hampers | Diwali & Celebration Packaging',
    description: 'Luxurious festive hampers curated with artisanal sweets, decor, dry fruits, and custom embellishments for family and corporate clients.',
    image: '/assets/images/optimized/category-festive-card.webp',
    keywords: ['Diwali hampers Nashik', 'festive gifting Mumbai', 'luxury holiday hampers', 'festive gift boxes'],
  },
  'corporate-hampers': {
    title: 'Executive Corporate Gift Hampers | Nashik, Pune & Mumbai',
    description: 'Custom corporate hampers for employee recognition, clients, festive gifting, and events. Custom branding and prompt pan-Maharashtra dispatch.',
    image: '/assets/images/optimized/catalog/IMG_4949.webp',
    keywords: ['corporate gifting Pune', 'client hampers Mumbai', 'executive gift boxes', 'corporate gifts Nashik'],
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
        description: `Bespoke handcrafted ${subcategory.title.toLowerCase()} by NI Square Packaging. Custom designed for celebrations in Nashik, Pune, Mumbai & pan-India.`,
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
        description: `${category.description} Hand-finished luxury packaging made in Nashik District.`,
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
  const localBusinessId = siteUrl + '#localbusiness';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'ProfessionalService'],
        '@id': localBusinessId,
        name: BRAND_NAME,
        legalName: 'NI Square Packaging',
        url: siteUrl,
        logo: { '@type': 'ImageObject', url: logoUrl, width: '400', height: '120' },
        image: imageUrl,
        description: home.description,
        telephone: '+919673283594',
        email: 'info@nisquarepackaging.com',
        priceRange: '₹₹₹',
        currenciesAccepted: 'INR',
        paymentAccepted: 'UPI, Net Banking, Advance Payment',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Boutique Studio, Nashik Road',
          addressLocality: 'Nashik',
          addressRegion: 'Maharashtra',
          postalCode: '422001',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 19.9975,
          longitude: 73.7898,
        },
        areaServed: [
          { '@type': 'City', name: 'Nashik' },
          { '@type': 'City', name: 'Pune' },
          { '@type': 'City', name: 'Mumbai' },
          { '@type': 'AdministrativeArea', name: 'Maharashtra' },
          { '@type': 'Country', name: 'India' },
        ],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '10:00',
            closes: '19:00',
          },
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
        sameAs: [
          'https://www.instagram.com/nisquarepackaging/',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': siteUrl + '#website',
        url: siteUrl,
        name: BRAND_NAME,
        publisher: { '@id': organizationId },
        inLanguage: 'en-IN',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteUrl}search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
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

  if (path === '/pages/our-story') {
    items.push({ '@type': 'ListItem', position: 2, name: 'Our Story', item: `${siteUrl}/pages/our-story` });
    return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items };
  }

  if (path === '/pages/services') {
    items.push({ '@type': 'ListItem', position: 2, name: 'Services', item: `${siteUrl}/pages/services` });
    return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items };
  }

  if (path === '/pages/contact') {
    items.push({ '@type': 'ListItem', position: 2, name: 'Contact', item: `${siteUrl}/pages/contact` });
    return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items };
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
        '@type': 'LocalBusiness',
        name: BRAND_NAME,
      },
      serviceType: 'Bespoke Wedding & Corporate Hamper Packaging',
      areaServed: ['Nashik', 'Pune', 'Mumbai', 'Maharashtra'],
      description: 'Handcrafted luxury hampers, trousseau trunks, ring platters, and personalised packaging.',
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
