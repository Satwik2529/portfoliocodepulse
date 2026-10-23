import { personal } from '../../data/data';
import { Reveal, StaggerGroup, staggerItem } from '../ui/Reveal';
import { motion } from 'motion/react';
import { hasValue } from '../../lib/utils';

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-paper py-28 text-paper-ink sm:py-36">
      <div className="pointer-events-none absolute inset-0 opacity-[0.35]">
        <div className="noise-overlay" style={{ opacity: 0.06, mixBlendMode: 'multiply' }} />
      </div>

      {/* Recurring orbital motif, echoing the hero visual, tying the two
          sections to one visual system. */}
      <div className="pointer-events-none absolute -right-24 top-10 hidden h-72 w-72 opacity-[0.12] lg:block">
        <div className="absolute inset-0 rounded-full border border-paper-ink" />
        <div className="absolute inset-[18%] rounded-full border border-dashed border-paper-ink" />
        <span className="absolute right-[6%] top-[38%] h-2.5 w-2.5 rounded-full bg-accent-coral" />
      </div>

      <div className="relative mx-auto max-w-shell px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-8 bg-accent-coral" />
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-paper-ink/60">
                  About
                </span>
              </div>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                Who's behind
                <br />
                the screen.
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-8 max-w-sm font-display text-xl font-medium leading-snug tracking-tight sm:text-2xl">
                {personal.intro}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-col gap-4 border-t border-paper-ink/10 pt-8 font-mono text-sm text-paper-ink/60">
                <div className="flex justify-between">
                  <span>Role</span>
                  <span className="text-paper-ink">{personal.title}</span>
                </div>
                {personal.location && (
                  <div className="flex justify-between">
                    <span>Based in</span>
                    <span className="text-paper-ink">{personal.location}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Focus</span>
                  <span className="text-paper-ink">Full-Stack + AI</span>
                </div>
              </div>
            </Reveal>
          </div>

          {hasValue(personal.profileImage) && (
            <Reveal delay={0.1} className="lg:col-span-3">
              <div className="relative mx-auto max-w-[240px] lg:max-w-none">
                <div className="absolute -inset-3 -z-10 rotate-2 rounded-[2rem] border border-dashed border-accent-coral/40" />
                <div className="absolute -inset-3 -z-10 -rotate-1 rounded-[2rem] bg-accent-violet/10" />
                <img
                  src={personal.profileImage}
                  alt={personal.name}
                  className="aspect-[3/4] w-full rounded-3xl object-cover shadow-xl"
                  loading="lazy"
                />
              </div>
            </Reveal>
          )}

          {/* Short, scannable callouts instead of a wall of prose. */}
          <StaggerGroup
            className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1 ${
              hasValue(personal.profileImage) ? 'lg:col-span-5' : 'lg:col-span-7 lg:col-start-6 lg:grid-cols-3'
            }`}
          >
            {personal.aboutCallouts.map((callout, i) => (
              <motion.div
                key={callout.id}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                className="flex flex-col rounded-3xl border border-paper-ink/10 bg-paper-dim/40 p-6"
              >
                <span className="font-mono text-xs" style={{ color: ['#8B6CFF', '#00B8C9', '#D1456A'][i % 3] }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{callout.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper-ink/70">{callout.text}</p>
              </motion.div>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
