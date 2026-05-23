export type SkillId =
  | "linux"
  | "docker"
  | "nodejs"
  | "typescript"
  | "nextjs"
  | "postgres"
  | "postman"
  | "ai";

export type SkillShowcase = {
  id: SkillId;
  title: string;
  icon: string;
  accent: string;
  glow: string;
  rhSummary: string;
  techLog: string[];
};

export const skillsShowcase: SkillShowcase[] = [
  {
    id: "nextjs",
    title: "Next.js",
    icon: "▲",
    accent: "#ededed",
    glow: "rgba(237,237,237,0.3)",
    rhSummary:
      "Construo sites e aplicações web rápidos, modernos e otimizados para Google e celular — a mesma tecnologia usada por empresas como Vercel e Netflix.",
    techLog: [
      "[next] ▲ Next.js 16 App Router",
      "[build] ✓ Static + dynamic routes optimized",
      "[lighthouse] Performance 100 · SEO 100",
    ],
  },
  {
    id: "nodejs",
    title: "Node.js",
    icon: "⬢",
    accent: "#68a063",
    glow: "rgba(104,160,99,0.4)",
    rhSummary:
      "Desenvolvo o 'cérebro' por trás dos sistemas — APIs que processam pedidos, autenticam usuários e conectam o site ao banco de dados com segurança.",
    techLog: [
      "[node] Server listening on :5000",
      "[api] GET /health → 200 OK (12ms)",
      "[jwt] Auth middleware active",
    ],
  },
  {
    id: "typescript",
    title: "TypeScript",
    icon: "TS",
    accent: "#3178c6",
    glow: "rgba(49,120,198,0.4)",
    rhSummary:
      "Escrevo código com 'gramática' rigorosa que evita bugs antes de chegar ao usuário — menos erros em produção, mais confiança para o negócio.",
    techLog: [
      "[tsc] Compiling strict mode…",
      "[check] 0 errors · 0 warnings",
      "[types] API contracts validated",
    ],
  },
  {
    id: "docker",
    title: "Docker",
    icon: "🐳",
    accent: "#2496ed",
    glow: "rgba(36,150,237,0.4)",
    rhSummary:
      "Garanto que o sistema funcione perfeitamente e sem erros em qualquer computador do mundo — empacoto app, API e banco em containers padronizados.",
    techLog: [
      "[docker] Pulling image nextjs-portfolio:19",
      "[docker] Container healthy on port 3000",
      "[health] STATUS: Up 4 days (HEALTHY)",
    ],
  },
  {
    id: "linux",
    title: "Linux / VPS",
    icon: "🐧",
    accent: "#f59e0b",
    glow: "rgba(245,158,11,0.4)",
    rhSummary:
      "Hospedo e mantenho aplicações em servidores Linux na nuvem — monitoramento, segurança básica e uptime que o negócio pode confiar.",
    techLog: [
      "[vps] Ubuntu 24.04 LTS — manoel-vps-01",
      "[system] load avg: 0.42 · uptime 14d",
      "[nginx] reverse proxy → :3000 OK",
    ],
  },
  {
    id: "postgres",
    title: "SQL / PostgreSQL",
    icon: "🗄",
    accent: "#336791",
    glow: "rgba(51,103,145,0.4)",
    rhSummary:
      "Organizo dados de clientes, produtos e pedidos em bancos relacionais confiáveis — consultas rápidas e integridade para e-commerce e gestão.",
    techLog: [
      "[postgres] Connection pool: 8/20",
      "[query] SELECT … 4ms · index hit",
      "[migrate] schema v16 applied",
    ],
  },
  {
    id: "postman",
    title: "APIs REST",
    icon: "⚡",
    accent: "#ff6c37",
    glow: "rgba(255,108,55,0.4)",
    rhSummary:
      "Conecto aplicativos, sites e parceiros via APIs documentadas — testo cada endpoint antes de ir para produção.",
    techLog: [
      "[http] GET /api/profile → 200",
      "[postman] Collection: 24 requests",
      "[test] Contract tests passing",
    ],
  },
  {
    id: "ai",
    title: "Agentes IA",
    icon: "✦",
    accent: "#a855f7",
    glow: "rgba(168,85,247,0.4)",
    rhSummary:
      "Integro inteligência artificial útil — triagem para recrutadores, automação de tarefas repetitivas e assistentes com governança de prompts.",
    techLog: [
      "[agent] IA-Agent:~$ online",
      "[llm] tool_call: open_link(linkedin)",
      "[guard] rate limit · prompt v2.1",
    ],
  },
];
