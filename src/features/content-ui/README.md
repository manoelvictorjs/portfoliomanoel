# Content UI (`features/content-ui`)

Componentes de apresentação que **leem dados de `content/`** — adicione informação nos arquivos de conteúdo, não espalhe JSX nas páginas.

## Mapa

| Componente | Dados | Uso |
|------------|-------|-----|
| `DownloadPlacement` | `content/downloads.ts` | Botões/cards por `placement` |
| `ContactLinksGrid` | `content/contact-links.ts` | Grid de contato |
| `HeroActionBar` | `hero-ctas.ts` + downloads `hero` | Hero |
| `NavLinks` / `NavActions` | `site-navigation.ts` + downloads `nav` | Header |
| `ContactSection` | `contact-section.ts` + acima | Footer |

## Adicionar download

1. `content/downloads.ts` → novo item no catálogo com `placements: [...]`.
2. Pronto — `DownloadPlacement` renderiza onde o placement estiver configurado.

## Adicionar link de menu

1. `content/site-navigation.ts` → novo `{ id, label, href }`.

## Adicionar CTA de scroll

1. `content/hero-ctas.ts` (ou passe `items` para `ScrollCtaList`).
