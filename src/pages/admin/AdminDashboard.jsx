import { useEffect } from 'react';
import { useArtworkStore } from '@/store/useArtworkStore';
import { useOrderStore } from '@/store/useOrderStore';
import { isSoldOut } from '@/data/artworks';
import { formatPrice } from '@/lib/format';
import { artist } from '@/data/artist';
import StatCard from '@/components/admin/StatCard';
import OrderTable from '@/components/admin/OrderTable';

export default function AdminDashboard() {
  const artworks = useArtworkStore((s) => s.artworks);
  const orders = useOrderStore((s) => s.orders);

  useEffect(() => {
    document.title = `Dashboard — ${artist.name} Studio`;
  }, []);

  const available = artworks.filter((a) => !isSoldOut(a)).length;
  const pending = orders.filter((o) => o.status === 'Pending').length;
  const delivered = orders.filter((o) => o.status === 'Delivered').length;
  const totalSales = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-12">
        <StatCard label="Total Artworks" value={artworks.length} />
        <StatCard label="Available" value={available} />
        <StatCard label="Total Orders" value={orders.length} />
        <StatCard label="Pending Orders" value={pending} />
        <StatCard label="Delivered" value={delivered} />
        <StatCard label="Total Sales" value={formatPrice(totalSales)} />
      </div>

      <h2 className="font-display text-2xl mb-4">Recent Orders</h2>
      <OrderTable orders={orders.slice(0, 6)} />
    </div>
  );
}
