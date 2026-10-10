# Registration backend

The registration page uses Azure Static Web Apps GitHub authentication and stores submissions in Microsoft 365 through a Power Automate flow and Microsoft List. Microsoft Forms is not used because an embedded form cannot inherit the site theme and does not expose a supported API for custom response submission.

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

3. If `REGISTRATION_FLOW_SHARED_SECRET` is configured, reject the request unless the `x-registration-secret` header exactly matches the same secret stored in the flow.
4. Use **Get items** with the filter query `RegistrationId eq '<registrationId>'` and top count `1`.
5. If a row exists, update it. Otherwise, create it. This makes repeat submissions an upsert instead of creating duplicates.
6. Return an HTTP `200` or `202` response. The API treats any other status as a failed registration.
7. Apply a flow run-history retention policy appropriate for registration data and restrict flow ownership to the operations team.

Do not log the request body or send registration details to chat channels. Keep the HTTP trigger URL and optional shared secret only in Azure Static Web Apps application settings.

## Azure Static Web Apps

Deploy the repository with the settings in the root `README.md`. Add these application settings:

| Name | Required | Value |
| --- | --- | --- |
| `REGISTRATION_FLOW_URL` | Yes | Power Automate HTTP trigger URL |
| `REGISTRATION_FLOW_SHARED_SECRET` | Recommended | Random secret also validated by the flow |

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
