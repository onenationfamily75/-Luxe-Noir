import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from './products';

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  variant?: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (p: Product, quantity?: number, variant?: string) => void;
  removeItem: (productId: string, variant?: string) => void;
  updateQty: (productId: string, quantity: number, variant?: string) => void;
  clear: () => void;
  subtotal: () => number;
  itemCount: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (p, quantity = 1, variant) => {
        const items = [...get().items];
        const existing = items.find((i) => i.productId === p.id && i.variant === variant);
        if (existing) {
          existing.quantity += quantity;
        } else {
          items.push({
            productId: p.id,
            name: p.name,
            price: p.price,
            image: p.image,
            variant,
            quantity,
          });
        }
        set({ items });
      },
      removeItem: (productId, variant) => {
        set({ items: get().items.filter((i) => !(i.productId === productId && i.variant === variant)) });
      },
      updateQty: (productId, quantity, variant) => {
        if (quantity <= 0) {
          get().removeItem(productId, variant);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId && i.variant === variant ? { ...i, quantity } : i
          ),
        });
      },
      clear: () => set({ items: [] }),
      subtotal: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),
      itemCount: () => get().items.reduce((s, i) => s + i.quantity, 0),
    }),
    { name: 'luxe-noir-cart-v1' }
  )
);
