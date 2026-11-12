import { formatPrice } from '@/lib/format';

export default function OrderSummary({ items, subtotal, shipping }) {
  return (
    <div className="border border-line p-7 h-fit">
      <h2 className="font-display text-xl mb-6">Order Summary</h2>

      <div className="flex flex-col gap-4 max-h-72 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={`${item.artworkId}-${item.size}`} className="flex gap-3">
            <img src={item.image} alt={item.title} className="h-16 w-14 object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{item.title}</p>
              <p className="text-xs text-ink-soft">
                {item.size} &middot; Qty {item.quantity}
              </p>
            </div>
            <p className="text-sm text-brass whitespace-nowrap">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-line mt-6 pt-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-ink-soft">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-ink-soft">Shipping</span>
          <span>{formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between border-t border-line pt-4 font-medium text-base">
          <span>Total</span>
          <span className="text-brass font-display text-lg">
            {formatPrice(subtotal + shipping)}
          </span>
        </div>
      </div>
    </div>
  );
}
