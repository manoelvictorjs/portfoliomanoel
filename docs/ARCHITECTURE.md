# Arquitetura do portfólio

## Camadas

```
src/
├── app/              # Rotas Next.js + API (handlers finos)
├── config/           # IDs de seção, presets de animação (sem copy)
├── content/          # Dados estáticos — única fonte de textos/listas
├── types/            # Contratos TypeScript compartilhados
├── features/         # UI por domínio (hero, skills, terminal…)
├── shared/           # layout, ui, animations, providers
├── lib/              # terminal (domínio) + server (infra) + motion
└── hooks/            # lógica React reutilizável
```

## Fluxo de renderização

```
app/page.tsx
  └── AppShell (features/home)
        ├── AppProviders (boot, sound)
        ├── PageIntro
        ├── AmbientBackground, SiteNav, ScrollProgress
        ├── MarketingPage
        │     ├── PageFloatingTech (fundo)
        │     └── Hero → Tech → Skills → Learning → Projects
        ├── SiteFooter
        └── EngineeringLayer (terminal lazy)
```

## Onde mudar o quê

| Objetivo | Camada |
|----------|--------|
| Texto, projeto, skill | `content/` |
| Nova seção na página | `features/` + `MarketingPage` + `config/site.ts` |
| Comando do terminal | `lib/terminal/commands.ts` |
| Animação global | `lib/motion.ts`, `config/animations.ts` |
| Ícone de tecnologia | `shared/ui/SkillIcon.tsx` |

Guia passo a passo: [MAINTENANCE.md](./MAINTENANCE.md).

## Shell

`AppShell` → `AppProviders` → `MarketingPage` + `EngineeringLayer` (terminal lazy).

## Dual-layer

| Camada | Público | Onde |
|--------|---------|------|
| Superfície | RH | Seções scroll, cards, contato |
| Subsistema | Tech | Terminal, `/api/*`, logs nos cards |

## Testes

```bash
npm run test
```

Cobertura: `content/`, `lib/terminal/`, `lib/server/`.

## APIs ativas

- `/api/ping`, `/api/profile`
- `/api/system-stats`, `/api/system-stats/stream`
- `/api/docker/stats`, `/api/docker/stats/stream`
- `/api/github/commits`, `/api/agent/chat`, `/api/tests/report`
