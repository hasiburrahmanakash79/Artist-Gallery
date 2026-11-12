import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-5 py-32 text-center">
      <p className="font-display text-7xl text-brass mb-4">404</p>
      <h1 className="font-display text-3xl mb-3">This piece isn't on display.</h1>
      <p className="text-ink-soft mb-8">
        The page you're looking for may have been moved or no longer exists.
      </p>
      <Button as={Link} to="/" variant="primary">Back to Home</Button>
    </div>
  );
}
