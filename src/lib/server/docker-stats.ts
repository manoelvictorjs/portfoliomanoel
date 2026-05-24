import { exec } from "node:child_process";
import { promisify } from "node:util";
import { fetchFromVps } from "./vps-proxy";

const execAsync = promisify(exec);

export type DockerStatRow = {
  name: string;
  id: string;
  image: string;
  cpuPercent: string;
  memUsage: string;
  memPercent: string;
  netIO: string;
  blockIO: string;
};

export type DockerStatsPayload = {
  source: "local" | "vps" | "unavailable";
  containers: DockerStatRow[];
  timestamp: string;
  message?: string;
};

function parseDockerLine(line: string): DockerStatRow | null {
  try {
    const row = JSON.parse(line) as Record<string, string>;
    return {
      name: row.Name ?? row.Container ?? "unknown",
      id: (row.ID ?? row.Container ?? "").slice(0, 12),
      image: row.Image ?? "-",
      cpuPercent: row.CPUPerc ?? row.CPU ?? "0%",
      memUsage: row.MemUsage ?? "-",
      memPercent: row.MemPerc ?? "0%",
      netIO: row.NetIO ?? "-",
      blockIO: row.BlockIO ?? "-",
    };
  } catch {
    return null;
  }
}

const isVercel = Boolean(process.env.VERCEL);

export async function getDockerStats(): Promise<DockerStatsPayload> {
  const vps = await fetchFromVps<DockerStatsPayload>("/docker/stats");
  if (vps?.containers?.length) {
    return { ...vps, source: "vps", timestamp: new Date().toISOString() };
  }

  if (isVercel) {
    return {
      source: "unavailable",
      containers: [],
      timestamp: new Date().toISOString(),
      message:
        "Telemetria Docker disponível via VPS_API_BASE_URL (monitor na VPS).",
    };
  }

  try {
    const { stdout } = await execAsync(
      'docker stats --no-stream --format "{{json .}}"',
      { timeout: 8000, maxBuffer: 1024 * 512 },
    );

    const containers = stdout
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map(parseDockerLine)
      .filter((r): r is DockerStatRow => r !== null);

    if (containers.length === 0) {
      return {
        source: "unavailable",
        containers: [],
        timestamp: new Date().toISOString(),
        message:
          "Nenhum container em execução. Configure VPS_API_BASE_URL para telemetria de produção.",
      };
    }

    return {
      source: "local",
      containers,
      timestamp: new Date().toISOString(),
    };
  } catch {
    return {
      source: "unavailable",
      containers: [],
      timestamp: new Date().toISOString(),
      message:
        process.env.NODE_ENV === "production"
          ? "Docker indisponível neste ambiente."
          : "Docker daemon indisponível. Use VPS_API_BASE_URL ou server/vps-monitor.",
    };
  }
}
