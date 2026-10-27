import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import WhatsAppContactLink from '../WhatsAppContactLink';
import { siteHeader } from '../../data/siteContent';
import MobileMenu from './MobileMenu';
import SearchDialog from './SearchDialog';
import { SolidWhatsAppIcon } from '../common/Icons';
import type { SiteHeaderConfig } from '../../types';

export interface HeaderProps {
  config?: SiteHeaderConfig;
}

export default function Header({ config = siteHeader }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMegaMenuDismissed, setIsMegaMenuDismissed] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMegaMenuDismissed(true);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
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
                  <li
                    key={item.label}
                    className={`nav-item ${isMegaMenuDismissed ? 'mega-menu-dismissed' : ''}`}
                    onMouseEnter={() => setIsMegaMenuDismissed(false)}
                  >
                    <Link to={item.path} className="nav-link">
                      {item.label}
                    </Link>
                    {/* Mega Menu Dropdown */}
                    <div className="mega-menu">
                      <button
                        type="button"
                        className="mega-menu-close"
                        aria-label={`Close ${item.label} menu`}
                        onClick={() => setIsMegaMenuDismissed(true)}
                      >
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                          <path d="m6 6 12 12M18 6 6 18" />
                        </svg>
                      </button>
                      <div className="mega-menu-inner">
                        {item.megaMenu?.map((col) => (
                          <div key={col.heading} className="mega-column">
                            <h4 className="mega-column-title"><Link to={col.headingPath}>{col.heading}</Link></h4>
                            <ul className="mega-sublist">
                              {col.items?.map((sub) => (
                                <li key={sub.label}>
                                  <Link to={sub.path} className="mega-sublink">
                                    {sub.label}
                                  </Link>
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
                    <Link to={item.path} className="nav-link">
                      {item.label}
                    </Link>
                    {/* Standard Dropdown */}
                    <div className="dropdown-menu">
                      <ul className="dropdown-list">
                        {item.dropdownItems?.map((sub) => (
                          <li key={sub.label}>
                            <Link to={sub.path} className="dropdown-item-link">
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.label} className="nav-item">
                  <Link to={item.path} className="nav-link">
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Secondary Navigation Icons (Right) */}
        <div className="header-secondary-nav" aria-label="User navigation">
          {/* Search Icon */}
          <button type="button" className="header-icon-btn" aria-label="Search" onClick={() => setIsSearchOpen(true)}>
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <WhatsAppContactLink className="header-icon-btn header-whatsapp-link" message="Hi, I would like to plan a hamper.">
            <SolidWhatsAppIcon width="1.2em" height="1.2em" />
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

