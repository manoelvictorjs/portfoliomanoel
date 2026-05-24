<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Convenções deste repositório

## Estrutura

- **Conteúdo** só em `src/content/` — não hardcode copy longa em componentes.
- **Features** em `src/features/<domínio>/` com `index.ts` exportando a API pública do domínio.
- **Config** em `src/config/` — IDs de seção, presets de animação (sem textos de marketing).
- **Hooks** reutilizáveis em `src/hooks/` — export via `index.ts`.

## Comentários

- Comentário de **módulo** no topo de arquivos não triviais (`/** … */`).
- Comentar **por quê** e **como estender**, não o óbvio (`// incrementa i`).
- Manutenção detalhada: `docs/MAINTENANCE.md`.

## UI

- Seções: `CompileSection` + `id` de `SITE_SECTIONS` (`@/config`).
- Motion: `lib/motion.ts` e `TILT_PRESETS` / `HERO_3D_SPRING`.
- `prefers-reduced-motion`: desligar tilt e simplificar animações 3D.

## Testes

Após alterar `content/` ou `lib/terminal/`: `npm run test`.
