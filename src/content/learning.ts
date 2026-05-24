import { getAge, profile } from "@/content/profile";

export const universityEducation = {
  institution: "Universidade do Sul de Santa Catarina (UNISUL)",
  degree: "Bacharelado em Sistemas de Informação",
  startYear: 2024,
  status: "Em andamento",
  curriculumAreas: [
    "Java (base da graduação)",
    "Modelagem de software",
    "Programação de soluções computacionais",
    "Ambientes computacionais e conectividade",
    "Análise de dados e big data",
  ],
} as const;

export const programmingLanguages = [
  "Java",
  "TypeScript",
  "JavaScript",
  "Go",
  "Python",
  "JSON",
] as const;

export const udemyTracks = [
  {
    id: "react-next-nest",
    title:
      "React 19 e Next.js 15 com App Router, Server Actions, Server Components",
    subtitle: "Tailwind CSS, TypeScript e REST API com NestJS",
    topics: [
      "App Router",
      "Server Actions",
      "Server Components",
      "Tailwind CSS",
      "TypeScript",
      "REST API · NestJS",
    ],
  },
] as const;

export const aluraTracks = [
  {
    category: "Fundamentos & comunicação",
    icon: "📐",
    accent: "#a78bfa",
    description: "Base sólida de hardware, lógica e comunicação técnica.",
    courses: [
      {
        name: "Arquitetura de computadores",
        detail: "CPU, memória, I/O e como o software conversa com o hardware.",
      },
      {
        name: "Comunicação: como se expressar bem e ser compreendido",
        detail: "Clareza em reuniões, documentação e apresentação de ideias.",
      },
    ],
  },
  {
    category: "Dev, APIs & infra",
    icon: "⚙️",
    accent: "#2dd4bf",
    description: "Stack completa do dev ao deploy — Git, Linux, Docker e APIs.",
    courses: [
      { name: "Git e GitHub", detail: "Fluxo de branches, PRs e colaboração." },
      { name: "Linux", detail: "Terminal, permissões, serviços e VPS." },
      { name: "Docker", detail: "Containers, Compose e imagens em produção." },
      { name: "APIs", detail: "REST, contratos e integração entre sistemas." },
      { name: "Postman", detail: "Testes e documentação de endpoints." },
      { name: "Node.js", detail: "Back-end JavaScript e middleware." },
      { name: "Next.js", detail: "App Router, SSR e deploy moderno." },
      { name: "VPS", detail: "Servidor próprio, SSH e publicação de apps." },
    ],
  },
  {
    category: "Marketing & dados",
    icon: "📊",
    accent: "#fbbf24",
    description: "Tráfego, métricas e formato de dados na prática.",
    courses: [
      { name: "Tráfego pago", detail: "Campanhas e funil de conversão." },
      { name: "JSON", detail: "Estrutura de dados em APIs e configs." },
    ],
  },
] as const;

export const aluraStats = {
  totalCourses: aluraTracks.reduce((n, t) => n + t.courses.length, 0),
  tracks: aluraTracks.length,
} as const;

/** Objeto exibido no terminal (`cat learning-path.json`) */
export const learningPathJson = {
  developer: profile.name,
  birthYear: profile.birthYear,
  age: getAge(),
  contact: {
    email: profile.email,
    phone: profile.phone,
    github: profile.github,
    linkedin: profile.linkedin,
  },
  university: {
    institution: universityEducation.institution,
    degree: universityEducation.degree,
    since: universityEducation.startYear,
    status: universityEducation.status,
    curriculumAreas: universityEducation.curriculumAreas,
  },
  languages: programmingLanguages,
  platforms: {
    udemy: udemyTracks.map((t) => ({
      title: t.title,
      also: t.subtitle,
      topics: t.topics,
    })),
    alura: aluraTracks.flatMap((t) =>
      t.courses.map((c) => ({ track: t.category, course: c.name })),
    ),
  },
} as const;
