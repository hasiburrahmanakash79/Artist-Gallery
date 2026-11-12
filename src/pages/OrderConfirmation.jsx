import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useOrderStore } from '@/store/useOrderStore';
import { formatPrice } from '@/lib/format';
import { artist } from '@/data/artist';
import Button from '@/components/ui/Button';
import NotFound from './NotFound';

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const order = useOrderStore((s) => s.getOrder(orderId));

  useEffect(() => {
    document.title = `Order Confirmed — ${artist.name}`;
    window.scrollTo(0, 0);
  }, []);

  if (!order) return <NotFound />;

  return (
    <div className="mx-auto max-w-2xl px-5 md:px-10 py-24 text-center">
      <CheckCircle2 size={44} strokeWidth={1.2} className="mx-auto text-moss mb-6" />
      <h1 className="font-display text-4xl md:text-5xl tracking-tight">
        Thank you for your order.
      </h1>
      <p className="text-ink-soft mt-4">
        Your artwork order has been received and is being prepared for delivery.
      </p>

      <div className="border border-line text-left mt-12 p-7 md:p-9">
        <div className="flex justify-between items-baseline pb-6 mb-6 border-b border-line">
          <div>
            <p className="text-[13px] uppercase tracking-[0.05em] text-ink-soft">Order ID</p>
            <p className="font-display text-xl mt-1">{order.orderId}</p>
          </div>
          <span className="text-[11px] uppercase tracking-[0.05em] bg-stone px-3 py-1.5">
            {order.status}
          </span>
        </div>

        <div className="space-y-5 mb-6">
          {order.items.map((item) => (
            <div key={`${item.artworkId}-${item.size}`} className="flex gap-4">
              <img src={item.image} alt={item.title} className="h-20 w-16 object-cover shrink-0" />
              <div className="flex-1">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-ink-soft">{item.size} &middot; Qty {item.quantity}</p>
              </div>
              <p className="text-brass">{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-line pt-5 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-ink-soft">Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-soft">Shipping</span>
            <span>{formatPrice(order.shipping)}</span>
          </div>
          <div className="flex justify-between font-medium text-base pt-2">
            <span>Total</span>
            <span className="text-brass font-display text-lg">{formatPrice(order.total)}</span>
          </div>
        </div>

        <div className="border-t border-line mt-6 pt-6 text-sm">
          <p className="text-[13px] uppercase tracking-[0.05em] text-ink-soft mb-2">
            Delivery Information
          </p>
          <p>{order.customer.name} &middot; {order.customer.phone}</p>
          <p className="text-ink-soft mt-0.5">
            {order.customer.address}, {order.customer.area && `${order.customer.area}, `}
            {order.customer.city} {order.customer.postalCode}
          </p>
          <p className="text-ink-soft mt-2">Payment: Cash on Delivery</p>
        </div>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
        <Button as={Link} to="/shop" variant="outline">Continue Shopping</Button>
        <Button as={Link} to="/" variant="primary">Back to Home</Button>
      </div>
    </div>
  );
}
