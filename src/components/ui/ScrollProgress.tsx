import { motion } from 'motion/react';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <motion.div
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-coral"
      style={{ scaleX: progress }}
    />
  );
}
