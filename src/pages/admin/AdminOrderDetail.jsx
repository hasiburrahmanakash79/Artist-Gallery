import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrderStore, ORDER_STATUSES } from '@/store/useOrderStore';
import { formatPrice } from '@/lib/format';
import { artist } from '@/data/artist';
import OrderStatusBadge from '@/components/admin/OrderStatusBadge';

export default function AdminOrderDetail() {
  const { id } = useParams();
  const order = useOrderStore((s) => s.getOrder(id));
  const updateStatus = useOrderStore((s) => s.updateStatus);

  useEffect(() => {
    document.title = `Order ${id} — ${artist.name} Studio`;
  }, [id]);

  if (!order) {
    return (
      <div>
        <p className="text-ink-soft">Order not found.</p>
        <Link to="/admin/orders" className="text-sm underline">Back to Orders</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <Link to="/admin/orders" className="text-sm text-ink-soft hover:text-ink transition-colors">
        &larr; Back to Orders
      </Link>

      <div className="flex items-center justify-between mt-4 mb-8 flex-wrap gap-4">
        <h1 className="font-display text-3xl">{order.orderId}</h1>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
        <div>
          <h2 className="text-[13px] uppercase tracking-[0.05em] text-ink-soft mb-3">
            Customer
          </h2>
          <p className="font-medium">{order.customer.name}</p>
          <p className="text-ink-soft text-sm mt-1">{order.customer.phone}</p>
          <p className="text-ink-soft text-sm">{order.customer.email}</p>
        </div>
        <div>
          <h2 className="text-[13px] uppercase tracking-[0.05em] text-ink-soft mb-3">
            Delivery Address
          </h2>
          <p className="text-sm">
            {order.customer.address}
            {order.customer.area && `, ${order.customer.area}`}
          </p>
          <p className="text-sm text-ink-soft">
            {order.customer.city} {order.customer.postalCode}
          </p>
          {order.customer.notes && (
            <p className="text-sm text-ink-soft mt-2 italic">"{order.customer.notes}"</p>
          )}
        </div>
      </div>

      <h2 className="text-[13px] uppercase tracking-[0.05em] text-ink-soft mb-3">
        Items
      </h2>
      <div className="border border-line divide-y divide-line mb-8">
        {order.items.map((item) => (
          <div key={`${item.artworkId}-${item.size}`} className="flex gap-4 p-4">
            <img src={item.image} alt={item.title} className="h-16 w-14 object-cover shrink-0" />
            <div className="flex-1">
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-ink-soft">{item.size} &middot; Qty {item.quantity}</p>
            </div>
            <p className="text-brass">{formatPrice(item.price * item.quantity)}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-ink-soft">Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-soft">Shipping</span>
            <span>{formatPrice(order.shipping)}</span>
          </div>
          <div className="flex justify-between font-medium pt-2 border-t border-line">
            <span>Total</span>
            <span className="text-brass font-display text-lg">{formatPrice(order.total)}</span>
          </div>
          <div className="flex justify-between text-ink-soft pt-2">
            <span>Payment Method</span>
            <span>{order.paymentMethod}</span>
          </div>
          <div className="flex justify-between text-ink-soft">
            <span>Order Date</span>
            <span>{new Date(order.createdAt).toLocaleString('en-GB')}</span>
          </div>
        </div>

        <div>
          <h2 className="text-[13px] uppercase tracking-[0.05em] text-ink-soft mb-3">
            Update Status
          </h2>
          <select
            value={order.status}
            onChange={(e) => updateStatus(order.orderId, e.target.value)}
            className="w-full bg-transparent border border-line px-4 py-2.5 outline-none"
          >
            {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
