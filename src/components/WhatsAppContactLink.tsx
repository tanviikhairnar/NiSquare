import React, { type CSSProperties, type ReactNode } from 'react';
import { useWhatsAppModal } from '../context/useWhatsAppModal';

export interface WhatsAppContactLinkProps {
  message?: string;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
  founderPhone?: string;
}

export default function WhatsAppContactLink({
  message,
  className = '',
  children,
  style,
  founderPhone,
}: WhatsAppContactLinkProps) {
  const { openWhatsAppModal } = useWhatsAppModal();

  return (
    <button
      type="button"
      className={('whatsapp-contact-trigger ' + className).trim()}
      style={style}
      onClick={() => openWhatsAppModal({ message, founderPhone })}
      aria-haspopup="dialog"
    >
      {children}
    </button>
  );
}

