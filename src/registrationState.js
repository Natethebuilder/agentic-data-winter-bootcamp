// Rules for api/site-state.json "registration" and "registrationFormUrl", shared by the site
// (src/siteState.js), the build check (vite.config.js) and the tests. Plain ESM without imports,
// so Node can load it directly.

export const REGISTRATION_FORM_HOSTS = ['forms.office.com', 'forms.cloud.microsoft', 'forms.microsoft.com']
const REGISTRATION_FORM_PATH = '/Pages/ResponsePage.aspx'

// Returns null for a Microsoft Forms response link that state 4 can use, otherwise what is wrong
// with the value, phrased to follow "registrationFormUrl".
export function registrationFormUrlProblem(value) {
  if (typeof value !== 'string' || !value.trim()) return 'is empty'
  let url
  try {
    url = new URL(value)
  } catch {
    return 'is not a valid URL'
  }
  if (url.protocol !== 'https:') return 'must start with https://'
  // host includes any non-default port, so a link with a port is rejected too.
  if (!REGISTRATION_FORM_HOSTS.includes(url.host)) return 'must be on forms.office.com, forms.cloud.microsoft or forms.microsoft.com'
  if (url.username || url.password) return 'must not include a user name or password'
  if (url.pathname !== REGISTRATION_FORM_PATH) return `must use the path ${REGISTRATION_FORM_PATH}`
  if (!url.searchParams.get('id')?.trim()) return 'must include a non-empty id query parameter'
  return null
}

export function isValidRegistrationFormUrl(value) {
  return registrationFormUrlProblem(value) === null
}

// The link visitors open in a new tab, or '' when the value is not a usable form link. A pasted
// embed link still opens the full form page.
export function registrationFormHref(value) {
  if (!isValidRegistrationFormUrl(value)) return ''
  const url = new URL(value)
  url.searchParams.delete('embed')
  return url.href
}

// The same link with embed=true, which Microsoft Forms needs to render inside an iframe.
export function registrationFormEmbedUrl(value) {
  if (!isValidRegistrationFormUrl(value)) return ''
  const url = new URL(value)
  url.searchParams.set('embed', 'true')
  return url.href
}

// 1 open on this site, 2 opening soon, 3 closed, 4 open through the Microsoft Form. State 4 needs
// a usable form link; without one, and for any other value, registration stays closed.
export function resolveRegistrationState(registration, registrationFormUrl) {
  if (registration === 1 || registration === 2 || registration === 3) return registration
  if (registration === 4 && isValidRegistrationFormUrl(registrationFormUrl)) return 4
  return 3
}

// The message `vite build` fails with when state 4 has no usable form link, or null when the
// settings can deploy.
export function registrationFormConfigError(siteState) {
  if (siteState?.registration !== 4) return null
  const problem = registrationFormUrlProblem(siteState.registrationFormUrl)
  if (!problem) return null
  return `api/site-state.json sets "registration" to 4 (register through the Microsoft Form), but "registrationFormUrl" ${problem}. Use the form's share link, such as https://forms.office.com/Pages/ResponsePage.aspx?id=<form id>, or choose another registration state.`
}
