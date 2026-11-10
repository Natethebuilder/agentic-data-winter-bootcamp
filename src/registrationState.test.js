import assert from 'node:assert/strict'
import test from 'node:test'
import {
  isValidRegistrationFormUrl,
  registrationFormConfigError,
  registrationFormEmbedUrl,
  registrationFormHref,
  registrationFormUrlProblem,
  resolveRegistrationState,
} from './registrationState.js'

const FORM_URL = 'https://forms.office.com/Pages/ResponsePage.aspx?id=AbC123-_xyz'

test('accepts Microsoft Forms response links', () => {
  const urls = [
    FORM_URL,
    'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=AbC123-_xyz',
    'https://forms.microsoft.com/Pages/ResponsePage.aspx?id=AbC123-_xyz',
    'https://forms.office.com/Pages/ResponsePage.aspx?id=sample',
    'https://forms.office.com/Pages/ResponsePage.aspx?id=AbC123&origin=lprLink',
    'https://forms.office.com/Pages/ResponsePage.aspx?id=AbC123&embed=true',
    'https://FORMS.OFFICE.COM/Pages/ResponsePage.aspx?id=AbC123',
    'https://forms.office.com:443/Pages/ResponsePage.aspx?id=AbC123',
  ]
  for (const url of urls) {
    assert.equal(registrationFormUrlProblem(url), null, url)
    assert.equal(isValidRegistrationFormUrl(url), true, url)
  }
})

test('rejects anything that is not a Microsoft Forms response link', () => {
  const cases = [
    ['', 'is empty'],
    ['   ', 'is empty'],
    [null, 'is empty'],
    [undefined, 'is empty'],
    [4, 'is empty'],
    [{ href: FORM_URL }, 'is empty'],
    ['forms.office.com/Pages/ResponsePage.aspx?id=AbC123', 'is not a valid URL'],
    ['not a url', 'is not a valid URL'],
    ['http://forms.office.com/Pages/ResponsePage.aspx?id=AbC123', 'must start with https://'],
    ['javascript:alert(1)//forms.office.com/Pages/ResponsePage.aspx?id=AbC123', 'must start with https://'],
    ['https://forms.office.com.example.com/Pages/ResponsePage.aspx?id=AbC123', 'must be on forms.office.com, forms.cloud.microsoft or forms.microsoft.com'],
    ['https://evilforms.office.com/Pages/ResponsePage.aspx?id=AbC123', 'must be on forms.office.com, forms.cloud.microsoft or forms.microsoft.com'],
    ['https://eu.forms.office.com/Pages/ResponsePage.aspx?id=AbC123', 'must be on forms.office.com, forms.cloud.microsoft or forms.microsoft.com'],
    ['https://example.com/Pages/ResponsePage.aspx?id=AbC123', 'must be on forms.office.com, forms.cloud.microsoft or forms.microsoft.com'],
    ['https://forms.office.com:8443/Pages/ResponsePage.aspx?id=AbC123', 'must be on forms.office.com, forms.cloud.microsoft or forms.microsoft.com'],
    ['https://user:secret@forms.office.com/Pages/ResponsePage.aspx?id=AbC123', 'must not include a user name or password'],
    ['https://forms.office.com/r/AbC123', 'must use the path /Pages/ResponsePage.aspx'],
    ['https://forms.office.com/Pages/DesignPageV2.aspx?id=AbC123', 'must use the path /Pages/ResponsePage.aspx'],
    ['https://forms.office.com/pages/responsepage.aspx?id=AbC123', 'must use the path /Pages/ResponsePage.aspx'],
    ['https://forms.office.com/Pages/ResponsePage.aspx', 'must include a non-empty id query parameter'],
    ['https://forms.office.com/Pages/ResponsePage.aspx?id=', 'must include a non-empty id query parameter'],
    ['https://forms.office.com/Pages/ResponsePage.aspx?id=%20%20', 'must include a non-empty id query parameter'],
    ['https://forms.office.com/Pages/ResponsePage.aspx?ID=AbC123', 'must include a non-empty id query parameter'],
  ]
  for (const [url, problem] of cases) {
    assert.equal(registrationFormUrlProblem(url), problem, String(url))
    assert.equal(isValidRegistrationFormUrl(url), false, String(url))
    assert.equal(registrationFormHref(url), '', String(url))
    assert.equal(registrationFormEmbedUrl(url), '', String(url))
  }
})

test('adds embed=true for the iframe and keeps the plain link for the new tab', () => {
  assert.equal(registrationFormHref(FORM_URL), FORM_URL)
  assert.equal(registrationFormEmbedUrl(FORM_URL), `${FORM_URL}&embed=true`)
  assert.equal(
    registrationFormEmbedUrl('https://forms.office.com/Pages/ResponsePage.aspx?id=AbC123&embed=false'),
    'https://forms.office.com/Pages/ResponsePage.aspx?id=AbC123&embed=true',
  )
  assert.equal(
    registrationFormEmbedUrl('https://forms.office.com/Pages/ResponsePage.aspx?id=AbC123&embed=true'),
    'https://forms.office.com/Pages/ResponsePage.aspx?id=AbC123&embed=true',
  )
  assert.equal(
    registrationFormHref('https://forms.office.com/Pages/ResponsePage.aspx?id=AbC123&embed=true'),
    'https://forms.office.com/Pages/ResponsePage.aspx?id=AbC123',
  )
})

test('opens state 4 only with a usable form link and treats anything unknown as closed', () => {
  assert.equal(resolveRegistrationState(1, ''), 1)
  assert.equal(resolveRegistrationState(2, ''), 2)
  assert.equal(resolveRegistrationState(3, FORM_URL), 3)
  assert.equal(resolveRegistrationState(4, FORM_URL), 4)
  for (const url of ['', undefined, 'https://example.com/Pages/ResponsePage.aspx?id=AbC123', 'https://forms.office.com/r/AbC123']) {
    assert.equal(resolveRegistrationState(4, url), 3, String(url))
  }
  for (const state of [0, 5, '1', '4', null, undefined]) {
    assert.equal(resolveRegistrationState(state, FORM_URL), 3, String(state))
  }
})

test('fails the build only when state 4 has no usable form link', () => {
  assert.equal(registrationFormConfigError({ registration: 4, registrationFormUrl: FORM_URL }), null)
  assert.equal(registrationFormConfigError({ registration: 1, registrationFormUrl: '' }), null)
  assert.equal(registrationFormConfigError({ registration: 3 }), null)
  assert.equal(
    registrationFormConfigError({ registration: 4, registrationFormUrl: '' }),
    'api/site-state.json sets "registration" to 4 (register through the Microsoft Form), but "registrationFormUrl" is empty. Use the form\'s share link, such as https://forms.office.com/Pages/ResponsePage.aspx?id=<form id>, or choose another registration state.',
  )
  assert.match(
    registrationFormConfigError({ registration: 4, registrationFormUrl: 'https://forms.office.com/r/AbC123' }),
    /"registrationFormUrl" must use the path \/Pages\/ResponsePage\.aspx\./,
  )
  assert.match(registrationFormConfigError({ registration: 4 }), /"registrationFormUrl" is empty\./)
})
