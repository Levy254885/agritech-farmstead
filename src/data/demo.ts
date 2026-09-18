import type { Product, Category, BlogPost, DeliveryZone, SiteSettings } from '@/types';

export const demoCategories: Category[] = [
  {
    id: 'cat-dairy',
    name: 'Dairy Products',
    slug: 'dairy-products',
    description: 'Fresh milk and dairy products from our herd.',
    order: 1,
    active: true,
  },
  {
    id: 'cat-farm',
    name: 'Farm Products',
    slug: 'farm-products',
    description: 'Eggs, produce, and other farm goods.',
    order: 2,
    active: true,
  },
];

export const demoProducts: Product[] = [
  {
    id: 'prod-fresh-milk',
    name: 'Fresh Farm Milk',
    slug: 'fresh-milk',
    description:
      'Pasteurised fresh milk from our carefully managed dairy herd. Delivered cold and full of natural flavour. Ideal for drinking, tea, cooking, and baking.',
    shortDescription: 'Pasteurised fresh milk from our dairy herd.',
    category: 'Dairy Products',
    categoryId: 'cat-dairy',
    price: 80,
    unit: '1 Litre',
    images: [
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&q=80',
    ],
    stockQuantity: 120,
    available: true,
    featured: true,
    tags: ['milk', 'fresh', 'dairy'],
    nutritionalInformation: 'Source of calcium and protein. Keep refrigerated.',
    deliveryInformation: 'Keep cold. Best consumed within 3–5 days of delivery.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-yoghurt',
    name: 'Natural Yoghurt',
    slug: 'natural-yoghurt',
    description:
      'Creamy natural yoghurt made from our fresh farm milk. Mild, smooth, and free from unnecessary additives.',
    shortDescription: 'Creamy natural yoghurt from farm milk.',
    category: 'Dairy Products',
    categoryId: 'cat-dairy',
    price: 150,
    unit: '500ml',
    images: [
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
    ],
    stockQuantity: 60,
    available: true,
    featured: true,
    tags: ['yoghurt', 'dairy'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-mala',
    name: 'Mala (Fermented Milk)',
    slug: 'mala',
    description:
      'Traditional fermented milk (mala) with a pleasant tang. A favourite for many Kenyan households.',
    shortDescription: 'Traditional fermented milk with a pleasant tang.',
    category: 'Dairy Products',
    categoryId: 'cat-dairy',
    price: 90,
    unit: '1 Litre',
    images: [
      'https://images.unsplash.com/photo-1628088062854-d0e0e0e0e0e0?w=800&q=80',
    ],
    stockQuantity: 40,
    available: true,
    featured: false,
    tags: ['mala', 'fermented', 'dairy'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-eggs',
    name: 'Farm Fresh Eggs',
    slug: 'farm-eggs',
    description:
      'Free-range style eggs from hens raised on our farm. Rich yolks and reliable quality for everyday cooking.',
    shortDescription: 'Fresh eggs from hens raised on our farm.',
    category: 'Farm Products',
    categoryId: 'cat-farm',
    price: 450,
    unit: 'Tray of 30',
    images: [
      'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800&q=80',
    ],
    stockQuantity: 25,
    available: true,
    featured: true,
    tags: ['eggs', 'farm'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-butter',
    name: 'Farm Butter',
    slug: 'farm-butter',
    description:
      'Rich butter churned from cream from our dairy. Ideal for cooking, baking, and spreading.',
    shortDescription: 'Rich butter from our dairy cream.',
    category: 'Dairy Products',
    categoryId: 'cat-dairy',
    price: 350,
    unit: '250g',
    images: [
      'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=800&q=80',
    ],
    stockQuantity: 30,
    available: true,
    featured: false,
    tags: ['butter', 'dairy'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const demoDeliveryZones: DeliveryZone[] = [
  {
    id: 'zone-nairobi',
    name: 'Nairobi & Environs',
    areas: ['Nairobi', 'Kiambu', 'Ruiru', 'Thika'],
    fee: 200,
    active: true,
    estimatedDays: '1–2 days',
  },
  {
    id: 'zone-pickup',
    name: 'Farm Pickup',
    areas: ['Farm Gate'],
    fee: 0,
    active: true,
    estimatedDays: 'Same day',
  },
];

export const demoBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How We Care for Our Dairy Herd',
    slug: 'how-we-care-for-our-dairy-herd',
    excerpt: 'A look at daily routines, feeding, and animal welfare practices on the farm.',
    content:
      'At Agritech Farmstead, animal care is central to everything we do. Our herd receives balanced nutrition, clean water, and regular veterinary attention.\n\n[Additional content can be managed from the admin dashboard.]',
    featuredImage: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&q=80',
    author: 'Agritech Farmstead',
    category: 'Farm Life',
    published: true,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'blog-2',
    title: 'From Milking to Your Table',
    slug: 'from-milking-to-your-table',
    excerpt: 'Understanding the path our milk takes from the parlour to packaging and delivery.',
    content:
      'Quality control begins at milking. We follow strict hygiene protocols, cool milk promptly, and process it with care so that what reaches your household is fresh and reliable.\n\n[Additional content can be managed from the admin dashboard.]',
    featuredImage: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1200&q=80',
    author: 'Agritech Farmstead',
    category: 'Dairy',
    published: true,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const demoSiteSettings: SiteSettings = {
  farmName: 'Agritech Farmstead',
  tagline: 'Quality from the farm. Care in every product.',
  phone: '0758342670',
  email: '[Business Email]',
  whatsapp: '0758342670',
  location: '[Farm Location]',
  businessHours: 'Monday – Saturday: 7:00 AM – 6:00 PM',
  socialLinks: {},
};
