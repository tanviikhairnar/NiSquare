import type { MegaMenuColumn, SiteHeaderConfig } from '../types/index.ts';
import { storeCollections, subcategoryPath } from './storeCatalog.ts';

const giftingMenu: MegaMenuColumn[] = storeCollections.map((collection) => ({
  heading: collection.title,
  headingPath: '/collections/' + collection.slug,
  items: collection.subcategories.map((subcategory) => ({
    label: subcategory.title,
    path: subcategoryPath(collection.slug, subcategory.title),
  })),
}));

export const siteHeader: SiteHeaderConfig = {
  brandName: 'NI Square Packaging',
  logoImage: '/assets/logo/ni-square-logo-cream.webp',
  logoAlt: 'NI Square Packaging',
  navLinks: [
    { label: 'Home', path: '/' },
    {
      label: 'Gifting',
      path: '/collections',
      hasMegaMenu: true,
      megaMenu: giftingMenu,
    },
    { label: 'Our Story', path: '/pages/our-story' },
    { label: 'Services', path: '/pages/services' },
    { label: 'Contact', path: '/pages/contact' },
  ],
};

export const heroContent = {
  subtitle: 'NI Square Packaging',
  title: 'From our hands to your loved ones, with love.',
  ctaText: 'Plan a hamper',
};
