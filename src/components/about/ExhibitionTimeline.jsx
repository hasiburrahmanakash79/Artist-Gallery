import Reveal from '../ui/Reveal';

export default function ExhibitionTimeline({ exhibitions }) {
  return (
    <div className="relative">
      <div className="absolute left-[5px] top-2 bottom-2 w-px bg-line hidden sm:block" />
      <div className="space-y-10">
        {exhibitions.map((ex, i) => (
          <Reveal key={`${ex.year}-${ex.title}`} delay={Math.min(i * 0.05, 0.3)}>
            <div className="grid grid-cols-1 sm:grid-cols-[24px_100px_1fr] gap-x-6 gap-y-1 items-start">
              <span className="hidden sm:block h-[11px] w-[11px] rounded-full bg-brass mt-1.5 relative z-10" />
              <span className="font-display text-2xl text-ink-soft sm:text-ink">{ex.year}</span>
              <div>
                <p className="font-medium">{ex.title}</p>
                <p className="text-sm text-ink-soft mt-0.5">
                  {ex.type} &middot; {ex.venue}, {ex.place}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
