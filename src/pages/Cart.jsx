import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/lib/format';
import CartItem from '@/components/cart/CartItem';
import Button from '@/components/ui/Button';
import { artist } from '@/data/artist';

const SHIPPING_FLAT_RATE = 250;

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Your Cart — ${artist.name}`;
  }, []);

  const shipping = items.length > 0 ? SHIPPING_FLAT_RATE : 0;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-32 text-center">
        <h1 className="font-display text-4xl mb-4">Your cart is empty</h1>
        <p className="text-ink-soft mb-8">
          Browse the collection to find a piece you love.
        </p>
        <Button as={Link} to="/shop" variant="primary">Shop Artwork</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-5 md:px-10 pt-16 pb-24">
      <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-12">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <CartItem key={`${item.artworkId}-${item.size}`} item={item} />
          ))}
          <Link
            to="/shop"
            className="inline-block mt-6 text-sm uppercase tracking-wide border-b border-ink pb-1"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="lg:col-span-1 border border-line p-7 h-fit">
          <h2 className="font-display text-xl mb-6">Order Summary</h2>
          <div className="flex justify-between text-sm mb-3">
            <span className="text-ink-soft">Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm mb-5">
            <span className="text-ink-soft">Shipping</span>
            <span>{formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between border-t border-line pt-5 mb-7 font-medium">
            <span>Total</span>
            <span className="text-brass font-display text-lg">
              {formatPrice(subtotal + shipping)}
            </span>
          </div>
          <Button
            variant="primary"
            className="w-full"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
