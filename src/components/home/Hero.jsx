import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, Mouse } from 'lucide-react';
import { artist } from '@/data/artist';
import { getFeaturedArtworks } from '@/data/artworks';
import Button from '../ui/Button';

export default function Hero() {
  const hero = getFeaturedArtworks()[1];

  return (
    <section className="relative min-h-screen border-b border-line flex flex-col">
      {/* Main content area – fills the available height */}
      <div className="flex-1 mx-auto max-w-360 w-full px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
        
        {/* Editorial text block */}
        <motion.div
          className="lg:col-span-5 lg:col-start-1 order-2 lg:order-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm text-ink-soft mb-4">{artist.location}</p>
          
          <h1 className="font-display text-[12vw] leading-[0.95] sm:text-6xl lg:text-[3.4rem] xl:text-[3.9rem] tracking-tight">
            Art that
            <br />
            tells a story
          </h1>
          
          <p className="mt-6 max-w-sm text-ink-soft leading-relaxed">
            {artist.statement}
          </p>
          
          <div className="flex flex-wrap gap-4 mt-9">
            <Button as={Link} to="/gallery" variant="primary">
              Explore Gallery
            </Button>
            <Button as={Link} to="/shop" variant="outline">
              Shop Artwork
            </Button>
          </div>
        </motion.div>

        {/* Featured image – fills height cleanly */}
        <motion.div
          className="lg:col-span-7 order-1 lg:order-2 relative h-[55vh] sm:h-[60vh] lg:h-[75vh] max-h-205"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="h-full w-full overflow-hidden bg-stone">
            <img
              src={hero.images[0]}
              alt={`${hero.title}, featured artwork by ${artist.name}`}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Artwork caption */}
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-paper/90 backdrop-blur-sm px-4 py-2.5 max-w-55">
            <p className="font-display text-sm">{hero.title}</p>
            <p className="text-xs text-ink-soft mt-0.5">
              {hero.medium}, {hero.year}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator – stays at the very bottom */}
      <div className="hidden md:flex justify-center pb-8">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-ink-soft"
        >
          <Mouse size={28} strokeWidth={1.5} />
        </motion.div>
      </div>
    </section>
  );
}