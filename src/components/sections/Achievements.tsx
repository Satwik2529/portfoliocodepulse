import { motion } from 'motion/react';
import { Award, ExternalLink, Trophy, BookOpen, Code2 } from 'lucide-react';
import { achievements, sectionVisibility } from '../../data/data';
import { SectionHeading } from '../ui/SectionHeading';
import { hasValue } from '../../lib/utils';
import { getTechIcon } from '../../lib/techIcons';

const categoryIcon: Record<string, typeof Award> = {
  hackathon: Trophy,
  award: Award,
  publication: BookOpen,
  certification: Award,
  'coding-profile': Code2,
};

const categoryColor: Record<string, string> = {
  hackathon: '#FF5C7A',
  award: '#FFB347',
  publication: '#8B6CFF',
  certification: '#FFB347',
  'coding-profile': '#00E6F6',
};

export function Achievements() {
  if (!sectionVisibility.achievements || achievements.length === 0) return null;

  // The first entry is treated as the headline result (array order in
  // data.ts is the place to re-order which achievement leads).
  const [featured, ...others] = achievements;
  const rest = others.filter((a) => a.category !== 'coding-profile');
  const codingProfiles = others.filter((a) => a.category === 'coding-profile');

  return (
    <section id="achievements" className="relative bg-base py-28 sm:py-36">
      <div className="mx-auto max-w-shell px-6 sm:px-10 lg:px-16">
        <SectionHeading
          kicker="Recognition"
          title="Hackathons & achievements."
          accentClass="text-accent-coral"
        />

        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="relative mt-16 overflow-hidden rounded-[28px] border border-base-line bg-base-raised/60 p-8 sm:p-12"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-coral/15 blur-[100px]" />
            <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[auto_1fr]">
              <span className="font-display text-6xl font-semibold leading-none tracking-tight text-gradient sm:text-7xl">
                Top 8
              </span>
              <div>
                {featured.issuer && (
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-coral">
                    {featured.issuer}
                  </span>
                )}
                <h3 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">{featured.title}</h3>
                {featured.description && (
                  <p className="mt-3 max-w-xl text-ink-dim">{featured.description}</p>
                )}
                {hasValue(featured.url) && (
                  <a
                    href={featured.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent-cyan hover:underline"
                  >
                    View certificate <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {rest.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((item, i) => {
              const Icon = categoryIcon[item.category] ?? Award;
              const color = categoryColor[item.category] ?? '#FF5C7A';
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="rounded-3xl border border-base-line bg-base-raised/50 p-7"
                >
                  <Icon size={22} color={color} strokeWidth={1.75} />
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">{item.title}</h3>
                  {item.issuer && <p className="mt-1 text-sm text-ink-dim">{item.issuer}</p>}
                  {item.date && <p className="mt-1 font-mono text-xs text-ink-faint">{item.date}</p>}
                  {item.description && (
                    <p className="mt-3 text-sm leading-relaxed text-ink-dim">{item.description}</p>
                  )}
                  {hasValue(item.url) && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent-cyan hover:underline"
                    >
                      View <ExternalLink size={13} />
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {codingProfiles.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {codingProfiles.map((item, i) => {
              const { Icon, color } = getTechIcon(item.title);
              const content = (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="flex items-center gap-5 rounded-3xl border border-base-line bg-base-raised/50 p-7"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-paper">
                    <Icon size={28} color={color} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">{item.title}</h3>
                    {item.issuer && <p className="mt-1 text-sm text-ink-dim">{item.issuer}</p>}
                    {item.description && <p className="mt-1 text-sm text-ink-faint">{item.description}</p>}
                  </div>
                </motion.div>
              );
              return hasValue(item.url) ? (
                <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="block">
                  {content}
                </a>
              ) : (
                <div key={item.id}>{content}</div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
