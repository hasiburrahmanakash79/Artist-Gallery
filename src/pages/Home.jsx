import { useEffect } from 'react';
import Hero from '@/components/home/Hero';
import FeaturedWorks from '@/components/home/FeaturedWorks';
import ArtistIntro from '@/components/home/ArtistIntro';
import ExhibitionStrip from '@/components/home/ExhibitionStrip';
import ContactCTA from '@/components/home/ContactCTA';
import { artist } from '@/data/artist';

export default function Home() {
  useEffect(() => {
    document.title = `${artist.name} — Contemporary Visual Artist`;
  }, []);

  return (
    <>
      <Hero />
      <FeaturedWorks />
      <ArtistIntro />
      <ExhibitionStrip />
      <ContactCTA />
    </>
  );
}
