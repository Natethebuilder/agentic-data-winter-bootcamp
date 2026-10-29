import siteState from '../api/site-state.json'

// The public site's states live in api/site-state.json, which the registration API reads too.
//
// registration
//   1  Registration open: the form submits to /api/register.
//   2  Registration paused: every register entry point says registration will open soon and the
//      API refuses submissions. The form, API and flow stay in the codebase, so switching back to 1
//      restores the working registration.
//
// prerequisites
//   "ready"  The readiness checklist and guided setup for Agentic Data Engineering Foundations.
//   "soon"   Prerequisites will be shared soon.
//
// Unknown values fall back to 1 and "ready".
export const REGISTRATION_STATE = siteState.registration === 2 ? 2 : 1
export const REGISTRATION_OPEN = REGISTRATION_STATE === 1
export const PREREQUISITES_STATE = siteState.prerequisites === 'soon' ? 'soon' : 'ready'
