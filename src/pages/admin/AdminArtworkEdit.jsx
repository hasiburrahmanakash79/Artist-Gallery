import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useArtworkStore } from '@/store/useArtworkStore';
import { artist } from '@/data/artist';
import ArtworkForm from '@/components/admin/ArtworkForm';

export default function AdminArtworkEdit() {
  const { id } = useParams();
  const artwork = useArtworkStore((s) => s.artworks.find((a) => a.id === id));
  const updateArtwork = useArtworkStore((s) => s.updateArtwork);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Edit Artwork — ${artist.name} Studio`;
  }, []);

  if (!artwork) {
    return (
      <div>
        <p className="text-ink-soft">Artwork not found.</p>
        <Link to="/admin/artworks" className="text-sm underline">Back to Artworks</Link>
      </div>
    );
  }

  const handleSubmit = (values) => {
    updateArtwork(artwork.id, values);
    navigate('/admin/artworks');
  };

  return (
    <div>
      <Link to="/admin/artworks" className="text-sm text-ink-soft hover:text-ink transition-colors">
        &larr; Back to Artworks
      </Link>
      <h1 className="font-display text-3xl mt-4 mb-8">Edit "{artwork.title}"</h1>
      <ArtworkForm initial={artwork} onSubmit={handleSubmit} submitLabel="Save Changes" />
    </div>
  );
}
