import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Menu, X, Download } from 'lucide-react';
import { navItems, personal } from '../../data/data';
import { hasValue, cn } from '../../lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('#home');
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled ? 'py-3' : 'py-6'
        )}
      >
        <div
          className={cn(
            'mx-auto flex w-full max-w-shell items-center justify-between rounded-full px-5 transition-all duration-300 sm:px-8',
            scrolled
              ? 'max-w-[1100px] border border-base-line bg-base/80 py-2.5 backdrop-blur-xl'
              : 'py-1'
          )}
        >
          <a href="#home" className="group flex items-center gap-2.5 font-display text-lg font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-base-line bg-base-raised font-mono text-xs text-accent-cyan transition-colors group-hover:border-accent-cyan/60">
              {personal.initials}
            </span>
            <span className="hidden text-ink sm:inline">{personal.name}</span>
          </a>

          <nav className="hidden items-center gap-1 rounded-full border border-base-line bg-base-raised/40 p-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'relative rounded-full px-4 py-2 font-body text-sm transition-colors',
                  activeHref === item.href ? 'text-base' : 'text-ink-dim hover:text-ink'
                )}
              >
                {activeHref === item.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-accent-cyan"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            {hasValue(personal.resumeUrl) && (
              <a
                href={personal.resumeUrl}
                download
                className="flex items-center gap-1.5 rounded-full border border-base-line px-4 py-2 font-body text-sm text-ink transition-colors hover:border-accent-cyan/60 hover:text-accent-cyan"
              >
                <Download size={14} /> Resume
              </a>
            )}
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-base-line text-ink lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-base/97 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex h-full flex-col items-center justify-center gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i }}
                  className="font-display text-4xl font-semibold text-ink transition-colors hover:text-accent-cyan"
                >
                  {item.label}
                </motion.a>
              ))}
              {hasValue(personal.resumeUrl) && (
                <a
                  href={personal.resumeUrl}
                  download
                  className="mt-4 flex items-center gap-2 rounded-full border border-base-line px-6 py-3 font-body text-sm text-ink"
                >
                  <Download size={16} /> Download Resume
                </a>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
