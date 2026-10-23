import { motion } from 'motion/react';
import { experience, sectionVisibility } from '../../data/data';
import { SectionHeading } from '../ui/SectionHeading';
import { TechPill } from '../ui/TechBadge';

export function Experience() {
  if (!sectionVisibility.experience || experience.length === 0) return null;

  return (
    <section id="experience" className="relative bg-base py-28 sm:py-36">
      <div className="mx-auto max-w-shell px-6 sm:px-10 lg:px-16">
        <SectionHeading
          kicker="Experience"
          title="Where I've worked."
          accentClass="text-accent-amber"
        />

        <div className="mt-16 flex flex-col">
          {experience.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="grid grid-cols-1 gap-4 border-t border-base-line py-8 sm:grid-cols-[180px_1fr] sm:gap-10"
            >
              <span className="font-mono text-sm text-ink-dim">{item.period}</span>
              <div>
                <h3 className="font-display text-xl font-semibold text-ink">
                  {item.role} · <span className="text-ink-dim">{item.organization}</span>
                </h3>
                {item.location && <p className="mt-1 text-sm text-ink-faint">{item.location}</p>}
                <p className="mt-3 max-w-2xl text-ink-dim">{item.description}</p>
                {item.bullets && item.bullets.length > 0 && (
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {item.bullets.map((b) => (
                      <li key={b} className="text-sm text-ink-dim">
                        — {b}
                      </li>
                    ))}
                  </ul>
                )}
                {item.tech && item.tech.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tech.map((t) => (
                      <TechPill key={t} name={t} />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
