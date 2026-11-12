import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '@/store/useCartStore';
import { useOrderStore } from '@/store/useOrderStore';
import { useArtworkStore } from '@/store/useArtworkStore';
import { formatPrice } from '@/lib/format';
import { artist } from '@/data/artist';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import Button from '@/components/ui/Button';

const SHIPPING_FLAT_RATE = 250;

const EMPTY_VALUES = {
  name: '', phone: '', email: '', address: '', city: '', area: '', postalCode: '', notes: '',
};

export default function Checkout() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const clearCart = useCartStore((s) => s.clearCart);
  const placeOrder = useOrderStore((s) => s.placeOrder);
  const decrementStock = useArtworkStore((s) => s.decrementStock);
  const navigate = useNavigate();

  const [values, setValues] = useState(EMPTY_VALUES);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = `Checkout — ${artist.name}`;
  }, []);

  useEffect(() => {
    if (items.length === 0) navigate('/cart');
  }, [items, navigate]);

  const shipping = items.length > 0 ? SHIPPING_FLAT_RATE : 0;

  const onChange = (field, value) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Full name is required.';
    if (!/^01[0-9]{9}$/.test(values.phone.replace(/\s|-/g, '')))
      next.phone = 'Enter a valid Bangladeshi phone number.';
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email))
      next.email = 'Enter a valid email address.';
    if (!values.address.trim()) next.address = 'Delivery address is required.';
    if (!values.city.trim()) next.city = 'City is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;
    setSubmitting(true);

    const order = placeOrder({
      customer: { ...values },
      items,
      subtotal,
      shipping,
    });

    items.forEach((item) => decrementStock(item.artworkId, item.size, item.quantity));
    clearCart();
    navigate(`/order-confirmation/${order.orderId}`);
  };

  if (items.length === 0) return null;

  return (
    <div className="mx-auto max-w-[1440px] px-5 md:px-10 pt-16 pb-24">
      <div className="mb-12">
        <Link to="/cart" className="text-sm text-ink-soft hover:text-ink transition-colors">
          &larr; Back to Cart
        </Link>
        <h1 className="font-display text-4xl md:text-5xl tracking-tight mt-4">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <CheckoutForm values={values} errors={errors} onChange={onChange} />

          <div className="border-t border-line pt-8">
            <h2 className="font-display text-2xl mb-4">Payment Method</h2>
            <div className="border border-ink p-5 flex items-start gap-4">
              <span className="mt-1 h-4 w-4 rounded-full border-4 border-ink shrink-0" />
              <div>
                <p className="font-medium">Cash on Delivery</p>
                <p className="text-sm text-ink-soft mt-1">
                  Pay when your artwork is delivered.
                </p>
              </div>
            </div>
          </div>

          <Button
            variant="primary"
            className="w-full lg:hidden"
            onClick={handlePlaceOrder}
            disabled={submitting}
          >
            Place Order &middot; {formatPrice(subtotal + shipping)}
          </Button>
        </div>

        <div className="lg:col-span-1">
          <OrderSummary items={items} subtotal={subtotal} shipping={shipping} />
          <Button
            variant="primary"
            className="w-full mt-6 hidden lg:flex"
            onClick={handlePlaceOrder}
            disabled={submitting}
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
}
