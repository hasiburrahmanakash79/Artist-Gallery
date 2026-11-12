import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { CATEGORIES, MEDIUMS } from '@/data/artworks';
import Button from '../ui/Button';

const FIELD_CLASS =
  'w-full bg-transparent border border-line px-4 py-2.5 outline-none transition-colors';
const LABEL_CLASS = 'text-[13px] uppercase tracking-[0.05em] text-ink-soft mb-1.5 block';

const EMPTY_VARIANT = { size: '', price: '', stock: '' };

export default function ArtworkForm({ initial, onSubmit, submitLabel = 'Save Artwork' }) {
  const [values, setValues] = useState(
    initial || {
      title: '',
      category: CATEGORIES[0],
      medium: MEDIUMS[0],
      year: new Date().getFullYear(),
      surface: '',
      framing: '',
      description: '',
      featured: false,
      availability: 'available',
      images: ['https://picsum.photos/seed/new-artwork/1200/1500'],
      variants: [{ ...EMPTY_VARIANT }],
    }
  );

  const set = (field) => (e) =>
    setValues((v) => ({
      ...v,
      [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }));

  const setVariant = (index, field, value) => {
    const variants = [...values.variants];
    variants[index] = { ...variants[index], [field]: value };
    setValues((v) => ({ ...v, variants }));
  };

  const addVariant = () =>
    setValues((v) => ({ ...v, variants: [...v.variants, { ...EMPTY_VARIANT }] }));

  const removeVariant = (index) =>
    setValues((v) => ({ ...v, variants: v.variants.filter((_, i) => i !== index) }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleaned = {
      ...values,
      year: Number(values.year),
      variants: values.variants
        .filter((v) => v.size.trim())
        .map((v) => ({ size: v.size, price: Number(v.price) || 0, stock: Number(v.stock) || 0 })),
    };
    onSubmit(cleaned);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <label className={LABEL_CLASS}>Title</label>
          <input required className={FIELD_CLASS} value={values.title} onChange={set('title')} placeholder="Artwork title" />
        </div>
        <div>
          <label className={LABEL_CLASS}>Category</label>
          <select className={FIELD_CLASS} value={values.category} onChange={set('category')}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={LABEL_CLASS}>Medium</label>
          <select className={FIELD_CLASS} value={values.medium} onChange={set('medium')}>
            {MEDIUMS.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className={LABEL_CLASS}>Year</label>
          <input type="number" className={FIELD_CLASS} value={values.year} onChange={set('year')} />
        </div>
        <div>
          <label className={LABEL_CLASS}>Availability</label>
          <select className={FIELD_CLASS} value={values.availability} onChange={set('availability')}>
            <option value="available">Available</option>
            <option value="sold">Sold Out</option>
          </select>
        </div>
        <div>
          <label className={LABEL_CLASS}>Surface</label>
          <input className={FIELD_CLASS} value={values.surface} onChange={set('surface')} placeholder="e.g. Gallery-wrapped cotton canvas" />
        </div>
        <div>
          <label className={LABEL_CLASS}>Framing</label>
          <input className={FIELD_CLASS} value={values.framing} onChange={set('framing')} placeholder="e.g. Available unframed" />
        </div>
        <div className="sm:col-span-2">
          <label className={LABEL_CLASS}>Description</label>
          <textarea rows={4} className={FIELD_CLASS} value={values.description} onChange={set('description')} placeholder="Description of the artwork…" />
        </div>
        <div className="sm:col-span-2">
          <label className={LABEL_CLASS}>Image URLs (one per line)</label>
          <textarea
            rows={3}
            className={FIELD_CLASS}
            value={values.images.join('\n')}
            onChange={(e) => setValues((v) => ({ ...v, images: e.target.value.split('\n').filter(Boolean) }))}
            placeholder="Paste Cloudinary or image URLs, one per line"
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={values.featured} onChange={set('featured')} className="accent-brass" />
          Feature on homepage
        </label>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-xl">Sizes, Prices &amp; Stock</h3>
          <button type="button" onClick={addVariant} className="flex items-center gap-1.5 text-sm text-brass">
            <Plus size={15} strokeWidth={1.5} /> Add Size
          </button>
        </div>
        <div className="space-y-3">
          {values.variants.map((v, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-3 items-center">
              <input
                className={FIELD_CLASS}
                placeholder="Size (e.g. 12 x 16 in)"
                value={v.size}
                onChange={(e) => setVariant(i, 'size', e.target.value)}
              />
              <input
                className={FIELD_CLASS}
                type="number"
                placeholder="Price (\u09F3)"
                value={v.price}
                onChange={(e) => setVariant(i, 'price', e.target.value)}
              />
              <input
                className={FIELD_CLASS}
                type="number"
                placeholder="Stock"
                value={v.stock}
                onChange={(e) => setVariant(i, 'stock', e.target.value)}
              />
              <button
                type="button"
                aria-label="Remove size"
                onClick={() => removeVariant(i)}
                className="text-ink-soft hover:text-rust transition-colors p-2"
              >
                <Trash2 size={16} strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Button type="submit" variant="primary">{submitLabel}</Button>
    </form>
  );
}
