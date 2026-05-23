export type JourneyLevel = "mastered" | "growing" | "exploring";

export type JourneyPhase = {
  id: string;
  level: JourneyLevel;
  title: string;
  subtitle: string;
  skills: string[];
};

export const journeyLevelMeta = {
  mastered: {
    label: "Em produção",
    color: "#2dd4bf",
    border: "rgba(45, 212, 191, 0.35)",
    bg: "rgba(45, 212, 191, 0.08)",
  },
  growing: {
    label: "Em expansão",
    color: "#fbbf24",
    border: "rgba(251, 191, 36, 0.35)",
    bg: "rgba(251, 191, 36, 0.08)",
  },
  exploring: {
    label: "Em exploração",
    color: "#a78bfa",
    border: "rgba(167, 139, 250, 0.35)",
    bg: "rgba(167, 139, 250, 0.08)",
  },
} as const;

export const journeyPhases: JourneyPhase[] = [
  {
    id: "foundation",
    level: "mastered",
    title: "Fundamentos",
    subtitle: "Base sólida para qualquer stack web moderna.",
    skills: ["TypeScript", "JavaScript", "Git", "GitHub", "npm"],
  },
  {
    id: "frontend",
    level: "mastered",
    title: "Front-end & interfaces",
    subtitle: "Produtos publicados — RM Ecopeças, Pomodoro e este portfólio.",
    skills: ["React 19", "Next.js", "Tailwind CSS", "UX responsiva"],
  },
  {
    id: "backend",
    level: "mastered",
    title: "Back-end & integrações",
    subtitle: "APIs, regras de negócio e soluções para clientes reais.",
    skills: ["Node.js", "Express", "Python", "FastAPI", "REST", "Postman"],
  },
  {
    id: "infra",
    level: "mastered",
    title: "Infraestrutura & deploy",
    subtitle: "Do localhost à VPS — sistemas no ar com Docker e Linux.",
    skills: ["Docker", "Docker Compose", "Linux", "VPS", "Nginx"],
  },
  {
    id: "growth",
    level: "growing",
    title: "Próxima camada de maturidade",
    subtitle: "Aprofundando práticas de engenharia e escala.",
    skills: ["Go", "PostgreSQL", "NestJS", "Testes automatizados", "GitHub Actions"],
  },
  {
    id: "continuous",
    level: "exploring",
    title: "Aprendizado contínuo",
    subtitle: "Na programação não existe linha de chegada — só o próximo capítulo.",
    skills: [
      "Kubernetes",
      "Microservices",
      "Testes E2E",
      "System Design",
      "Observabilidade",
    ],
  },
];

export const journeyStats = {
  mastered: journeyPhases
    .filter((p) => p.level === "mastered")
    .reduce((n, p) => n + p.skills.length, 0),
  growing: journeyPhases
    .filter((p) => p.level === "growing")
    .reduce((n, p) => n + p.skills.length, 0),
  exploring: journeyPhases
    .filter((p) => p.level === "exploring")
    .reduce((n, p) => n + p.skills.length, 0),
};
