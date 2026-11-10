# Agentic Data Engineering Winter Bootcamp

Interactive public website and DECKIO slide deck for the Agentic Data Engineering Winter Bootcamp, built for the wider data community across analytics, engineering, open source, SQL, NoSQL and AI applications.

**Live website and registration:** https://mango-pebble-00edc8e0f.2.azurestaticapps.net/

| Route | Experience |
| --- | --- |
| `#/` | Landing site with the confirmed lineup, schedule, data visuals, foundations setup, FAQ and registration |
| `#/deck` | DECKIO presentation with session deep-dives and an embedded registration panel |

The complete six-session agenda runs on 4, 11 and 18 December 2026 and 8, 15 and 22 January 2027. The daily session times are 09:00, 10:00, 11:00, 12:30, 13:30 and 14:30.

## Site states

`api/site-state.json` switches the public experience. The website, the deck and the registration API all read it.

```json
{
  "registration": 4,
  "registrationFormUrl": "https://forms.office.com/Pages/ResponsePage.aspx?id=<form id>",
  "prerequisites": "ready"
}
```

| Setting | Value | Effect |
| --- | --- | --- |
| `registration` | `1` | Registration is open on this site's own form. This is the only value in which the registration API accepts submissions. |
| `registration` | `2` | Every register entry point on the website and in the deck says registration will open soon, and the API refuses submissions. The form, API and flow stay in place, so switching back to `1` restores registration. |
| `registration` | `3` | Every register entry point on the website and in the deck says registration is closed, the form is not shown, and the API refuses submissions. |
| `registration` | `4` | Registration is open through this bootcamp's Microsoft Form. Every register entry point on the website and in the deck leads to the form set in `registrationFormUrl`, and the API refuses submissions. See [Registration through Microsoft Forms](#registration-through-microsoft-forms). |
| `registrationFormUrl` | Form link | The Microsoft Form that state `4` opens, such as `https://forms.office.com/Pages/ResponsePage.aspx?id=<form id>`. Other states ignore it. |
| `prerequisites` | `"ready"` | The Get ready section and the deck's setup slide show the readiness checklist and guided setup. |
| `prerequisites` | `"soon"` | The Get ready section and the deck's setup slide say this information will be shared soon. |

Unknown `registration` values are treated as `3` (closed), and so is `4` without a valid `registrationFormUrl`, so a missing or mistyped value never opens registration. `npm run build` fails when `registration` is `4` and the form link is missing or invalid, so a broken link never deploys. Unknown `prerequisites` values fall back to `"ready"`. To switch, edit `api/site-state.json`, commit the change and push to `main` to deploy it.

### Registration through Microsoft Forms

In state `4`, this bootcamp's own Microsoft Form captures registrations instead of the site's form. Responses stay with the form owner in Microsoft Forms and Excel, not in the SharePoint List, and the Power Automate flow is not used.

- The registration section lists what the form asks for and loads the form only when the visitor chooses **Start registration**, so nothing is requested from Microsoft Forms before then. An **Open the form in a new tab** link is always shown. The deck's registration dialog shows the form straight away.
- `/api/register` refuses submissions with HTTP `403` and asks the visitor to refresh the page, so anyone with an old copy of the page reaches the new form. The site's form, API and flow stay in place, so switching back to `1` restores them.
- To switch to state `4`, set `"registration": 4` and `"registrationFormUrl"` to the form's response link, then commit and push to `main`. The form must accept responses from anyone. [docs/registration-backend.md](docs/registration-backend.md#registration-through-microsoft-forms) lists the link rules.

## Develop

```bash
npm install
npm run dev
npm run build
```

The website is hosted as one Azure Static Web App. The landing experience, deck and registration API all use the same origin. The Inter font is self-hosted from `@fontsource/inter`, so pages make no requests to Google Fonts; `npm run build` fails if any output references them.

## Content and participant setup

- Update the shared site and deck content in `src/content.js`.
- Speaker headshots live in `public/speakers/` as square JPGs and are referenced by `photo` in `TEAM`. People without a photo show their initials.
- Update slide composition in `src/slides/WinterSlides.jsx` and ordering in `deck.config.js`.
- The participant audit script is published at `setup/prepare-agentic-data.ps1`.
- Audit mode is read-only. Tool installation, Microsoft npm proxy configuration and sign-in require explicit script switches.

## Registration architecture

Azure Static Web Apps hosts the complete public experience. In state `1`, the custom themed form:

1. collects company details, a twice-entered company email, selected date/session-time combinations, environment preference and consent;
2. stores an opaque registration token in the attendee's browser so that browser can update the same registration when the same company email is entered, and offers **Not you? Start a new registration** to forget the token on a shared device;
3. forwards the canonical `companyEmail`, `sessionSelections` and `environmentPreference` fields, plus the server-side consent wording version, through the server-side `/api/register` function;
4. creates or updates the registration in a restricted Microsoft List without collecting GitHub identity. An email address that is already registered is never overwritten from another browser, and the confirmation does not reveal whether it was already registered.

In state `4`, the site embeds the bootcamp's Microsoft Form instead, and registrations do not reach the List; see [Registration through Microsoft Forms](#registration-through-microsoft-forms).

A few days before the event, the attendee receives an invitation containing the link to join the event GitHub organization. GitHub Copilot AI credits are provided in the event environment.

See [docs/registration-backend.md](docs/registration-backend.md) for the List, flow contract, consent wording versions and application settings.

## Deploy

Pushing to `main` runs `.github/workflows/deploy-registration.yml` and publishes the complete application to Azure Static Web Apps:

| Setting | Value |
| --- | --- |
| App location | `/` |
| API location | `api` |
| Output location | `dist` |
| Build command | `npm run build:swa` |
