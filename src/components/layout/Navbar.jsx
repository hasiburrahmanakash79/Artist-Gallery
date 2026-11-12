import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import clsx from "clsx";
import { artist } from "@/data/artist";
import { useCartStore } from "@/store/useCartStore";
import SearchOverlay from "./SearchOverlay";
import MobileMenu from "./MobileMenu";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/shop", label: "Shop" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const openCart = useCartStore((s) => s.openCart);
  const itemCount = useCartStore((s) => s.itemCount());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={clsx(
          "sticky top-0 z-40 transition-colors duration-300 border-b",
          scrolled
            ? "bg-paper/95 backdrop-blur border-line"
            : "bg-paper border-transparent",
        )}
      >
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 h-20 flex items-center justify-between">
          <Link
            to="/"
            className="font-display text-xl md:text-2xl tracking-tight text-ink"
          >
            {artist.name}
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  clsx(
                    "group relative text-[13px] tracking-[0.04em] uppercase transition-colors py-1",
                    isActive ? "text-ink" : "text-ink-soft hover:text-ink",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}

                    {/* Active underline */}
                    {isActive && (
                      <span className="absolute -bottom-0 left-0 right-0 h-[2px] rounded-full bg-brass" />
                    )}

                    {/* Hover underline — left to right */}
                    {!isActive && (
                      <span className="absolute -bottom-0 left-0 rounded-full w-full origin-left h-[2px] scale-x-0 bg-brass transition-transform duration-300 ease-out group-hover:scale-x-100" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-6">
            <button
              aria-label="Search artworks"
              onClick={() => setSearchOpen(true)}
              className="text-ink hover:text-brass transition-colors"
            >
              <Search size={19} strokeWidth={1.5} />
            </button>
            <button
              aria-label={`Open cart, ${itemCount} items`}
              onClick={openCart}
              className="relative text-ink hover:text-brass transition-colors"
            >
              <ShoppingBag size={19} strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brass text-paper text-[10px] leading-none h-4 w-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="lg:hidden text-ink"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}
