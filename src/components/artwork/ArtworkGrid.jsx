import ArtworkCard from './ArtworkCard';
import Reveal from '../ui/Reveal';

// `asymmetric` staggers card heights on desktop for an editorial rhythm,
// justified because artworks naturally vary in orientation/importance.
// The regular grid is used on the Shop page where scanning matters more.
export default function ArtworkGrid({ artworks, asymmetric = false, columns = 3 }) {
  const colClass =
    columns === 4
      ? 'sm:grid-cols-2 lg:grid-cols-4'
      : columns === 2
      ? 'sm:grid-cols-2'
      : 'sm:grid-cols-2 lg:grid-cols-3';

  if (artworks.length === 0) {
    return (
      <div className="py-24 text-center text-ink-soft">
        No artworks match your filters. Try adjusting your search.
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 ${colClass} gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16`}>
      {artworks.map((artwork, i) => (
        <Reveal key={artwork.id} delay={Math.min(i * 0.04, 0.24)}>
          <div className={asymmetric && i % 5 === 2 ? 'sm:mt-16' : ''}>
            <ArtworkCard artwork={artwork} index={i} />
          </div>
        </Reveal>
      ))}
    </div>
  );
}
