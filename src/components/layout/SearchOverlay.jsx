import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Search } from 'lucide-react';
import { artworks } from '@/data/artworks';
import { formatPrice } from '@/lib/format';

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const results =
    query.trim().length > 0
      ? artworks
          .filter(
            (a) =>
              a.title.toLowerCase().includes(query.toLowerCase()) ||
              a.category.toLowerCase().includes(query.toLowerCase()) ||
              a.medium.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 6)
      : [];

  const go = (slug) => {
    onClose();
    navigate(`/artwork/${slug}`);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-paper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="mx-auto max-w-3xl px-6 pt-24 md:pt-32">
            <div className="flex items-center justify-between mb-8">
              <span className="text-[13px] uppercase tracking-[0.08em] text-ink-soft">
                Search the collection
              </span>
              <button aria-label="Close search" onClick={onClose}>
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex items-center gap-4 border-b border-ink pb-4">
              <Search size={22} strokeWidth={1.5} className="text-ink-soft" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, medium, or category…"
                className="w-full bg-transparent font-display text-2xl md:text-3xl placeholder:text-ink-soft/50 outline-none"
              />
            </div>

            <div className="mt-8 flex flex-col divide-y divide-line">
              {results.map((a) => (
                <button
                  key={a.id}
                  onClick={() => go(a.slug)}
                  className="flex items-center gap-5 py-4 text-left hover:bg-stone/40 transition-colors -mx-4 px-4"
                >
                  <img
                    src={a.images[0]}
                    alt={a.title}
                    className="h-16 w-14 object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-display text-lg">{a.title}</p>
                    <p className="text-sm text-ink-soft">
                      {a.medium} &middot; {a.year}
                    </p>
                  </div>
                  <span className="text-sm text-brass">
                    {formatPrice(Math.min(...a.variants.map((v) => v.price)))}
                  </span>
                </button>
              ))}
              {query.trim().length > 0 && results.length === 0 && (
                <p className="py-6 text-ink-soft">
                  No artworks matched "{query}". Try another title or medium.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
