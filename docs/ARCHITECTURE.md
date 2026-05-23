# Arquitetura do portfólio

## Camadas

```
src/
├── app/              # Rotas Next.js + API (handlers finos)
├── content/          # Dados estáticos (única fonte de copy)
├── types/            # Contratos TypeScript
├── features/         # UI por domínio
│   ├── home/         # AppShell, MarketingPage, providers
│   ├── hero/
│   ├── skills/
│   ├── projects/
│   ├── contact/
│   ├── learning/
│   └── terminal/     # Console + widgets LIVE
├── shared/           # layout, ui, animations, providers
├── lib/              # terminal (domínio) + server (infra)
└── hooks/
```

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
