import { projects } from "@/content/projects";
import { learningPathJson } from "@/content/learning";
import {
  formatPhoneDisplay,
  getAge,
  profile,
} from "@/content/profile";

export const terminalUser =
  process.env.NEXT_PUBLIC_TERMINAL_USER ?? "manoel";
export const terminalHost =
  process.env.NEXT_PUBLIC_TERMINAL_HOST ?? "portfolio";

export const terminalBio = `Olá — sou ${profile.name}, ${getAge()} anos (nasc. ${profile.birthYear}).

Minha trajetória começou na indústria naval, onde liderei equipes em ambientes de alta pressão,
prazos rígidos e segurança crítica. Essa experiência moldou minha comunicação clara, resiliência
e senso de ownership — competências que carrego para a engenharia de software.

Hoje construo produtos full stack com foco em APIs resilientes, containers em produção e
pipelines que entregam software testado e monitorado.

Formação acadêmica: Bacharelado em Sistemas de Informação na UNISUL (desde 2024) —
modelagem de software, soluções computacionais, ambientes e conectividade, análise de dados e big data.

Transição de carreira não foi atalho: foi reinvenção com disciplina de quem já sabe liderar sob incerteza.`;

export type VirtualFile = {
  name: string;
  type: "file" | "dir";
  content?: string;
};

export const homeFiles: VirtualFile[] = [
  { name: "projetos/", type: "dir" },
  { name: "learning-path.json", type: "file" },
  { name: "curriculo.pdf", type: "file" },
  { name: "skills.md", type: "file" },
  { name: "README.md", type: "file" },
];

function projectMd(p: (typeof projects)[number]) {
  const links = [
    p.liveUrl ? `Site: ${p.liveUrl}` : null,
    p.linkedInUrl ? `LinkedIn: ${p.linkedInUrl}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return `# ${p.displayName}

${p.tagline}

${p.description}

## Resultado
${p.businessResult}

## Stack
${p.stack.join(" · ")}

## Links
${links || "—"}`;
}

export const projectFiles: Record<string, string> = {
  "rm-ecopecas.md": projectMd(
    projects.find((p) => p.id === "rm-ecopecas")!,
  ),
  "arquivo-ocr.md": projectMd(
    projects.find((p) => p.id === "arquivo-ocr")!,
  ),
  "pomodoro-focus.md": projectMd(
    projects.find((p) => p.id === "pomodoro-focus")!,
  ),
};

export const fileContents: Record<string, string> = {
  "curriculo.pdf": `CURRÍCULO — ${profile.name}
═══════════════════════════════════════════════════

Idade          : ${getAge()} anos (nascimento ${profile.birthYear})
Cargo alvo     : Engenheiro de Software · Full Stack · DevOps
Experiência    : Transição liderança industrial → tech (3+ anos)
Formação       : Bach. Sistemas de Informação — UNISUL (desde 2024)
                 Cursos Udemy · Alura · projetos em produção

Contato
  E-mail       : ${profile.email}
  Celular      : ${formatPhoneDisplay()}
  LinkedIn     : ${profile.linkedin}
  GitHub       : ${profile.github}

Destaques
  • Linux, Docker e deploy em VPS com hardening básico
  • APIs REST com Node.js/TypeScript e testes (Vitest)
  • Next.js, PostgreSQL, pipelines CI/CD (GitHub Actions)
  • Integração de agentes de IA em fluxos de produto

Soft skills
  • Comunicação com stakeholders técnicos e não técnicos
  • Liderança de equipe sob pressão (background naval)
  • Documentação e ownership de ponta a ponta

Contato: use o comando "contato" neste terminal.`,

  "skills.md": `skills.md — resumo rápido
Frontend : Next.js, React 19, TypeScript, Tailwind
Backend  : Node.js, FastAPI, Python, NestJS, APIs REST
Infra    : Linux, Docker, VPS, Git, Postman
Dados    : JSON, PostgreSQL, SQLite

Digite "skills" ou "cursos" para ver formação completa.`,

  "learning-path.json": JSON.stringify(learningPathJson, null, 2),

  "README.md": `Atalhos do portfólio — ações reais no navegador.

Comandos:
  email · linkedin · whatsapp · projetos · ping · status · contato`,
};

export const dockerPsRows = [
  {
    id: "a1b2c3d4e5f6",
    image: "nextjs-portfolio:19",
    command: '"npm run start"',
    status: "Up 4 days",
    ports: "0.0.0.0:3000->3000/tcp (HEALTHY)",
  },
  {
    id: "7f8e9d0c1b2a",
    image: "node-api-mvc:v5",
    command: '"docker-entrypoint.s…"',
    status: "Up 4 days",
    ports: "0.0.0.0:5000->5000/tcp (HEALTHY)",
  },
  {
    id: "3c2b1a0f9e8d",
    image: "postgres:16-alpine",
    command: '"docker-entrypoint.s…"',
    status: "Up 4 days",
    ports: "0.0.0.0:5432->5432/tcp (HEALTHY)",
  },
] as const;

export const skillCategories = [
  {
    name: "Frontend",
    items: ["Next.js 15+", "React 19", "TypeScript", "Tailwind CSS"],
  },
  {
    name: "Backend",
    items: [
      "Node.js",
      "Express",
      "FastAPI",
      "Python",
      "NestJS",
      "REST APIs",
    ],
  },
  {
    name: "Linguagens & dados",
    items: ["Java", "JavaScript", "TypeScript", "Go", "JSON", "PostgreSQL", "SQLite"],
  },
  {
    name: "Infra / DevOps",
    items: ["Linux", "Docker", "VPS", "Git", "GitHub", "Postman"],
  },
  {
    name: "Graduação (UNISUL · desde 2024)",
    items: [
      "Java (UNISUL)",
      "Modelagem de software",
      "Programação de soluções computacionais",
      "Ambientes computacionais e conectividade",
      "Análise de dados e big data",
    ],
  },
  {
    name: "Formação contínua",
    items: [
      "Udemy: Next.js 15 · Server Actions · NestJS",
      "Alura: Git, Linux, Docker, APIs, Node, Next",
    ],
  },
] as const;
