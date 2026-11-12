// DEV PLACEHOLDER IMAGES — picsum.photos seeded URLs stand in for real
// artwork photography. Replace `images` arrays with Cloudinary URLs when
// the artist uploads real work. Structure (multiple images per artwork,
// variants with independent price/stock) is production-ready as-is.

export const CATEGORIES = ['Paintings', 'Portraits', 'Abstract', 'Landscape', 'Sketches'];
export const MEDIUMS = ['Acrylic on Canvas', 'Oil on Canvas', 'Ink on Paper', 'Mixed Media', 'Charcoal on Paper', 'Watercolor on Paper'];

const img = (seed, w = 1200, h = 1500) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const artworks = [
  {
    id: 'aw-001',
    slug: 'whispers-of-silence',
    title: 'Whispers of Silence',
    category: 'Abstract',
    medium: 'Acrylic on Canvas',
    year: 2026,
    surface: 'Gallery-wrapped cotton canvas',
    framing: 'Available unframed; framing on request',
    description:
      'A study in restraint — layered washes of ash and ochre pulled back to almost nothing, then rebuilt with a single decisive line. Made during the first quiet weeks of the year.',
    featured: true,
    availability: 'available',
    images: [img('wos-1'), img('wos-2'), img('wos-3')],
    variants: [
      { size: '12 x 16 in', price: 8000, stock: 5 },
      { size: '18 x 24 in', price: 12000, stock: 3 },
      { size: '24 x 36 in', price: 18000, stock: 2 },
      { size: '30 x 40 in', price: 26000, stock: 0 },
    ],
  },
  {
    id: 'aw-002',
    slug: 'riverlight-i',
    title: 'Riverlight I',
    category: 'Landscape',
    medium: 'Oil on Canvas',
    year: 2025,
    surface: 'Linen canvas',
    framing: 'Comes with a hand-finished oak floating frame',
    description:
      'Early morning on the Buriganga, rendered from a decade of sketches made from the same ghat. The light was never twice the same; this is the version that stayed.',
    featured: true,
    availability: 'available',
    images: [img('riv1-1'), img('riv1-2'), img('riv1-3')],
    variants: [
      { size: '18 x 24 in', price: 16000, stock: 2 },
      { size: '24 x 36 in', price: 24000, stock: 1 },
      { size: '30 x 40 in', price: 34000, stock: 1 },
    ],
  },
  {
    id: 'aw-003',
    slug: 'study-of-a-boatman',
    title: 'Study of a Boatman',
    category: 'Portraits',
    medium: 'Charcoal on Paper',
    year: 2025,
    surface: '300gsm cotton rag paper',
    framing: 'Unframed, ships in a rigid mailer',
    description:
      'A working portrait made in a single sitting at Sadarghat. The unfinished corners are left intentionally — a record of the sitting itself, not just its subject.',
    featured: false,
    availability: 'available',
    images: [img('boatman-1'), img('boatman-2')],
    variants: [
      { size: '12 x 16 in', price: 6000, stock: 4 },
      { size: '18 x 24 in', price: 9500, stock: 2 },
    ],
  },
  {
    id: 'aw-004',
    slug: 'monsoon-field',
    title: 'Monsoon Field',
    category: 'Landscape',
    medium: 'Acrylic on Canvas',
    year: 2025,
    surface: 'Gallery-wrapped cotton canvas',
    framing: 'Available unframed; framing on request',
    description:
      'Rice fields under low cloud, painted wet-into-wet to hold the particular density of monsoon air. Part of an ongoing series on seasonal light.',
    featured: true,
    availability: 'available',
    images: [img('monsoon-1'), img('monsoon-2'), img('monsoon-3')],
    variants: [
      { size: '18 x 24 in', price: 14000, stock: 3 },
      { size: '24 x 36 in', price: 21000, stock: 2 },
      { size: '30 x 40 in', price: 30000, stock: 1 },
    ],
  },
  {
    id: 'aw-005',
    slug: 'interior-with-window',
    title: 'Interior with Window',
    category: 'Paintings',
    medium: 'Oil on Canvas',
    year: 2024,
    surface: 'Linen canvas',
    framing: 'Comes with a hand-finished oak floating frame',
    description:
      'An empty room in late afternoon, the kind of light that makes a plain wall worth looking at for a long time.',
    featured: false,
    availability: 'sold',
    images: [img('interior-1'), img('interior-2')],
    variants: [
      { size: '18 x 24 in', price: 15000, stock: 0 },
      { size: '24 x 36 in', price: 22000, stock: 0 },
    ],
  },
  {
    id: 'aw-006',
    slug: 'fragments-no-4',
    title: 'Fragments No. 4',
    category: 'Abstract',
    medium: 'Mixed Media',
    year: 2026,
    surface: 'Board, collaged and painted',
    framing: 'Framed in raw ash wood',
    description:
      'Torn paper from old exhibition posters, sanded back and painted over — a fourth attempt at describing the feeling of a city rebuilding itself.',
    featured: true,
    availability: 'available',
    images: [img('frag4-1'), img('frag4-2'), img('frag4-3')],
    variants: [
      { size: '12 x 16 in', price: 9000, stock: 2 },
      { size: '18 x 24 in', price: 13500, stock: 2 },
    ],
  },
  {
    id: 'aw-007',
    slug: 'market-sketch-series-ii',
    title: 'Market Sketch, Series II',
    category: 'Sketches',
    medium: 'Ink on Paper',
    year: 2025,
    surface: '250gsm sketch paper',
    framing: 'Unframed, ships in a rigid mailer',
    description:
      'Quick ink studies made over three mornings at Karwan Bazar — the economy of line doing the work that color usually does.',
    featured: false,
    availability: 'available',
    images: [img('market2-1'), img('market2-2')],
    variants: [
      { size: '12 x 16 in', price: 4500, stock: 6 },
      { size: '18 x 24 in', price: 7000, stock: 3 },
    ],
  },
  {
    id: 'aw-008',
    slug: 'portrait-of-amma',
    title: 'Portrait of Amma',
    category: 'Portraits',
    medium: 'Oil on Canvas',
    year: 2023,
    surface: 'Linen canvas',
    framing: 'Comes with a hand-finished oak floating frame',
    description:
      'A portrait of the artist\u2019s mother in the kitchen light she has cooked in for thirty years. One of the most personal works in the studio.',
    featured: true,
    availability: 'available',
    images: [img('amma-1'), img('amma-2'), img('amma-3')],
    variants: [
      { size: '18 x 24 in', price: 20000, stock: 1 },
      { size: '24 x 36 in', price: 30000, stock: 1 },
    ],
  },
  {
    id: 'aw-009',
    slug: 'abstract-composition-vii',
    title: 'Abstract Composition VII',
    category: 'Abstract',
    medium: 'Acrylic on Canvas',
    year: 2024,
    surface: 'Gallery-wrapped cotton canvas',
    framing: 'Available unframed; framing on request',
    description:
      'Built up over eleven layers, then scraped back to reveal the second and fifth. What remains is closer to geology than composition.',
    featured: false,
    availability: 'available',
    images: [img('ac7-1'), img('ac7-2')],
    variants: [
      { size: '12 x 16 in', price: 8500, stock: 3 },
      { size: '18 x 24 in', price: 12500, stock: 2 },
      { size: '24 x 36 in', price: 19000, stock: 1 },
    ],
  },
  {
    id: 'aw-010',
    slug: 'ghat-at-dusk',
    title: 'Ghat at Dusk',
    category: 'Landscape',
    medium: 'Watercolor on Paper',
    year: 2026,
    surface: '300gsm cold-press paper',
    framing: 'Framed in raw ash wood',
    description:
      'Painted in a single wash session as the light dropped, before the boats\u2019 lanterns were lit. Watercolor rewards exactly this kind of urgency.',
    featured: false,
    availability: 'available',
    images: [img('ghat-1'), img('ghat-2')],
    variants: [
      { size: '12 x 16 in', price: 6500, stock: 4 },
      { size: '18 x 24 in', price: 10000, stock: 2 },
    ],
  },
  {
    id: 'aw-011',
    slug: 'self-portrait-study',
    title: 'Self-Portrait, Study',
    category: 'Sketches',
    medium: 'Charcoal on Paper',
    year: 2024,
    surface: '300gsm cotton rag paper',
    framing: 'Unframed, ships in a rigid mailer',
    description:
      'A working study made without a mirror\u2019s usual vanity — more interested in structure than likeness.',
    featured: false,
    availability: 'available',
    images: [img('selfstudy-1'), img('selfstudy-2')],
    variants: [
      { size: '12 x 16 in', price: 5000, stock: 3 },
    ],
  },
  {
    id: 'aw-012',
    slug: 'still-life-with-clay-pots',
    title: 'Still Life with Clay Pots',
    category: 'Paintings',
    medium: 'Oil on Canvas',
    year: 2023,
    surface: 'Linen canvas',
    framing: 'Comes with a hand-finished oak floating frame',
    description:
      'A domestic arrangement painted slowly, over three weeks, to let the clay\u2019s color shift correctly against the cloth.',
    featured: false,
    availability: 'available',
    images: [img('stilllife-1'), img('stilllife-2')],
    variants: [
      { size: '12 x 16 in', price: 9500, stock: 2 },
      { size: '18 x 24 in', price: 14500, stock: 1 },
    ],
  },
  {
    id: 'aw-013',
    slug: 'territory-no-2',
    title: 'Territory No. 2',
    category: 'Abstract',
    medium: 'Mixed Media',
    year: 2026,
    surface: 'Board, collaged and painted',
    framing: 'Framed in raw ash wood',
    description:
      'Second in an ongoing series mapping the emotional borders of neighborhoods the artist has lived in.',
    featured: true,
    availability: 'available',
    images: [img('terr2-1'), img('terr2-2'), img('terr2-3')],
    variants: [
      { size: '18 x 24 in', price: 15500, stock: 2 },
      { size: '24 x 36 in', price: 23000, stock: 1 },
    ],
  },
  {
    id: 'aw-014',
    slug: 'evening-commute',
    title: 'Evening Commute',
    category: 'Sketches',
    medium: 'Ink on Paper',
    year: 2025,
    surface: '250gsm sketch paper',
    framing: 'Unframed, ships in a rigid mailer',
    description:
      'Rickshaws and rush-hour silhouettes captured from a stalled bus window — proof that a five-minute drawing can hold a whole city\u2019s rhythm.',
    featured: false,
    availability: 'available',
    images: [img('commute-1'), img('commute-2')],
    variants: [
      { size: '12 x 16 in', price: 4000, stock: 5 },
    ],
  },
];

export const getArtworkBySlug = (slug) => artworks.find((a) => a.slug === slug);
export const getFeaturedArtworks = () => artworks.filter((a) => a.featured);
export const getRelatedArtworks = (artwork, count = 4) =>
  artworks.filter((a) => a.id !== artwork.id && a.category === artwork.category).slice(0, count) ||
  [];
export const startingPrice = (artwork) =>
  Math.min(...artwork.variants.map((v) => v.price));
export const isSoldOut = (artwork) =>
  artwork.availability === 'sold' || artwork.variants.every((v) => v.stock === 0);
