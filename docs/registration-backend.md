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
| `Title` | Single line of text | Standard SharePoint field; receives the company email and can be hidden from the operational view |
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

The same browser can therefore update the same row without treating the email address as an authentication credential. Clearing browser storage or changing browser/device can create another row.

## API-to-flow contract

All three current APIs send:

```json
{
  "eventId": "agentic-data-winter-bootcamp",
  "registrationId": "event-scoped SHA-256 value",
  "company": "Example organisation",
  "companyEmail": "person@example.com",
  "sessionSelections": ["2026-12-04|09:00|foundations"],
  "environmentPreference": "local",
  "consent": true,
  "updatedAt": "2026-01-01T12:00:00.000Z"
}
```

During deployment migration, the flow also accepts the previous aliases:

- `email` for `companyEmail`
- `sessions` for `sessionSelections`
- `environment` for `environmentPreference`

The flow uses `coalesce(...)` only for this controlled compatibility window. New clients must use the canonical names.

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
6. Updates the first matching item or creates a new item.
7. Converts the submitted string array into SharePoint choice objects and writes the complete values to filterable `SessionSelections`.
8. Writes a compact count summary to the temporary `Sessions` compatibility field.
9. Sets `OrganizationAccessStatus` to `Pending` when creating a registration.
10. Sets `CloudEnvironmentStatus` to `Requested` for cloud requests and `Not requested` for local requests.
11. Preserves operational status progress on later registration updates.
12. Returns HTTP `202` for accepted registrations.

| Event | `eventId` | SharePoint target |
| --- | --- | --- |
| Agentic Data Winter Bootcamp | `agentic-data-winter-bootcamp` | `Agentic Data Bootcamp Registrations` |
| Agentic Software Development Winter Bootcamp | `agentic-software-development-winter-bootcamp` | `Agentic Software Development Bootcamp Registrations` |
| Foundry Agentic Development Winter Bootcamp | `foundry-agentic-development-winter-bootcamp` | `Foundry Agentic Development Bootcamp Registrations` |

Do not log request bodies or send registration data to chat channels. Keep the trigger URL and shared secret only in Azure Static Web Apps application settings.

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

## Azure Static Web Apps

| Setting | Purpose |
| --- | --- |
| `REGISTRATION_FLOW_URL` | Shared Power Automate HTTP trigger URL |
| `REGISTRATION_FLOW_SHARED_SECRET` | Server-side secret checked before routing |

The website, deck, and `/api/register` function share one origin. The API validates attendee input, never exposes the shared secret, and the disabled GitHub login route returns `404`.

## GitHub organization access

Registration does not immediately add an attendee to GitHub. A few days before the event, the event invitation provides the link for joining the event GitHub organization. The event environment includes $100 worth of GitHub Copilot AI credits.

## Verification

1. Confirm the GitHub OAuth route returns `404`.
2. Confirm mismatched company-email entries are rejected.
3. Confirm API tests reject invalid sessions, invalid environments, and missing backend settings.
4. Submit a registration only with explicit approval because it creates or updates SharePoint data.
5. Confirm the correct event branch runs, one row is upserted, and the operational statuses initialize correctly.
6. Repeat from the same browser and confirm the same row is updated while status progress is preserved.
7. Confirm missing or unknown `eventId` values return HTTP `400`.
8. Confirm invalid shared secrets return HTTP `401`.
