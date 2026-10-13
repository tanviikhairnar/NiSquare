import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import WhatsAppContactLink from '../WhatsAppContactLink';
import { siteHeader } from '../../data/siteContent';
import MobileMenu from './MobileMenu';
import SearchDialog from './SearchDialog';

export default function Header({ config = siteHeader }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';


  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { brandName = 'NI Square Packaging', logoImage = '', logoAlt = 'NI Square Packaging', navLinks = [] } = config;

  return (
    <div className={`header-wrapper ${isSticky ? 'is-sticky' : ''} ${isHome ? '' : 'is-solid'}`}>
      <header className="site-header">
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="hamburger-btn"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Brand Logo (Left) */}
        <div className="header-logo">
          <Link to="/" className="header-logo-link" aria-label={brandName}>
            {logoImage ? (
              <img
                src={logoImage}
                alt={logoAlt || brandName}
                className="header-logo-image"
              />
            ) : (
              <span className="header-logo-text"><span>NI Square</span><small>PACKAGING</small></span>
            )}
          </Link>
        </div>

        {/* Primary Navigation (Center) */}
        <nav className="header-primary-nav" aria-label="Main navigation">
          <ul className="desktop-nav-list">
            {navLinks.map((item) => {
              if (item.hasMegaMenu) {
                return (
                  <li key={item.label} className="nav-item">
                    <a href={item.path} className="nav-link">
                      {item.label}
                    </a>
                    {/* Mega Menu Dropdown */}
                    <div className="mega-menu">
                      <div className="mega-menu-inner">
                        {item.megaMenu?.map((col) => (
                          <div key={col.heading} className="mega-column">
                            <h4 className="mega-column-title"><a href={col.headingPath}>{col.heading}</a></h4>
                            <ul className="mega-sublist">
                              {col.items?.map((sub) => (
                                <li key={sub.label}>
                                  <a href={sub.path} className="mega-sublink">
                                    {sub.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              }

              if (item.hasDropdown) {
                return (
                  <li key={item.label} className="nav-item">
                    <a href={item.path} className="nav-link">
                      {item.label}
                    </a>
                    {/* Standard Dropdown */}
                    <div className="dropdown-menu">
                      <ul className="dropdown-list">
                        {item.dropdownItems?.map((sub) => (
                          <li key={sub.label}>
                            <a href={sub.path} className="dropdown-item-link">
                              {sub.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.label} className="nav-item">
                  <a href={item.path} className="nav-link">
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Secondary Navigation Icons (Right) */}
        <div className="header-secondary-nav" aria-label="User navigation">
          {/* Search Icon */}
          <button type="button" className="header-icon-btn" aria-label="Search" onClick={() => setIsSearchOpen(true)}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg></button>

          <WhatsAppContactLink className="header-icon-btn header-whatsapp-link" message="Hi, I would like to plan a hamper.">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.4 11.7a8.2 8.2 0 0 1-12.1 7.2L4 20l1.1-4.1a8.2 8.2 0 1 1 15.3-4.2Z" />
              <path d="M9 8.6c.2-.4.4-.4.7-.4h.5c.2 0 .3.1.4.4l.7 1.7c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4 0 .6.5.8 1.2 1.4 2 1.8.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.2.1.3.2.3.4 0 .3-.2 1-.6 1.3-.4.4-1 .6-1.6.6-.5 0-1.2-.2-2-.5-1.5-.6-2.8-1.8-3.6-3-.6-.9-1-1.8-1-2.5 0-.6.2-1.1.5-1.4Z" />
            </svg>
            <span className="sr-only">WhatsApp</span>
          </WhatsAppContactLink>

        </div>
      </header>

      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
        brandName={brandName}
      />
    </div>
  );
}

