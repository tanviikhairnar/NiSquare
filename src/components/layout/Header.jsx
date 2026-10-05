import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { siteHeader } from '../../data/siteContent';
import MobileMenu from './MobileMenu';
import SearchDialog from './SearchDialog';

export default function Header({ config = siteHeader }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { quantity, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
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
                            <h4 className="mega-column-title">{col.heading}</h4>
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
          {/* Account Icon */}
          <Link to="/account" className="header-icon-btn account-btn" aria-label="Account">
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>

          {/* Search Icon */}
          <button type="button" className="header-icon-btn" aria-label="Search" onClick={() => setIsSearchOpen(true)}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg></button>

          {/* Cart Icon */}
          <button type="button" className="header-icon-btn cart-btn" aria-label="Cart" onClick={openCart}>
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {quantity > 0 && <span className="cart-count">{quantity}</span>}
          </button>

          {/* Wishlist / Heart Icon */}
          <Link to="/wishlist" className="header-icon-btn wishlist-btn" aria-label={'Wishlist' + (wishlistCount ? ', ' + wishlistCount + ' saved' : '')}>
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="wishlist-count">{wishlistCount}</span>
          </Link>
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
