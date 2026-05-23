/**
 * Monitor de leitura para VPS — deploy junto ao Docker socket.
 * Configure no portfólio: VPS_API_BASE_URL=https://seu-dominio:4000
 * VPS_API_SECRET=chave-forte
 */
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import si from "systeminformation";

const execAsync = promisify(exec);
const app = express();
const PORT = Number(process.env.PORT ?? 4000);
const SECRET = process.env.VPS_API_SECRET;

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") ?? "*" }));
app.use(express.json());
app.use(
  rateLimit({
    windowMs: 60_000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

function auth(req, res, next) {
  if (!SECRET) return next();
  if (req.headers["x-api-key"] === SECRET) return next();
  res.status(401).json({ error: "unauthorized" });
  return undefined;
}

function formatUptime(seconds) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

async function collectSystemStats() {
  const [cpu, mem, osInfo, time] = await Promise.all([
    si.currentLoad(),
    si.mem(),
    si.osInfo(),
    si.time(),
  ]);
  return {
    source: "vps",
    hostname: osInfo.hostname,
    platform: `${osInfo.distro || osInfo.platform} ${osInfo.release || ""}`.trim(),
    cpuLoad: Math.round(cpu.currentLoad * 10) / 10,
    cpuCores: cpu.cpus?.length ?? 1,
    memoryUsedGb: Math.round((mem.active / 1024 ** 3) * 100) / 100,
    memoryTotalGb: Math.round((mem.total / 1024 ** 3) * 100) / 100,
    memoryPercent: Math.round((mem.active / mem.total) * 1000) / 10,
    uptimeSeconds: time.uptime,
    uptimeHuman: formatUptime(time.uptime),
    nodeVersion: process.version,
    timestamp: new Date().toISOString(),
  };
}

async function collectDockerStats() {
  try {
    const { stdout } = await execAsync(
      'docker stats --no-stream --format "{{json .}}"',
      { timeout: 8000 },
    );
    const containers = stdout
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const row = JSON.parse(line);
        return {
          name: row.Name ?? row.Container,
          id: (row.ID ?? "").slice(0, 12),
          image: row.Image ?? "-",
          cpuPercent: row.CPUPerc ?? "0%",
          memUsage: row.MemUsage ?? "-",
          memPercent: row.MemPerc ?? "0%",
          netIO: row.NetIO ?? "-",
          blockIO: row.BlockIO ?? "-",
        };
      });
    return { source: "vps", containers, timestamp: new Date().toISOString() };
  } catch (e) {
    return {
      source: "vps",
      containers: [],
      timestamp: new Date().toISOString(),
      message: e instanceof Error ? e.message : "docker error",
    };
  }
}

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "vps-monitor" });
});

app.get("/system-stats", auth, async (_req, res) => {
  res.json(await collectSystemStats());
});

app.get("/docker/stats", auth, async (_req, res) => {
  res.json(await collectDockerStats());
});

app.listen(PORT, () => {
  console.log(`vps-monitor listening on :${PORT}`);
});
