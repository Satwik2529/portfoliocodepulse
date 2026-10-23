import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Play, Trophy, X } from 'lucide-react';
import type { Project } from '../../data/types';
import { accentMap, hasValue } from '../../lib/utils';
import { ProjectVisual } from '../ui/ProjectVisual';
import { TechPill } from '../ui/TechBadge';
import { DriveEmbed } from '../ui/DriveEmbed';
import { SocialIcon } from '../ui/SocialIcon';
import { useEffect, useState } from 'react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

type Media = { type: 'image'; src: string } | { type: 'video' };

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Reset the active media when a different project opens. Done during
  // render (not an effect) per React's guidance for adjusting state in
  // response to a prop change — avoids an extra render pass.
  const [shownProjectId, setShownProjectId] = useState(project?.id);
  const [activeMedia, setActiveMedia] = useState<Media | undefined>(
    project?.image ? { type: 'image', src: project.image } : undefined
  );
  if (project?.id !== shownProjectId) {
    setShownProjectId(project?.id);
    setActiveMedia(project?.image ? { type: 'image', src: project.image } : undefined);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = project ? 'hidden' : '';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  const gallery = project?.gallery?.length ? project.gallery : project?.image ? [project.image] : [];
  const hasVideo = hasValue(project?.demoVideo);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-base/90 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-base-line bg-base-raised"
          >
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-base-line bg-base/70 text-ink backdrop-blur hover:text-accent-cyan"
            >
              <X size={18} />
            </button>

            <div className="relative aspect-[2/1] w-full overflow-hidden bg-black">
              <AnimatePresence mode="wait">
                {activeMedia?.type === 'video' ? (
                  <motion.div
                    key="video"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0"
                  >
                    <DriveEmbed url={project.demoVideo!} title={`${project.title} demo video`} />
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeMedia?.src ?? 'fallback'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0"
                  >
                    <ProjectVisual
                      image={activeMedia?.type === 'image' ? activeMedia.src : undefined}
                      title={project.title}
                      accent={project.accent}
                      seed={project.id}
                      className="h-full w-full object-top"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {(gallery.length > 1 || hasVideo) && (
              <div className="flex gap-2 overflow-x-auto border-b border-base-line bg-base/60 p-3">
                {gallery.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setActiveMedia({ type: 'image', src })}
                    aria-label={`View screenshot ${i + 1} of ${project.title}`}
                    className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                      activeMedia?.type === 'image' && activeMedia.src === src
                        ? 'border-accent-cyan'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={src} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
                  </button>
                ))}
                {hasVideo && (
                  <button
                    onClick={() => setActiveMedia({ type: 'video' })}
                    aria-label={`Watch ${project.title} demo video`}
                    className={`relative flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 bg-base-raised transition-colors ${
                      activeMedia?.type === 'video'
                        ? 'border-accent-cyan'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Play size={18} className="text-ink" fill="currentColor" />
                  </button>
                )}
              </div>
            )}

            <div className="p-7 sm:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="font-mono text-xs uppercase tracking-[0.2em]"
                  style={{ color: accentMap[project.accent].hex }}
                >
                  {project.category}
                </span>
                <span className="text-ink-faint">·</span>
                <span className="font-mono text-xs text-ink-dim">{project.status}</span>
                {project.year && (
                  <>
                    <span className="text-ink-faint">·</span>
                    <span className="font-mono text-xs text-ink-dim">{project.year}</span>
                  </>
                )}
              </div>

              <h3 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
                {project.title}
              </h3>
              <p className="mt-2 text-ink-dim">{project.subtitle}</p>

              {project.award && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-accent-amber/40 bg-accent-amber/10 px-3.5 py-1.5 font-mono text-xs uppercase tracking-wide text-accent-amber">
                  <Trophy size={13} /> {project.award}
                </div>
              )}

              <p className="mt-6 max-w-2xl leading-relaxed text-ink-dim">{project.description}</p>

              {project.highlights && project.highlights.length > 0 && (
                <ul className="mt-6 flex flex-col gap-2.5">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm text-ink-dim">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: accentMap[project.accent].hex }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-7 flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <TechPill key={t} name={t} />
                ))}
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                {hasVideo && (
                  <button
                    onClick={() => setActiveMedia({ type: 'video' })}
                    className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-base transition-colors hover:bg-accent-cyan"
                  >
                    <Play size={14} fill="currentColor" /> Watch Demo
                  </button>
                )}
                {hasValue(project.github) && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-full border border-base-line px-5 py-2.5 text-sm text-ink transition-colors hover:border-accent-cyan/60 hover:text-accent-cyan"
                  >
                    <SocialIcon icon="github" size={16} /> Source
                  </a>
                )}
                {hasValue(project.liveDemo) && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-full border border-base-line px-5 py-2.5 text-sm text-ink transition-colors hover:border-accent-cyan/60 hover:text-accent-cyan"
                  >
                    Live Demo <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
