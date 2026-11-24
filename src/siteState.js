import siteState from '../site-state.json'
import { registrationFormEmbedUrl, registrationFormHref, resolveRegistrationState } from './registrationState.js'

// The public site's states live in site-state.json.
//
// registration
//   2  Registration will open soon: every register entry point says registration will open soon.
//   3  Registration closed: every register entry point says registration is closed and the form
//      is not shown.
//   4  Registration open through this bootcamp's Microsoft Form (registrationFormUrl): every
//      register entry point leads to the form. The build fails unless registrationFormUrl is a
//      Microsoft Forms response link (see src/registrationState.js); here an unusable link is
//      treated as 3.
//   Any other value, including 1 (the retired on-site form), is treated as 3 (closed), so a
//   missing or mistyped value never opens registration.
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
export const REGISTRATION_OPEN = REGISTRATION_STATE === 4
export const REGISTRATION_FORM_URL = REGISTRATION_OPEN ? registrationFormHref(siteState.registrationFormUrl) : ''
export const REGISTRATION_FORM_EMBED_URL = REGISTRATION_OPEN ? registrationFormEmbedUrl(siteState.registrationFormUrl) : ''
export const PREREQUISITES_STATE = siteState.prerequisites === 'soon' ? 'soon' : 'ready'
