import { Link } from 'react-router-dom';
import { artist } from '@/data/artist';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link to="/" className="font-display text-2xl">
            {artist.name}
          </Link>
          <p className="mt-4 max-w-sm text-ink-soft leading-relaxed">
            {artist.statement}
          </p>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.08em] text-ink-soft mb-4">
            Explore
          </p>
          <ul className="space-y-2.5">
            {[
              ['Gallery', '/gallery'],
              ['Shop', '/shop'],
              ['About', '/about'],
              ['Contact', '/contact'],
            ].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="text-ink hover:text-brass transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.08em] text-ink-soft mb-4">
            Studio
          </p>
          <ul className="space-y-2.5 text-ink-soft">
            <li>{artist.location}</li>
            <li>
              <a href={`mailto:${artist.email}`} className="hover:text-brass transition-colors">
                {artist.email}
              </a>
            </li>
            <li>
              <a href={`tel:${artist.phone}`} className="hover:text-brass transition-colors">
                {artist.phone}
              </a>
            </li>
          </ul>
          <div className="flex gap-4 mt-5 text-sm">
            <a href={artist.instagram} className="text-ink hover:text-brass transition-colors underline underline-offset-2">
              Instagram
            </a>
            <a href={artist.facebook} className="text-ink hover:text-brass transition-colors underline underline-offset-2">
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-ink-soft">
          <p>&copy; {new Date().getFullYear()} {artist.name}. All artworks reserved.</p>
          <Link to="/admin/login" className="hover:text-brass transition-colors">
            Studio Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
