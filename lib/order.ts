import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from './cart';

export type CustomerInfo = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  notes?: string;
};

export type Order = {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: CustomerInfo;
  status: 'awaiting_payment' | 'paid' | 'shipped' | 'delivered';
};

type OrderState = {
  lastOrder: Order | null;
  setOrder: (o: Order) => void;
  clear: () => void;
};

export const useOrder = create<OrderState>()(
  persist(
    (set) => ({
      lastOrder: null,
      setOrder: (o) => set({ lastOrder: o }),
      clear: () => set({ lastOrder: null }),
    }),
    { name: 'luxe-noir-order-v1' }
  )
);

export const WHATSAPP_NUMBER = '+254786781665';
export const WHATSAPP_DIGITS = '254786781665';

export function buildWhatsAppLink(order: Order): string {
  const lines: string[] = [];
  lines.push(`🛍️ *New Order from Luxe Noir*`);
  lines.push(`Order ID: ${order.orderId}`);
  lines.push(`Name: ${order.customer.fullName}`);
  lines.push(`Email: ${order.customer.email}`);
  lines.push(`Phone: ${order.customer.phone}`);
  lines.push(`Address: ${order.customer.address}, ${order.customer.city}, ${order.customer.country} ${order.customer.postalCode}`);
  lines.push('');
  lines.push(`*Items:*`);
  order.items.forEach((i) => {
    lines.push(`• ${i.name}${i.variant ? ` (${i.variant})` : ''} x${i.quantity} — $${(i.price * i.quantity).toFixed(2)}`);
  });
  lines.push('');
  lines.push(`Subtotal: $${order.subtotal.toFixed(2)}`);
  lines.push(`Shipping: $${order.shipping.toFixed(2)}`);
  lines.push(`*Total: $${order.total.toFixed(2)}*`);
  if (order.customer.notes) {
    lines.push('');
    lines.push(`Notes: ${order.customer.notes}`);
  }
  lines.push('');
  lines.push(`Please confirm payment. Thank you! 🖤✨`);
  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${WHATSAPP_DIGITS}?text=${text}`;
}

export function generateOrderId(): string {
  const d = new Date();
  const ts = d.getTime().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `LN-${ts}-${rnd}`;
}
