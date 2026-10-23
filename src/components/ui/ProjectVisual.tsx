import { useState, useMemo } from 'react';
import { accentMap } from '../../lib/utils';
import { generatePattern } from '../../lib/seededPattern';
import type { AccentKey } from '../../data/types';

interface ProjectVisualProps {
  image?: string;
  title: string;
  accent: AccentKey;
  seed: string;
  className?: string;
}

// Renders the real screenshot when one is configured in data.ts; otherwise
// falls back to a generated, accent-tinted composition unique to the
// project. It never pretends to be a real screenshot — a small honest
// caption says so — but it's designed, not an empty box with a letter.
export function ProjectVisual({ image, title, accent, seed, className }: ProjectVisualProps) {
  const [errored, setErrored] = useState(false);
  const tone = accentMap[accent];
  const showFallback = !image || errored;

  const pattern = useMemo(() => generatePattern(seed), [seed]);

  if (showFallback) {
    const initials = title
      .split(' ')
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    return (
      <div className={`relative overflow-hidden bg-base-raised ${className ?? ''}`}>
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 15%, ${tone.hex}40, transparent 55%), radial-gradient(circle at 85% 90%, ${tone.hex}26, transparent 50%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(transparent 0, transparent 23px, #fff 24px), linear-gradient(90deg, transparent 0, transparent 23px, #fff 24px)',
            backgroundSize: '24px 24px',
          }}
        />

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {pattern.shapes.map((s, i) => (
            <circle
              key={i}
              cx={s.cx}
              cy={s.cy}
              r={s.r}
              fill="none"
              stroke={tone.hex}
              strokeWidth={0.4}
              opacity={0.35 - i * 0.08}
            />
          ))}
          <line
            x1="0"
            y1="100"
            x2="100"
            y2="0"
            stroke={tone.hex}
            strokeWidth={0.3}
            opacity={0.18}
            transform={`rotate(${pattern.lineAngle} 50 50)`}
          />
        </svg>

        <div className="absolute inset-0 flex items-end justify-between p-5">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint"
            title="This is a generated placeholder, not a product screenshot"
          >
            Preview artwork
          </span>
          <span
            className="font-display text-4xl font-semibold leading-none tracking-tight opacity-80 sm:text-5xl"
            style={{ color: tone.hex }}
          >
            {initials}
          </span>
        </div>

        <div className="noise-overlay" />
      </div>
    );
  }

  return (
    <img
      src={image}
      alt={`${title} preview`}
      loading="lazy"
      onError={() => setErrored(true)}
      className={`h-full w-full object-cover ${className ?? ''}`}
    />
  );
}
