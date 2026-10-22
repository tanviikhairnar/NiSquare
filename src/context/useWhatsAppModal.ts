import { useContext } from 'react';
import { WhatsAppModalContext } from './WhatsAppModalContext.ts';
import type { WhatsAppModalContextValue } from '../types/index.ts';

export function useWhatsAppModal(): WhatsAppModalContextValue {
  const context = useContext(WhatsAppModalContext);
  if (!context) {
    throw new Error('useWhatsAppModal must be used within a WhatsAppModalProvider');
  }
  return context;
}
