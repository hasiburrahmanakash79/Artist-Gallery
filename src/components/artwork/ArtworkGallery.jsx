import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export default function ArtworkGallery({ images, title }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const next = () => setActive((a) => (a + 1) % images.length);
  const prev = () => setActive((a) => (a - 1 + images.length) % images.length);

  return (
    <div>
      <div
        className="relative bg-stone overflow-hidden cursor-zoom-in group aspect-[4/5]"
        onClick={() => setLightbox(true)}
      >
        <img
          src={images[active]}
          alt={`${title} — view ${active + 1}`}
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-4 right-4 bg-paper/90 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn size={16} strokeWidth={1.5} />
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 mt-4">
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              className={`h-20 w-16 shrink-0 overflow-hidden border transition-colors ${
                active === i ? 'border-ink' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[60] bg-ink/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
          >
            <button
              aria-label="Close fullscreen view"
              className="absolute top-6 right-6 text-paper"
              onClick={() => setLightbox(false)}
            >
              <X size={28} strokeWidth={1.5} />
            </button>
            {images.length > 1 && (
              <>
                <button
                  aria-label="Previous image"
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-4 md:left-8 text-paper"
                >
                  <ChevronLeft size={32} strokeWidth={1.5} />
                </button>
                <button
                  aria-label="Next image"
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-4 md:right-8 text-paper"
                >
                  <ChevronRight size={32} strokeWidth={1.5} />
                </button>
              </>
            )}
            <motion.img
              key={active}
              src={images[active]}
              alt={`${title} — fullscreen view ${active + 1}`}
              className="max-h-[88vh] max-w-[88vw] object-contain"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
