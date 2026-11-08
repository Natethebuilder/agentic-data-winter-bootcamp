import siteState from '../api/site-state.json'

// The public site's states live in api/site-state.json, which the registration API reads too.
//
// registration
//   1  Registration open: the form submits to /api/register.
//   2  Registration will open soon: every register entry point says registration will open soon
//      and the API refuses submissions. The form, API and flow stay in the codebase, so switching
//      back to 1 restores the working registration.
//   3  Registration closed: every register entry point says registration is closed, the form is
//      not shown and the API refuses submissions.
//   Any other value is treated as 3 (closed) here and refused by the API, so a missing or
//   mistyped value never opens registration.
//
// prerequisites
//   "ready"  The readiness checklist and guided setup for Agentic Data Engineering Foundations.
//   "soon"   Prerequisites will be shared soon.
//   Any other value falls back to "ready".
export const REGISTRATION_STATE = [1, 2, 3].includes(siteState.registration) ? siteState.registration : 3
export const REGISTRATION_OPEN = REGISTRATION_STATE === 1
export const PREREQUISITES_STATE = siteState.prerequisites === 'soon' ? 'soon' : 'ready'
