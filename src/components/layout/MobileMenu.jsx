import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function MobileMenu({ isOpen, onClose, navLinks = [], brandName = 'NI SQUARE PACKAGING' }) {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (label) => {
    setExpandedSection((prev) => (prev === label ? null : label));
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`drawer-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Drawer Panel */}
      <aside className={`drawer-panel ${isOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!isOpen}>
        {/* Header */}
        <div className="drawer-header">
          <span className="drawer-title">{brandName}</span>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Links list */}
        <ul className="drawer-links">
          {navLinks.map((item) => {
            const hasSub = item.hasMegaMenu || item.hasDropdown;
            const isExpanded = expandedSection === item.label;

            return (
              <li key={item.label} className="drawer-item">
                {hasSub ? (
                  <>
                    <button
                      type="button"
                      className="drawer-link drawer-toggle-btn"
                      onClick={() => toggleSection(item.label)}
                      aria-expanded={isExpanded}
                    >
                      <span>{item.label}</span>
                      <svg
                        aria-hidden="true"
                        width="12"
                        height="12"
                        viewBox="0 0 10 6"
                        fill="none"
                        style={{
                          transform: isExpanded ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.2s ease',
                        }}
                      >
                        <path d="m1 1 4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {isExpanded && item.hasMegaMenu && (
                      <div className="drawer-sublinks">
                        {item.megaMenu?.map((col) => (
                          <div key={col.heading} className="drawer-subgroup">
                            <div className="drawer-subgroup-title">{col.heading}</div>
                            <div className="drawer-subgroup-items">
                              {col.items?.map((sub) => (
                                <Link
                                  key={sub.label}
                                  to={sub.path}
                                  className="drawer-sublink"
                                  onClick={onClose}
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {isExpanded && item.hasDropdown && (
                      <div className="drawer-sublinks">
                        {item.dropdownItems?.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.path}
                            className="drawer-sublink"
                            onClick={onClose}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={item.path} className="drawer-link" onClick={onClose}>
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {/* Footer */}
        <div className="drawer-footer">
          <Link to="/account" className="drawer-footer-link" onClick={onClose}>
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Account</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
