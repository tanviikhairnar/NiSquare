import { createContext } from 'react';
import type { WhatsAppModalContextValue } from '../types/index.ts';

export const WhatsAppModalContext = createContext<WhatsAppModalContextValue | null>(null);
