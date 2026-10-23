import { Suspense, lazy, useRef } from 'react';
import type { PointerEvent } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Download } from 'lucide-react';
import { personal } from '../../data/data';
import { hasValue } from '../../lib/utils';
import { MagneticButton } from '../ui/MagneticButton';
import { SocialIcon } from '../ui/SocialIcon';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const HeroScene = lazy(() => import('./HeroScene').then((m) => ({ default: m.HeroScene })));

const leadWords = personal.headlineLead.split(' ');
// Bind the accent phrase's words with a non-breaking space so it always
// travels together as one unit, instead of risking an orphaned short
// word (e.g. "a") stranded alone at a line break.
const accentPhrase = personal.headlineAccent.split(' ').join(' ');

// Precomputed once at module scope (not mutated during render) so each
// letter gets a stable, globally-increasing stagger delay.
const nameWords = personal.name.split(' ');
const nameChars: { word: number; char: string; globalIndex: number }[] = [];
nameWords.forEach((word, wi) => {
  word.split('').forEach((char) => {
    nameChars.push({ word: wi, char, globalIndex: nameChars.length });
  });
});

export function Hero() {
  const prefersReduced = useReducedMotion();
  const canRender3D = useMediaQuery('(min-width: 768px)');
  const sectionRef = useRef<HTMLElement>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const bgParallax = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : 80]);
  const visualParallax = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : -40]);

  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    if (prefersReduced) return;
    pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      onPointerMove={handlePointerMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-base pt-28"
    >
      {/* Ambient background */}
      <motion.div className="pointer-events-none absolute inset-0" style={{ y: bgParallax }}>
        <div className="absolute -left-40 top-[-10%] h-[520px] w-[520px] rounded-full bg-accent-violet/20 blur-[140px]" />
        <div className="absolute right-[-10%] top-[20%] h-[480px] w-[480px] rounded-full bg-accent-cyan/15 blur-[140px]" />
        <div className="absolute bottom-[-15%] left-[20%] h-[420px] w-[420px] rounded-full bg-accent-coral/10 blur-[140px]" />
        <div className="noise-overlay" />
      </motion.div>

      <div className="relative mx-auto grid w-full max-w-shell grid-cols-1 items-center gap-12 px-6 sm:px-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10 lg:px-16">
        {/* Copy column */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-base-line bg-base-raised/60 py-1.5 pl-2 pr-4"
          >
            <span className="relative flex h-5 w-5 items-center justify-center">
              {personal.availability?.status === 'available' && (
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-accent-lime opacity-75" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-lime" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink-dim">
              {personal.availability?.label ?? personal.title}
            </span>
          </motion.div>

          {/* Name — the primary identity element. A faint stroked "echo"
              sits behind the real text for layered depth; the animated
              letters are decorative (aria-hidden) with a real, static
              name underneath for screen readers and SEO. */}
          <div className="relative mt-6">
            <p
              aria-hidden="true"
              className="pointer-events-none absolute -left-1 -top-2 select-none font-display text-[clamp(2.75rem,11vw,6.5rem)] font-semibold leading-[0.92] tracking-tight text-transparent opacity-[0.07]"
              style={{ WebkitTextStroke: '1.5px #ECEAE4' }}
            >
              {personal.name}
            </p>
            <h1 className="sr-only">{personal.name}</h1>
            <p
              aria-hidden="true"
              className="relative font-display text-[clamp(2.75rem,11vw,6.5rem)] font-semibold leading-[0.92] tracking-tight text-ink"
            >
              {nameWords.map((_, wi) => (
                <span key={wi} className="mr-[0.25em] inline-block last:mr-0">
                  {nameChars
                    .filter((c) => c.word === wi)
                    .map((c) => (
                      <motion.span
                        key={c.globalIndex}
                        className="inline-block"
                        initial={{ opacity: 0, y: '0.6em' }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.55,
                          delay: 0.035 * c.globalIndex,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        {c.char}
                      </motion.span>
                    ))}
                </span>
              ))}
            </p>
          </div>

          <h2 className="mt-5 font-display text-xl font-medium leading-snug tracking-tight sm:text-2xl lg:text-[1.75rem]">
            {leadWords.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block text-ink-dim"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + 0.04 * i, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}&nbsp;
              </motion.span>
            ))}
            <motion.span
              className="text-gradient inline-block"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + 0.04 * leadWords.length, ease: [0.16, 1, 0.3, 1] }}
            >
              {accentPhrase}
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-5 max-w-md text-base leading-relaxed text-ink-dim sm:text-lg"
          >
            {personal.subHeadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.98 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#projects" variant="solid" className="group">
              Explore My Work
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
            <MagneticButton href="#contact" variant="outline">
              Let&apos;s Connect
            </MagneticButton>
            {hasValue(personal.resumeUrl) && (
              <MagneticButton href={personal.resumeUrl} variant="ghost" download>
                <Download size={16} />
                Resume
              </MagneticButton>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.15 }}
            className="mt-14 flex items-center gap-5"
          >
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
                  <SocialIcon icon={s.icon} />
                </a>
              ))}
          </motion.div>
        </div>

        {/* Visual column — kept square so the 3D camera's aspect ratio
            never goes tall-and-narrow (that's what clipped the shape's
            edges at in-between breakpoints). */}
        <motion.div
          style={{ y: visualParallax }}
          className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[440px]"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-base-line/60" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-base-line/40" />
          {canRender3D ? (
            <Suspense
              fallback={
                <div className="h-full w-full rounded-full bg-gradient-to-br from-accent-violet/30 to-accent-cyan/20 blur-2xl" />
              }
            >
              <HeroScene reducedMotion={!!prefersReduced} pointer={pointer} />
            </Suspense>
          ) : (
            <div className="relative h-full w-full">
              <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-accent-violet via-accent-cyan to-accent-coral opacity-70 blur-2xl" />
            </div>
          )}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-base-line bg-base/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim backdrop-blur"
          >
            full-stack · ai-assisted
          </motion.span>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-ink-dim"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          className="h-8 w-px bg-ink-dim/40"
          style={{ transformOrigin: 'top' }}
          animate={prefersReduced ? {} : { scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.a>
    </section>
  );
}
