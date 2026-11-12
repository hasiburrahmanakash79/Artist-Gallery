import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/lib/format';
import CartItem from './CartItem';
import Button from '../ui/Button';

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const navigate = useNavigate();

  const goCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const goCart = () => {
    closeCart();
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-ink/40 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed top-0 right-0 bottom-0 w-full sm:w-105 bg-paper z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-6 h-20 border-b border-line shrink-0">
              <h2 className="font-display text-xl">
                Your Selection {items.length > 0 && `(${items.length})`}
              </h2>
              <button aria-label="Close cart" onClick={closeCart}>
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16">
                  <p className="text-ink-soft">Your selection is empty.</p>
                  <Button variant="outline" onClick={() => { closeCart(); navigate('/shop'); }}>
                    Browse the Shop
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <CartItem key={`${item.artworkId}-${item.size}`} item={item} onNavigate={closeCart} />
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-line px-6 py-6 shrink-0">
                <div className="flex justify-between mb-5 text-sm">
                  <span className="text-ink-soft">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex flex-col gap-3">
                  <Button variant="primary" onClick={goCheckout} className="w-full">
                    Proceed to Checkout
                  </Button>
                  <Button variant="ghost" onClick={goCart} className="w-full">
                    View Cart
                  </Button>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
