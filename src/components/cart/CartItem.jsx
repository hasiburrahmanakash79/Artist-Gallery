import { Link } from 'react-router-dom';
import { Minus, Plus, X } from 'lucide-react';
import { formatPrice } from '@/lib/format';
import { useCartStore } from '@/store/useCartStore';

export default function CartItem({ item, onNavigate }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex gap-4 py-6 border-b border-line">
      <Link to={`/artwork/${item.slug}`} onClick={onNavigate} className="shrink-0">
        <img
          src={item.image}
          alt={item.title}
          className="h-28 w-24 object-cover"
        />
      </Link>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link
              to={`/artwork/${item.slug}`}
              onClick={onNavigate}
              className="font-display text-lg leading-tight hover:text-brass transition-colors"
            >
              {item.title}
            </Link>
            <p className="text-sm text-ink-soft mt-1">Size: {item.size}</p>
          </div>
          <button
            aria-label={`Remove ${item.title}`}
            onClick={() => removeItem(item.artworkId, item.size)}
            className="text-ink-soft hover:text-rust transition-colors shrink-0"
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border border-line">
            <button
              aria-label="Decrease quantity"
              onClick={() => updateQuantity(item.artworkId, item.size, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="p-2 disabled:opacity-30"
            >
              <Minus size={13} strokeWidth={1.5} />
            </button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <button
              aria-label="Increase quantity"
              onClick={() => updateQuantity(item.artworkId, item.size, item.quantity + 1)}
              disabled={item.quantity >= item.stock}
              className="p-2 disabled:opacity-30"
            >
              <Plus size={13} strokeWidth={1.5} />
            </button>
          </div>
          <p className="text-brass font-medium">{formatPrice(item.price * item.quantity)}</p>
        </div>
      </div>
    </div>
  );
}
