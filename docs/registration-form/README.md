# Registration form

This is the Microsoft Form that captures registrations while `site-state.json` sets `"registration": 4`; see [Registration through Microsoft Forms](../../README.md#registration-through-microsoft-forms). This page records the form so it can be rebuilt.

**Response link** (`registrationFormUrl`): https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbRxdEa3AwZX5OnfloSBL3H3tUQTJOQldOV0RTN05RTDdLSVBRNjUwTjNFNi4u

Responses stay with the form owner in Microsoft Forms and Excel, and are deleted 30 days after the final session; see [Data retention and deletion](#data-retention-and-deletion).

## Design

| Setting | Value |
| --- | --- |
| Theme colour | `#0f1b31` |
| Background image | [`background.png`](background.png), 1920 × 1080 |
| Header image | [`tile.png`](tile.png), 1280 × 720 |
| Header image alt text | Agentic Data Engineering Winter Bootcamp logo with the duck and GitHub Copilot mascots |

## Title and description

**Title**: Agentic Data Engineering Winter Bootcamp registration

**Description**, one line per quoted line. The first two lines give the purpose, deletion period and Privacy Statement link:

> Please fill in the form to register to the event. Microsoft will use the information provided to administer the bootcamp, send the GitHub organization invitation, provision access and communicate event information. Responses are deleted 30 days after the final session.
>
> Please read the Microsoft Privacy Statement: https://go.microsoft.com/fwlink/?LinkId=521839
>
> Explore what agentic AI means for modern data work. Six practical paths across analytics, engineering, open source, SQL, NoSQL and AI applications.
>
> Winter 2026/27 · Online · Free · AI credits provided
>
> **All times are Central European Time (CET, UTC+1).**
>
> Each date runs the same six sessions. Choose one date per session, or select ‘Not attending’ to skip it. Registration takes about two minutes.
>
> More details can be found here: https://aka.ms/AgenticDataEngineeringBootcamp

## Questions

Every question is required, and Microsoft Forms marks each one with an asterisk and shows that asterisks mean required. Question 4 needs an answer for each session, and "Not attending" skips a session. Text questions are single line.

| # | Question | Type | Subtitle |
| --- | --- | --- | --- |
| 1 | Company or organisation | Text | |
| 2 | Company email address | Text, email address | We send your formal invitation to this address. |
| 3 | Re-enter company email address | Text, email address | Enter the same address again to confirm it. |
| 4 | Which date would you like to attend each session? | Likert | Select one date per session. Choose “Not attending” to skip a session. All times are CET (UTC+1). |
| 5 | Development environment | Choice, one answer | Install the tools locally if your setup is already ready or you will attend Foundations to complete it. Only 200 cloud environments are available, so choosing cloud does not guarantee a place. Privacy: https://go.microsoft.com/fwlink/?LinkId=521839 |

Question 4's statements are the six sessions: `Session 1: Agentic Data Engineering Foundations (09:00–10:00)`, `Session 2: Agentic AI for Analysts: Consuming Data (10:00–11:00)`, `Session 3: Agentic AI for Data Engineers: Lakehouse Design (11:00–12:00)`, `Session 4: Agentic AI for Open-Source Data Engineers: DBT and Airflow (12:30–13:30)`, `Session 5: Agentic AI for SQL Developers & Admins (13:30–14:30)` and `Session 6: Agentic AI for NoSQL: Build Your Own ChatGPT (14:30–15:30)`. Its options are the six dates and "Not attending": `Friday 4 December`, `Friday 11 December`, `Friday 18 December`, `Friday 8 January`, `Friday 15 January`, `Friday 22 January`, `Not attending`. Every date falls before European summer time begins in late March, so CET (UTC+1) applies to all of them.

Question 5's options are `I will install the tools locally` and `I need a cloud development environment`. Its subtitle ends with the Privacy Statement link because it is the last question, directly above **Submit**.

The form asks for no name and no consent: it collects only what registration needs, and its description says how Microsoft uses the answers.

### Changes to make in the form

The live form, last changed on 22 November 2026, needs two edits to match this page. They are made in Microsoft Forms, not in this repository:

1. In the description, replace `https://aka.ms/privacy` with `https://go.microsoft.com/fwlink/?LinkId=521839`, and end the first line with "Responses are deleted 30 days after the final session."
2. End question 5's subtitle with "Privacy: https://go.microsoft.com/fwlink/?LinkId=521839".

## Settings

- Who can fill out this form: Anyone can respond. Attendees come from many organisations.
- Accept responses: on.
- Hide "Submit another response": on.
- Allow receipt of responses after submission: on.
- Saving and editing responses: off.

**Thank-you message**: Thanks, we’ve received your registration. GitHub organization access details will be sent to your company email a few days before the event. To change your registration, contact the Microsoft contact who invited you.

## Checking responses

When processing responses, keep in mind:

- Microsoft Forms only checks that both email entries are email addresses, not that they match, so compare them.
- Every session can be answered "Not attending", so look for responses that attend no session.
- Microsoft Forms does not stop the same address registering twice, so look for repeated addresses and keep the latest response.

## Data retention and deletion

All registration data is deleted 30 days after the final session. The final session is on Friday 22 January 2027 (`SESSION_DATES` in `src/content.js`), so the deletion date is **Sunday 21 February 2027**. If the final session moves, the deletion date moves with it.

On that date, the form owner turns off **Accept responses** in the form's settings and deletes:

- every response in Microsoft Forms (**Responses** > **More options** > **Delete all responses**);
- the Excel workbook linked to the form, which keeps its rows when the responses are deleted in Microsoft Forms;
- every export or copy of the responses, such as downloaded workbooks and the lists used to send invitations or allocate cloud environments;
- the `Agentic Data Bootcamp Registrations` SharePoint List, which holds the registrations made through the retired on-site form.

## Rebuilding the form

Create the form with the design, questions and settings above. Then copy its full response link, in the form `https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=<form id>`, into `registrationFormUrl`. A `/r/` short link is not accepted, so open it and copy the address it leads to.
