import clsx from 'clsx';
import { formatPrice } from '@/lib/format';

export default function SizeSelector({ variants, selected, onSelect }) {
  return (
    <div>
      <p className="text-[13px] uppercase tracking-[0.06em] text-ink-soft mb-3">
        Size
      </p>
      <div className="flex flex-col gap-2">
        {variants.map((v) => {
          const soldOut = v.stock === 0;
          const isSelected = selected?.size === v.size;
          return (
            <button
              key={v.size}
              disabled={soldOut}
              onClick={() => onSelect(v)}
              className={clsx(
                'flex items-center justify-between border px-4 py-3.5 text-left transition-colors',
                soldOut
                  ? 'border-line text-ink-soft/40 cursor-not-allowed line-through'
                  : isSelected
                  ? 'border-ink bg-ink text-paper'
                  : 'border-line hover:border-ink'
              )}
            >
              <span className="flex items-center gap-3">
                <span
                  className={clsx(
                    'inline-block h-3.5 w-3.5 rounded-full border',
                    isSelected ? 'border-paper' : 'border-ink-soft'
                  )}
                >
                  {isSelected && (
                    <span className="block h-full w-full scale-50 rounded-full bg-paper" />
                  )}
                </span>
                {v.size}
              </span>
              <span className="text-sm">
                {soldOut ? 'Sold Out' : formatPrice(v.price)}
                {!soldOut && v.stock <= 2 && (
                  <span className="ml-2 text-[11px] text-brass">
                    Only {v.stock} left
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
