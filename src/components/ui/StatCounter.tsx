import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useTransform, animate, motion } from 'motion/react';
import type { ProjectStat } from '../../data/types';

interface StatCounterProps {
  stat: ProjectStat;
  color: string;
  delay?: number;
}

// Counts up from 0 to the target value once it scrolls into view — turns a
// flat metric into a small, deliberate moment rather than static text.
export function StatCounter({ stat, color, delay = 0 }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, stat.target, { duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, stat.target, delay, count]);

  return (
    <div className="flex flex-col">
      <div className="flex items-baseline gap-0.5 font-display text-2xl font-semibold text-ink sm:text-3xl">
        {stat.prefix && <span>{stat.prefix}</span>}
        <motion.span ref={ref}>{rounded}</motion.span>
        {stat.suffix && <span style={{ color }}>{stat.suffix}</span>}
      </div>
      <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-dim">{stat.label}</span>
    </div>
  );
}
