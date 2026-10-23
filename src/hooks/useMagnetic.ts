import { useRef } from 'react';
import type { PointerEvent } from 'react';

// Magnetic hover pull for CTAs — only engages on fine pointers (mouse/trackpad),
// so touch devices never get the transform.
export function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLElement | null>(null);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0px, 0px)';
  };

  return { ref, onPointerMove, onPointerLeave };
}
