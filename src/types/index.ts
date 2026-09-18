export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Ready for Pickup'
  | 'Out for Delivery'
  | 'Completed'
  | 'Cancelled';

export type PaymentStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded';
export type PaymentMethod = 'mpesa' | 'card' | 'cash_on_delivery' | 'cash_on_pickup';
export type FulfillmentMethod = 'delivery' | 'pickup';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  categoryId: string;
  price: number;
  compareAtPrice?: number;
  unit: string;
  images: string[];
  stockQuantity: number;
  available: boolean;
  featured: boolean;
  tags: string[];
  nutritionalInformation?: string;
  deliveryInformation?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  order: number;
  active: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  unit: string;
  image: string;
  quantity: number;
  stockQuantity: number;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  town: string;
  instructions?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: CustomerDetails;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  fulfillmentMethod: FulfillmentMethod;
  deliveryAddress?: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface DeliveryZone {
  id: string;
  name: string;
  areas: string[];
  fee: number;
  active: boolean;
  estimatedDays?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  category: string;
  published: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface FarmUpdate {
  id: string;
  title: string;
  content: string;
  image?: string;
  date: string;
  published: boolean;
}

export interface AdminUser {
  uid: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'superadmin';
}

export interface SiteSettings {
  farmName: string;
  tagline: string;
  phone: string;
  email: string;
  whatsapp: string;
  location: string;
  businessHours: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}
