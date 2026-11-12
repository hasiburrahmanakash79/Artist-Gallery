import { useEffect } from 'react';
import { artist, exhibitions } from '@/data/artist';
import Reveal from '@/components/ui/Reveal';
import ExhibitionTimeline from '@/components/about/ExhibitionTimeline';
import CredentialList from '@/components/about/CredentialList';

export default function About() {
  useEffect(() => {
    document.title = `About — ${artist.name}`;
  }, []);

  return (
    <div className="pb-24">
      {/* Portrait + intro */}
      <section className="mx-auto max-w-[1440px] px-5 md:px-10 pt-16 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="aspect-[4/5] overflow-hidden bg-stone">
            <img
              src="https://picsum.photos/seed/artist-about/900/1125"
              alt={`${artist.name} in her studio in Dhaka`}
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 flex flex-col justify-center">
          <p className="text-[13px] uppercase tracking-[0.06em] text-brass mb-4">About the Artist</p>
          <h1 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05]">
            {artist.name}
          </h1>
          <p className="text-ink-soft mt-3">{artist.title} &middot; {artist.location}</p>
          <p className="font-display italic text-xl md:text-2xl leading-relaxed text-ink-soft mt-8 max-w-xl">
            "{artist.philosophy}"
          </p>
        </Reveal>
      </section>

      {/* Biography */}
      <section className="border-t border-line bg-paper-dim">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-20">
          <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="font-display text-3xl tracking-tight">Biography</h2>
            </div>
            <div className="lg:col-span-7 space-y-5">
              {artist.bioLong.map((para, i) => (
                <p key={i} className="text-ink-soft leading-relaxed max-w-2xl">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Journey / process */}
      <section className="mx-auto max-w-[1440px] px-5 md:px-10 py-20">
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <h2 className="font-display text-3xl tracking-tight mb-5">Studio &amp; Process</h2>
            <p className="text-ink-soft leading-relaxed max-w-lg">
              The studio sits above a tin workshop in Old Dhaka — a single
              room with north-facing light and years of paint on the floor.
              Most pieces begin as ink sketches made on-site, then are
              reworked from memory back at the easel, so that what ends
              up on canvas is never quite documentary and never quite
              invention.
            </p>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 aspect-[4/3] overflow-hidden bg-stone">
            <img
              src="https://picsum.photos/seed/studio-process/1000/750"
              alt="The artist's studio workspace"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* Exhibitions */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-20">
          <Reveal className="mb-14">
            <h2 className="font-display text-4xl tracking-tight">Exhibitions</h2>
          </Reveal>
          <ExhibitionTimeline exhibitions={exhibitions} />
        </div>
      </section>

      {/* Credentials */}
      <section className="border-t border-line bg-paper-dim">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-20 grid grid-cols-1 md:grid-cols-3 gap-14">
          <CredentialList title="Education" items={artist.education} />
          <CredentialList title="Awards" items={artist.awards} />
          <CredentialList title="Publications" items={artist.publications} />
        </div>
      </section>

      {/* Featured in */}
      <section className="mx-auto max-w-[1440px] px-5 md:px-10 py-16">
        <Reveal>
          <p className="text-[13px] uppercase tracking-[0.06em] text-ink-soft mb-6 text-center">
            Featured In
          </p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {artist.featuredIn.map((name) => (
              <span key={name} className="font-display text-xl text-ink-soft/70">
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
