import { Link } from 'react-router-dom';
import { artist } from '@/data/artist';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';

export default function ArtistIntro() {
  return (
    <section className="border-t border-line bg-paper-dim">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <Reveal className="order-2 lg:order-1">
          <p className="text-[13px] uppercase tracking-[0.06em] text-brass mb-4">
            The Artist
          </p>
          <h2 className="font-display text-3xl md:text-4xl leading-tight tracking-tight mb-6">
            {artist.name}
          </h2>
          <p className="text-ink-soft leading-relaxed mb-5">{artist.bioShort}</p>
          <p className="font-display italic text-lg leading-relaxed text-ink-soft mb-8 max-w-md">
            "{artist.philosophy}"
          </p>
          <Button as={Link} to="/about" variant="outline">
            Read More
          </Button>
        </Reveal>

        <Reveal delay={0.1} className="order-1 lg:order-2 relative">
          <div className="aspect-[4/5] max-w-md mx-auto overflow-hidden bg-stone">
            <img
              src="https://picsum.photos/seed/artist-portrait/900/1125"
              alt={`Portrait of ${artist.name} in her studio`}
              className="h-full w-full object-cover"
            />
          </div>
          {/* signature-style flourish */}
          <svg
            className="absolute -bottom-6 -left-4 w-28 h-14 text-brass hidden sm:block"
            viewBox="0 0 140 60"
            fill="none"
          >
            <path
              d="M5 45C20 10 35 55 50 30C60 12 65 40 80 25C90 15 100 45 135 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </Reveal>
      </div>
    </section>
  );
}
