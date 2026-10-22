import React, { useEffect, useRef, useState, type ReactNode, type ChangeEvent, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { buildWhatsAppEnquiryMessage, whatsappLink, WHATSAPP_FOUNDERS } from '../lib/whatsapp';
import { storeCollections } from '../data/storeCatalog';
import { WhatsAppModalContext } from './WhatsAppModalContext';
import type { WhatsAppFormData, WhatsAppModalOptions } from '../types/index.ts';

function getLocalDateValue(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const initialFormData: WhatsAppFormData = {
  fullName: '',
  category: '',
  eventDate: '',
  requirements: '',
};

interface ModalConfig {
  message: string;
  founderPhone: string;
}

export interface WhatsAppModalProviderProps {
  children: ReactNode;
}

export default function WhatsAppModalProvider({ children }: WhatsAppModalProviderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isChoosingFounder, setIsChoosingFounder] = useState<boolean>(false);
  const [modalConfig, setModalConfig] = useState<ModalConfig>({ message: '', founderPhone: '' });
  const [formData, setFormData] = useState<WhatsAppFormData>(initialFormData);

  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  const openWhatsAppModal = ({ message = '', founderPhone = '', initialCategory = '', initialRequirements = '' }: WhatsAppModalOptions & { message?: string; founderPhone?: string } = {}) => {
    lastActiveElementRef.current = document.activeElement as HTMLElement | null;
    setModalConfig({ message, founderPhone });
    setFormData({
      ...initialFormData,
      category: initialCategory || '',
      requirements: initialRequirements || '',
    });
    setIsChoosingFounder(false);
    setIsOpen(true);
  };

  const closeWhatsAppModal = () => {
    setIsOpen(false);
    setIsChoosingFounder(false);
    if (lastActiveElementRef.current && typeof lastActiveElementRef.current.focus === 'function') {
      lastActiveElementRef.current.focus();
    }
  };

  useEffect(() => {
    if (!isOpen) return undefined;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeWhatsAppModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const whatsappMessage = buildWhatsAppEnquiryMessage(modalConfig.message, formData);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (modalConfig.founderPhone) {
      window.open(whatsappLink(whatsappMessage, modalConfig.founderPhone), '_blank', 'noopener,noreferrer');
      closeWhatsAppModal();
      return;
    }
    setIsChoosingFounder(true);
  };

  const handleFounderClick = (phone: string) => {
    window.open(whatsappLink(whatsappMessage, phone), '_blank', 'noopener,noreferrer');
    closeWhatsAppModal();
  };

  return (
    <WhatsAppModalContext.Provider value={{ openWhatsAppModal, closeWhatsAppModal, isOpen }}>
      {children}
      {isOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="whatsapp-choice-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeWhatsAppModal();
          }}
        >
          <section
            className="whatsapp-choice-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="whatsapp-choice-title"
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="whatsapp-choice-close"
              onClick={closeWhatsAppModal}
              aria-label="Close enquiry form"
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
                <path d="m4 4 12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>

            {!isChoosingFounder ? (
              <>
                <h2 id="whatsapp-choice-title">Tell us what you have in mind</h2>
                <p>Share a few details so we can help plan your hamper.</p>
                <form className="whatsapp-enquiry-form" onSubmit={handleSubmit}>
                  <label>
                    <span>Full Name</span>
                    <input
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      value={formData.fullName}
                      onChange={updateField}
                      required
                    />
                  </label>
                  <label>
                    <span>Select a Category <small>(optional)</small></span>
                    <select name="category" value={formData.category} onChange={updateField}>
                      <option value="">Choose a category</option>
                      {storeCollections.map((collection) => (
                        <option key={collection.slug} value={collection.title}>
                          {collection.title}
                        </option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </label>
                  <label>
                    <span>Occasion / Event Date <small>(optional)</small></span>
                    <input
                      name="eventDate"
                      type="date"
                      min={getLocalDateValue()}
                      value={formData.eventDate}
                      onChange={updateField}
                    />
                  </label>
                  <label className="whatsapp-enquiry-form-full">
                    <span>Custom Requirements / Ideas <small>(optional)</small></span>
                    <textarea
                      name="requirements"
                      rows={3}
                      value={formData.requirements}
                      onChange={updateField}
                      placeholder="Theme, colors, special items to include, budget, quantity..."
                    />
                  </label>
                  <div className="whatsapp-enquiry-form-actions">
                    <button type="submit" className="button">
                      {modalConfig.founderPhone ? 'Open WhatsApp' : 'Next: Choose a Founder →'}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h2 id="whatsapp-choice-title">Who would you like to speak with?</h2>
                <p className="eyebrow">Select a founder</p>
                <p>Choose either founder below to continue our conversation on WhatsApp.</p>
                <div className="whatsapp-choice-list">
                  {WHATSAPP_FOUNDERS.map((founder) => (
                    <button
                      key={founder.phone}
                      type="button"
                      className="whatsapp-choice-option"
                      onClick={() => handleFounderClick(founder.phone)}
                    >
                      <span className="whatsapp-choice-avatar" aria-hidden="true">
                        {founder.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
                      </span>
                      <span className="whatsapp-choice-meta">
                        <strong>{founder.name}</strong>
                        <span>{founder.role}</span>
                      </span>
                      <span className="whatsapp-choice-action">Chat on WhatsApp &#8599;</span>
                    </button>
                  ))}
                </div>
                <div className="whatsapp-choice-back">
                  <button type="button" className="text-link" onClick={() => setIsChoosingFounder(false)}>
                    &#8592; Back to details
                  </button>
                </div>
              </>
            )}
          </section>
        </div>,
        document.body,
      )}
    </WhatsAppModalContext.Provider>
  );
}
export { WhatsAppModalProvider };
