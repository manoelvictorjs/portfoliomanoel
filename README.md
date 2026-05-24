# Living Dev Environment — Portfólio

Portfólio interativo baseado no conceito **Ambiente de Desenvolvimento Vivo**: terminal real, pipeline de skills, vitrine de projetos estilo VPS, animações com física de mola e foco em Lighthouse, segurança e testes.

## Stack

- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **Framer Motion**
- Canvas 2D para rede de partículas (Three.js disponível para evolução futura)

## Começar

```bash
cp .env.example .env.local
# Edite nome, e-mail e URLs do GitHub

npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Comandos do terminal

| Comando | Ação |
|---------|------|
| `help` | Lista comandos |
| `skills` | Rola até o pipeline |
| `projects` | Rola até projetos |
| `docker-compose up` | Boot simulado + painel Healthy |
| `clear` | Limpa o terminal |
| `whoami` | Resumo rápido |

## Estrutura

```
src/
├── app/          # rotas + API
├── content/      # dados estáticos (projetos, perfil, terminal)
├── features/     # UI por domínio (hero, skills, terminal…)
├── shared/       # layout, ui, animações, providers
├── lib/          # terminal (domínio) + server (infra)
└── types/        # contratos TypeScript
```

- Arquitetura: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- Manutenção e escala: [docs/MAINTENANCE.md](docs/MAINTENANCE.md)
- Conteúdo estático: [src/content/README.md](src/content/README.md)

## Testes e CI

```bash
npm run test        # 44 testes unitários (content, terminal, server)
npm run test:watch
npm run build
```

Badge **Tests: Passing** no rodapé — aponte `NEXT_PUBLIC_CI_BADGE_URL` para o Actions do seu repositório.

## Deploy

Recomendado: [Vercel](https://vercel.com). O projeto usa SSG na home e rota `/api/profile` para o mock HTTP.

---

## Prompt de esboço visual (Seção 6 — IA de imagem/UI)

Use em Midjourney, DALL·E, Figma AI ou similar:

```
Ultra-wide dark UI mockup, premium code editor aesthetic, portfolio website "The Living Dev Environment".
Deep charcoal background (#050608) with fine cyan grid lines, subtle particle network connecting API nodes in hero.
Minimal monospace typography, floating terminal window bottom-right with macOS traffic lights, green prompt cursor.
Center: bold developer name, subtitle "Full Stack · DevOps · IA".
Second section: microservices pipeline diagram, glowing cables between tech nodes (Docker blue, Node green, Linux amber, AI purple).
Third section: GitHub-style repo cards inside VPS terminal, tabs Overview / Tech Stack / Logs.
Neon hover glow per technology color, glassmorphism panels, high contrast, no clutter.
Style: cinematic, 4K, Behance-quality devtool branding, matte texture, restrained cyan accent — NOT generic corporate blue.
Aspect ratio 16:9, flat UI design, Figma-ready layers implied.
```

Variante curta:

```
Dark developer portfolio UI, living IDE theme, particle API network hero, interactive terminal, CI/CD skills map with neon cables, GitHub VPS project section, monospace, cyan accents, premium Behance mockup 16:9
```
