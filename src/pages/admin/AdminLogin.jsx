import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { artist } from '@/data/artist';
import Button from '@/components/ui/Button';

export default function AdminLogin() {
  const login = useAuthStore((s) => s.login);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = `Studio Login — ${artist.name}`;
    if (isAuthenticated) navigate('/admin', { replace: true });
  }, [isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = login(email.trim(), password);
    if (ok) {
      navigate(location.state?.from || '/admin', { replace: true });
    } else {
      setError('Incorrect email or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper-dim px-5">
      <div className="w-full max-w-sm">
        <Link to="/" className="font-display text-2xl block text-center mb-10">
          {artist.name}
        </Link>
        <div className="border border-line bg-paper p-8">
          <h1 className="font-display text-2xl mb-1">Studio Login</h1>
          <p className="text-sm text-ink-soft mb-6">Manage artworks and orders.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[13px] uppercase tracking-[0.05em] text-ink-soft mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border border-line focus:border-ink px-4 py-2.5 outline-none"
                placeholder="admin@shoron.art"
              />
            </div>
            <div>
              <label className="text-[13px] uppercase tracking-[0.05em] text-ink-soft mb-1.5 block">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border border-line focus:border-ink px-4 py-2.5 outline-none"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-rust text-sm">{error}</p>}
            <Button type="submit" variant="primary" className="w-full">Log In</Button>
          </form>

          <p className="text-xs text-ink-soft mt-6">
            Demo credentials: admin@shoron.art / gallery2026
          </p>
        </div>
      </div>
    </div>
  );
}
