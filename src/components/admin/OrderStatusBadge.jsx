import clsx from 'clsx';

const STATUS_STYLES = {
  Pending: 'bg-stone text-ink-soft',
  Confirmed: 'bg-brass-dim/40 text-brass',
  Processing: 'bg-brass-dim/40 text-brass',
  Shipped: 'bg-moss/15 text-moss',
  Delivered: 'bg-moss/25 text-moss',
  Cancelled: 'bg-rust/15 text-rust',
};

export default function OrderStatusBadge({ status }) {
  return (
    <span
      className={clsx(
        'inline-block text-[11px] uppercase tracking-[0.05em] px-2.5 py-1 whitespace-nowrap',
        STATUS_STYLES[status] || 'bg-stone text-ink-soft'
      )}
    >
      {status}
    </span>
  );
}
