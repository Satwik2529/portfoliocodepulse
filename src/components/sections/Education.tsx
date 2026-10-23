import { motion } from 'motion/react';
import { education, sectionVisibility } from '../../data/data';
import { SectionHeading } from '../ui/SectionHeading';

export function Education() {
  if (!sectionVisibility.education || education.length === 0) return null;

  return (
    <section id="education" className="relative bg-base py-28 sm:py-36">
      <div className="mx-auto max-w-shell px-6 sm:px-10 lg:px-16">
        <SectionHeading kicker="Education" title="What I studied." accentClass="text-accent-cyan" />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {education.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="rounded-3xl border border-base-line bg-base-raised/50 p-7"
            >
              <span className="font-mono text-xs text-ink-dim">{item.period}</span>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink">{item.degree}</h3>
              <p className="mt-1 text-ink-dim">{item.institution}</p>
              {item.location && <p className="mt-1 text-sm text-ink-faint">{item.location}</p>}
              {item.description && <p className="mt-3 text-sm text-ink-dim">{item.description}</p>}
              {item.score && (
                <p className="mt-3 font-mono text-sm text-accent-cyan">{item.score}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
