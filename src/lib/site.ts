/** Central business contact & branding — update here for the whole site */
export const SITE = {
  name: 'Agritech Farmstead',
  tagline: 'Quality from the farm. Care in every product.',
  phone: '0758342670',
  phoneDisplay: '0758 342 670',
  /** Kenya format for WhatsApp (no leading 0) */
  whatsapp: '254758342670',
  email: '[Business Email]',
  location: '[Farm Location]',
  businessHours: 'Monday – Saturday: 7:00 AM – 6:00 PM',
  logo: '/logo-light.svg',
  logoLight: '/logo-light.svg',
} as const;

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${SITE.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function telUrl(): string {
  return `tel:+254${SITE.phone.replace(/^0/, '')}`;
}
