import siteState from '../api/site-state.json'
import { registrationFormEmbedUrl, registrationFormHref, resolveRegistrationState } from './registrationState.js'

// The public site's states live in api/site-state.json, which the registration API reads too.
//
// registration
//   1  Registration open: the on-site form submits to /api/register.
//   2  Registration will open soon: every register entry point says registration will open soon
//      and the API refuses submissions. The form, API and flow stay in the codebase, so switching
//      back to 1 restores the working registration.
//   3  Registration closed: every register entry point says registration is closed, the form is
//      not shown and the API refuses submissions.
//   4  Registration open through this bootcamp's Microsoft Form (registrationFormUrl): every
//      register entry point leads to the form instead of the on-site form, and the API refuses
//      submissions. The build fails unless registrationFormUrl is a Microsoft Forms response link
//      (see src/registrationState.js); here an unusable link is treated as 3.
//   Any other value is treated as 3 (closed) here and refused by the API, so a missing or
//   mistyped value never opens registration.
//
// registrationFormUrl
//   The Microsoft Form's share link, https://forms.office.com/Pages/ResponsePage.aspx?id=<form id>.
//   Only used in state 4.
//
// prerequisites
//   "ready"  The readiness checklist and guided setup for Agentic Data Engineering Foundations.
//   "soon"   Prerequisites will be shared soon.
//   Any other value falls back to "ready".
export const REGISTRATION_STATE = resolveRegistrationState(siteState.registration, siteState.registrationFormUrl)
// States 1 and 4 share the "registration is open" copy; REGISTRATION_VIA_MICROSOFT_FORM picks the form.
export const REGISTRATION_OPEN = REGISTRATION_STATE === 1 || REGISTRATION_STATE === 4
export const REGISTRATION_VIA_MICROSOFT_FORM = REGISTRATION_STATE === 4
export const REGISTRATION_FORM_URL = REGISTRATION_VIA_MICROSOFT_FORM ? registrationFormHref(siteState.registrationFormUrl) : ''
export const REGISTRATION_FORM_EMBED_URL = REGISTRATION_VIA_MICROSOFT_FORM ? registrationFormEmbedUrl(siteState.registrationFormUrl) : ''
export const PREREQUISITES_STATE = siteState.prerequisites === 'soon' ? 'soon' : 'ready'
