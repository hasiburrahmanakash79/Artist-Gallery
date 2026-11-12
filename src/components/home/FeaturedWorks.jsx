import { Link } from 'react-router-dom';
import { getFeaturedArtworks } from '@/data/artworks';
import ArtworkGrid from '../artwork/ArtworkGrid';
import Reveal from '../ui/Reveal';

export default function FeaturedWorks() {
  const featured = getFeaturedArtworks().slice(0, 6);

  return (
    <section className="mx-auto max-w-[1440px] px-5 md:px-10 py-20 md:py-28">
      <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 md:mb-16">
        <div>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight">Featured Works</h2>
          <p className="text-ink-soft mt-3 max-w-md">
            A rotating selection of recent paintings, studies, and mixed-media
            pieces from the studio.
          </p>
        </div>
        <Link
          to="/gallery"
          className="text-sm uppercase tracking-wide border-b border-ink pb-1 self-start sm:self-auto whitespace-nowrap"
        >
          View Full Gallery
        </Link>
      </Reveal>

      <ArtworkGrid artworks={featured} asymmetric />
    </section>
  );
}
