import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useArtworkStore } from '@/store/useArtworkStore';
import { artist } from '@/data/artist';
import ArtworkTable from '@/components/admin/ArtworkTable';
import Button from '@/components/ui/Button';

export default function AdminArtworks() {
  const artworks = useArtworkStore((s) => s.artworks);
  const deleteArtwork = useArtworkStore((s) => s.deleteArtwork);
  const [confirming, setConfirming] = useState(null);

  useEffect(() => {
    document.title = `Artworks — ${artist.name} Studio`;
  }, []);

  const handleDelete = (artwork) => setConfirming(artwork);
  const confirmDelete = () => {
    deleteArtwork(confirming.id);
    setConfirming(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl">Artworks</h1>
        <Button as={Link} to="/admin/artworks/new" variant="primary">
          <Plus size={15} strokeWidth={2} /> Add Artwork
        </Button>
      </div>

      <ArtworkTable artworks={artworks} onDelete={handleDelete} />

      {confirming && (
        <div className="fixed inset-0 bg-ink/40 z-50 flex items-center justify-center px-5">
          <div className="bg-paper max-w-sm w-full p-7">
            <h2 className="font-display text-xl mb-2">Delete "{confirming.title}"?</h2>
            <p className="text-ink-soft text-sm mb-6">
              This will permanently remove the artwork from your gallery and shop.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setConfirming(null)} className="flex-1">
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={confirmDelete}
                className="flex-1 !bg-rust !border-rust hover:!bg-ink hover:!border-ink"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
