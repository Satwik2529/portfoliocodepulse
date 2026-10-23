import { Reveal } from './Reveal';
import { cn } from '../../lib/utils';

interface SectionHeadingProps {
  kicker: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  accentClass?: string;
}

export function SectionHeading({
  kicker,
  title,
  description,
  align = 'left',
  tone = 'dark',
  accentClass = 'text-accent-cyan',
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      <Reveal>
        <div className="flex items-center gap-3">
          {align !== 'center' && <span className={cn('h-[2px] w-8', accentClass.replace('text-', 'bg-'))} />}
          <span className={cn('font-mono text-xs uppercase tracking-[0.25em]', accentClass)}>
            {kicker}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={cn(
            'mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl',
            tone === 'dark' ? 'text-ink' : 'text-paper-ink'
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              'mt-5 text-base leading-relaxed sm:text-lg',
              tone === 'dark' ? 'text-ink-dim' : 'text-paper-ink/70'
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
