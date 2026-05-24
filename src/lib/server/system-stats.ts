import { fetchFromVps } from "./vps-proxy";

export type SystemStatsPayload = {
  source: "local" | "vps" | "fallback";
  hostname: string;
  platform: string;
  cpuLoad: number;
  cpuCores: number;
  memoryUsedGb: number;
  memoryTotalGb: number;
  memoryPercent: number;
  uptimeSeconds: number;
  uptimeHuman: string;
  nodeVersion: string;
  timestamp: string;
};

function formatUptime(seconds: number): string {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function fallbackStats(reason?: string): SystemStatsPayload {
  return {
    source: "fallback",
    hostname: process.env.VPS_HOSTNAME ?? "portfolio-edge",
    platform: reason ?? "serverless-runtime",
    cpuLoad: 0,
    cpuCores: 1,
    memoryUsedGb: 0,
    memoryTotalGb: 0,
    memoryPercent: 0,
    uptimeSeconds: process.uptime(),
    uptimeHuman: formatUptime(process.uptime()),
    nodeVersion: process.version,
    timestamp: new Date().toISOString(),
  };
}

const isVercel = Boolean(process.env.VERCEL);

export async function getSystemStats(): Promise<SystemStatsPayload> {
  const vps = await fetchFromVps<SystemStatsPayload>("/system-stats");
  if (vps) return { ...vps, source: "vps" };

  if (process.env.NEXT_RUNTIME === "edge" || isVercel) {
    return fallbackStats(isVercel ? "vercel-serverless" : "edge-runtime");
  }

  try {
    const si = await import("systeminformation");
    const [cpu, mem, osInfo, time] = await Promise.all([
      si.currentLoad(),
      si.mem(),
      si.osInfo(),
      si.time(),
    ]);

    const memoryUsedGb = mem.active / 1024 ** 3;
    const memoryTotalGb = mem.total / 1024 ** 3;

    return {
      source: "local",
      hostname: osInfo.hostname,
      platform: `${osInfo.distro || osInfo.platform} ${osInfo.release || ""}`.trim(),
      cpuLoad: Math.round(cpu.currentLoad * 10) / 10,
      cpuCores: cpu.cpus?.length ?? 1,
      memoryUsedGb: Math.round(memoryUsedGb * 100) / 100,
      memoryTotalGb: Math.round(memoryTotalGb * 100) / 100,
      memoryPercent: Math.round((mem.active / mem.total) * 1000) / 10,
      uptimeSeconds: time.uptime,
      uptimeHuman: formatUptime(time.uptime),
      nodeVersion: process.version,
      timestamp: new Date().toISOString(),
    };
  } catch {
    return fallbackStats("systeminformation-unavailable");
  }
}
