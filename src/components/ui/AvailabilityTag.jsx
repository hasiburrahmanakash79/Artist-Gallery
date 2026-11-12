import clsx from 'clsx';
import { isSoldOut } from '@/data/artworks';

export default function AvailabilityTag({ artwork, className }) {
  const soldOut = isSoldOut(artwork);
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 text-[11px] tracking-[0.08em] uppercase font-medium',
        soldOut ? 'text-rust' : 'text-moss',
        className
      )}
    >
      <span
        className={clsx(
          'inline-block h-1.5 w-1.5 rounded-full',
          soldOut ? 'bg-rust' : 'bg-moss'
        )}
      />
      {soldOut ? 'Sold Out' : 'Available'}
    </span>
  );
}
