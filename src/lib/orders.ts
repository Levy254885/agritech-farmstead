import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db, useDemoData } from './firebase';
import { generateOrderNumber } from './utils';
import type {
  Order,
  OrderItem,
  CustomerDetails,
  PaymentMethod,
  FulfillmentMethod,
  OrderStatus,
} from '@/types';

export interface CreateOrderInput {
  customer: CustomerDetails;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  fulfillmentMethod: FulfillmentMethod;
  deliveryAddress?: string;
  notes?: string;
}

const demoOrders: Order[] = [];

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const now = new Date().toISOString();
  const orderNumber = generateOrderNumber();

  const orderData = {
    orderNumber,
    customer: input.customer,
    items: input.items,
    subtotal: input.subtotal,
    deliveryFee: input.deliveryFee,
    total: input.total,
    paymentMethod: input.paymentMethod,
    paymentStatus: 'Pending' as const,
    orderStatus: 'Pending' as OrderStatus,
    fulfillmentMethod: input.fulfillmentMethod,
    deliveryAddress: input.deliveryAddress,
    notes: input.notes,
    createdAt: now,
    updatedAt: now,
  };

  if (useDemoData || !db) {
    const order: Order = { id: `demo-${Date.now()}`, ...orderData };
    demoOrders.unshift(order);
    return order;
  }

  try {
    const ref = await addDoc(collection(db, 'orders'), {
      ...orderData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { id: ref.id, ...orderData };
  } catch (err) {
    console.error('Failed to create order', err);
    throw new Error('Unable to place order. Please try again or contact us.');
  }
}

export async function getOrders(): Promise<Order[]> {
  if (useDemoData || !db) {
    return [...demoOrders];
  }

  try {
    const snap = await getDocs(
      query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
    );
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString?.() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString?.() || data.updatedAt,
      } as Order;
    });
  } catch (err) {
    console.error('Failed to fetch orders', err);
    return [];
  }
}

export async function getOrderById(id: string): Promise<Order | null> {
  if (useDemoData || !db) {
    return demoOrders.find((o) => o.id === id) || null;
  }

  try {
    const snap = await getDoc(doc(db, 'orders', id));
    if (!snap.exists()) return null;
    const data = snap.data();
    return {
      id: snap.id,
      ...data,
      createdAt: data.createdAt?.toDate?.()?.toISOString?.() || data.createdAt,
      updatedAt: data.updatedAt?.toDate?.()?.toISOString?.() || data.updatedAt,
    } as Order;
  } catch (err) {
    console.error('Failed to fetch order', err);
    return null;
  }
}

export async function updateOrderStatus(
  id: string,
  orderStatus: OrderStatus
): Promise<void> {
  if (useDemoData || !db) {
    const idx = demoOrders.findIndex((o) => o.id === id);
    if (idx >= 0) {
      demoOrders[idx] = {
        ...demoOrders[idx],
        orderStatus,
        updatedAt: new Date().toISOString(),
      };
    }
    return;
  }

  await updateDoc(doc(db, 'orders', id), {
    orderStatus,
    updatedAt: serverTimestamp(),
  });
}
