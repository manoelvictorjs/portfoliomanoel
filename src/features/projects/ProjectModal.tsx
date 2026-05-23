"use client";

import { projects, type Project, type ProjectTab } from "@/content/projects";
import { ProjectCover } from "./ProjectCover";
import { RippleTab } from "@/shared/ui/RippleTab";
import { AnimatePresence, motion } from "framer-motion";
import { springSnappy, fadeFast } from "@/lib/motion";
import { useEffect, useState } from "react";

type Props = {
  project: Project | null;
  onClose: () => void;
};

function ProjectModalPanel({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<ProjectTab>("business");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={fadeFast}
    >
          <button
            type="button"
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={onClose}
            aria-label="Fechar projeto"
          />
          <motion.div
            role="dialog"
            aria-modal
            layout
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={springSnappy}
            className="surface-elevated relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[var(--radius-xl)] p-6 md:p-8"
          >
            <ProjectCover
              project={project}
              variant="modal"
              className="mb-6 rounded-xl"
            />
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-2xl font-bold text-white">
                    {project.displayName}
                  </h3>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-zinc-500">
                    {project.status === "in_progress"
                      ? "Em produção"
                      : project.kind === "client"
                        ? "Cliente"
                        : project.kind === "freelance"
                          ? "Freelance"
                          : project.kind === "personal"
                            ? "Pessoal"
                            : "Curso"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-zinc-500">{project.tagline}</p>
                {project.linkedInUrl && (
                  <a
                    href={project.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block font-mono text-[11px] text-[#0a66c2] hover:underline"
                  >
                    ↗ Post no LinkedIn
                  </a>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="font-mono text-xs text-zinc-500 hover:text-zinc-300"
              >
                [fechar]
              </button>
            </div>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold"
              >
                Visitar site ↗
              </a>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              <RippleTab
                active={tab === "business"}
                onClick={() => setTab("business")}
              >
                [💡 O que é]
              </RippleTab>
              <RippleTab
                active={tab === "engineering"}
                onClick={() => setTab("engineering")}
              >
                [🛠️ Engenharia]
              </RippleTab>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, x: tab === "business" ? -8 : 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={fadeFast}
                className="mt-6 min-h-[160px] text-sm leading-relaxed text-zinc-300"
              >
                {tab === "business" ? (
                  <div className="space-y-4">
                    <p>{project.businessPitch}</p>
                    <p className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-emerald-200/90">
                      <strong className="text-emerald-400">Resultado: </strong>
                      {project.businessResult}
                    </p>
                  </div>
                ) : (
                  <ul className="space-y-3 font-mono text-xs">
                    <li>
                      <span className="text-zinc-600">Arquitetura · </span>
                      {project.engineering.architecture}
                    </li>
                    <li>
                      <span className="text-zinc-600">Banco · </span>
                      {project.engineering.database}
                    </li>
                    <li>
                      <span className="text-emerald-400">
                        {project.engineering.tests}
                      </span>
                    </li>
                    <li>
                      <span className="text-zinc-600">Infra · </span>
                      {project.engineering.infra}
                    </li>
                    <li className="flex flex-wrap gap-2 pt-2">
                      {project.stack.map((t) => (
                        <span
                          key={t}
                          className="rounded border border-white/10 px-2 py-1 text-zinc-400"
                        >
                          {t}
                        </span>
                      ))}
                    </li>
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
    </motion.div>
  );
}

export function ProjectModal({ project, onClose }: Props) {
  return (
    <AnimatePresence>
      {project ? (
        <ProjectModalPanel key={project.id} project={project} onClose={onClose} />
      ) : null}
    </AnimatePresence>
  );
}

export function useProjectModal() {
  const [id, setId] = useState<string | null>(null);
  const project = projects.find((p) => p.id === id) ?? null;
  return {
    project,
    open: (projectId: string) => setId(projectId),
    close: () => setId(null),
  };
}
