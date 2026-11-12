import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';

export default function ContactCTA() {
  return (
    <section className="border-t border-line bg-ink text-paper">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-20 md:py-28 text-center">
        <Reveal>
          <h2 className="font-display text-3xl md:text-5xl leading-tight max-w-2xl mx-auto">
            Looking for a commission, or a piece for a specific space?
          </h2>
          <p className="text-paper/70 mt-5 max-w-md mx-auto">
            I take on a limited number of commissions each year and I'm always
            glad to talk through a piece before you buy.
          </p>
          <div className="mt-9">
            <Button as={Link} to="/contact" variant="brass">
              Get in Touch
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
