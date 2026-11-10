# Registration form

This is the Microsoft Form that captures registrations while `api/site-state.json` sets `"registration": 4`; see [Registration through Microsoft Forms](../registration-backend.md#registration-through-microsoft-forms). This page records the form so it can be rebuilt.

**Response link** (`registrationFormUrl`): https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbRxdEa3AwZX5OnfloSBL3H3tUQTJOQldOV0RTN05RTDdLSVBRNjUwTjNFNi4u

Responses stay with the form owner in Microsoft Forms and Excel.

## Design

| Setting | Value |
| --- | --- |
| Theme colour | `#0f1b31` |
| Background image | [`background.png`](background.png), 1920 × 1080 |
| Header image | [`tile.png`](tile.png), 1280 × 720 |
| Header image alt text | Agentic Data Engineering Winter Bootcamp logo with the duck and GitHub Copilot mascots |

## Title and description

**Title**: Agentic Data Engineering Winter Bootcamp registration

**Description**:

> Explore what agentic AI means for modern data work. Six practical paths across analytics, engineering, open source, SQL, NoSQL and AI applications.
> Winter 2026/27 · Online · Free · AI credits provided
> Every date runs the same six sessions, so pick a date for each session you want to attend. Registration takes about two minutes.

## Questions

Every question is required.

| # | Question | Type | Subtitle and options |
| --- | --- | --- | --- |
| 1 | Company or organisation | Text | |
| 2 | Company email address | Text, email address | We send your GitHub organization invitation to this address. |
| 3 | Re-enter company email address | Text, email address | Enter the same address again to confirm it. |
| 4 | Choose a date for each session | Likert | Every date runs the same six sessions. Choose a date for each session you want to attend, or None to skip it. Rows and columns are listed below. |
| 5 | Development environment | Choice, one answer | Install the tools locally if your setup is already ready or you will attend Foundations to complete it. Only 200 cloud environments are available, so choosing cloud does not guarantee a place. Options: I will install the tools locally; I need a cloud development environment. |
| 6 | Data consent | Checkbox | One option with the consent wording, version `2026-10-12` from `REGISTRATION.consent` in `src/content.js`: I consent to Microsoft using my company, company email, session choices and environment preference to administer the bootcamp, send the GitHub organization invitation, provision access, communicate with me and improve the programme. Registration data is deleted after the administration period. |

Question 4 has one row per session and one column per date, plus None:

- Rows: `09:00 · 01 · Agentic Data Engineering Foundations`, `10:00 · 02 · Agentic AI for Analysts: Consuming Data`, `11:00 · 03 · Agentic AI for Data Engineers: Lakehouse Design`, `12:30 · 04 · Agentic AI for Open-Source Data Engineers: DBT and Airflow`, `13:30 · 05 · Agentic AI for SQL Developers & Admins`, `14:30 · 06 · Agentic AI for NoSQL: Build Your Own ChatGPT`
- Columns: `4 Dec`, `11 Dec`, `18 Dec`, `8 Jan`, `15 Jan`, `22 Jan`, `None`

## Settings

- Who can fill out this form: Anyone can respond. Attendees come from many organisations.
- Hide "Submit another response": on.
- Allow receipt of responses after submission: on.
- Saving and editing responses: off.

**Thank-you message**: Thanks, we’ve received your registration. GitHub organization access details will be sent to your company email a few days before the event. To change your registration, contact the Microsoft contact who invited you.

## Differences from the site's own form

When processing responses, keep in mind:

- Each session takes one date, or None. The site's own form lets a visitor choose the same session on several dates.
- Microsoft Forms only checks that both email entries are email addresses, not that they match, so compare them.
- Microsoft Forms does not require at least one session, so look for responses with None for every session.

## Rebuilding the form

Create the form with the design, questions and settings above. Then copy its full response link, in the form `https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=<form id>`, into `registrationFormUrl`. A `/r/` short link is not accepted, so open it and copy the address it leads to.
