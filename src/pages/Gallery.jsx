import { useEffect, useMemo, useState } from 'react';
import { useArtworkStore } from '@/store/useArtworkStore';
import { DEFAULT_FILTERS, applyFilters } from '@/lib/filterArtworks';
import ArtworkFilters from '@/components/artwork/ArtworkFilters';
import ArtworkGrid from '@/components/artwork/ArtworkGrid';
import Reveal from '@/components/ui/Reveal';
import { artist } from '@/data/artist';

export default function Gallery() {
  const artworks = useArtworkStore((s) => s.artworks);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  useEffect(() => {
    document.title = `Gallery — ${artist.name}`;
  }, []);

  const filtered = useMemo(() => applyFilters(artworks, filters), [artworks, filters]);

  return (
    <div className="mx-auto max-w-[1440px] px-5 md:px-10 pt-16 pb-24">
      <Reveal className="max-w-2xl mb-14">
        <p className="text-[13px] uppercase tracking-[0.06em] text-brass mb-3">The Gallery</p>
        <h1 className="font-display text-5xl md:text-6xl tracking-tight">Collected Works</h1>
        <p className="text-ink-soft mt-5 leading-relaxed">
          A living archive of paintings, studies, and sketches — spanning
          finished exhibition pieces and quieter, working sketches from the
          studio.
        </p>
      </Reveal>

      <ArtworkFilters filters={filters} setFilters={setFilters} />
      <ArtworkGrid artworks={filtered} asymmetric />
    </div>
  );
}
