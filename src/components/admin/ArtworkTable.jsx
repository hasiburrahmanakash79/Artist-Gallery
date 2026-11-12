import { Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { startingPrice, isSoldOut } from '@/data/artworks';
import { formatPrice } from '@/lib/format';

export default function ArtworkTable({ artworks, onDelete }) {
  if (artworks.length === 0) {
    return <p className="text-ink-soft py-12 text-center">No artworks yet. Add your first piece.</p>;
  }

  return (
    <div className="overflow-x-auto border border-line">
      <table className="w-full text-sm min-w-[700px]">
        <thead>
          <tr className="border-b border-line text-left text-ink-soft text-[12px] uppercase tracking-[0.04em]">
            <th className="py-3 px-4 font-medium">Artwork</th>
            <th className="py-3 px-4 font-medium">Category</th>
            <th className="py-3 px-4 font-medium">From</th>
            <th className="py-3 px-4 font-medium">Stock</th>
            <th className="py-3 px-4 font-medium">Status</th>
            <th className="py-3 px-4 font-medium">Featured</th>
            <th className="py-3 px-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {artworks.map((a) => {
            const totalStock = a.variants.reduce((s, v) => s + v.stock, 0);
            return (
              <tr key={a.id} className="border-b border-line last:border-0">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img src={a.images[0]} alt="" className="h-12 w-10 object-cover shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium truncate max-w-[180px]">{a.title}</p>
                      <p className="text-xs text-ink-soft">{a.medium}, {a.year}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">{a.category}</td>
                <td className="py-3 px-4 text-brass">{formatPrice(startingPrice(a))}</td>
                <td className="py-3 px-4">{totalStock}</td>
                <td className="py-3 px-4">
                  <span className={isSoldOut(a) ? 'text-rust' : 'text-moss'}>
                    {isSoldOut(a) ? 'Sold Out' : 'Available'}
                  </span>
                </td>
                <td className="py-3 px-4">{a.featured ? 'Yes' : '—'}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      to={`/admin/artworks/${a.id}/edit`}
                      aria-label={`Edit ${a.title}`}
                      className="text-ink-soft hover:text-ink transition-colors"
                    >
                      <Pencil size={15} strokeWidth={1.5} />
                    </Link>
                    <button
                      aria-label={`Delete ${a.title}`}
                      onClick={() => onDelete(a)}
                      className="text-ink-soft hover:text-rust transition-colors"
                    >
                      <Trash2 size={15} strokeWidth={1.5} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
