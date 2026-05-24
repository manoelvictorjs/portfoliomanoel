"use client";

import {
  completedProjects,
  inProgressProjects,
  type Project,
} from "@/content/projects";
import { CompileSection } from "@/shared/ui/CompileSection";
import { SectionHeader } from "@/shared/ui/SectionHeader";
import { ProjectModal, useProjectModal } from "./ProjectModal";
import { ProjectCover } from "./ProjectCover";
import { motion } from "framer-motion";
import { springSnappy } from "@/lib/motion";

const KIND_LABEL = {
  client: { text: "Cliente", class: "bg-amber-500/15 text-amber-200 border-amber-500/25" },
  freelance: { text: "Freelance", class: "bg-teal-500/15 text-teal-200 border-teal-500/25" },
  course: { text: "Curso", class: "bg-violet-500/15 text-violet-200 border-violet-500/25" },
  personal: { text: "Pessoal", class: "bg-rose-500/15 text-rose-200 border-rose-500/25" },
} as const;

function ProjectGrid({
  items,
  onOpen,
}: {
  items: Project[];
  onOpen: (id: string) => void;
}) {
  const featured = items.find((p) => p.featured) ?? items[0];
  const rest = items.filter((p) => p.id !== featured?.id);

  if (!featured) return null;

  return (
    <>
      <motion.button
        type="button"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={springSnappy}
        whileHover={{ y: -6 }}
        onClick={() => onOpen(featured.id)}
        className="glass-card group mb-6 w-full overflow-hidden rounded-[var(--radius-xl)] text-left ring-1 ring-teal-500/20"
      >
        <div className="relative">
          <ProjectCover project={featured} variant="featured" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
            <span className="absolute right-6 top-6 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              ★ Destaque
            </span>
            <p className="font-mono text-xs text-white/80">{featured.repo}</p>
            <h3 className="font-display mt-2 text-3xl font-bold text-white drop-shadow-lg md:text-4xl">
              {featured.displayName}
            </h3>
            <p className="mt-2 max-w-xl text-base text-white/90 drop-shadow">
              {featured.tagline}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <p className="text-sm font-medium text-teal-200 opacity-0 transition-opacity group-hover:opacity-100">
                Ver case completo →
              </p>
              {featured.liveUrl && (
                <a
                  href={featured.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-lg border border-white/25 bg-black/50 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm hover:bg-white/20"
                >
                  Visitar site ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.button>

      {rest.length > 0 && (
        <div className="grid gap-5 md:grid-cols-2">
          {rest.map((p, i) => {
            const kind = KIND_LABEL[p.kind];
            return (
              <motion.button
                key={p.id}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...springSnappy, delay: i * 0.06 }}
                whileHover={{ y: -5 }}
                onClick={() => onOpen(p.id)}
                className="glass-card group overflow-hidden rounded-[var(--radius-lg)] text-left"
              >
                <div className="relative">
                  <ProjectCover project={p} variant="card" />
                  <span
                    className={`absolute right-4 top-4 z-10 rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${kind.class}`}
                  >
                    {kind.text}
                  </span>
                  <h3 className="absolute bottom-5 left-6 z-10 font-display text-xl font-bold text-white drop-shadow-md">
                    {p.displayName}
                  </h3>
                </div>
                <div className="p-5">
                  <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400">
                    {p.tagline}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="btn-primary rounded-lg px-4 py-2 text-xs font-medium"
                      >
                        Visitar site ↗
                      </a>
                    )}
                    {p.linkedInUrl && (
                      <span className="text-[10px] text-sky-400">● LinkedIn</span>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      )}
    </>
  );
}

export function ProjectsShowcase() {
  const { project, open, close } = useProjectModal();

  return (
    <CompileSection
      id="projects"
      variant="up"
      delay={0.05}
      className="relative px-5 py-24 md:px-10 lg:px-16 lg:py-32"
    >
      <ProjectModal project={project} onClose={close} />
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          number="04"
          label="Projetos"
          title="Trabalho recente"
          subtitle="Cases entregues e o que estou construindo agora."
        />

        <div className="mb-12">
          <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
            Finalizados
          </h3>
          <div className="mt-6">
            <ProjectGrid items={completedProjects} onOpen={open} />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
            Em andamento
          </h3>
          <div className="mt-6">
            <ProjectGrid items={inProgressProjects} onOpen={open} />
          </div>
        </div>
      </div>
    </CompileSection>
  );
}
