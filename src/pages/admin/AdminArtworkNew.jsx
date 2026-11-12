import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useArtworkStore } from '@/store/useArtworkStore';
import { artist } from '@/data/artist';
import ArtworkForm from '@/components/admin/ArtworkForm';

export default function AdminArtworkNew() {
  const addArtwork = useArtworkStore((s) => s.addArtwork);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `New Artwork — ${artist.name} Studio`;
  }, []);

  const handleSubmit = (values) => {
    addArtwork(values);
    navigate('/admin/artworks');
  };

  return (
    <div>
      <Link to="/admin/artworks" className="text-sm text-ink-soft hover:text-ink transition-colors">
        &larr; Back to Artworks
      </Link>
      <h1 className="font-display text-3xl mt-4 mb-8">Add New Artwork</h1>
      <ArtworkForm onSubmit={handleSubmit} submitLabel="Publish Artwork" />
    </div>
  );
}
