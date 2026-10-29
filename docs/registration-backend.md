# Shared registration backend

The public registration page stores submissions in Microsoft 365 through one shared Power Automate flow and a private SharePoint List per event. GitHub OAuth and GitHub identity are not used for registration.

## Data registration List

- Site: `https://microsofteur.sharepoint.com/teams/AgenticDataWinterBootcamp`
- List: `Agentic Data Bootcamp Registrations`
- List ID: `7fa51ef2-dc09-4364-a48d-26fe3bd262d7`
- Access: restricted to the bootcamp operations team
- Version history: enabled

| Column | Type | Purpose |
| --- | --- | --- |
| `Title` | Single line of text | Hidden stable event/email key used to prevent duplicate rows |
| `RegistrationId` | Single line of text | Unique, indexed event-scoped identifier |
| `Company` | Single line of text | Company or organisation |
| `CompanyEmail` | Single line of text | Normalized communication address |
| `SessionSelections` | Choice, multiple selections | Filterable date/time/session selections |
| `Sessions` | Multiple lines of text | Temporary compatibility summary; `SessionSelections` is authoritative |
| `Environment` | Choice | `local` or `cloud` |
| `OrganizationAccessStatus` | Choice | `Pending`, `Invitation queued`, `Invitation sent`, `Joined`, or `Issue` |
| `CloudEnvironmentStatus` | Choice | `Not requested`, `Requested`, `Allocated`, `Ready`, `Waitlisted`, or `Issue` |
| `Consent` | Yes/No | Explicit data consent |
| `UpdatedAt` | Date and time | Latest submitted timestamp |

`GitHubUserId` and `GitHubUsername` are obsolete and should not exist in the final List schema. Define a retention and deletion date after the bootcamp administration period.

### Data schedule values

`SessionSelections` contains the 36 valid combinations of six dates and six daily session times:

```text
YYYY-MM-DD|HH:MM|session-id
```

Dates:

- `2026-12-04`
- `2026-12-11`
- `2026-12-18`
- `2027-01-08`
- `2027-01-15`
- `2027-01-22`

Daily sessions:

- `09:00|foundations`
- `10:00|analysts`
- `11:00|lakehouse`
- `12:30|open-source`
- `13:30|sql`
- `14:30|nosql`

## Registration identity

The attendee enters the company email twice. The browser and API normalize both values to lower case and reject the submission unless they match. This reduces typing errors but does not verify ownership of the mailbox.

On the first successful registration, the API returns an opaque UUID token that the browser stores locally. The API derives:

```text
SHA256(eventId + ":" + registrationToken)
```

This value is the `RegistrationId` and remains the capability required to update a registration. The API also derives a downstream-only key from the normalized email:

```text
SHA256(eventId + ":" + normalizedCompanyEmail)
```

The email key is sent only to the shared flow and stored in the hidden SharePoint `Title` field. It is never accepted from or returned to the browser. A different browser token therefore cannot create a second row for the same event/email or overwrite the existing registration.

The same browser can update sessions, company, and environment without treating the email address as an authentication credential. `CompanyEmail` and the stored email key are immutable after creation. If an attendee loses the browser token, operations must handle any requested changes; a new anonymous submission receives the same generic accepted response but does not replace the existing registration.

## API-to-flow contract

All three current APIs send:

```json
{
  "eventId": "agentic-data-winter-bootcamp",
  "registrationId": "event-scoped SHA-256 value",
  "registrationEmailKey": "event/email-scoped SHA-256 value",
  "company": "Example organisation",
  "companyEmail": "person@example.com",
  "sessionSelections": ["2026-12-04|09:00|foundations"],
  "environmentPreference": "local",
  "consent": true,
  "updatedAt": "2026-01-01T12:00:00.000Z"
}
```

The flow accepts only these canonical names. It rejects missing required fields, unrecognized events, invalid identifiers, empty selections, invalid environments, or consent values other than `true`.

## Power Automate flow

- Environment ID: `839eace6-59ab-4243-97ec-a5b8fcc104e4`
- Flow ID: `8f1a64e0-d0b6-4d1a-aafc-b96e6df4d311`
- Display name: `Agentic Winter Bootcamps Registration Upsert`
- State: `Started`

The flow:

1. Rejects requests whose `x-registration-secret` header is invalid with HTTP `401`.
2. Requires an explicit `eventId`.
3. Routes Software, Foundry, and Data through explicit conditions.
4. Returns HTTP `400` for a missing or unrecognized event ID instead of silently using the Data List.
5. Queries the event List with `RegistrationId eq '<registrationId>'` and top count `1`.
6. For a matching token, updates the existing row while preserving its `CompanyEmail` and registration ID. If the submitted email matches that immutable value, the flow can replace a legacy email-valued `Title` with the server-derived email key; a different submitted email cannot change `Title`.
7. Resets `OrganizationAccessStatus` to `Pending` when the company changes; otherwise preserves existing progress.
8. Resets `CloudEnvironmentStatus` to `Requested` or `Not requested` when the environment changes; otherwise preserves existing progress.
9. For a new token, queries the hidden `Title` email key before creating. During migration, the same query also checks immutable `CompanyEmail` so legacy rows remain protected before their `Title` is converted. An existing event/email is left unchanged and receives the same generic HTTP `202` response, preventing registration enumeration.
10. Converts the submitted string array into SharePoint choice objects and writes the complete values to filterable `SessionSelections`.
11. Writes a compact count summary to the temporary `Sessions` compatibility field.
12. Sets `OrganizationAccessStatus` to `Pending` when creating a registration.
13. Sets `CloudEnvironmentStatus` to `Requested` for cloud requests and `Not requested` for local requests.
14. Protects the HTTP trigger and sensitive SharePoint action inputs/outputs from Power Automate run-history disclosure.
15. Returns HTTP `202` for accepted registrations.

| Event | `eventId` | SharePoint target |
| --- | --- | --- |
| Agentic Data Winter Bootcamp | `agentic-data-winter-bootcamp` | `Agentic Data Bootcamp Registrations` |
| Agentic Software Development Winter Bootcamp | `agentic-software-development-winter-bootcamp` | `Agentic Software Development Bootcamp Registrations` |
| Foundry Agentic Development Winter Bootcamp | `foundry-agentic-development-winter-bootcamp` | `Foundry Agentic Development Bootcamp Registrations` |

Do not log request bodies or send registration data to chat channels. Keep the trigger URL and shared secret only in Azure Static Web Apps application settings. Refresh any already-open designer before saving because stale Power Automate tabs can overwrite the deployed definition.

## Operational view

The default operational view should prioritize:

1. `CompanyEmail`
2. `Company`
3. `SessionSelections`
4. `Environment`
5. `OrganizationAccessStatus`
6. `CloudEnvironmentStatus`
7. `Consent`
8. `UpdatedAt`

Hide `Title`, `RegistrationId`, and `Sessions` from the default view where practical; keep them available for support and compatibility.

## Site states

`api/site-state.json` switches registration on and off without removing the working form, API or flow. The website and deck read it when they are built, and `/api/register` reads it when the function starts, so a change takes effect on the next deployment.

| `registration` | Website and deck | API |
| --- | --- | --- |
| `1` | The registration form is open | Validates and forwards submissions to the flow |
| `2` | Every register entry point says registration will open soon | Returns HTTP `403` before validation, without calling the flow, so nothing reaches SharePoint |

The same file sets `prerequisites` to `"ready"` (the readiness checklist and guided setup) or `"soon"` (this information will be shared soon). Unknown values fall back to `1` and `"ready"`. To switch, edit `api/site-state.json`, commit the change and push to `main` to deploy it.

## Azure Static Web Apps

| Setting | Purpose |
| --- | --- |
| `REGISTRATION_FLOW_URL` | Shared Power Automate HTTP trigger URL |
| `REGISTRATION_FLOW_SHARED_SECRET` | Server-side secret checked before routing |

The website, deck, and `/api/register` function share one origin. The API validates attendee input, never exposes the shared secret or email key, and the disabled GitHub login route returns `404`. Static Web Apps sends a restrictive Content Security Policy and denies framing.

## GitHub organization access

Registration does not immediately add an attendee to GitHub. A few days before the event, the event invitation provides the link for joining the event GitHub organization. The event environment includes $100 worth of GitHub Copilot AI credits.

## Verification

1. Confirm the GitHub OAuth route returns `404`.
2. Confirm mismatched company-email entries are rejected.
3. Confirm API tests reject invalid sessions, invalid environments, and missing backend settings, and that the state-2 test returns HTTP `403` without calling the flow.
4. Submit a registration only with explicit approval because it creates or updates SharePoint data.
5. Confirm the correct event branch runs, one row is upserted, and the operational statuses initialize correctly.
6. Repeat from the same browser and confirm the same row is updated, its email remains unchanged, and material company/environment changes reset only the relevant operational status.
7. Submit the same email with a different token and confirm the flow returns the generic HTTP `202` response without creating or changing a row.
8. Confirm missing or unknown `eventId` values return HTTP `400`.
9. Confirm invalid shared secrets return HTTP `401`.
10. Confirm Power Automate run history redacts the trigger and SharePoint action inputs/outputs.
