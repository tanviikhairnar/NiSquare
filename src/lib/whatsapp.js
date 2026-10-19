export const WHATSAPP_NUMBERS = ['9673283594', '7083348221'];

export function whatsappLink(message, phone = WHATSAPP_NUMBERS[0]) {
  return `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_FOUNDERS = [
  { name: 'Nikita Kochar Ostwal', role: 'Interior designer', phone: WHATSAPP_NUMBERS[0] },
  { name: 'Nikita Anil Chordiya', role: 'Textile designer', phone: WHATSAPP_NUMBERS[1] },
];


export function buildWhatsAppEnquiryMessage(message, formData) {
  return [
    message,
    'Full Name: ' + (formData.fullName || '').trim(),
    formData.category ? 'Category: ' + formData.category : '',
    formData.eventDate ? 'Occasion / Event Date: ' + formData.eventDate : '',
    formData.requirements?.trim() ? 'Message or Custom Requirements: ' + formData.requirements.trim() : '',
  ].filter(Boolean).join('\n');
}
