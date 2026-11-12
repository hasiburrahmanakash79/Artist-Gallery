const FIELD_CLASS =
  'w-full bg-transparent border border-line px-4 py-3 outline-none transition-colors placeholder:text-ink-soft/50';
const LABEL_CLASS = 'text-[13px] uppercase tracking-[0.05em] text-ink-soft mb-2 block';

export default function CheckoutForm({ values, errors, onChange }) {
  const set = (field) => (e) => onChange(field, e.target.value);

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl mb-2">Customer Information</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={LABEL_CLASS} htmlFor="name">Full Name</label>
          <input id="name" className={FIELD_CLASS} value={values.name} onChange={set('name')} placeholder="e.g. Rahim Ahmed" />
          {errors.name && <p className="text-rust text-xs mt-1.5">{errors.name}</p>}
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="phone">Phone Number</label>
          <input id="phone" className={FIELD_CLASS} value={values.phone} onChange={set('phone')} placeholder="01XXXXXXXXX" />
          {errors.phone && <p className="text-rust text-xs mt-1.5">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label className={LABEL_CLASS} htmlFor="email">Email</label>
        <input id="email" type="email" className={FIELD_CLASS} value={values.email} onChange={set('email')} placeholder="you@example.com" />
        {errors.email && <p className="text-rust text-xs mt-1.5">{errors.email}</p>}
      </div>

      <div>
        <label className={LABEL_CLASS} htmlFor="address">Address</label>
        <input id="address" className={FIELD_CLASS} value={values.address} onChange={set('address')} placeholder="House, road, area" />
        {errors.address && <p className="text-rust text-xs mt-1.5">{errors.address}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label className={LABEL_CLASS} htmlFor="city">City</label>
          <input id="city" className={FIELD_CLASS} value={values.city} onChange={set('city')} placeholder="Dhaka" />
          {errors.city && <p className="text-rust text-xs mt-1.5">{errors.city}</p>}
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="area">Area</label>
          <input id="area" className={FIELD_CLASS} value={values.area} onChange={set('area')} placeholder="Dhanmondi" />
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="postalCode">Postal Code</label>
          <input id="postalCode" className={FIELD_CLASS} value={values.postalCode} onChange={set('postalCode')} placeholder="1205" />
        </div>
      </div>

      <div>
        <label className={LABEL_CLASS} htmlFor="notes">Delivery Notes (optional)</label>
        <textarea
          id="notes"
          rows={3}
          className={FIELD_CLASS}
          value={values.notes}
          onChange={set('notes')}
          placeholder="Landmark, preferred delivery time, etc."
        />
      </div>
    </div>
  );
}
