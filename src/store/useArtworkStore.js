import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { artworks as seedArtworks } from '@/data/artworks';

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');

// This store is the single source of truth for artwork data across the
// app (gallery, shop, artwork detail) so admin edits show up everywhere
// immediately. In production, swap the actions below for API calls to
// the Express/MongoDB backend — the shape stays identical.
export const useArtworkStore = create(
  persist(
    (set, get) => ({
      artworks: seedArtworks,

      getBySlug: (slug) => get().artworks.find((a) => a.slug === slug),

      addArtwork: (artwork) => {
        const id = `aw-${Date.now()}`;
        const newArtwork = {
          ...artwork,
          id,
          slug: artwork.slug || slugify(artwork.title),
        };
        set({ artworks: [newArtwork, ...get().artworks] });
        return newArtwork;
      },

      updateArtwork: (id, updates) => {
        set({
          artworks: get().artworks.map((a) =>
            a.id === id ? { ...a, ...updates } : a
          ),
        });
      },

      deleteArtwork: (id) => {
        set({ artworks: get().artworks.filter((a) => a.id !== id) });
      },

      decrementStock: (artworkId, size, quantity) => {
        set({
          artworks: get().artworks.map((a) => {
            if (a.id !== artworkId) return a;
            return {
              ...a,
              variants: a.variants.map((v) =>
                v.size === size
                  ? { ...v, stock: Math.max(0, v.stock - quantity) }
                  : v
              ),
            };
          }),
        });
      },
    }),
    { name: 'farah-noor-artworks' }
  )
);
