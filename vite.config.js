import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { deckPlugin, tailwindPlugin } from '@deckio/deck-engine/vite'
import { REGISTRATION_FORM_HOSTS, registrationFormConfigError } from './src/registrationState.js'

// Inter is self-hosted from @fontsource/inter (imported in src/main.jsx), so visitors' browsers
// must never contact Google Fonts.
const GOOGLE_FONTS = /fonts\.(googleapis|gstatic)\.com/i

// @deckio/deck-engine/styles/global.css starts with an @import of Google Fonts. Drop only
// that remote @import; the rest of the deck-engine styles are kept unchanged.
function dropGoogleFontImports() {
  return {
    postcssPlugin: 'drop-google-font-imports',
    OnceExit(root) {
      root.walkAtRules('import', (rule) => {
        if (GOOGLE_FONTS.test(rule.params)) rule.remove()
      })
    },
  }
}
dropGoogleFontImports.postcss = true

// Fails the build if a Google Fonts URL still reaches an emitted file, e.g. after a dependency update.
function forbidGoogleFonts() {
  return {
    name: 'forbid-google-fonts',
    apply: 'build',
    enforce: 'post',
    writeBundle(_, bundle) {
      for (const file of Object.values(bundle)) {
        const text = file.type === 'chunk' ? file.code : typeof file.source === 'string' ? file.source : ''
        if (GOOGLE_FONTS.test(text)) {
          this.error(`${file.fileName} references Google Fonts. Self-host the font instead.`)
        }
      }
    },
  }
}

// Registration state 4 sends every visitor to the bootcamp's Microsoft Form, so a build with state 4
// and an unusable registrationFormUrl fails instead of deploying a broken register button. The dev
// server only warns; the site then shows registration as closed, as it would at runtime.
function requireRegistrationFormUrl() {
  let command = 'build'
  return {
    name: 'require-registration-form-url',
    configResolved(config) {
      command = config.command
    },
    buildStart() {
      const siteState = JSON.parse(readFileSync(new URL('./site-state.json', import.meta.url), 'utf8'))
      const error = registrationFormConfigError(siteState)
      if (!error) return
      if (command === 'build') this.error(error)
      else this.warn(`${error} Until then the site shows registration as closed.`)
    },
  }
}

// GitHub Pages can't send response headers, so the built page carries its content security policy
// and referrer policy as the first tags in <head>. The policy allows the page's own inline scripts by
// hash and frames from Microsoft Forms only. A meta tag can't set frame-ancestors, X-Frame-Options,
// X-Content-Type-Options or Permissions-Policy. The dev server has no policy, so hot reload works.
function securityPolicy() {
  return {
    name: 'security-policy',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const page = bundle['index.html']
      const html = String(page.source)
      const inlineScripts = [...html.matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g)]
        .map(([, code]) => `'sha256-${createHash('sha256').update(code).digest('base64')}'`)
      const policy = [
        "default-src 'self'",
        "base-uri 'self'",
        "connect-src 'self'",
        "font-src 'self' data:",
        "form-action 'self'",
        `frame-src ${REGISTRATION_FORM_HOSTS.map((host) => `https://${host}`).join(' ')}`,
        "img-src 'self' data:",
        "object-src 'none'",
        ["script-src 'self'", ...inlineScripts].join(' '),
        "style-src 'self' 'unsafe-inline'",
      ].join('; ')
      page.source = html.replace(
        /<head>/i,
        `<head>\n    <meta http-equiv="Content-Security-Policy" content="${policy}" />\n`
          + '    <meta name="referrer" content="strict-origin-when-cross-origin" />',
      )
    },
  }
}

export default defineConfig({
  // GitHub Pages serves the site from /<repo>/; the deploy workflow sets BASE_PATH.
  base: process.env.BASE_PATH || '/',
  plugins: [
    requireRegistrationFormUrl(),
    react({
      include: [/\.[jt]sx?$/, /node_modules\/@deckio\/deck-engine\/.+\.jsx$/],
    }),
    deckPlugin({ inlineEditing: false }),
    tailwindPlugin(),
    forbidGoogleFonts(),
    securityPolicy(),
  ],
  css: {
    postcss: {
      plugins: [dropGoogleFontImports()],
    },
  },
  server: {
    fs: {
      allow: ['..', '../..'],
    },
  },
})
