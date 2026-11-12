import { useEffect, useMemo, useState } from 'react';
import { useArtworkStore } from '@/store/useArtworkStore';
import { DEFAULT_FILTERS, applyFilters } from '@/lib/filterArtworks';
import ArtworkFilters from '@/components/artwork/ArtworkFilters';
import ArtworkGrid from '@/components/artwork/ArtworkGrid';
import Reveal from '@/components/ui/Reveal';
import { artist } from '@/data/artist';

export default function Shop() {
  const artworks = useArtworkStore((s) => s.artworks);
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS, maxPrice: null });

  useEffect(() => {
    document.title = `Shop — ${artist.name}`;
  }, []);

  const filtered = useMemo(() => applyFilters(artworks, filters), [artworks, filters]);

  return (
    <div className="mx-auto max-w-[1440px] px-5 md:px-10 pt-16 pb-24">
      <Reveal className="max-w-2xl mb-14">
        <p className="text-[13px] uppercase tracking-[0.06em] text-brass mb-3">Shop</p>
        <h1 className="font-display text-5xl md:text-6xl tracking-tight">Own an Original</h1>
        <p className="text-ink-soft mt-5 leading-relaxed">
          Every piece is an original, one-of-a-kind work. Choose a size,
          and it ships directly from the studio with a certificate of
          authenticity.
        </p>
      </Reveal>

      <ArtworkFilters
        filters={filters}
        setFilters={setFilters}
        showAvailability
        showPriceFilter
      />
      <ArtworkGrid artworks={filtered} columns={3} />
    </div>
  );
}
