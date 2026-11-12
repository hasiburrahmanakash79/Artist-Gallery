import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateOrderId } from '@/lib/format';

export const ORDER_STATUSES = [
  'Pending',
  'Confirmed',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
];

export const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: [],

      placeOrder: ({ customer, items, subtotal, shipping }) => {
        const order = {
          orderId: generateOrderId(),
          customer,
          items,
          subtotal,
          shipping,
          total: subtotal + shipping,
          paymentMethod: 'COD',
          status: 'Pending',
          createdAt: new Date().toISOString(),
        };
        set({ orders: [order, ...get().orders] });
        return order;
      },

      updateStatus: (orderId, status) => {
        set({
          orders: get().orders.map((o) =>
            o.orderId === orderId ? { ...o, status } : o
          ),
        });
      },

      getOrder: (orderId) => get().orders.find((o) => o.orderId === orderId),
    }),
    { name: 'farah-noor-orders' }
  )
);
