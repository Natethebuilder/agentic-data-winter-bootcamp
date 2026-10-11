# Shared registration backend

The registration page uses Azure Static Web Apps GitHub authentication and stores submissions in Microsoft 365 through one shared Power Automate flow and a private Microsoft List per event. Microsoft Forms is not used because an embedded form cannot inherit the site theme and does not expose a supported API for custom response submission.

## Microsoft List

Create a restricted list named `Agentic Data Bootcamp Registrations`. Limit access to the bootcamp operations team and use these columns:

| Column | Type | Required | Notes |
| --- | --- | --- | --- |
| `Title` | Single line of text | Yes | GitHub username |
| `RegistrationId` | Single line of text | Yes | Unique, indexed; SHA-256 identifier supplied by the API |
| `GitHubUserId` | Single line of text | Yes | Static Web Apps provider identifier |
| `GitHubUsername` | Single line of text | Yes | Verified GitHub handle |
| `Company` | Single line of text | Yes | Maximum 160 characters |
| `CompanyEmail` | Single line of text | Yes | Lower-case email address |
| `Sessions` | Multiple lines of text | Yes | Store the JSON session ID array or a semicolon-delimited value |
| `Environment` | Choice | Yes | `local` or `cloud` |
| `Consent` | Yes/No | Yes | Must be `Yes` |
| `UpdatedAt` | Date and time | Yes | ISO timestamp supplied by the API |

Turn on version history. Do not expose the list publicly, and define a deletion date after the bootcamp administration period.

## Power Automate flow

1. Create an automated cloud flow with **When an HTTP request is received**.
2. Use this request schema:

```json
{
  "type": "object",
  "required": [
    "registrationId",
    "githubUserId",
    "githubUsername",
    "company",
    "email",
    "sessions",
    "environment",
    "consent",
    "updatedAt"
  ],
  "properties": {
    "eventId": { "type": "string" },
    "registrationId": { "type": "string" },
    "githubUserId": { "type": "string" },
    "githubUsername": { "type": "string" },
    "company": { "type": "string" },
    "email": { "type": "string" },
    "sessions": {
      "type": "array",
      "items": { "type": "string" }
    },
    "environment": { "type": "string" },
    "consent": { "type": "boolean" },
    "updatedAt": { "type": "string" }
  }
}
```

3. Keep `eventId` optional while the original Data client remains deployed without it.
4. Reject the request unless the `x-registration-secret` header exactly matches the secret stored in the flow.
5. Route `agentic-software-development-winter-bootcamp` to the Software Development List.
6. In the non-Software path, route `foundry-agentic-development-winter-bootcamp` to the Foundry Agentic Development List.
7. Route missing or unrecognized `eventId` values to the unchanged Data branch for backward compatibility.
8. In each event branch, use **Get items** with the filter query `RegistrationId eq '<registrationId>'` and top count `1`.
9. If a row exists, update it. Otherwise, create it. This makes repeat submissions an upsert instead of creating duplicates.
10. Return HTTP `202` for an accepted registration and HTTP `401` for a failed shared-secret check.
11. Apply a flow run-history retention policy appropriate for registration data and restrict flow ownership to the operations team.

Do not log the request body or send registration details to chat channels. Keep the HTTP trigger URL and optional shared secret only in Azure Static Web Apps application settings.

## Shared event routing

The deployed valid-secret branch first evaluates `Route_registration`. Its non-Software path evaluates the nested `Route_foundry` condition before falling back to the legacy Data actions:

| Event | `eventId` behavior | SharePoint target |
| --- | --- | --- |
| Agentic Data Winter Bootcamp | Missing or unrecognized `eventId` uses the legacy fallback | `Agentic Data Bootcamp Registrations` |
| Agentic Software Development Winter Bootcamp | `agentic-software-development-winter-bootcamp` | `Agentic Software Development Bootcamp Registrations` |
| Foundry Agentic Development Winter Bootcamp | `foundry-agentic-development-winter-bootcamp` | `Foundry Agentic Development Bootcamp Registrations` |

The Data API and its existing registration ID calculation remain unchanged so existing participants continue to update their original rows rather than receiving duplicate registrations. New event APIs must include a constant `eventId` and calculate registration IDs within that event namespace.

## Azure Static Web Apps

Deploy the repository with the settings in the root `README.md`. Add these application settings:

| Name | Required | Value |
| --- | --- | --- |
| `REGISTRATION_FLOW_URL` | Yes | Shared Power Automate HTTP trigger URL |
| `REGISTRATION_FLOW_SHARED_SECRET` | Yes | Shared secret validated before event routing |

GitHub authentication is enabled by the platform route `/.auth/login/github`. The client reads only the provider, username and application-scoped user ID from `/.auth/me`. The API independently requires the authenticated `x-ms-client-principal` header and never accepts a username from the browser request body.

The website and registration experience share the same Azure Static Web Apps origin. Registration links scroll to the embedded form, and GitHub sign-in returns to `/?register=1`.

## Verification

1. Open the Azure-hosted website in a private browser session.
2. Confirm the registration API redirects or rejects an unauthenticated request.
3. Sign in with GitHub and verify the displayed handle matches the signed-in account.
4. Submit a test registration and confirm one List row is created.
5. Submit again with different session choices and confirm the same row is updated.
6. Confirm neither the browser response nor Azure Function logs contain the company email or full submitted payload.

Live verification completed:

- An invalid shared secret returned HTTP `401` and created no List item.
- A GitHub-authenticated submission returned the registration success state and created one List item.
- A repeat submission kept the List at one item and advanced `UpdatedAt`, confirming the update branch executed instead of creating a duplicate.
- A Software Development submission executed only the Software branch and skipped the Data actions.
- Repeating that Software Development submission executed `Update_software_registration`, skipped `Create_software_registration`, kept its dedicated List at one row, and advanced `UpdatedAt`.
- A Foundry submission executed `Create_foundry_registration` and skipped every Software and Data action.
- Repeating that Foundry submission executed `Update_foundry_registration`, skipped `Create_foundry_registration`, kept its dedicated List at one row, and advanced `UpdatedAt`.
