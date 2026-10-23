import { personal, navItems } from '../data/data';
import { hasValue } from '../lib/utils';
import { SocialIcon } from './ui/SocialIcon';

export function Footer() {
  return (
    <footer className="relative border-t border-base-line bg-base py-10">
      <div className="mx-auto flex max-w-shell flex-col items-center gap-6 px-6 sm:flex-row sm:justify-between sm:px-10 lg:px-16">
        <span className="font-mono text-xs text-ink-faint">
          © {new Date().getFullYear()} {personal.name}. Built from scratch.
        </span>

        <nav className="flex flex-wrap items-center gap-5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-body text-sm text-ink-dim transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {personal.socials
            .filter((s) => hasValue(s.url))
            .map((s) => (
              <a
                key={s.label}
                href={s.url}
                target={s.icon === 'mail' ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={s.label}
                className="text-ink-dim transition-colors hover:text-accent-cyan"
              >
                <SocialIcon icon={s.icon} size={16} />
              </a>
            ))}
        </div>
      </div>
    </footer>
  );
}
