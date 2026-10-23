import React from 'react';
import { Link } from 'react-router-dom';
import WhatsAppContactLink from '../WhatsAppContactLink';
import { SolidLocationPinIcon, SolidPhoneIcon } from '../common/Icons';
import { storeCollections } from '../../data/storeCatalog';
import { WHATSAPP_FOUNDERS } from '../../lib/whatsapp';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterGroup {
  title: string;
  className?: string;
  links: FooterLink[];
}

const groups: FooterGroup[] = [
  {
    title: 'Gifting categories',
    className: 'footer-category-links',
    links: storeCollections.map((collection) => ({
      label: collection.title,
      href: '/collections/' + collection.slug,
    })),
  },
  {
    title: 'Explore',
    links: [
      { label: 'Our story', href: '/pages/our-story' },
      { label: 'Services', href: '/pages/services' },
      { label: 'All gifting categories', href: '/collections' },
    ],
  },
  {
    title: 'Information',
    links: [
      { label: 'Privacy policy', href: '/policies/privacy-policy' },
      { label: 'Terms & Conditions', href: '/policies/terms-of-service' },
    ],
  },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-about">
          <Link className="footer-brand" to="/">
            <img src="/assets/logo/ni-square-logo-cream.webp" alt="NI Square Packaging" />
          </Link>
          <h2>About</h2>
          <p>Explore our gifting categories, then connect with our founders on WhatsApp to plan a hamper around your occasion and preferences.</p>
          <WhatsAppContactLink
            className="footer-whatsapp-link"
            message="Hi, I would like to explore your gifting categories and plan a hamper."
          >
            Plan a hamper
          </WhatsAppContactLink>
        </div>
        <div className="footer-contact">
          <h2>Contact</h2>
          <address className="footer-contact-address">
            <SolidLocationPinIcon />
            <span>Nashik District, Maharashtra, India</span>
          </address>
          <div className="footer-founder-contacts">
            {WHATSAPP_FOUNDERS.map((founder) => (
              <a
                className="footer-founder-contact"
                href={'tel:+91' + founder.phone}
                aria-label={'Call ' + founder.name + ' at +91 ' + founder.phone}
                key={founder.phone}
              >
                <SolidPhoneIcon />
                <span>
                  <span>{founder.name}</span>
                  <strong>+91 {founder.phone.slice(0, 5)} {founder.phone.slice(5)}</strong>
                </span>
              </a>
            ))}
          </div>
        </div>
        {groups.map((group) => (
          <nav
            className={'footer-links ' + (group.className || '')}
            aria-label={group.title}
            key={group.title}
          >
            <h2>{group.title}</h2>
            {group.links.map((link) => (
              <Link to={link.href} key={link.href}>{link.label}</Link>
            ))}
          </nav>
        ))}
      </div>
      <div className="footer-bottom">
        <span>&copy; {currentYear} NI Square Packaging</span>
        <span>Thoughtful gifting, planned personally.</span>
      </div>
    </footer>
  );
}

