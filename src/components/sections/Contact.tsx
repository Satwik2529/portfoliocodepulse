import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { personal, sectionVisibility } from '../../data/data';
import { hasValue } from '../../lib/utils';
import { MagneticButton } from '../ui/MagneticButton';
import { SocialIcon } from '../ui/SocialIcon';
import { Reveal } from '../ui/Reveal';

export function Contact() {
  const [copied, setCopied] = useState(false);

  if (!sectionVisibility.contact) return null;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — the mailto link below still works.
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-base py-32 sm:py-44">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-violet/15 blur-[160px]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="noise-overlay" />
      </div>

      <div className="relative mx-auto max-w-shell px-6 text-center sm:px-10 lg:px-16">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan">
            Let&apos;s build something
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
            Got an idea?
            <br />
            <span className="text-gradient">Let&apos;s talk.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-7 max-w-lg text-lg text-ink-dim">
            Open to full-stack roles, collaborations, and interesting problems worth solving.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href={`mailto:${personal.email}`} variant="solid">
              Say Hello <ArrowUpRight size={16} />
            </MagneticButton>
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-base-line px-7 py-3.5 font-body text-sm text-ink transition-colors hover:border-accent-cyan/60 hover:text-accent-cyan"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : personal.email}
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-14 flex items-center justify-center gap-6">
            {personal.socials
              .filter((s) => hasValue(s.url) && s.icon !== 'mail')
              .map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-base-line text-ink-dim transition-colors hover:border-accent-cyan/60 hover:text-accent-cyan"
                >
                  <SocialIcon icon={s.icon} />
                </a>
              ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
