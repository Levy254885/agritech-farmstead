/** Central business contact & branding */

const envPhone = import.meta.env.VITE_PHONE_NUMBER as string | undefined;
const envWhatsapp = import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined;
const envEmail = import.meta.env.VITE_BUSINESS_EMAIL as string | undefined;

function toIntl(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('254')) return digits;
  if (digits.startsWith('0')) return `254${digits.slice(1)}`;
  return digits;
}

function formatDisplay(phone: string): string {
  const d = phone.replace(/\D/g, '');
  const local = d.startsWith('254') ? `0${d.slice(3)}` : d.startsWith('0') ? d : d;
  if (local.length === 10) {
    return `${local.slice(0, 4)} ${local.slice(4, 7)} ${local.slice(7)}`;
  }
  return phone;
}

/** Call line (earlier number) */
const phoneRaw = envPhone || '0758342670';
/** WhatsApp (main number shared by client) */
const whatsappRaw = envWhatsapp || '0723685606';

export const SITE = {
  name: 'Agritech Farmstead',
  tagline: 'Livestock and farm products you can trust.',
  /** Voice calls */
  phone: phoneRaw,
  phoneDisplay: formatDisplay(phoneRaw),
  phoneIntl: toIntl(phoneRaw),
  /** WhatsApp messaging */
  whatsapp: toIntl(whatsappRaw),
  whatsappDisplay: formatDisplay(whatsappRaw),
  whatsappRaw,
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
  return `tel:+${SITE.phoneIntl}`;
}

export function mailtoUrl(): string {
  return `mailto:${SITE.email}`;
}
