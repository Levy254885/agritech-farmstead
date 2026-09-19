import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, useDemoData } from './firebase';
import { SITE } from './site';

export interface SiteContent {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  philosophyTitle: string;
  philosophyBody: string;
  farmIntroTitle: string;
  farmIntroBody: string;
  aboutTitle: string;
  aboutBody: string;
  contactBlurb: string;
  updatedAt?: string;
}

const DEFAULT_CONTENT: SiteContent = {
  heroEyebrow: 'Livestock & Farm Products',
  heroTitle: 'Quality Livestock\nFrom Our Farm',
  heroSubtitle:
    'Piglets, breeding stock, fresh pork, chicken and eggs — raised and prepared with care at Agritech Farmstead.',
  philosophyTitle: 'Good farming starts with healthy animals.',
  philosophyBody:
    'Quality depends on proper housing, balanced feed, daily care and clean handling. These standards guide how we work every day.',
  farmIntroTitle: 'Agritech Farmstead',
  farmIntroBody:
    'We operate a livestock farm focused on pig production and a practical butchery for fresh pork, chicken and eggs. Products are available through the Farm Shop, with confirmation by phone or WhatsApp.',
  aboutTitle: 'About Agritech Farmstead',
  aboutBody:
    'We are a Kenyan livestock and farm-products business supplying breeding stock and fresh farm foods to farmers and households.',
  contactBlurb: `Call or WhatsApp ${SITE.phoneDisplay} to confirm stock and place an order.`,
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

export async function saveSiteContent(content: SiteContent): Promise<void> {
  const payload = { ...content, updatedAt: new Date().toISOString() };
  if (useDemoData || !db) {
    localStorage.setItem(DEMO_KEY, JSON.stringify(payload));
    return;
  }
  await setDoc(doc(db, 'siteContent', 'main'), payload, { merge: true });
}

export { DEFAULT_CONTENT };
