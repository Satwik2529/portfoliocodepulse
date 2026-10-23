import { clsx, type ClassValue } from 'clsx';
import type { AccentKey } from '../data/types';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function hasValue(value?: string | null): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

// Maps design-token accent keys to Tailwind utility fragments.
// Centralized so adding a new accent color only requires editing this map.
export const accentMap: Record<
  AccentKey,
  { text: string; bg: string; border: string; glow: string; hex: string }
> = {
  cyan: {
    text: 'text-accent-cyan',
    bg: 'bg-accent-cyan',
    border: 'border-accent-cyan/40',
    glow: 'shadow-[0_0_60px_-15px_#00e6f6]',
    hex: '#00E6F6',
  },
  violet: {
    text: 'text-accent-violet',
    bg: 'bg-accent-violet',
    border: 'border-accent-violet/40',
    glow: 'shadow-[0_0_60px_-15px_#8b6cff]',
    hex: '#8B6CFF',
  },
  coral: {
    text: 'text-accent-coral',
    bg: 'bg-accent-coral',
    border: 'border-accent-coral/40',
    glow: 'shadow-[0_0_60px_-15px_#ff5c7a]',
    hex: '#FF5C7A',
  },
  lime: {
    text: 'text-accent-lime',
    bg: 'bg-accent-lime',
    border: 'border-accent-lime/40',
    glow: 'shadow-[0_0_60px_-15px_#c8ff4d]',
    hex: '#C8FF4D',
  },
  amber: {
    text: 'text-accent-amber',
    bg: 'bg-accent-amber',
    border: 'border-accent-amber/40',
    glow: 'shadow-[0_0_60px_-15px_#ffb347]',
    hex: '#FFB347',
  },
};
