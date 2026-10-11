# ❄️ Agentic Data Engineering Winter Bootcamp

Interactive public website and DECKIO slide deck for the Agentic Data Engineering Winter Bootcamp, built for the wider data community across analytics, engineering, open source, SQL, NoSQL and AI applications.

**Live website and registration:** https://mango-pebble-00edc8e0f.2.azurestaticapps.net/

| Route | Experience |
| --- | --- |
| `#/` | Landing site with the confirmed lineup, schedule, data visuals, foundations setup, FAQ and registration |
| `#/deck` | DECKIO presentation with session deep-dives and an embedded GitHub-authenticated registration panel |

## Develop

```bash
npm install
npm run dev
npm run build
```

The website is hosted as one Azure Static Web App. The landing experience, deck, GitHub authentication and registration API all use the same origin.

## Content and participant setup

- Update the shared site and deck content in `src/content.js`.
- Update slide composition in `src/slides/WinterSlides.jsx` and ordering in `deck.config.js`.
- The participant audit script is published at `setup/prepare-agentic-data.ps1`.
- Audit mode is read-only. Tool installation, Microsoft npm proxy configuration and sign-in require explicit script switches.

## Registration architecture

Azure Static Web Apps hosts the complete public experience and provides built-in GitHub authentication. The custom themed form:

1. reads the verified GitHub identity from `/.auth/me`;
2. submits the registration to the protected `/api/register` function;
3. forwards validated data to Power Automate;
4. upserts the registration into a restricted Microsoft List.

See [docs/registration-backend.md](docs/registration-backend.md) for the List, flow and application settings.

## Deploy

Pushing to `main` runs `.github/workflows/deploy-registration.yml` and publishes the complete application to Azure Static Web Apps:

| Setting | Value |
| --- | --- |
| App location | `/` |
| API location | `api` |
| Output location | `dist` |
| Build command | `npm run build:swa` |
