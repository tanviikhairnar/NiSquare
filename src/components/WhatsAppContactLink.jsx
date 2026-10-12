import React, { useEffect, useRef, useState } from 'react';
import { whatsappLink, WHATSAPP_FOUNDERS } from '../lib/whatsapp';

export default function WhatsAppContactLink({ message, className = '', children, style }) {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    closeButtonRef.current?.focus();
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`whatsapp-contact-trigger ${className}`.trim()}
        style={style}
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        {children}
      </button>
      {isOpen && (
        <div className="whatsapp-choice-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsOpen(false); }}>
          <section className="whatsapp-choice-dialog" role="dialog" aria-modal="true" aria-labelledby="whatsapp-choice-title">
            <button ref={closeButtonRef} type="button" className="whatsapp-choice-close" onClick={() => setIsOpen(false)} aria-label="Close founder selection">X</button>
            <p className="eyebrow">WhatsApp enquiry</p>
            <h2 id="whatsapp-choice-title">Who would you like to message?</h2>
            <p>Your message will be ready to send in WhatsApp.</p>
            <div className="whatsapp-choice-options">
              {WHATSAPP_FOUNDERS.map((founder) => (
                <a key={founder.phone} href={whatsappLink(message, founder.phone)} target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)}>
                  <span>{founder.name}</span>
                  <small>{founder.role}</small>
                </a>
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
