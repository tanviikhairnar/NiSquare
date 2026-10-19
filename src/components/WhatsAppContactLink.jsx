import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { buildWhatsAppEnquiryMessage, whatsappLink, WHATSAPP_FOUNDERS } from '../lib/whatsapp';
import { storeCollections } from '../data/storeCatalog';

const emptyForm = {
  fullName: '',
  email: '',
  category: '',
  eventDate: '',
  requirements: '',
};

export default function WhatsAppContactLink({ message, className = '', children, style, founderPhone }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isChoosingFounder, setIsChoosingFounder] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const trigger = triggerRef.current;
    closeButtonRef.current?.focus();
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      trigger?.focus();
    };
  }, [isOpen]);

  const whatsappMessage = buildWhatsAppEnquiryMessage(message, formData);

  const updateField = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const closeDialog = () => {
    setIsOpen(false);
    setIsChoosingFounder(false);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={('whatsapp-contact-trigger ' + className).trim()}
        style={style}
        onClick={() => { setFormData(emptyForm); setIsChoosingFounder(false); setIsOpen(true); }}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        {children}
      </button>
      {isOpen && createPortal(
        <div className="whatsapp-choice-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeDialog(); }}>
          <section className="whatsapp-choice-dialog" role="dialog" aria-modal="true" aria-labelledby="whatsapp-choice-title">
            <button ref={closeButtonRef} type="button" className="whatsapp-choice-close" onClick={closeDialog} aria-label="Close enquiry form">
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="m4 4 12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.5" /></svg>
            </button>
            {!isChoosingFounder ? (
              <>
                <h2 id="whatsapp-choice-title">Tell us what you have in mind</h2>
                <p>Share a few details so we can help plan your hamper.</p>
                <form className="whatsapp-enquiry-form" onSubmit={(event) => {
                  event.preventDefault();
                  if (founderPhone) {
                    window.open(whatsappLink(whatsappMessage, founderPhone), '_blank', 'noopener,noreferrer');
                    closeDialog();
                    return;
                  }
                  setIsChoosingFounder(true);
                }}>
                  <label>
                    <span>Full Name</span>
                    <input name="fullName" type="text" autoComplete="name" value={formData.fullName} onChange={updateField} required />
                  </label>
                  <label>
                    <span>Email Address <small>(optional)</small></span>
                    <input name="email" type="email" autoComplete="email" value={formData.email} onChange={updateField} />
                  </label>
                  <label>
                    <span>Select a Category <small>(optional)</small></span>
                    <select name="category" value={formData.category} onChange={updateField}>
                      <option value="">Choose a category</option>
                      {storeCollections.map((collection) => (
                        <option key={collection.slug} value={collection.title}>{collection.title}</option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </label>
                  <label>
                    <span>Occasion / Event Date <small>(optional)</small></span>
                    <input name="eventDate" type="date" value={formData.eventDate} onChange={updateField} />
                  </label>
                  <label className="whatsapp-enquiry-message">
                    <span>Message or Custom Requirements <small>(optional)</small></span>
                    <textarea name="requirements" rows="3" value={formData.requirements} onChange={updateField} />
                  </label>
                  <button type="submit" className="button whatsapp-enquiry-submit">Send to WhatsApp</button>
                </form>
              </>
            ) : (
              <>
                <p className="eyebrow">Almost there</p>
                <h2 id="whatsapp-choice-title">Who would you like to message?</h2>
                <p>Your details will be included in the WhatsApp message.</p>
                <div className="whatsapp-choice-options">
                  {WHATSAPP_FOUNDERS.map((founder) => (
                    <a key={founder.phone} href={whatsappLink(whatsappMessage, founder.phone)} target="_blank" rel="noreferrer" onClick={closeDialog}>
                      <span>{founder.name}</span>
                    </a>
                  ))}
                </div>
                <button type="button" className="whatsapp-enquiry-back" onClick={() => setIsChoosingFounder(false)}>Back to details</button>
              </>
            )}
          </section>
        </div>,
        document.body,
      )}
    </>
  );
}

