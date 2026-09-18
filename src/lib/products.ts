import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db, useDemoData } from './firebase';
import { demoProducts, demoCategories } from '@/data/demo';
import type { Product, Category } from '@/types';

export async function getProducts(options?: {
  category?: string;
  featured?: boolean;
  availableOnly?: boolean;
}): Promise<Product[]> {
  if (useDemoData || !db) {
    let products = [...demoProducts];
    if (options?.category) {
      products = products.filter(
        (p) =>
          p.categoryId === options.category ||
          p.category.toLowerCase() === options.category?.toLowerCase() ||
          p.slug.includes(options.category || '')
      );
    }
    if (options?.featured) {
      products = products.filter((p) => p.featured);
    }
    if (options?.availableOnly !== false) {
      products = products.filter((p) => p.available);
    }
    return products;
  }

  try {
    const col = collection(db, 'products');
    const constraints = [];
    if (options?.availableOnly !== false) {
      constraints.push(where('available', '==', true));
    }
    if (options?.featured) {
      constraints.push(where('featured', '==', true));
    }
    if (options?.category) {
      constraints.push(where('categoryId', '==', options.category));
    }
    const q = constraints.length
      ? query(col, ...constraints, orderBy('name'))
      : query(col, orderBy('name'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
  } catch (err) {
    console.error('Failed to fetch products', err);
    return demoProducts.filter((p) => p.available);
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (useDemoData || !db) {
    return demoProducts.find((p) => p.slug === slug) || null;
  }

  try {
    const q = query(collection(db, 'products'), where('slug', '==', slug));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const d = snap.docs[0];
    return { id: d.id, ...d.data() } as Product;
  } catch (err) {
    console.error('Failed to fetch product', err);
    return demoProducts.find((p) => p.slug === slug) || null;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  if (useDemoData || !db) {
    return demoProducts.find((p) => p.id === id) || null;
  }

  try {
    const snap = await getDoc(doc(db, 'products', id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as Product;
  } catch (err) {
    console.error('Failed to fetch product', err);
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  if (useDemoData || !db) {
    return demoCategories.filter((c) => c.active);
  }

  try {
    const snap = await getDocs(
      query(collection(db, 'categories'), orderBy('order'))
    );
    return snap.docs
      .map((d) => ({ id: d.id, ...d.data() } as Category))
      .filter((c) => c.active);
  } catch (err) {
    console.error('Failed to fetch categories', err);
    return demoCategories;
  }
}
