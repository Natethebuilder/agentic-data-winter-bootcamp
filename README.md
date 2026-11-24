# Agentic Data Engineering Winter Bootcamp

Interactive public website and DECKIO slide deck for the Agentic Data Engineering Winter Bootcamp, built for the wider data community across analytics, engineering, open source, SQL, NoSQL and AI applications.

**Live website and registration:** https://natethebuilder.github.io/agentic-data-winter-bootcamp/

| Route | Experience |
| --- | --- |
| `#/` | Landing site with the confirmed lineup, schedule, data visuals, foundations setup, FAQ and registration |
| `#/deck` | DECKIO presentation with session deep-dives and an embedded registration panel |

The complete six-session agenda runs on 4, 11 and 18 December 2026 and 8, 15 and 22 January 2027. The daily session times are 09:00, 10:00, 11:00, 12:30, 13:30 and 14:30.

## Site states

`site-state.json` switches the public experience. The website and the deck both read it.

```json
{
  "registration": 4,
  "registrationFormUrl": "https://forms.office.com/Pages/ResponsePage.aspx?id=<form id>",
  "prerequisites": "ready"
}
```

| Setting | Value | Effect |
| --- | --- | --- |
| `registration` | `2` | Every register entry point on the website and in the deck says registration will open soon. |
| `registration` | `3` | Every register entry point on the website and in the deck says registration is closed, and the form is not shown. |
| `registration` | `4` | Registration is open through this bootcamp's Microsoft Form. Every register entry point on the website and in the deck leads to the form set in `registrationFormUrl`. See [Registration through Microsoft Forms](#registration-through-microsoft-forms). |
| `registrationFormUrl` | Form link | The Microsoft Form that state `4` opens, such as `https://forms.office.com/Pages/ResponsePage.aspx?id=<form id>`. Other states ignore it. |
| `prerequisites` | `"ready"` | The Get ready section and the deck's setup slide show the readiness checklist and guided setup. |
| `prerequisites` | `"soon"` | The Get ready section and the deck's setup slide say this information will be shared soon. |

Any other `registration` value is treated as `3` (closed), including `1`, the retired on-site form, and so is `4` without a valid `registrationFormUrl`, so a missing or mistyped value never opens registration. `npm run build` fails when `registration` is `4` and the form link is missing or invalid, so a broken link never deploys. Unknown `prerequisites` values fall back to `"ready"`. To switch, edit `site-state.json`, commit the change and push to `main` to deploy it.

### Registration through Microsoft Forms

Registrations go to this bootcamp's Microsoft Form, and responses stay with the form owner in Microsoft Forms and Excel. [docs/registration-form/README.md](docs/registration-form/README.md) records the form's questions, settings and design so it can be rebuilt, and lists what Microsoft Forms does not check, such as matching email entries.

`registrationFormUrl` must be the form's full response link:

- `https`, on `forms.office.com`, `forms.cloud.microsoft` or `forms.microsoft.com`;
- the path `/Pages/ResponsePage.aspx` with a non-empty `id`, as in `https://forms.office.com/Pages/ResponsePage.aspx?id=<form id>`.

Short `/r/` share links are not accepted: open one and copy the address it leads to, or take the `src` from the form's embed code. The site adds `embed=true` for the embedded form and removes it from the **Open the form in a new tab** link. The form must accept responses from anyone, because attendees come from many organisations.

- **Website**: the registration section lists what the form asks for and loads the form only when the visitor chooses **Start registration**, so nothing is requested from Microsoft Forms before then. An **Open the form in a new tab** link is always shown. Microsoft Forms renders inside a frame only when the frame is at least 320 pixels wide, so on the narrowest phones it shows its own button for opening the form.
- **Deck**: the registration dialog shows the form straight away, because opening the dialog is already the visitor's choice.

A few days before the event, the attendee receives an invitation containing the link to join the event GitHub organization. GitHub Copilot AI credits are provided in the event environment.

Registrations made through the retired on-site form are in the `Agentic Data Bootcamp Registrations` SharePoint List. Its setup and the shared Power Automate flow are described in `docs/registration-backend.md` in the git history.

## Develop

```bash
npm install
npm run dev
npm test
npm run build
```

`npm test` checks the Microsoft Forms link rules, how each `registration` value resolves and when the build stops. The Inter font is self-hosted from `@fontsource/inter`, so pages make no requests to Google Fonts; `npm run build` fails if any output references them.

## Content and participant setup

- Update the shared site and deck content in `src/content.js`.
- Speaker headshots live in `public/speakers/` as square JPGs and are referenced by `photo` in `TEAM`. People without a photo show their initials.
- Update slide composition in `src/slides/WinterSlides.jsx` and ordering in `deck.config.js`.
- The participant audit script is published at `setup/prepare-agentic-data.ps1`.
- Audit mode is read-only. Tool installation, Microsoft npm proxy configuration and sign-in require explicit script switches.

## Deploy

Pushing to `main` builds the site and publishes it to GitHub Pages with `.github/workflows/deploy.yml`. The workflow sets `BASE_PATH` to the Pages path, `/agentic-data-winter-bootcamp/`; local builds use `/`.

GitHub Pages can't send response headers, so the build adds the content security policy and referrer policy to the page as meta tags (`securityPolicy()` in `vite.config.js`). The policy allows frames from the three Microsoft Forms hosts only and allows the page's inline scripts by hash. A meta tag can't set `frame-ancestors`, `X-Frame-Options`, `X-Content-Type-Options` or `Permissions-Policy`, so the site no longer sends them.
