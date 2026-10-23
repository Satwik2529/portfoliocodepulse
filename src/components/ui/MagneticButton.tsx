import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { useMagnetic } from '../../hooks/useMagnetic';
import { cn } from '../../lib/utils';

interface MagneticButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: 'solid' | 'outline' | 'ghost';
  className?: string;
}

const variantClass: Record<string, string> = {
  solid:
    'bg-ink text-base hover:bg-accent-cyan hover:text-base shadow-[0_0_40px_-12px_rgba(0,230,246,0.0)] hover:shadow-[0_0_40px_-8px_rgba(0,230,246,0.55)]',
  outline: 'border border-ink/25 text-ink hover:border-accent-cyan/70 hover:text-accent-cyan',
  ghost: 'text-ink hover:text-accent-cyan',
};

export function MagneticButton({ children, variant = 'solid', className, ...rest }: MagneticButtonProps) {
  const { ref, onPointerMove, onPointerLeave } = useMagnetic(0.25);

  return (
    <a
      ref={ref as React.Ref<HTMLAnchorElement>}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-body text-sm font-medium transition-colors duration-300 ease-out will-change-transform',
        variantClass[variant],
        className
      )}
      style={{ transition: 'transform 0.2s ease-out, color 0.3s, background-color 0.3s, box-shadow 0.3s' }}
      {...rest}
    >
      {children}
    </a>
  );
}
