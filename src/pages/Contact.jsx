import { useEffect } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { artist } from '@/data/artist';
import ContactForm from '@/components/contact/ContactForm';
import Reveal from '@/components/ui/Reveal';

export default function Contact() {
  useEffect(() => {
    document.title = `Contact — ${artist.name}`;
  }, []);

  return (
    <div className="mx-auto max-w-[1440px] px-5 md:px-10 pt-16 pb-24">
      <Reveal className="max-w-2xl mb-16">
        <p className="text-[13px] uppercase tracking-[0.06em] text-brass mb-3">Contact</p>
        <h1 className="font-display text-5xl md:text-6xl tracking-tight">Let's Talk</h1>
        <p className="text-ink-soft mt-5 leading-relaxed">
          For commissions, press, exhibitions, or questions about a piece —
          reach out directly or use the form below.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
        <Reveal className="lg:col-span-1 space-y-8">
          <div className="flex items-start gap-4">
            <Mail size={19} strokeWidth={1.5} className="mt-1 text-brass shrink-0" />
            <div>
              <p className="text-[13px] uppercase tracking-[0.05em] text-ink-soft">Email</p>
              <a href={`mailto:${artist.email}`} className="hover:text-brass transition-colors">
                {artist.email}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone size={19} strokeWidth={1.5} className="mt-1 text-brass shrink-0" />
            <div>
              <p className="text-[13px] uppercase tracking-[0.05em] text-ink-soft">Phone</p>
              <a href={`tel:${artist.phone}`} className="hover:text-brass transition-colors">
                {artist.phone}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin size={19} strokeWidth={1.5} className="mt-1 text-brass shrink-0" />
            <div>
              <p className="text-[13px] uppercase tracking-[0.05em] text-ink-soft">Studio</p>
              <p>{artist.location}</p>
            </div>
          </div>
          <div className="flex gap-5 pt-2 text-sm">
            <a href={artist.instagram} className="text-ink hover:text-brass transition-colors underline underline-offset-2">
              Instagram
            </a>
            <a href={artist.facebook} className="text-ink hover:text-brass transition-colors underline underline-offset-2">
              Facebook
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-2">
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
