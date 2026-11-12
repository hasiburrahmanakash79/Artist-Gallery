import { motion } from 'framer-motion';

// A single, restrained reveal-on-scroll primitive used sparingly across
// the site (not stacked on every element) so motion stays purposeful.
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = 'div',
}) {
  const Component = motion[as] || motion.div;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
