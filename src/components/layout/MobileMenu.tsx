import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import WhatsAppContactLink from '../WhatsAppContactLink';
import type { NavLink } from '../../types';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks?: NavLink[];
  brandName?: string;
}

export default function MobileMenu({
  isOpen,
  onClose,
  navLinks = [],
  brandName = 'NI SQUARE PACKAGING',
}: MobileMenuProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef(onClose);

  const toggleSection = (label: string) => {
    setExpandedSection((prev) => (prev === label ? null : label));
  };

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';

    const focusFrame = window.requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>('button:not([disabled]), a[href]')?.focus();
    });
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeRef.current();
        return;
      }
      if (event.key !== 'Tab') return;

      const panel = panelRef.current;
      const focusable = Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [])
        .filter((element) => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first) {
        event.preventDefault();
        panel?.focus();
      } else if (event.shiftKey && (document.activeElement === first || !panel?.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !panel?.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [isOpen]);

  if (typeof document === 'undefined') return null;

  return (
    createPortal(
      <>
        {/* Backdrop */}
        <div
          className={`drawer-backdrop ${isOpen ? 'open' : ''}`}
          onClick={onClose}
          aria-hidden={!isOpen}
        />

        {/* Drawer Panel */}
        <aside
          ref={panelRef}
          className={`drawer-panel ${isOpen ? 'open' : ''}`}
          role={isOpen ? 'dialog' : undefined}
          aria-modal={isOpen ? 'true' : undefined}
          aria-labelledby="mobile-menu-title"
          aria-hidden={!isOpen}
          tabIndex={-1}
        >
          {/* Header */}
          <div className="drawer-header">
            <span id="mobile-menu-title" className="drawer-title">{brandName}</span>
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
                              <Link className="drawer-subgroup-title" to={col.headingPath} onClick={onClose}>{col.heading}</Link>
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
            <WhatsAppContactLink className="drawer-footer-link" message="Hi, I would like to plan a hamper.">
              Plan a hamper on WhatsApp
            </WhatsAppContactLink>
          </div>
        </aside>
      </>,
      document.body,
    )
  );
}

