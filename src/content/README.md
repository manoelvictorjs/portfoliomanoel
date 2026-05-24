# Camada de conteúdo (`src/content`)

**Fonte única de verdade** para textos e dados estáticos do portfólio.

## Módulos

| Arquivo | Conteúdo |
|---------|----------|
| `profile.ts` | Nome, links, e-mail, foto |
| `downloads.ts` | **Catálogo de PDFs/arquivos** (currículo, futuros anexos) |
| `contact-links.ts` | Canais de contato (LinkedIn, e-mail, WhatsApp, GitHub) |
| `site-navigation.ts` | Itens do menu principal |
| `hero-ctas.ts` | Botões de scroll do hero |
| `contact-section.ts` | Títulos da seção de contato |
| `env.ts` | Leitura padronizada de `NEXT_PUBLIC_*` |
| `projects.ts` | Projetos (status, stack, pitch) |
| `skills-showcase.ts` | Cards “Detalhes por tecnologia” |
| `fullstack-journey.ts` | Trilha por nível (mastered / growing / exploring) |
| `floating-tech.ts` | Badges flutuantes hero / editor / scroll |
| `learning.ts` | Formação, Alura, Udemy |
| `tech-code-samples.ts` | Amostras do editor animado |
| `terminal.ts` | Mensagens do terminal |
| `test-manifest.ts` | Lista de testes para `run-tests` |

## Export central

Use `import { … } from "@/content"` via `index.ts` — não duplique exports.

## Adicionar um novo download (PDF)

1. Coloque o arquivo em `public/` (ex.: `public/portfolio-deck.pdf`).
2. Em `downloads.ts`, adicione um item em `downloadCatalog`:

```ts
{
  id: "portfolio-deck",
  label: "Baixar apresentação",
  defaultHref: "/portfolio-deck.pdf",
  defaultFilename: "Manoel-Victor-Deck.pdf",
  mimeType: "application/pdf",
  placements: ["contact-card"],
  terminalCommands: ["deck"],
  card: { eyebrow: "PDF", titleTemplate: "Deck — {firstName}", description: "…" },
}
```

3. Defina `placements` (`hero`, `nav`, `contact-card`, `terminal`).
4. A UI atualiza via `<DownloadPlacement placement="…" mode="buttons" />` — ver `features/content-ui/`.
5. Rode `npm run test`.

## Adicionar canal de contato

1. Em `contact-links.ts`, adicione um objeto em `templates`.
2. Teste em `contact-links.test.ts`.

## Ao adicionar outras entidades

1. Defina o tipo em `src/types/content.ts`.
2. Crie ou estenda o arquivo `.ts` aqui.
3. Exporte no `index.ts`.
4. Adicione teste em `*.test.ts` se houver regras (ids únicos, URLs válidas).

Ver também: [docs/MAINTENANCE.md](../../docs/MAINTENANCE.md).
