import { exhibitions } from '@/data/artist';
import Reveal from '../ui/Reveal';

export default function ExhibitionStrip() {
  const latest = exhibitions.slice(0, 3);
  return (
    <section className="mx-auto max-w-[1440px] px-5 md:px-10 py-20 md:py-28 border-t border-line">
      <Reveal className="mb-12">
        <h2 className="font-display text-4xl md:text-5xl tracking-tight">Exhibitions</h2>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
        {latest.map((ex, i) => (
          <Reveal key={ex.title} delay={i * 0.08} className="border-t border-line pt-6">
            <p className="font-display text-3xl text-brass mb-2">{ex.year}</p>
            <p className="text-ink font-medium">{ex.title}</p>
            <p className="text-sm text-ink-soft mt-1">
              {ex.type} &middot; {ex.venue}, {ex.place}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
