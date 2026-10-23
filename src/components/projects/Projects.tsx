import { useState } from 'react';
import { projects } from '../../data/data';
import { SectionHeading } from '../ui/SectionHeading';
import { FeaturedProjectCard, CompactProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import type { Project } from '../../data/types';

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="relative bg-base py-28 sm:py-36">
      <div className="mx-auto max-w-shell px-6 sm:px-10 lg:px-16">
        <SectionHeading
          kicker="Selected Work"
          title="Things I've built."
          description="A mix of shipped products and work-in-progress — built end to end, from data model to pixel."
          accentClass="text-accent-violet"
        />

        <div className="mt-20 flex flex-col gap-24">
          {featured.map((p, i) => (
            <FeaturedProjectCard key={p.id} project={p} index={i} onOpen={setActive} />
          ))}
        </div>

        {rest.length > 0 && (
          <div className="mt-24">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-ink-dim">
              Also built
            </h3>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p, i) => (
                <CompactProjectCard key={p.id} project={p} index={i} onOpen={setActive} />
              ))}
            </div>
          </div>
        )}
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
