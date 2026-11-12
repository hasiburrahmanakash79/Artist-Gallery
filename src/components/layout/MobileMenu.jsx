import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { artist } from '@/data/artist';

export default function MobileMenu({ open, onClose, links }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-ink/40 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-[82%] max-w-sm bg-paper z-50 lg:hidden flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-6 h-20 border-b border-line">
              <span className="font-display text-lg">{artist.name}</span>
              <button aria-label="Close menu" onClick={onClose}>
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-col px-6 py-8 gap-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `py-3.5 border-b border-line text-lg font-display ${
                      isActive ? 'text-brass' : 'text-ink'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
