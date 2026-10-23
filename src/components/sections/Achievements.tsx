import { useState } from 'react';
import { motion } from 'motion/react';
import { Award, ExternalLink, FileText, Trophy, BookOpen, Code2 } from 'lucide-react';
import { achievements, sectionVisibility } from '../../data/data';
import { SectionHeading } from '../ui/SectionHeading';
import { CertificateLightbox } from '../ui/CertificateLightbox';
import { hasValue } from '../../lib/utils';
import { getTechIcon } from '../../lib/techIcons';
import { isDriveLink } from '../../lib/driveEmbed';

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
  const [activeCert, setActiveCert] = useState<{ url: string; title: string } | null>(null);

  if (!sectionVisibility.achievements || achievements.length === 0) return null;

  // The first entry is the headline banner result. Hackathons get their
  // own row (grouped by type so the grid never ends on an orphan card);
  // publications and coding profiles share a second "recognition" row,
  // both in the same compact icon+content layout for a clean 3-up grid.
  const [featured, ...others] = achievements;
  const hackathons = others.filter((a) => a.category === 'hackathon');
  const secondary = others.filter((a) => a.category !== 'hackathon');

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
              {featured.highlightValue ? (
                <span className="font-display text-6xl font-semibold leading-none tracking-tight text-gradient sm:text-7xl">
                  {featured.highlightValue}
                </span>
              ) : (
                <Trophy size={56} className="text-accent-coral" strokeWidth={1.5} />
              )}
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
                  <button
                    onClick={() => setActiveCert({ url: featured.url!, title: featured.title })}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent-cyan hover:underline"
                  >
                    View certificate <FileText size={13} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {hackathons.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {hackathons.map((item, i) => {
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
                  className="flex h-full flex-col rounded-3xl border border-base-line bg-base-raised/50 p-7"
                >
                  <Icon size={22} color={color} strokeWidth={1.75} />
                  {item.issuer && (
                    <h3 className="mt-4 font-display text-lg font-semibold text-ink">{item.issuer}</h3>
                  )}
                  {item.date && <p className="mt-1 font-mono text-xs text-ink-faint">{item.date}</p>}
                  <span
                    className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wide"
                    style={{ borderColor: `${color}66`, backgroundColor: `${color}1A`, color }}
                  >
                    <Trophy size={11} /> {item.title}
                  </span>
                  {item.description && (
                    <p className="mt-3 text-sm leading-relaxed text-ink-dim">{item.description}</p>
                  )}
                  {hasValue(item.url) && (
                    <button
                      onClick={() => setActiveCert({ url: item.url!, title: item.title })}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent-cyan hover:underline"
                    >
                      View certificate <FileText size={13} />
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {secondary.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {secondary.map((item, i) => {
              const isCodingProfile = item.category === 'coding-profile';
              const { Icon, color } = isCodingProfile
                ? getTechIcon(item.title)
                : { Icon: categoryIcon[item.category] ?? Award, color: categoryColor[item.category] ?? '#8B6CFF' };

              // Only an actual Drive file link gets the inline lightbox —
              // a paper on OpenReview or a profile page just opens normally.
              const openInLightbox = hasValue(item.url) && isDriveLink(item.url!);
              const linkLabel = isCodingProfile ? 'View profile' : item.category === 'publication' ? 'Read paper' : 'View certificate';

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="flex h-full flex-col rounded-3xl border border-base-line bg-base-raised/50 p-6"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                        isCodingProfile ? 'bg-paper' : ''
                      }`}
                      style={isCodingProfile ? undefined : { backgroundColor: `${color}1A` }}
                    >
                      <Icon size={isCodingProfile ? 22 : 20} color={color} strokeWidth={isCodingProfile ? undefined : 1.75} />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold leading-snug text-ink">{item.title}</h3>
                      {item.issuer && <p className="mt-1 text-sm text-ink-dim">{item.issuer}</p>}
                      {item.description && <p className="mt-1 text-sm text-ink-faint">{item.description}</p>}
                    </div>
                  </div>

                  {hasValue(item.url) &&
                    (openInLightbox ? (
                      <button
                        onClick={() => setActiveCert({ url: item.url!, title: item.title })}
                        className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm text-accent-cyan hover:underline"
                      >
                        {linkLabel} <FileText size={13} />
                      </button>
                    ) : (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm text-accent-cyan hover:underline"
                      >
                        {linkLabel} <ExternalLink size={13} />
                      </a>
                    ))}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <CertificateLightbox cert={activeCert} onClose={() => setActiveCert(null)} />
    </section>
  );
}
