# ❄️ Agentic Data Engineering Winter Bootcamp

Interactive public website and DECKIO slide deck for the Agentic Data Engineering Winter Bootcamp, focused on GitHub Copilot, Microsoft Fabric and agentic data workflows.

**Public preview:** https://natethebuilder.github.io/agentic-data-winter-bootcamp/

| Route | Experience |
| --- | --- |
| `#/` | Landing site with the confirmed lineup, schedule, data visuals, foundations setup, FAQ and registration |
| `#/deck` | DECKIO presentation with session overview and six detailed session deep-dives |

## Develop

```bash
npm install
npm run dev
npm run build
```

The default build uses the GitHub Pages base path `/agentic-data-winter-bootcamp/`.

```bash
npm run build:swa
```

The Azure Static Web Apps build uses `/` so built-in GitHub authentication and `/api/register` work at the application root.

## Content and participant setup

- Update the shared site and deck content in `src/content.js`.
- Update slide composition in `src/slides/WinterSlides.jsx` and ordering in `deck.config.js`.
- The participant audit script is published at `setup/prepare-agentic-data.ps1`.
- Audit mode is read-only. Tool installation, Microsoft npm proxy configuration and sign-in require explicit script switches.

## Registration architecture

GitHub Pages remains the public preview. Secure registration is deployed separately on Azure Static Web Apps because it provides built-in GitHub authentication. The custom themed form:

1. reads the verified GitHub identity from `/.auth/me`;
2. submits the registration to the protected `/api/register` function;
3. forwards validated data to Power Automate;
4. upserts the registration into a restricted Microsoft List.

Set `VITE_REGISTRATION_URL` in the GitHub Pages build when the secure registration host is available. See [docs/registration-backend.md](docs/registration-backend.md) for the List, flow and application settings.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml` and publishes the preview to GitHub Pages. Azure Static Web Apps should use:

| Setting | Value |
| --- | --- |
| App location | `/` |
| API location | `api` |
| Output location | `dist` |
| Build command | `npm run build:swa` |
