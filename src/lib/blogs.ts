import {
  collection,
  getDocs,
  doc,
  query,
  where,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db, useDemoData } from './firebase';
import { demoBlogPosts } from '@/data/demo';
import type { BlogPost } from '@/types';

const DEMO_KEY = 'agritech-admin-blogs';

function loadDemo(): BlogPost[] {
  try {
    const raw = localStorage.getItem(DEMO_KEY);
    if (raw) return JSON.parse(raw) as BlogPost[];
  } catch {
    /* ignore */
  }
  return [...demoBlogPosts];
}

function saveDemo(list: BlogPost[]) {
  localStorage.setItem(DEMO_KEY, JSON.stringify(list));
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (useDemoData || !db) {
    return loadDemo().filter((p) => p.published);
  }
  try {
    const snap = await getDocs(
      query(
        collection(db, 'blogPosts'),
        where('published', '==', true),
        orderBy('publishedAt', 'desc')
      )
    );
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as BlogPost));
  } catch (e) {
    console.error(e);
    return loadDemo().filter((p) => p.published);
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (useDemoData || !db) {
    return loadDemo().find((p) => p.slug === slug && p.published) || null;
  }
  try {
    const snap = await getDocs(
      query(collection(db, 'blogPosts'), where('slug', '==', slug))
    );
    if (snap.empty) return null;
    const d = snap.docs[0];
    return { id: d.id, ...d.data() } as BlogPost;
  } catch (e) {
    console.error(e);
    return loadDemo().find((p) => p.slug === slug) || null;
  }
}

export async function getAllPostsAdmin(): Promise<BlogPost[]> {
  if (useDemoData || !db) return loadDemo();
  try {
    const snap = await getDocs(collection(db, 'blogPosts'));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as BlogPost));
  } catch (e) {
    console.error(e);
    return loadDemo();
  }
}

export type BlogInput = Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'> & {
  id?: string;
};

export async function savePost(input: BlogInput): Promise<BlogPost> {
  const now = new Date().toISOString();
  if (useDemoData || !db) {
    const list = loadDemo();
    if (input.id) {
      const idx = list.findIndex((p) => p.id === input.id);
      const updated = {
        ...(list[idx] || {}),
        ...input,
        id: input.id,
        updatedAt: now,
        createdAt: list[idx]?.createdAt || now,
      } as BlogPost;
      if (idx >= 0) list[idx] = updated;
      else list.push(updated);
      saveDemo(list);
      return updated;
    }
    const created = {
      ...input,
      id: `blog-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    } as BlogPost;
    list.push(created);
    saveDemo(list);
    return created;
  }

  const payload = {
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt,
    content: input.content,
    featuredImage: input.featuredImage || '',
    author: input.author || 'Agritech Farmstead',
    category: input.category || 'Farming',
    published: Boolean(input.published),
    publishedAt: input.publishedAt || now,
    updatedAt: now,
  };

  if (input.id) {
    await updateDoc(doc(db!, 'blogPosts', input.id), payload);
    return { ...payload, id: input.id, createdAt: now } as BlogPost;
  }
  const ref = await addDoc(collection(db!, 'blogPosts'), {
    ...payload,
    createdAt: now,
  });
  return { ...payload, id: ref.id, createdAt: now } as BlogPost;
}

export async function deletePost(id: string): Promise<void> {
  if (useDemoData || !db) {
    saveDemo(loadDemo().filter((p) => p.id !== id));
    return;
  }
  await deleteDoc(doc(db!, 'blogPosts', id));
}
