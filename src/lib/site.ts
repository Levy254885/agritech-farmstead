/** Central business contact & branding */

const envPhone = import.meta.env.VITE_PHONE_NUMBER as string | undefined;
const envWhatsapp = import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined;
const envEmail = import.meta.env.VITE_BUSINESS_EMAIL as string | undefined;

function toWhatsappIntl(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('254')) return digits;
  if (digits.startsWith('0')) return `254${digits.slice(1)}`;
  return digits;
}

const phone = envPhone || '0723685606';
const whatsappRaw = envWhatsapp || '0723685606';

export const SITE = {
  name: 'Agritech Farmstead',
  tagline: 'Livestock and farm products you can trust.',
  phone,
  phoneDisplay: '0723 685 606',
  whatsapp: toWhatsappIntl(whatsappRaw),
  email: envEmail || 'agritechfarmstead@gmail.com',
  location: 'Kenya',
  businessHours: 'Monday – Saturday: 7:00 AM – 6:00 PM',
  logo: '/logo-light.svg',
  logoLight: '/logo-light.svg',
  logoDark: '/logo-dark.svg',
} as const;

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${SITE.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function telUrl(): string {
  return `tel:+${SITE.whatsapp}`;
}

export function mailtoUrl(): string {
  return `mailto:${SITE.email}`;
}
