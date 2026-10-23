import { useScroll, useSpring } from 'motion/react';

export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.2 });
  return smoothed;
}
