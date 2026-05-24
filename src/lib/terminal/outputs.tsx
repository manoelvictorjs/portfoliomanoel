"use client";

import {
  formatPhoneDisplay,
  getAge,
  getWhatsAppUrl,
  profile,
} from "@/content/profile";
import { projects } from "@/content/projects";
import { skillCategories, terminalBio } from "@/content/terminal";
import { DockerStatsLive } from "@/features/terminal/live/DockerStatsLive";
import { GitLogLive } from "@/features/terminal/live/GitLogLive";
import { PingLive } from "@/features/terminal/live/PingLive";
import { SiteStatusLive } from "@/features/terminal/live/SiteStatusLive";
import { SystemStatsLive } from "@/features/terminal/live/SystemStatsLive";
import { TestReportLive } from "@/features/terminal/live/TestReportLive";
import type { OutputComponentId } from "./types";

type OutputProps = Record<string, unknown>;

function CopyButton({ text, label }: { text: string; label: string }) {
  return (
    <button
      type="button"
      onClick={() => void navigator.clipboard.writeText(text)}
      className="mt-1 rounded-md border border-teal-500/30 bg-teal-500/10 px-2.5 py-1 text-[10px] text-teal-200 hover:bg-teal-500/20"
    >
      {label}
    </button>
  );
}

export function TerminalOutputView({
  id,
  props = {},
}: {
  id: OutputComponentId;
  props?: OutputProps;
}) {
  switch (id) {
    case "bio":
      return <BioOutput />;
    case "skills-table":
      return <SkillsTableOutput />;
    case "contact":
      return <ContactOutput />;
    case "projects-list":
      return <ProjectsListOutput />;
    case "ping-live":
      return <PingLive />;
    case "site-status":
      return <SiteStatusLive />;
    case "system-stats-live":
      return <SystemStatsLive />;
    case "docker-stats-live":
      return <DockerStatsLive />;
    case "git-log-live":
      return <GitLogLive />;
    case "test-report-live":
      return <TestReportLive />;
    default:
      return null;
  }
}

function BioOutput() {
  return (
    <p className="whitespace-pre-wrap leading-relaxed text-zinc-300">
      {terminalBio}
    </p>
  );
}

function SkillsTableOutput() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {skillCategories.map((cat) => (
        <div
          key={cat.name}
          className="rounded border border-white/10 bg-white/[0.03] p-3"
        >
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-cyan-400/90">
            {cat.name}
          </p>
          <ul className="space-y-1">
            {cat.items.map((item) => (
              <li key={item} className="text-zinc-400">
                <span className="text-emerald-500/80">▸ </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ContactOutput() {
  return (
    <div className="space-y-3">
      <ul className="space-y-2 text-zinc-300">
        <li>
          <span className="text-zinc-500">Nome </span>
          {profile.name} · {getAge()} anos
        </li>
        <li>
          <span className="text-zinc-500">E-mail </span>
          <a
            href={`mailto:${profile.email}`}
            className="text-cyan-400 underline-offset-2 hover:underline"
          >
            {profile.email}
          </a>
          <CopyButton text={profile.email} label="Copiar e-mail" />
        </li>
        <li>
          <span className="text-zinc-500">WhatsApp </span>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 underline-offset-2 hover:underline"
          >
            {formatPhoneDisplay()}
          </a>
        </li>
        <li>
          <span className="text-zinc-500">LinkedIn </span>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 underline-offset-2 hover:underline"
          >
            Abrir perfil
          </a>
        </li>
        <li>
          <span className="text-zinc-500">GitHub </span>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 underline-offset-2 hover:underline"
          >
            github.com/{profile.githubUsername}
          </a>
        </li>
      </ul>
    </div>
  );
}

function ProjectsListOutput() {
  const withLive = projects.filter((p) => p.liveUrl);

  return (
    <ul className="space-y-3">
      {withLive.map((p) => (
        <li
          key={p.id}
          className="rounded-lg border border-white/10 bg-white/[0.03] p-3"
        >
          <p className="font-medium text-white">{p.displayName}</p>
          <p className="mt-1 text-[11px] text-zinc-500">{p.tagline}</p>
          <a
            href={p.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-[11px] text-cyan-400 hover:underline"
          >
            Abrir site ao vivo →
          </a>
        </li>
      ))}
      <li className="text-[11px] text-zinc-500">
        Digite <span className="text-zinc-400">projetos</span> de novo ou role até
        #projects na página.
      </li>
    </ul>
  );
}

export function renderOutput(
  output: import("./types").TerminalOutput,
): React.ReactNode {
  if (output.kind === "text") {
    return output.lines.map((line, i) => (
      <p key={i} className="whitespace-pre-wrap text-zinc-300">
        {line}
      </p>
    ));
  }
  return <TerminalOutputView id={output.id} props={output.props} />;
}
