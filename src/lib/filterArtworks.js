import { startingPrice, isSoldOut } from '@/data/artworks';

export const DEFAULT_FILTERS = {
  search: '',
  category: 'All',
  sort: 'newest',
  availability: 'All',
};

export function applyFilters(artworks, filters) {
  let result = [...artworks];

  if (filters.search?.trim()) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.medium.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  }

  if (filters.category && filters.category !== 'All') {
    result = result.filter((a) => a.category === filters.category);
  }

  if (filters.availability && filters.availability !== 'All') {
    result = result.filter((a) =>
      filters.availability === 'sold' ? isSoldOut(a) : !isSoldOut(a)
    );
  }

  if (filters.maxPrice) {
    result = result.filter((a) => startingPrice(a) <= filters.maxPrice);
  }

  switch (filters.sort) {
    case 'oldest':
      result.sort((a, b) => a.year - b.year);
      break;
    case 'price-asc':
      result.sort((a, b) => startingPrice(a) - startingPrice(b));
      break;
    case 'price-desc':
      result.sort((a, b) => startingPrice(b) - startingPrice(a));
      break;
    case 'newest':
    default:
      result.sort((a, b) => b.year - a.year);
  }

  return result;
}
