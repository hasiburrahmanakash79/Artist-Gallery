import { useState } from 'react';
import Button from '../ui/Button';

const FIELD_CLASS =
  'w-full bg-transparent border border-line px-4 py-3 outline-none transition-colors placeholder:text-ink-soft/50';
const LABEL_CLASS = 'text-[13px] uppercase tracking-[0.05em] text-ink-soft mb-2 block';

const EMPTY = { name: '', email: '', subject: '', message: '' };

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const set = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
      setError('Please fill in your name, email, and message.');
      return;
    }
    // Frontend-only for now — wire this to POST /api/contact once the
    // backend is connected.
    setError('');
    setSent(true);
    setValues(EMPTY);
  };

  if (sent) {
    return (
      <div className="border border-line p-8 text-center">
        <p className="font-display text-2xl mb-2">Message sent.</p>
        <p className="text-ink-soft">Thank you for reaching out — I'll reply within a few days.</p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 text-sm uppercase tracking-wide border-b border-ink pb-1"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={LABEL_CLASS} htmlFor="c-name">Name</label>
          <input id="c-name" className={FIELD_CLASS} value={values.name} onChange={set('name')} placeholder="Your name" />
        </div>
        <div>
          <label className={LABEL_CLASS} htmlFor="c-email">Email</label>
          <input id="c-email" type="email" className={FIELD_CLASS} value={values.email} onChange={set('email')} placeholder="you@example.com" />
        </div>
      </div>
      <div>
        <label className={LABEL_CLASS} htmlFor="c-subject">Subject</label>
        <input id="c-subject" className={FIELD_CLASS} value={values.subject} onChange={set('subject')} placeholder="Commission enquiry, press, etc." />
      </div>
      <div>
        <label className={LABEL_CLASS} htmlFor="c-message">Message</label>
        <textarea id="c-message" rows={5} className={FIELD_CLASS} value={values.message} onChange={set('message')} placeholder="Tell me a little about what you're looking for…" />
      </div>
      {error && <p className="text-rust text-sm">{error}</p>}
      <Button type="submit" variant="primary" className="w-full sm:w-auto">
        Send Message
      </Button>
    </form>
  );
}
