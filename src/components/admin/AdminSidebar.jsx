import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Image, ShoppingBag, LogOut, ExternalLink } from 'lucide-react';
import clsx from 'clsx';
import { artist } from '@/data/artist';
import { useAuthStore } from '@/store/useAuthStore';

const LINKS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/artworks', label: 'Artworks', icon: Image },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
];

export default function AdminSidebar() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <aside className="w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-line bg-paper-dim md:min-h-screen">
      <div className="px-6 h-20 flex items-center border-b border-line">
        <span className="font-display text-lg">{artist.name}</span>
      </div>
      <nav className="flex md:flex-col px-3 md:px-4 py-4 gap-1 overflow-x-auto">
        {LINKS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 py-2.5 text-sm whitespace-nowrap transition-colors',
                isActive ? 'bg-ink text-paper' : 'text-ink-soft hover:bg-stone hover:text-ink'
              )
            }
          >
            <Icon size={16} strokeWidth={1.5} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-line hidden md:flex flex-col gap-1">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 text-sm text-ink-soft hover:text-ink transition-colors"
        >
          <ExternalLink size={16} strokeWidth={1.5} />
          View Site
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 text-sm text-ink-soft hover:text-rust transition-colors"
        >
          <LogOut size={16} strokeWidth={1.5} />
          Log Out
        </button>
      </div>
    </aside>
  );
}
