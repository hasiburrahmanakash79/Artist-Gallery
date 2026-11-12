import { Link } from 'react-router-dom';
import { startingPrice, isSoldOut } from '@/data/artworks';
import { formatPrice } from '@/lib/format';
import AvailabilityTag from '../ui/AvailabilityTag';

export default function ArtworkCard({ artwork, index, aspect = 'aspect-[4/5]' }) {
  const soldOut = isSoldOut(artwork);
  return (
    <Link to={`/artwork/${artwork.slug}`} className="group block">
      <div className={`relative overflow-hidden bg-stone ${aspect}`}>
        <img
          src={artwork.images[0]}
          alt={`${artwork.title}, ${artwork.medium}, ${artwork.year}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
        />
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-500" />
        <div className="absolute inset-x-0 bottom-0 flex justify-center pb-6 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <span className="bg-paper text-ink text-[12px] tracking-[0.08em] uppercase px-5 py-2.5">
            View Artwork
          </span>
        </div>
        {typeof index === 'number' && (
          <span className="absolute top-4 left-4 text-[11px] tracking-[0.05em] text-paper/90 bg-ink/60 px-2 py-1">
            No. {String(index + 1).padStart(3, '0')}
          </span>
        )}
        {soldOut && (
          <span className="absolute top-4 right-4 text-[11px] tracking-[0.05em] uppercase text-paper bg-rust/90 px-2 py-1">
            Sold Out
          </span>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg leading-snug">{artwork.title}</h3>
          <p className="text-sm text-ink-soft mt-0.5">
            {artwork.medium} &middot; {artwork.year}
          </p>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-sm text-brass">From {formatPrice(startingPrice(artwork))}</p>
        <AvailabilityTag artwork={artwork} />
      </div>
    </Link>
  );
}
