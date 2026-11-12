import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({ quantity, setQuantity, max = 99 }) {
  return (
    <div className="flex items-center border border-line w-fit">
      <button
        aria-label="Decrease quantity"
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
        disabled={quantity <= 1}
        className="p-3 disabled:opacity-30"
      >
        <Minus size={14} strokeWidth={1.5} />
      </button>
      <span className="w-10 text-center">{quantity}</span>
      <button
        aria-label="Increase quantity"
        onClick={() => setQuantity(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        className="p-3 disabled:opacity-30"
      >
        <Plus size={14} strokeWidth={1.5} />
      </button>
    </div>
  );
}
