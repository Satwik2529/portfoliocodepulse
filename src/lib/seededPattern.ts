// Deterministic pseudo-random generator seeded by a string (project id),
// so each project's placeholder artwork looks distinct but never changes
// between renders or reloads.
function hashString(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export interface GeneratedShape {
  cx: number;
  cy: number;
  r: number;
}

export function generatePattern(seed: string) {
  const h = hashString(seed);
  const rand = (offset: number) => {
    const x = Math.sin(h + offset) * 10000;
    return x - Math.floor(x);
  };

  const shapes: GeneratedShape[] = Array.from({ length: 3 }, (_, i) => ({
    cx: 15 + rand(i * 3) * 70,
    cy: 15 + rand(i * 3 + 1) * 70,
    r: 10 + rand(i * 3 + 2) * 22,
  }));

  return {
    shapes,
    rotation: Math.round(rand(10) * 360),
    lineAngle: Math.round(rand(20) * 180),
  };
}
