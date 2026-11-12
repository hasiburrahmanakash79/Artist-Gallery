import { useEffect, useState } from 'react';
import { useOrderStore, ORDER_STATUSES } from '@/store/useOrderStore';
import { artist } from '@/data/artist';
import OrderTable from '@/components/admin/OrderTable';

export default function AdminOrders() {
  const orders = useOrderStore((s) => s.orders);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    document.title = `Orders — ${artist.name} Studio`;
  }, []);

  const filtered =
    statusFilter === 'All' ? orders : orders.filter((o) => o.status === statusFilter);

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="font-display text-3xl">Orders</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-transparent border border-line px-3 py-2 text-sm outline-none"
        >
          <option value="All">All Statuses</option>
          {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <OrderTable orders={filtered} />
    </div>
  );
}
