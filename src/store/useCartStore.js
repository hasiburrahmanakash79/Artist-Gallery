import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Cart line item shape:
// { artworkId, slug, title, image, size, price, stock, quantity }

const lineKey = (artworkId, size) => `${artworkId}__${size}`;

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (artwork, variant, quantity = 1) => {
        const key = lineKey(artwork.id, variant.size);
        const items = [...get().items];
        const existingIndex = items.findIndex(
          (i) => lineKey(i.artworkId, i.size) === key
        );

        if (existingIndex > -1) {
          const nextQty = Math.min(
            items[existingIndex].quantity + quantity,
            variant.stock
          );
          items[existingIndex] = { ...items[existingIndex], quantity: nextQty };
        } else {
          items.push({
            artworkId: artwork.id,
            slug: artwork.slug,
            title: artwork.title,
            image: artwork.images[0],
            size: variant.size,
            price: variant.price,
            stock: variant.stock,
            quantity: Math.min(quantity, variant.stock),
          });
        }
        set({ items });
      },

      updateQuantity: (artworkId, size, quantity) => {
        const items = get().items.map((i) =>
          i.artworkId === artworkId && i.size === size
            ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) }
            : i
        );
        set({ items });
      },

      removeItem: (artworkId, size) => {
        set({
          items: get().items.filter(
            (i) => !(i.artworkId === artworkId && i.size === size)
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: 'farah-noor-cart' }
  )
);
