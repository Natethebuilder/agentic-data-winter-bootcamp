# Shared registration backend

The public registration page stores submissions in Microsoft 365 through one shared Power Automate flow and a private SharePoint List per event. GitHub OAuth and GitHub identity are not used for registration.

## Data registration List

- Site: the bootcamp's private SharePoint site
- List: `Agentic Data Bootcamp Registrations`
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
| `ConsentVersion` | Single line of text, optional | Version of the consent wording the attendee agreed to; empty for registrations saved before versioning. See [Consent wording versions](#consent-wording-versions) |
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

On the first accepted registration, the API returns an opaque UUID token that the browser stores locally. The API derives:

```text
SHA256(eventId + ":" + registrationToken)
```

This value is the `RegistrationId` and remains the capability required to update a registration. The API also derives a downstream-only key from the normalized email:

```text
SHA256(eventId + ":" + normalizedCompanyEmail)
```

The email key is sent only to the shared flow and stored in the hidden SharePoint `Title` field. It is never accepted from or returned to the browser.

| Browser token | Company email | Result | Attendee sees |
| --- | --- | --- | --- |
| Matches a saved registration | Same as the saved `CompanyEmail`, ignoring case | The registration is updated | Your registration has been updated |
| Matches a saved registration | Different from the saved `CompanyEmail` | Nothing is saved; the API answers HTTP `409` | The address doesn't match the registration saved in this browser: check it, or choose **Not you? Start a new registration** |
| New, or not found | Not registered for this event | A registration is created | We've received your registration (neutral confirmation) |
| New, or not found | Already registered, by email key or `CompanyEmail` | Nothing is saved | The same neutral confirmation, so the answer never reveals whether an email address is registered |

The neutral confirmation reads: "Thanks, we’ve received your registration. If this email address was already registered, your original registration is unchanged. To change it, contact the Microsoft contact who invited you."

`CompanyEmail` and the stored email key are immutable after creation, and a token updates a registration only when the same email address is entered, so the email address is a consistency check, not a credential. If an attendee loses the browser token or needs a different email address, operations must handle the change.

Whenever a token is stored, the form shows **Not you? Start a new registration**. It removes the token from the browser and resets the form, so the next person on a shared device starts a separate registration instead of reaching the previous person's.

## API-to-flow contract

The Data API sends:

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
  "consentVersion": "2026-10-12",
  "updatedAt": "2026-01-01T12:00:00.000Z"
}
```

The flow's trigger schema sets `additionalProperties: false`, so the flow accepts only these canonical names and rejects alias fields such as `email`, `sessions` or `environment`. It also rejects missing required fields, unrecognized events, invalid identifiers, empty selections, invalid environments, or consent values other than `true`. `consentVersion` is optional for the flow (1–40 characters), so the Software Development and Foundry sites can share the same contract; the Data API always sends it from `api/consent-version.json` and never takes it from the browser.

| Flow response | Meaning |
| --- | --- |
| `202 {"ok":true,"outcome":"created"}` | New registration saved |
| `202 {"ok":true,"outcome":"updated"}` | `registrationId` found and the stored email equals `companyEmail`, ignoring case; registration updated |
| `202 {"ok":true,"outcome":"unchanged"}` | `registrationId` not found and the email address, or its key, is already registered; nothing saved |
| `409 {"ok":false,"outcome":"email-mismatch"}` | `registrationId` found but the stored email differs; nothing saved |
| `400` | Invalid request, unknown field, or missing or unrecognized `eventId` |
| `401` | Invalid `x-registration-secret` |

The API treats a `202` without an `outcome`, from an older flow version, as `received`.

### API responses

| `/api/register` response | When |
| --- | --- |
| `202 {"ok":true,"outcome":"received","registrationToken":"…"}` | The flow answered `created`, `unchanged`, or `202` without an outcome. The response is identical for `created` and `unchanged`. |
| `202 {"ok":true,"outcome":"updated","registrationToken":"…"}` | The flow answered `updated` |
| `409 {"error":"…","code":"registration-email-mismatch"}` | The flow answered `409`. No token is returned; the browser keeps its stored token. |
| `400 {"error":"…"}` | The submission failed validation; the flow is not called |
| `403 {"error":"…"}` | Registration is not open; see [Site states](#site-states). The flow is not called. |
| `502 {"error":"…"}` | The flow could not be reached or answered with any other status |
| `503 {"error":"…"}` | The flow settings are missing or invalid |

## Consent wording versions

`api/consent-version.json` holds the version of the consent wording the form currently shows. The version is the date, as `YYYY-MM-DD`, on which that wording went live. The API sends it as `consentVersion` with every registration, so each record shows which wording the attendee agreed to.

| Version | Live since | File | Wording |
| --- | --- | --- | --- |
| `2026-10-12` | 12 October 2026 | `src/content.js` (`REGISTRATION.consent`) | I consent to Microsoft using my company, company email, session choices and environment preference to administer the bootcamp, send the GitHub organization invitation, provision access, communicate with me and improve the programme. Registration data is deleted after the administration period. |

To change the wording, update `REGISTRATION.consent`, set `api/consent-version.json` to the date the new wording goes live, and add a row to this table, keeping the earlier rows. Registrations saved before `consentVersion` was introduced have no version; earlier wordings are in the git history of `src/content.js`.

## Power Automate flow

- Display name: `Agentic Winter Bootcamps Registration Upsert`
- Environment: the bootcamp's Power Automate environment
- State: `Started`

The flow:

1. Rejects requests whose `x-registration-secret` header is invalid with HTTP `401`.
2. Validates the body against a trigger schema that rejects unknown fields, and requires an explicit `eventId`.
3. Routes Software, Foundry, and Data through explicit conditions.
4. Returns HTTP `400` for a missing or unrecognized event ID instead of silently using the Data List.
5. Queries the event List with `RegistrationId eq '<registrationId>'` and top count `1`.
6. For a matching token whose stored `CompanyEmail` equals the submitted `companyEmail`, ignoring case, updates the existing row while preserving its `CompanyEmail` and registration ID, and returns `outcome: "updated"`. It sets `Title` to the server-derived email key, replacing any legacy email-valued `Title`.
7. For a matching token whose stored `CompanyEmail` differs, saves nothing and returns HTTP `409` with `outcome: "email-mismatch"`.
8. Resets `OrganizationAccessStatus` to `Pending` when the company changes; otherwise preserves existing progress.
9. Resets `CloudEnvironmentStatus` to `Requested` or `Not requested` when the environment changes; otherwise preserves existing progress.
10. For a new token, queries the hidden `Title` email key and the immutable `CompanyEmail`, so legacy rows whose `Title` is not yet converted stay protected. It creates a registration and returns `outcome: "created"` only when neither exists. Otherwise it saves nothing and returns `outcome: "unchanged"`, which the API answers exactly like a new registration, preventing registration enumeration.
11. Converts the submitted string array into SharePoint choice objects and writes the complete values to filterable `SessionSelections`.
12. Writes a compact count summary to the temporary `Sessions` compatibility field.
13. Sets `OrganizationAccessStatus` to `Pending` when creating a registration.
14. Sets `CloudEnvironmentStatus` to `Requested` for cloud requests and `Not requested` for local requests.
15. Writes `consentVersion` to `ConsentVersion`. On create it writes the submitted value, or leaves the column empty if none was sent; on update it writes the submitted value, or keeps the stored one if none was sent.
16. Protects the HTTP trigger and sensitive SharePoint action inputs/outputs from Power Automate run-history disclosure.

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
| `2` | Every register entry point says registration will open soon | Returns HTTP `403` "Registration will open soon." before validation, without calling the flow, so nothing reaches SharePoint |
| `3` | Every register entry point says registration is closed, and the form is not shown | Returns HTTP `403` "Registration is closed." before validation, without calling the flow |
| Any other value | Treated as `3`, closed | Returns HTTP `403` "Registration is not open." before validation, without calling the flow |

Only `1` opens registration, so a missing or mistyped value keeps it closed. The same file sets `prerequisites` to `"ready"` (the readiness checklist and guided setup) or `"soon"` (this information will be shared soon); unknown `prerequisites` values fall back to `"ready"`. To switch, edit `api/site-state.json`, commit the change and push to `main` to deploy it.

## Azure Static Web Apps

| Setting | Purpose |
| --- | --- |
| `REGISTRATION_FLOW_URL` | Shared Power Automate HTTP trigger URL |
| `REGISTRATION_FLOW_SHARED_SECRET` | Server-side secret checked before routing |

The website, deck, and `/api/register` function share one origin. The API validates attendee input, never exposes the shared secret or email key, and the disabled GitHub login route returns `404`. Static Web Apps sends a restrictive Content Security Policy and denies framing. Fonts are self-hosted from the site's origin, so the policy allows no third-party font or style hosts, and `npm run build` fails if any output references Google Fonts.

The API waits up to 30 seconds for the flow, below the 45-second Static Web Apps API request limit. The flow normally answers in 1–3 seconds, but Power Automate can occasionally take several seconds just to accept a request. A shorter wait showed attendees an error even though the flow had saved their registration.

## GitHub organization access

Registration does not immediately add an attendee to GitHub. A few days before the event, the event invitation provides the link for joining the event GitHub organization. GitHub Copilot AI credits are provided in the event environment.

## Verification

1. Confirm the GitHub OAuth route returns `404`.
2. Confirm mismatched company-email entries are rejected.
3. Run `npm test`. It covers input validation and missing backend settings; the outcome mapping (`created`, `unchanged` and a `202` without an outcome all return the same `received` response, `updated` returns `updated`, and a flow `409` returns the email-mismatch error without a token); `consentVersion` in the payload; and the site states (`1` accepted; `2`, `3` and any other value refused with HTTP `403` without calling the flow).
4. Run `npm run build` and confirm it succeeds; it fails if any output references Google Fonts.
5. Submit a registration only with explicit approval because it creates or updates SharePoint data.
6. Confirm the correct event branch runs, one row is created with its `ConsentVersion`, and the operational statuses initialize correctly.
7. Repeat from the same browser with the same email and confirm the form says the registration was updated, the same row is updated, its email remains unchanged, and material company/environment changes reset only the relevant operational status.
8. Repeat from the same browser with a different email and confirm the email-mismatch message appears and no row changes.
9. Submit an already registered email with a different token and confirm the form shows the same neutral confirmation as a new registration and no row is created or changed.
10. Choose **Not you? Start a new registration** and confirm the stored token is removed and the form is reset.
11. Confirm missing or unknown `eventId` values and unknown fields return HTTP `400`.
12. Confirm invalid shared secrets return HTTP `401`.
13. Confirm Power Automate run history redacts the trigger and SharePoint action inputs/outputs.
