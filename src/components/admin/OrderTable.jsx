import { Link } from 'react-router-dom';
import { formatPrice } from '@/lib/format';
import OrderStatusBadge from './OrderStatusBadge';

export default function OrderTable({ orders }) {
  if (orders.length === 0) {
    return <p className="text-ink-soft py-12 text-center">No orders yet.</p>;
  }

  return (
    <div className="overflow-x-auto border border-line">
      <table className="w-full text-sm min-w-[760px]">
        <thead>
          <tr className="border-b border-line text-left text-ink-soft text-[12px] uppercase tracking-[0.04em]">
            <th className="py-3 px-4 font-medium">Order ID</th>
            <th className="py-3 px-4 font-medium">Customer</th>
            <th className="py-3 px-4 font-medium">Items</th>
            <th className="py-3 px-4 font-medium">Total</th>
            <th className="py-3 px-4 font-medium">Date</th>
            <th className="py-3 px-4 font-medium">Status</th>
            <th className="py-3 px-4 font-medium text-right">Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.orderId} className="border-b border-line last:border-0">
              <td className="py-3 px-4 font-medium">{o.orderId}</td>
              <td className="py-3 px-4">
                <p>{o.customer.name}</p>
                <p className="text-xs text-ink-soft">{o.customer.phone}</p>
              </td>
              <td className="py-3 px-4">{o.items.length} item{o.items.length > 1 ? 's' : ''}</td>
              <td className="py-3 px-4 text-brass">{formatPrice(o.total)}</td>
              <td className="py-3 px-4 text-ink-soft">
                {new Date(o.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </td>
              <td className="py-3 px-4"><OrderStatusBadge status={o.status} /></td>
              <td className="py-3 px-4 text-right">
                <Link to={`/admin/orders/${o.orderId}`} className="text-sm underline underline-offset-2">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
