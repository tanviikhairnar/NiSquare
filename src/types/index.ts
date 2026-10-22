export interface GalleryVideo {
  src: string;
  poster: string;
}

export interface Subcategory {
  title: string;
  image: string;
  workImages?: string[];
  galleryImages?: string[];
  galleryPreviewImages?: string[];
  galleryVideos?: GalleryVideo[];
}

export interface Collection {
  title: string;
  slug: string;
  image: string;
  description: string;
  subcategories: Subcategory[];
  note?: string;
}

export interface DropdownItem {
  label: string;
  path: string;
}

export interface MegaMenuColumn {
  heading: string;
  headingPath: string;
  items: DropdownItem[];
}

export interface NavLink {
  label: string;
  path: string;
  hasMegaMenu?: boolean;
  megaMenu?: MegaMenuColumn[];
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

export interface SiteHeaderConfig {
  brandName: string;
  logoImage: string;
  logoAlt: string;
  navLinks: NavLink[];
}

export interface Founder {
  name: string;
  role: string;
  phone: string;
}

export interface WhatsAppFormData {
  fullName: string;
  category: string;
  eventDate: string;
  requirements: string;
}

export interface WhatsAppModalOptions {
  message?: string;
  founderPhone?: string;
  initialCategory?: string;
  initialRequirements?: string;
}

export interface WhatsAppModalContextValue {
  openWhatsAppModal: (options?: WhatsAppModalOptions) => void;
  closeWhatsAppModal: () => void;
  isOpen: boolean;
}

export interface SearchResultItem {
  type: string;
  title: string;
  subtitle: string;
  href: string;
  image: string;
}
