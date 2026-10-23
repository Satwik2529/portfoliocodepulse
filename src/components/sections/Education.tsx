import { motion } from 'motion/react';
import { GraduationCap } from 'lucide-react';
import { education, sectionVisibility } from '../../data/data';
import { SectionHeading } from '../ui/SectionHeading';

// Full-width timeline rows (matching Experience's layout) instead of a
// narrow boxed card — uses the section's width properly even with just
// one entry, and stays consistent with how Experience presents dates.
export function Education() {
  if (!sectionVisibility.education || education.length === 0) return null;

  return (
    <section id="education" className="relative bg-base py-28 sm:py-36">
      <div className="mx-auto max-w-shell px-6 sm:px-10 lg:px-16">
        <SectionHeading kicker="Education" title="What I studied." accentClass="text-accent-cyan" />

        <div className="mt-16 flex flex-col">
          {education.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="grid grid-cols-1 gap-5 border-t border-base-line py-9 sm:grid-cols-[180px_1fr_auto] sm:items-start sm:gap-10"
            >
              <span className="font-mono text-sm text-ink-dim">{item.period}</span>

              <div>
                <div className="flex items-center gap-2.5">
                  <GraduationCap size={18} className="text-accent-cyan" />
                  <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">{item.degree}</h3>
                </div>
                <p className="mt-2 max-w-xl text-ink-dim">{item.institution}</p>
                {item.location && <p className="mt-1 text-sm text-ink-faint">{item.location}</p>}
                {item.description && (
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-dim">{item.description}</p>
                )}
              </div>

              {item.score && (
                <span className="inline-flex h-fit items-center rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-4 py-1.5 font-mono text-sm text-accent-cyan">
                  {item.score}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
