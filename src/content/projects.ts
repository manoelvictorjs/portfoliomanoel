import type { Project } from "@/types/content";

export type { Project, ProjectKind, ProjectStatus, ProjectTab } from "@/types/content";

export const projects: Project[] = [
  {
    id: "rm-ecopecas",
    name: "rm-ecopecas",
    displayName: "RM Ecopeças",
    kind: "freelance",
    status: "completed",
    repo: "Entregue · VPS · site no ar",
    liveUrl:
      process.env.NEXT_PUBLIC_RM_ECOPECAS_URL ??
      "https://www.rmecopeças.com.br/",
    coverImage: "/images/previews/rm-ecopecas.png",
    linkedInUrl:
      "https://www.linkedin.com/feed/update/urn:li:activity:7446955123009941504/",
    tagline: "Loja de autopeças · catálogo + API Mercado Livre",
    description:
      "E-commerce integrado ao Mercado Livre com persistência leve, sincronização de estoque e deploy profissional em VPS.",
    businessPitch:
      "A RM Ecopeças precisava de uma loja rápida, segura e com custo de manutenção baixo. Integrei o catálogo à API do Mercado Livre (OAuth/tokens) para o estoque não divergir do que vende online.",
    businessResult:
      "Projeto finalizado e no ar na VPS — arquitetura equilibrada entre velocidade, segurança e custo. O cliente opera com JSON em cache e experiência fluida no site.",
    engineering: {
      architecture:
        "Next.js standalone · Express 5 · integração Mercado Livre OAuth · camadas API + cache JSON",
      database:
        "Persistência em arquivos JSON com cache — zero custo de banco gerenciado",
      tests:
        "Headers de segurança (CSP, HSTS) · rate limit · validação de rotas críticas",
      infra:
        "Docker multi-stage Alpine · Docker Compose · VPS Linux",
    },
    stack: [
      "Next.js",
      "TypeScript",
      "Express 5",
      "Docker",
      "Mercado Livre API",
      "JSON",
    ],
    commits: [
      "feat: ML OAuth sync estoque",
      "feat: cache JSON + standalone Next",
      "chore: Docker Alpine multi-stage",
    ],
    dockerLog: [
      "Building rm-ecopecas-web … done",
      "Container rm-web-1 Started",
      "Health check: GET / → 200 OK",
    ],
    gradient: "from-cyan-600/40 via-emerald-900/30 to-[#0d1117]",
    featured: true,
  },
  {
    id: "arquivo-ocr",
    name: "arquivo-ocr",
    displayName: "Renomeador Arquivologia",
    kind: "client",
    status: "completed",
    repo: "Entregue · Python · FastAPI",
    coverImage: "/images/previews/arquivo-ocr.png",
    linkedInUrl:
      "https://www.linkedin.com/feed/update/urn:li:activity:7460447687692197888/",
    tagline: "OCR + renomeação inteligente de PDFs em massa",
    description:
      "Solução para empresa de arquivologia que digitaliza grandes volumes — elimina nomes genéricos de scans com OCR e regras locais.",
    businessPitch:
      "A empresa digitalizava cópias e scans com nomes genéricos; uma pessoa renomeava arquivo por arquivo. O sistema lê a primeira página (Tesseract + PyMuPDF), extrai dados-chave e padroniza o nome automaticamente.",
    businessResult:
      "Projeto entregue: trabalho que levava meses passou a horas, com fila de revisão só quando a leitura não é segura.",
    engineering: {
      architecture:
        "FastAPI · fila de processamento · interface web · regras locais de extração",
      database: "SQLite — histórico de jobs, status e auditoria",
      tests: "Pipeline OCR validado em lote · fila de revisão humana",
      infra: "Processamento em fila · deploy sob demanda",
    },
    stack: ["Python", "FastAPI", "Tesseract OCR", "PyMuPDF", "SQLite"],
    commits: [
      "feat: OCR primeira página PDF",
      "feat: fila revisão baixa confiança",
    ],
    dockerLog: ["Worker OCR: 847 arquivos processados"],
    gradient: "from-amber-600/35 via-orange-950/30 to-[#0d1117]",
  },
  {
    id: "pomodoro-focus",
    name: "pomodoro-focus",
    displayName: "Chronos Pomodoro",
    kind: "course",
    status: "completed",
    repo: "Concluído · Vercel",
    liveUrl:
      process.env.NEXT_PUBLIC_POMODORO_URL ??
      "https://relogio-pomodoro-blond.vercel.app/",
    coverImage: "/images/previews/pomodoro.png",
    tagline: "Timer Pomodoro — projeto de formação React/Next",
    description:
      "Aplicação de foco com ciclos Pomodoro, construída durante curso de Next.js e React, publicada na Vercel.",
    businessPitch:
      "Projeto acadêmico com UX limpa para estudar e trabalhar em blocos de foco.",
    businessResult:
      "App publicado online — demonstra evolução até produto deployável.",
    engineering: {
      architecture: "Next.js · React 19 · hooks de timer",
      database: "Persistência local",
      tests: "Validação manual · deploy Vercel",
      infra: "Vercel · PWA-friendly",
    },
    stack: ["Next.js", "React 19", "TypeScript", "Tailwind CSS"],
    commits: ["feat: ciclos pomodoro", "deploy: Vercel production"],
    dockerLog: ["vercel deploy --prod … ready"],
    gradient: "from-purple-600/35 via-indigo-900/25 to-[#0d1117]",
  },
  {
    id: "curriculo-ats",
    name: "curriculo-ats",
    displayName: "Gerador de Currículo ATS",
    kind: "personal",
    status: "in_progress",
    repo: "Em desenvolvimento",
    tagline: "Currículo por vaga · otimizado para ATS",
    description:
      "Ferramenta que analisa a descrição da vaga e gera um currículo com palavras-chave e estrutura legível para sistemas ATS (Applicant Tracking System).",
    businessPitch:
      "Recrutadores usam ATS que filtram CVs antes de um humano ver. A ideia é colar a vaga, extrair requisitos e montar um PDF/HTML com seções, keywords e formatação que passam nos filtros automáticos.",
    businessResult:
      "Em construção — MVP com parser de vaga, score de aderência e exportação. Objetivo: aumentar taxa de passagem em triagem automatizada.",
    engineering: {
      architecture:
        "Next.js · parser de texto da vaga · templates de CV · score de match",
      database: "Histórico de vagas e versões do currículo",
      tests: "Testes das regras ATS · validação de keywords",
      infra: "Deploy Vercel previsto · CI com testes",
    },
    stack: ["Next.js", "TypeScript", "NLP simples", "PDF export"],
    commits: [
      "feat: parser descrição vaga",
      "wip: score keywords ATS",
      "wip: template currículo exportável",
    ],
    dockerLog: ["branch: feat/ats-scoring … em progresso"],
    gradient: "from-rose-600/30 via-pink-950/25 to-[#0d1117]",
    featured: true,
  },
];

export const completedProjects = projects.filter(
  (p) => p.status === "completed",
);

export const inProgressProjects = projects.filter(
  (p) => p.status === "in_progress",
);
