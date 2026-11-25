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

**Description**:

> Explore what agentic AI means for modern data work. Six practical paths across analytics, engineering, open source, SQL, NoSQL and AI applications.\
> Winter 2026/27 · Online · Free · AI credits provided\
> **All times are Central European Time (CET, UTC+1).**\
> Every date runs the same six sessions, so pick as many sessions as you like, on as many dates as you like. Registration takes about two minutes.

## Questions

Questions 1 to 4, 11 and 12 are required. The six session questions, 5 to 10, are optional, so a visitor can skip a session. Text questions are single line.

| # | Question | Type | Subtitle and options |
| --- | --- | --- | --- |
| 1 | Participant full name | Text | Enter your first and last name so we can distinguish your registration and associate it with your company email address. |
| 2 | Company or organisation | Text | |
| 3 | Company email address | Text, email address | We send your formal invitation to this address. |
| 4 | Re-enter company email address | Text, email address | Enter the same address again to confirm it. |
| 5 | Agentic Data Engineering Foundations | Choice, multiple answers | **09:00–10:00 CET**<br>Tick each date you want to attend, or leave it blank to skip this session. |
| 6 | Agentic AI for Analysts: Consuming Data | Choice, multiple answers | **10:00–11:00 CET** |
| 7 | Agentic AI for Data Engineers: Lakehouse Design | Choice, multiple answers | **11:00–12:00 CET** |
| 8 | Agentic AI for Open-Source Data Engineers: DBT and Airflow | Choice, multiple answers | **12:30–13:30 CET** |
| 9 | Agentic AI for SQL Developers & Admins | Choice, multiple answers | **13:30–14:30 CET** |
| 10 | Agentic AI for NoSQL: Build Your Own ChatGPT | Choice, multiple answers | **14:30–15:30 CET** |
| 11 | Development environment | Choice, one answer | Install the tools locally if your setup is already ready or you will attend Foundations to complete it. Only 200 cloud environments are available, so choosing cloud does not guarantee a place. Options: I will install the tools locally; I need a cloud development environment. |
| 12 | Data consent | Choice, multiple answers | One option: I consent to Microsoft using my name, company, company email, session choices and environment preference to administer the bootcamp, send the GitHub organization invitation, provision access, communicate with me and improve the programme. Registration data is deleted after the administration period. |

Each session question, 5 to 10, is titled with the session name, and its subtitle starts with the session's time range in bold. Each offers the same options: `Friday 4 December`, `Friday 11 December`, `Friday 18 December`, `Friday 8 January`, `Friday 15 January`, `Friday 22 January`. Every date falls before European summer time begins in late March, so CET (UTC+1) applies to all of them.

The consent option is the retired on-site form's consent wording (version `2026-10-12`) with "name" added, because this form also asks for the participant's name.

### Changes to make in the form

The form is edited in Microsoft Forms, so these changes can't be made from this repository. Make them, then update the table above.

1. Add the Privacy Statement link to question 12, which sits directly above **Submit**: in its subtitle, add the text `Privacy` linked to https://go.microsoft.com/fwlink/?LinkId=521839.
2. In the consent option, replace "Registration data is deleted after the administration period." with "Registration data is deleted 30 days after the final session.", so the form states the retention period below.

Microsoft Forms already marks questions 1 to 4, 11 and 12 as required with an asterisk and explains the asterisk at the top of the form, so nothing else needs to change.

## Settings

- Who can fill out this form: Anyone can respond. Attendees come from many organisations.
- Hide "Submit another response": on.
- Allow receipt of responses after submission: on.
- Saving and editing responses: off.

**Thank-you message**: Thanks, we’ve received your registration. GitHub organization access details will be sent to your company email a few days before the event. To change your registration, contact the Microsoft contact who invited you.

## Checking responses

When processing responses, keep in mind:

- Microsoft Forms only checks that both email entries are email addresses, not that they match, so compare them.
- Microsoft Forms does not require at least one session, so look for responses with no dates ticked.

## Data retention and deletion

All registration data is deleted 30 days after the final session. The final session is on Friday 22 January 2027 (`SESSION_DATES` in `src/content.js`), so the deletion date is **Sunday 21 February 2027**. If the final session moves, the deletion date moves with it.

On that date, the form owner turns off **Accept responses** in the form's settings and deletes:

- every response in Microsoft Forms (**Responses** > **More options** > **Delete all responses**);
- the Excel workbook linked to the form, which keeps its rows when the responses are deleted in Microsoft Forms;
- every export or copy of the responses, such as downloaded workbooks and the lists used to send invitations or allocate cloud environments;
- the `Agentic Data Bootcamp Registrations` SharePoint List, which holds the registrations made through the retired on-site form.

## Rebuilding the form

Create the form with the design, questions and settings above. Then copy its full response link, in the form `https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=<form id>`, into `registrationFormUrl`. A `/r/` short link is not accepted, so open it and copy the address it leads to.
