# Camada de conteúdo (`src/content`)

**Fonte única de verdade** para textos e dados estáticos do portfólio.

## Módulos

| Arquivo | Conteúdo |
|---------|----------|
| `profile.ts` | Nome, links, e-mail, foto |
| `projects.ts` | Projetos (status, stack, pitch) |
| `skills-showcase.ts` | Cards “Detalhes por tecnologia” |
| `fullstack-journey.ts` | Trilha por nível (mastered / growing / exploring) |
| `floating-tech.ts` | Badges flutuantes hero / editor / scroll |
| `learning.ts` | Formação, Alura, Udemy |
| `tech-code-samples.ts` | Amostras do editor animado |
| `terminal.ts` | Copy do agente e mensagens do terminal |
| `test-manifest.ts` | Lista de testes para `run-tests` |

## Export central

Use `import { … } from "@/content"` via `index.ts` — não duplique exports.

## Ao adicionar dados

1. Defina o tipo em `src/types/content.ts` (se for entidade nova).
2. Crie ou estenda o arquivo `.ts` aqui.
3. Exporte no `index.ts`.
4. Adicione teste em `*.test.ts` se houver regras (ids únicos, URLs válidas).

Ver também: [docs/MAINTENANCE.md](../../docs/MAINTENANCE.md).
