import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, useDemoData } from './firebase';
import { SITE } from './site';

export interface SiteContent {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  philosophyTitle: string;
  philosophyBody: string;
  farmIntroTitle: string;
  farmIntroBody: string;
  farmIntroImage: string;
  aboutTitle: string;
  aboutBody: string;
  aboutImage: string;
  farmPageTitle: string;
  farmPageBody: string;
  practicesTitle: string;
  practicesBody: string;
  sustainabilityTitle: string;
  sustainabilityBody: string;
  productsPageTitle: string;
  productsPageBody: string;
  contactBlurb: string;
  contactEmail: string;
  contactPhone: string;
  contactWhatsapp: string;
  contactLocation: string;
  contactHours: string;
  shopTitle: string;
  shopBody: string;
  footerTagline: string;
  updatedAt?: string;
}

export const DEFAULT_CONTENT: SiteContent = {
  heroEyebrow: 'Livestock & Farm Products',
  heroTitle: 'Quality Livestock\nFrom Our Farm',
  heroSubtitle:
    'Piglets, breeding stock, fresh pork, chicken and eggs — raised and prepared with care at Agritech Farmstead.',
  heroImage:
    'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1800&q=85',
  philosophyTitle: 'Good farming starts with healthy animals.',
  philosophyBody:
    'Quality depends on proper housing, balanced feed, daily care and clean handling. These standards guide how we work every day.',
  farmIntroTitle: 'Agritech Farmstead',
  farmIntroBody:
    'We operate a livestock farm focused on pig production and a practical butchery for fresh pork, chicken and eggs. Products are available through the Farm Shop, with confirmation by phone or WhatsApp.',
  farmIntroImage:
    'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1000&q=80',
  aboutTitle: 'About Agritech Farmstead',
  aboutBody:
    'We are a Kenyan livestock and farm-products business supplying breeding stock and fresh farm foods to farmers and households.',
  aboutImage:
    'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1000&q=80',
  farmPageTitle: 'Where our livestock and products begin',
  farmPageBody:
    'Agritech Farmstead is a working farm focused on pig production and a practical butchery for fresh pork, chicken and eggs.',
  practicesTitle: 'Livestock farming',
  practicesBody:
    'How we manage the pig unit and butchery — from animal care to the products that leave the farm.',
  sustainabilityTitle: 'Responsible farming',
  sustainabilityBody:
    'We aim to raise animals humanely, use resources carefully and supply honest products to the farmers and families who depend on us.',
  productsPageTitle: 'Livestock and farm foods',
  productsPageBody:
    'Breeding stock, fresh pork, chicken and eggs from Agritech Farmstead. Browse the Farm Shop for current prices and availability.',
  contactBlurb: `Call or WhatsApp ${SITE.phoneDisplay} to confirm stock and place an order.`,
  contactEmail: SITE.email,
  contactPhone: SITE.phoneDisplay,
  contactWhatsapp: SITE.phoneDisplay,
  contactLocation: SITE.location,
  contactHours: SITE.businessHours,
  shopTitle: 'Farm Shop',
  shopBody: 'Order livestock and butchery products directly from the farm.',
  footerTagline: 'Livestock and farm products you can trust.',
};

const DEMO_KEY = 'agritech-site-content';

export async function getSiteContent(): Promise<SiteContent> {
  if (useDemoData || !db) {
    try {
      const raw = localStorage.getItem(DEMO_KEY);
      if (raw) return { ...DEFAULT_CONTENT, ...JSON.parse(raw) };
    } catch {
      /* ignore */
    }
    return { ...DEFAULT_CONTENT };
  }
  try {
    const snap = await getDoc(doc(db, 'siteContent', 'main'));
    if (snap.exists()) {
      return { ...DEFAULT_CONTENT, ...(snap.data() as SiteContent) };
    }
  } catch (e) {
    console.error('getSiteContent', e);
  }
  return { ...DEFAULT_CONTENT };
}

export async function saveSiteContent(content: Partial<SiteContent>): Promise<void> {
  const payload = { ...content, updatedAt: new Date().toISOString() };
  if (useDemoData || !db) {
    const current = await getSiteContent();
    localStorage.setItem(DEMO_KEY, JSON.stringify({ ...current, ...payload }));
    return;
  }
  await setDoc(doc(db, 'siteContent', 'main'), payload, { merge: true });
}
