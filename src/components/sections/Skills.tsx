import { motion } from 'motion/react';
import { skillCategories } from '../../data/data';
import { SectionHeading } from '../ui/SectionHeading';
import { TechTile } from '../ui/TechBadge';
import { accentMap, cn } from '../../lib/utils';

// Bento-style spans: the first two categories run wide across the top
// row, the rest sit as four even columns beneath — deliberate asymmetry
// instead of one uniform card grid.
const spanClass = (i: number) => (i < 2 ? 'lg:col-span-2' : 'lg:col-span-1');

export function Skills() {
  return (
    <section id="skills" className="relative bg-base py-28 sm:py-36">
      <div className="mx-auto max-w-shell px-6 sm:px-10 lg:px-16">
        <SectionHeading
          kicker="Toolbox"
          title="What I build with."
          description="A working set of languages, frameworks, and tools — picked for shipping, not for show."
          accentClass="text-accent-lime"
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((cat, i) => {
            const tone = accentMap[cat.accent];
            const wide = i < 2;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.07 }}
                whileHover={{ y: -4 }}
                className={cn(
                  'group relative overflow-hidden rounded-3xl border border-base-line bg-base-raised/60',
                  wide ? 'p-8' : 'p-6',
                  spanClass(i)
                )}
              >
                <div
                  className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
                  style={{ backgroundColor: tone.hex }}
                />
                <div className="relative flex items-center justify-between">
                  <h3 className={cn('font-display font-semibold text-ink', wide ? 'text-2xl' : 'text-lg')}>
                    {cat.label}
                  </h3>
                  <span className="font-mono text-xs" style={{ color: tone.hex }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="relative mt-6 flex flex-wrap gap-2.5">
                  {cat.items.map((item) => (
                    <TechTile key={item} name={item} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
