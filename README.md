# ❄️ Agentic Data Engineering Winter Bootcamp

Public website and slide deck for the Agentic Data Engineering Winter Bootcamp (GitHub Copilot + Microsoft Fabric). Built with [DECKIO](https://github.com/deckio-art/deck-engine).

**Live:** https://natethebuilder.github.io/agentic-data-winter-bootcamp/

| Route | What |
| --- | --- |
| `#/` | Landing site: lineup (gifts to unwrap), schedule, toolbox, prep checklist, FAQ, registration |
| `#/deck` | 13-slide presentation (arrow keys, `?slide=N`, PDF/PPTX export) |

## Develop

```bash
npm install
npm run dev      # http://localhost:5173/agentic-data-winter-bootcamp/
npm run build
```

## Edit content

Topics, dates and presenters are placeholders. Update them in one place: `src/content.js` (site and deck read from it). Slides live in `src/slides/WinterSlides.jsx` and are ordered in `deck.config.js`.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which publishes to GitHub Pages.
