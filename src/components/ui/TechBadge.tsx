import { getTechIcon } from '../../lib/techIcons';

// Larger logo tile for the Skills/Toolbox grid — icon on a light badge
// (keeps near-black marks like GitHub/Next.js legible) with the name below.
export function TechTile({ name }: { name: string }) {
  const { Icon, color } = getTechIcon(name);
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-base-line bg-base/40 px-3 py-3 transition-colors duration-300 hover:border-accent-cyan/40 hover:bg-base-raised">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-paper">
        <Icon size={20} color={color} />
      </span>
      <span className="text-center font-body text-xs leading-tight text-ink-dim">{name}</span>
    </div>
  );
}

// Compact inline pill used on project cards — small icon + label, same
// visual language as TechTile but sized for a tight tag row.
export function TechPill({ name, className }: { name: string; className?: string }) {
  const { Icon, color } = getTechIcon(name);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-base-line bg-base-raised/60 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-ink-dim ${className ?? ''}`}
    >
      <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-paper">
        <Icon size={9} color={color} />
      </span>
      {name}
    </span>
  );
}
