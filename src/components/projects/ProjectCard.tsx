import { useRef } from 'react';
import type { PointerEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../../data/types';
import { accentMap, hasValue } from '../../lib/utils';
import { ProjectVisual } from '../ui/ProjectVisual';
import { TechPill } from '../ui/TechBadge';
import { StatCounter } from '../ui/StatCounter';
import { SocialIcon } from '../ui/SocialIcon';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}

// Large, alternating editorial layout for featured work. The image panel
// tilts toward the pointer (a subtle 3D parallax, not a gimmick) and real
// résumé metrics count up once scrolled into view.
export function FeaturedProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const reversed = index % 2 === 1;
  const tone = accentMap[project.accent];

  const frameRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 20 });
  const scale = useSpring(1, { stiffness: 220, damping: 20 });

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 10);
    rotateX.set(py * -10);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-6"
    >
      <div
        ref={frameRef}
        className={`group relative aspect-[2/1] cursor-pointer overflow-hidden rounded-[28px] border border-base-line [perspective:1000px] lg:col-span-7 ${
          reversed ? 'lg:order-2 lg:col-start-6' : 'lg:col-start-1'
        }`}
        onClick={() => onOpen(project)}
        onPointerMove={handlePointerMove}
        onPointerEnter={() => scale.set(1.04)}
        onPointerLeave={resetTilt}
      >
        <motion.div className="h-full w-full" style={{ rotateX, rotateY, scale }}>
          <ProjectVisual
            image={project.image}
            title={project.title}
            accent={project.accent}
            seed={project.id}
            className="h-full w-full object-top"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base/70 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-base-line/60 bg-base/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide text-ink backdrop-blur">
          {project.status}
        </div>
      </div>

      <div className={`lg:col-span-5 ${reversed ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8'}`}>
        <span className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: tone.hex }}>
          {String(index + 1).padStart(2, '0')} · {project.category}
        </span>
        <h3
          className="mt-4 cursor-pointer font-display text-3xl font-semibold leading-tight text-ink transition-colors hover:text-accent-cyan sm:text-4xl"
          onClick={() => onOpen(project)}
        >
          {project.title}
        </h3>
        <p className="mt-1.5 text-ink-dim">{project.subtitle}</p>
        <p className="mt-5 max-w-md leading-relaxed text-ink-dim">{project.description}</p>

        {project.stats && project.stats.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-7 border-y border-base-line py-5">
            {project.stats.map((stat, i) => (
              <StatCounter key={stat.label} stat={stat} color={tone.hex} delay={i * 0.1} />
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map((t) => (
            <TechPill key={t} name={t} />
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-5">
          <button
            onClick={() => onOpen(project)}
            className="flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent-cyan"
          >
            View details <ArrowUpRight size={15} />
          </button>
          {hasValue(project.github) && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sm text-ink-dim transition-colors hover:text-ink"
            >
              <SocialIcon icon="github" size={15} /> Code
            </a>
          )}
          {hasValue(project.liveDemo) && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sm text-ink-dim transition-colors hover:text-ink"
            >
              Live <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// Compact card for supporting / non-featured projects.
export function CompactProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const tone = accentMap[project.accent];
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="group cursor-pointer overflow-hidden rounded-3xl border border-base-line bg-base-raised/50"
      onClick={() => onOpen(project)}
    >
      <div className="relative aspect-[2/1] overflow-hidden">
        <ProjectVisual
          image={project.image}
          title={project.title}
          accent={project.accent}
          seed={project.id}
          className="h-full w-full object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: tone.hex }}>
          {project.category}
        </span>
        <h4 className="mt-2 font-display text-xl font-semibold text-ink">{project.title}</h4>
        <p className="mt-1 text-sm text-ink-dim">{project.subtitle}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((t) => (
            <TechPill key={t} name={t} className="text-[10px]" />
          ))}
        </div>
      </div>
    </motion.article>
  );
}
