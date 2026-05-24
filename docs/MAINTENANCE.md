# Guia de manutenção e escala

Este documento descreve **onde alterar** cada parte do portfólio sem quebrar outras camadas.

## Princípios

1. **Conteúdo em `src/content/`** — textos, listas, badges e copy não ficam hardcoded na UI.
2. **UI em `src/features/<domínio>/`** — cada seção da página é um feature isolado.
3. **Compartilhado em `src/shared/`** — layout, animações genéricas, botões, providers.
4. **Lógica pura em `src/lib/`** — terminal, paths, motion, server (sem JSX quando possível).
5. **Contratos em `src/types/`** — tipos usados por content + UI + terminal.

## Adicionar uma tecnologia na grade de skills

1. Edite `src/content/skills-showcase.ts` — novo item em `skillsShowcase`.
2. Se precisar de ícone novo, adicione em `src/shared/ui/SkillIcon.tsx` (`ICON_DATA` + `SkillIconId`).
3. A UI (`SkillsDetailGrid`) atualiza sozinha — não precisa alterar o grid.

```ts
// skills-showcase.ts — campos obrigatórios
{
  id: "vitest",           // deve existir em SkillIconId
  title: "Vitest",
  accent: "#a78bfa",
  glow: "rgba(167,139,250,0.4)",
  rhSummary: "…",         // linguagem clara (RH)
  techLog: ["[vitest] …"],  // linhas estilo terminal
}
```

## Adicionar badge flutuante (hero / editor / scroll)

| Contexto | Arquivo | Array |
|----------|---------|--------|
| Hero | `content/floating-tech.ts` | `heroFloatingBadges` |
| Editor de código | `content/floating-tech.ts` | `editorFloatingBadges` |
| Trilha no scroll | `content/floating-tech.ts` | `pageSnakeTrail` (ordem = percurso da cobrinha) |

Para ícone SVG: mapeie `id` em `SkillIcon.tsx` → `BADGE_ICON_MAP`.

## Adicionar seção na página marketing

1. Crie `src/features/<nome>/<Nome>Showcase.tsx`.
2. Exporte em `src/features/<nome>/index.ts`.
3. Importe em `src/features/home/MarketingPage.tsx` na ordem desejada.
4. Registre o `id` em `src/config/site.ts` → `SITE_SECTIONS`.
5. Use `CompileSection` com o mesmo `id` para âncoras e scroll do terminal.

## Adicionar projeto

1. `src/content/projects.ts` — objeto `Project` (ver `src/types/content.ts`).
2. Capa em `public/projects/` se usar `coverImage`.
3. Terminal: comandos em `lib/terminal/commands.ts` leem `content` automaticamente.

## Adicionar comando no terminal

1. Handler em `src/lib/terminal/commands.ts`.
2. Registre o nome em `HELP` / `HELP_LINES` em `engine.ts` se for público.
3. Saída rica: `src/lib/terminal/outputs.tsx`.

## Animações 3D e motion

| Uso | Onde |
|-----|------|
| Tilt no hover (cards, editor) | `hooks/useTilt3D.ts` |
| Hero parallax | `features/hero/Hero3DStage.tsx` |
| Revelação no scroll | `lib/motion.ts` → `scrollRevealVariants` |
| Trilha cobrinha | `lib/snake-path.ts` + `PageFloatingTech.tsx` |
| Ícone acende no scroll | `hooks/useIconCenterLit.ts` |

Defaults globais: `src/config/animations.ts`.

## Testes

- Conteúdo: `src/content/*.test.ts`
- Terminal: `src/lib/terminal/*.test.ts`
- Server: `src/lib/server/**/*.test.ts`

Após mudar content ou terminal: `npm run test`.

## Checklist antes de deploy

- [ ] `npm run build`
- [ ] `npm run test`
- [ ] `.env.local` / variáveis de VPS documentadas em `.env.example`
- [ ] Novos `id` de seção batem com links do `SiteNav` e comandos do terminal
