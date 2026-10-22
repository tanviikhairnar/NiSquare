import type { Founder, WhatsAppFormData } from '../types/index.ts';

export const WHATSAPP_NUMBERS: string[] = ['9673283594', '7083348221'];

export function whatsappLink(message: string, phone: string = WHATSAPP_NUMBERS[0]): string {
  return `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_FOUNDERS: Founder[] = [
  { name: 'Nikita Kochar Ostwal', role: 'Interior designer', phone: WHATSAPP_NUMBERS[0] },
  { name: 'Nikita Anil Chordiya', role: 'Textile designer', phone: WHATSAPP_NUMBERS[1] },
];

export function buildWhatsAppEnquiryMessage(message: string, formData: Partial<WhatsAppFormData>): string {
  return [
    message,
    'Full Name: ' + (formData.fullName || '').trim(),
    formData.category ? 'Category: ' + formData.category : '',
    formData.eventDate ? 'Occasion / Event Date: ' + formData.eventDate : '',
    formData.requirements?.trim() ? 'Message or Custom Requirements: ' + formData.requirements.trim() : '',
  ].filter(Boolean).join('\n');
}
