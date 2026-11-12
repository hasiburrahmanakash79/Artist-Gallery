import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Gallery from '@/pages/Gallery';
import Shop from '@/pages/Shop';
import ArtworkDetail from '@/pages/ArtworkDetail';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import OrderConfirmation from '@/pages/OrderConfirmation';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminArtworks from '@/pages/admin/AdminArtworks';
import AdminArtworkNew from '@/pages/admin/AdminArtworkNew';
import AdminArtworkEdit from '@/pages/admin/AdminArtworkEdit';
import AdminOrders from '@/pages/admin/AdminOrders';
import AdminOrderDetail from '@/pages/admin/AdminOrderDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public storefront */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/artwork/:slug" element={<ArtworkDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="artworks" element={<AdminArtworks />} />
          <Route path="artworks/new" element={<AdminArtworkNew />} />
          <Route path="artworks/:id/edit" element={<AdminArtworkEdit />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:id" element={<AdminOrderDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
