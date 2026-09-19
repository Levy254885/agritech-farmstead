import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db, useDemoData } from './firebase';
import { demoProducts, demoCategories } from '@/data/demo';
import type { Product, Category } from '@/types';

const DEMO_PRODUCTS_KEY = 'agritech-admin-products';

function loadDemoProducts(): Product[] {
  try {
    const raw = localStorage.getItem(DEMO_PRODUCTS_KEY);
    if (raw) return JSON.parse(raw) as Product[];
  } catch {
    /* ignore */
  }
  return [...demoProducts];
}

function saveDemoProducts(list: Product[]) {
  localStorage.setItem(DEMO_PRODUCTS_KEY, JSON.stringify(list));
}

export async function getProducts(options?: {
  category?: string;
  featured?: boolean;
  availableOnly?: boolean;
}): Promise<Product[]> {
  if (useDemoData || !db) {
    let products = loadDemoProducts();
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
    return loadDemoProducts().find((p) => p.slug === slug) || null;
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
    return loadDemoProducts().find((p) => p.id === id) || null;
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

export async function getAllProductsAdmin(): Promise<Product[]> {
  if (useDemoData || !db) {
    return loadDemoProducts();
  }
  try {
    const snap = await getDocs(
      query(collection(db, 'products'), orderBy('name'))
    );
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
  } catch (err) {
    console.error(err);
    return loadDemoProducts();
  }
}

export type ProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string;
};

export async function saveProduct(input: ProductInput): Promise<Product> {
  const now = new Date().toISOString();
  if (useDemoData || !db) {
    const list = loadDemoProducts();
    if (input.id) {
      const idx = list.findIndex((p) => p.id === input.id);
      const updated = {
        ...(list[idx] || {}),
        ...input,
        id: input.id,
        updatedAt: now,
        createdAt: list[idx]?.createdAt || now,
      } as Product;
      if (idx >= 0) list[idx] = updated;
      else list.push(updated);
      saveDemoProducts(list);
      return updated;
    }
    const created = {
      ...input,
      id: `prod-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    } as Product;
    list.push(created);
    saveDemoProducts(list);
    return created;
  }

  const payload = {
    name: input.name,
    slug: input.slug,
    description: input.description,
    shortDescription: input.shortDescription,
    category: input.category,
    categoryId: input.categoryId,
    price: Number(input.price),
    compareAtPrice: input.compareAtPrice ?? null,
    unit: input.unit,
    images: input.images || [],
    stockQuantity: Number(input.stockQuantity),
    available: Boolean(input.available),
    featured: Boolean(input.featured),
    tags: input.tags || [],
    nutritionalInformation: input.nutritionalInformation || '',
    deliveryInformation: input.deliveryInformation || '',
    updatedAt: now,
  };

  if (input.id) {
    await updateDoc(doc(db!, 'products', input.id), payload);
    return { ...payload, id: input.id, createdAt: now } as Product;
  }
  const ref = await addDoc(collection(db!, 'products'), {
    ...payload,
    createdAt: now,
  });
  return { ...payload, id: ref.id, createdAt: now } as Product;
}

export async function deleteProduct(id: string): Promise<void> {
  if (useDemoData || !db) {
    saveDemoProducts(loadDemoProducts().filter((p) => p.id !== id));
    return;
  }
  await deleteDoc(doc(db, 'products', id));
}
