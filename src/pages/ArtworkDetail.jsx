import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Truck, Award } from 'lucide-react';
import { useArtworkStore } from '@/store/useArtworkStore';
import { getRelatedArtworks, isSoldOut } from '@/data/artworks';
import { artist } from '@/data/artist';
import { formatPrice } from '@/lib/format';
import { useCartStore } from '@/store/useCartStore';
import ArtworkGallery from '@/components/artwork/ArtworkGallery';
import SizeSelector from '@/components/artwork/SizeSelector';
import QuantitySelector from '@/components/artwork/QuantitySelector';
import AvailabilityTag from '@/components/ui/AvailabilityTag';
import Button from '@/components/ui/Button';
import ArtworkGrid from '@/components/artwork/ArtworkGrid';
import Reveal from '@/components/ui/Reveal';
import NotFound from './NotFound';

export default function ArtworkDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const artwork = useArtworkStore((s) => s.getBySlug(slug));
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (artwork) {
      document.title = `${artwork.title} — ${artist.name}`;
      const firstAvailable = artwork.variants.find((v) => v.stock > 0);
      setSelectedVariant(firstAvailable || artwork.variants[0]);
      setQuantity(1);
      setAdded(false);
      window.scrollTo(0, 0);
    }
  }, [artwork]);

  if (!artwork) return <NotFound />;

  const soldOut = isSoldOut(artwork);
  const related = getRelatedArtworks(artwork);

  const handleAdd = () => {
    if (!selectedVariant || selectedVariant.stock === 0) return;
    addItem(artwork, selectedVariant, quantity);
    setAdded(true);
    openCart();
  };

  const handleBuyNow = () => {
    if (!selectedVariant || selectedVariant.stock === 0) return;
    addItem(artwork, selectedVariant, quantity);
    navigate('/checkout');
  };

  return (
    <div className="pb-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 pt-8 pb-4 text-sm text-ink-soft">
        <Link to="/gallery" className="hover:text-ink transition-colors">Gallery</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{artwork.title}</span>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 pt-6">
        <div className="lg:sticky lg:top-28 self-start">
          <ArtworkGallery images={artwork.images} title={artwork.title} />
        </div>

        <div>
          <p className="text-sm text-ink-soft mb-2">{artist.name}</p>
          <h1 className="font-display text-4xl md:text-5xl tracking-tight leading-tight">
            {artwork.title}
          </h1>
          <div className="flex items-center gap-3 mt-4">
            <p className="text-ink-soft">
              {artwork.medium} &middot; {artwork.year}
            </p>
            <span className="text-line">|</span>
            <AvailabilityTag artwork={artwork} />
          </div>

          <p className="mt-6 text-ink-soft leading-relaxed max-w-lg">
            {artwork.description}
          </p>

          <div className="mt-8 pt-8 border-t border-line">
            {selectedVariant && (
              <p className="font-display text-3xl text-brass mb-6">
                {formatPrice(selectedVariant.price)}
              </p>
            )}

            <SizeSelector
              variants={artwork.variants}
              selected={selectedVariant}
              onSelect={(v) => { setSelectedVariant(v); setAdded(false); }}
            />

            <div className="mt-6">
              <p className="text-[13px] uppercase tracking-[0.06em] text-ink-soft mb-3">
                Quantity
              </p>
              <QuantitySelector
                quantity={quantity}
                setQuantity={setQuantity}
                max={selectedVariant?.stock || 1}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Button
                variant="outline"
                onClick={handleAdd}
                disabled={soldOut || !selectedVariant || selectedVariant.stock === 0}
                className="flex-1"
              >
                {added ? 'Added ✓' : 'Add to Cart'}
              </Button>
              <Button
                variant="primary"
                onClick={handleBuyNow}
                disabled={soldOut || !selectedVariant || selectedVariant.stock === 0}
                className="flex-1"
              >
                Buy Now
              </Button>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-line grid grid-cols-1 gap-4 text-sm text-ink-soft">
            <div className="flex items-start gap-3">
              <Truck size={17} strokeWidth={1.5} className="mt-0.5 shrink-0" />
              <span>Carefully packed and shipped nationwide. Delivery in 3–7 business days.</span>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck size={17} strokeWidth={1.5} className="mt-0.5 shrink-0" />
              <span>Pay on delivery — no advance payment required.</span>
            </div>
            <div className="flex items-start gap-3">
              <Award size={17} strokeWidth={1.5} className="mt-0.5 shrink-0" />
              <span>Ships with a signed certificate of authenticity.</span>
            </div>
          </div>

          <details className="mt-10 border-t border-line pt-6 group">
            <summary className="cursor-pointer font-display text-xl flex items-center justify-between">
              Artwork Details
              <span className="text-ink-soft group-open:rotate-45 transition-transform">+</span>
            </summary>
            <dl className="mt-5 grid grid-cols-2 gap-y-3 text-sm">
              <dt className="text-ink-soft">Medium</dt>
              <dd>{artwork.medium}</dd>
              <dt className="text-ink-soft">Surface</dt>
              <dd>{artwork.surface}</dd>
              <dt className="text-ink-soft">Year</dt>
              <dd>{artwork.year}</dd>
              <dt className="text-ink-soft">Category</dt>
              <dd>{artwork.category}</dd>
              <dt className="text-ink-soft">Framing</dt>
              <dd>{artwork.framing}</dd>
              <dt className="text-ink-soft">Shipping</dt>
              <dd>Nationwide, Cash on Delivery</dd>
            </dl>
          </details>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 mt-24 pt-16 border-t border-line">
          <Reveal className="mb-12">
            <h2 className="font-display text-3xl md:text-4xl tracking-tight">You May Also Like</h2>
          </Reveal>
          <ArtworkGrid artworks={related} columns={4} />
        </div>
      )}
    </div>
  );
}
