"use client";

import {
  formatPhoneDisplay,
  getAge,
  getWhatsAppUrl,
  profile,
} from "@/content/profile";
import {
  dockerPsRows,
  skillCategories,
  terminalBio,
} from "@/content/terminal";
import { DockerStatsLive } from "@/features/terminal/live/DockerStatsLive";
import { GitLogLive } from "@/features/terminal/live/GitLogLive";
import { SystemStatsLive } from "@/features/terminal/live/SystemStatsLive";
import { TestReportLive } from "@/features/terminal/live/TestReportLive";
import type { OutputComponentId } from "./types";

type OutputProps = Record<string, unknown>;

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
    case "docker-ps":
      return <DockerPsOutput />;
    case "file-content":
      return (
        <FileContentOutput
          filename={String(props.filename ?? "file")}
          content={String(props.content ?? "")}
        />
      );
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
    <p className="whitespace-pre-wrap text-zinc-300 leading-relaxed">
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
    <ul className="space-y-2 text-zinc-300">
      <li>
        <span className="text-zinc-500">Nome </span>
        {profile.name} · {profile.birthYear} ({getAge()} anos)
      </li>
      <li>
        <span className="text-zinc-500">LinkedIn </span>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 underline-offset-2 hover:text-cyan-300 hover:underline"
        >
          linkedin.com/in/manoel-victor-b6a45b333
        </a>
      </li>
      <li>
        <span className="text-zinc-500">E-mail </span>
        <a
          href={`mailto:${profile.email}`}
          className="text-cyan-400 underline-offset-2 hover:text-cyan-300 hover:underline"
        >
          {profile.email}
        </a>
      </li>
      <li>
        <span className="text-zinc-500">Celular </span>
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-400 underline-offset-2 hover:text-emerald-300 hover:underline"
        >
          {formatPhoneDisplay()} (WhatsApp)
        </a>
      </li>
      <li>
        <span className="text-zinc-500">GitHub </span>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 underline-offset-2 hover:text-cyan-300 hover:underline"
        >
          github.com/{profile.githubUsername}
        </a>
      </li>
    </ul>
  );
}

function DockerPsOutput() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-left text-[10px]">
        <thead>
          <tr className="border-b border-white/10 text-zinc-500">
            <th className="py-1 pr-2 font-normal">CONTAINER ID</th>
            <th className="py-1 pr-2 font-normal">IMAGE</th>
            <th className="py-1 pr-2 font-normal">COMMAND</th>
            <th className="py-1 pr-2 font-normal">STATUS</th>
            <th className="py-1 font-normal">PORTS</th>
          </tr>
        </thead>
        <tbody>
          {dockerPsRows.map((row) => (
            <tr key={row.id} className="border-b border-white/5 text-zinc-400">
              <td className="py-1.5 pr-2 font-mono text-amber-200/90">
                {row.id}
              </td>
              <td className="py-1.5 pr-2 text-cyan-300/90">{row.image}</td>
              <td className="py-1.5 pr-2 text-zinc-500">{row.command}</td>
              <td className="py-1.5 pr-2 text-emerald-400/90">{row.status}</td>
              <td className="py-1.5 text-emerald-300/80">{row.ports}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FileContentOutput({
  filename,
  content,
}: {
  filename: string;
  content: string;
}) {
  const isMarkdown = filename.endsWith(".md");

  return (
    <pre
      className={`whitespace-pre-wrap text-xs leading-relaxed ${
        isMarkdown ? "text-emerald-200/90" : "text-zinc-300"
      }`}
    >
      {content}
    </pre>
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
  return (
    <TerminalOutputView id={output.id} props={output.props} />
  );
}
