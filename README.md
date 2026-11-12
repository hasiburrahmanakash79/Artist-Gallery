# Alamin P. Shoron — Artist Gallery & Shop

A premium, editorial-style artist portfolio and art e-commerce frontend, built with **React 19 + Vite + Tailwind CSS v4**. All data is currently mocked and persisted to `localStorage` via Zustand, so you can click through the entire flow — browsing, cart, checkout, and the admin studio — with no backend required.

## Getting Started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to /dist
npm run preview   # preview the production build
```

## Studio (Admin) Access

Visit `/admin/login`.

- **Email:** `admin@shoron.art`
- **Password:** `gallery2026`

These are hard-coded in `src/store/useAuthStore.js` for the frontend-only phase — replace `login()` with a real API call once the backend is connected (see below).

## Project Structure

```
src/
  components/
    layout/     Navbar, MobileMenu, SearchOverlay, Footer, Layout
    home/       Hero, FeaturedWorks, ArtistIntro, ExhibitionStrip, ContactCTA
    artwork/    ArtworkCard, ArtworkGrid, ArtworkFilters, ArtworkGallery,
                SizeSelector, QuantitySelector
    cart/       CartDrawer, CartItem
    checkout/   CheckoutForm, OrderSummary
    about/      ExhibitionTimeline, CredentialList
    contact/    ContactForm
    admin/      AdminLayout, AdminSidebar, ArtworkForm, ArtworkTable,
                OrderTable, OrderStatusBadge, StatCard, ProtectedRoute
    ui/         Button, Reveal (scroll animation), AvailabilityTag
  pages/        Home, About, Gallery, Shop, ArtworkDetail, Cart, Checkout,
                OrderConfirmation, Contact, NotFound
  pages/admin/  AdminLogin, AdminDashboard, AdminArtworks,
                AdminArtworkNew, AdminArtworkEdit, AdminOrders, AdminOrderDetail
  store/        useCartStore, useOrderStore, useArtworkStore, useAuthStore (Zustand)
  data/         artist.js (bio/exhibitions), artworks.js (mock catalogue)
  lib/          format.js (currency + order IDs), filterArtworks.js
```

## Replacing Mock Content

- **Artist info, bio, exhibitions, awards:** edit `src/data/artist.js`.
- **Artworks:** edit `src/data/artworks.js` directly, or use the Studio
  admin panel (Artworks -> Add/Edit) once the app is running -- changes there
  are saved to `useArtworkStore` and show up everywhere immediately.
- **Images:** every artwork currently uses placeholder images from
  `picsum.photos`. Replace the `images` array on each artwork with your
  Cloudinary (or other host) URLs -- no other code changes are needed.

## Connecting a Real Backend

The store files (`src/store/*.js`) are the seam where a real API replaces
mock/local data. Each store's actions map directly to REST endpoints:

| Store              | Action            | Suggested endpoint                  |
|---------------------|-------------------|--------------------------------------|
| `useArtworkStore`   | `addArtwork`      | `POST /api/artworks`                |
| `useArtworkStore`   | `updateArtwork`   | `PUT /api/artworks/:id`             |
| `useArtworkStore`   | `deleteArtwork`   | `DELETE /api/artworks/:id`          |
| `useOrderStore`     | `placeOrder`      | `POST /api/orders`                  |
| `useOrderStore`     | `updateStatus`    | `PATCH /api/orders/:id/status`      |
| `useAuthStore`      | `login`           | `POST /api/admin/login` (JWT)       |

The data shapes already match the spec's Artwork/Order models, so the
Express + MongoDB layer can be added underneath these stores without
changing any component code -- swap the store body for a `fetch`/`axios`
call and keep the same return shape.

## Design System

- **Colors:** warm paper background, near-black ink, brass accent, deep
  moss for "available" status, rust for "sold out" -- defined as CSS
  variables in `src/index.css` under `@theme`.
- **Type:** Fraunces (display/editorial headings) + Inter (UI/body).
- **Currency:** Bangladeshi Taka (Tk), formatted in `src/lib/format.js`.

## Known Frontend-Only Limitations

- Cart, orders, artworks, and admin auth persist to `localStorage`
  (per-browser) -- not shared across devices until a backend is connected.
- The contact form logs and confirms locally; wire it to an email/API
  endpoint before going live.
- Image uploads aren't implemented yet (admin form takes image URLs) --
  add a Cloudinary widget/API call when the backend is ready.
