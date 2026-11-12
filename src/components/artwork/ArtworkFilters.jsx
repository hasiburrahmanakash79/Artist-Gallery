import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import clsx from 'clsx';
import { CATEGORIES } from '@/data/artworks';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

const PRICE_OPTIONS = [
  { value: '', label: 'Any Price' },
  { value: '8000', label: 'Under \u09F38,000' },
  { value: '15000', label: 'Under \u09F315,000' },
  { value: '25000', label: 'Under \u09F325,000' },
];

export default function ArtworkFilters({ filters, setFilters, showAvailability = false, showPriceFilter = false }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const setField = (field, value) => setFilters((f) => ({ ...f, [field]: value }));

  const toggleCategory = (cat) => {
    setField('category', filters.category === cat ? 'All' : cat);
  };

  const clearAll = () =>
    setFilters({
      search: '',
      category: 'All',
      sort: 'newest',
      availability: 'All',
      maxPrice: null,
    });

  const activeCount =
    (filters.category !== 'All' ? 1 : 0) +
    (filters.availability !== 'All' ? 1 : 0) +
    (filters.maxPrice ? 1 : 0);

  return (
    <div className="border-b border-line pb-6 mb-10">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        <div className="relative flex-1 max-w-md">
          <Search size={16} strokeWidth={1.5} className="absolute left-0 top-1/2 -translate-y-1/2 text-ink-soft" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setField('search', e.target.value)}
            placeholder="Search artworks…"
            className="w-full bg-transparent border-b border-line focus:border-ink pl-6 pb-2 outline-none placeholder:text-ink-soft/60 transition-colors"
          />
        </div>

        <button
          className="md:hidden flex items-center gap-2 text-sm uppercase tracking-wide"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <SlidersHorizontal size={15} strokeWidth={1.5} />
          Filters {activeCount > 0 && `(${activeCount})`}
        </button>

        <div className="hidden md:flex items-center gap-6 ml-auto">
          <select
            value={filters.sort}
            onChange={(e) => setField('sort', e.target.value)}
            className="bg-transparent text-sm border-b border-line focus:border-ink outline-none pb-1 pr-2"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                Sort: {opt.label}
              </option>
            ))}
          </select>

          {showAvailability && (
            <select
              value={filters.availability}
              onChange={(e) => setField('availability', e.target.value)}
              className="bg-transparent text-sm border-b border-line focus:border-ink outline-none pb-1 pr-2"
            >
              <option value="All">All Availability</option>
              <option value="available">Available</option>
              <option value="sold">Sold Out</option>
            </select>
          )}

          {showPriceFilter && (
            <select
              value={filters.maxPrice || ''}
              onChange={(e) => setField('maxPrice', e.target.value ? Number(e.target.value) : null)}
              className="bg-transparent text-sm border-b border-line focus:border-ink outline-none pb-1 pr-2"
            >
              {PRICE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div
        className={clsx(
          'flex-wrap gap-2 mt-5',
          mobileOpen ? 'flex' : 'hidden md:flex'
        )}
      >
        <button
          onClick={() => setField('category', 'All')}
          className={clsx(
            'px-4 py-1.5 text-[13px] uppercase tracking-wide border transition-colors',
            filters.category === 'All'
              ? 'bg-ink text-paper border-ink'
              : 'border-line text-ink-soft hover:border-ink hover:text-ink'
          )}
        >
          All Works
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            className={clsx(
              'px-4 py-1.5 text-[13px] uppercase tracking-wide border transition-colors',
              filters.category === cat
                ? 'bg-ink text-paper border-ink'
                : 'border-line text-ink-soft hover:border-ink hover:text-ink'
            )}
          >
            {cat}
          </button>
        ))}

        {mobileOpen && (
          <div className="w-full flex flex-col gap-3 mt-3">
            <select
              value={filters.sort}
              onChange={(e) => setField('sort', e.target.value)}
              className="bg-transparent text-sm border border-line px-3 py-2 outline-none"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  Sort: {opt.label}
                </option>
              ))}
            </select>
            {showAvailability && (
              <select
                value={filters.availability}
                onChange={(e) => setField('availability', e.target.value)}
                className="bg-transparent text-sm border border-line px-3 py-2 outline-none"
              >
                <option value="All">All Availability</option>
                <option value="available">Available</option>
                <option value="sold">Sold Out</option>
              </select>
            )}
            {showPriceFilter && (
              <select
                value={filters.maxPrice || ''}
                onChange={(e) => setField('maxPrice', e.target.value ? Number(e.target.value) : null)}
                className="bg-transparent text-sm border border-line px-3 py-2 outline-none"
              >
                {PRICE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 px-3 py-1.5 text-[13px] text-ink-soft hover:text-rust transition-colors"
          >
            <X size={13} strokeWidth={1.5} /> Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
