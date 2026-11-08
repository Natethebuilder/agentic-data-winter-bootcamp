import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { deckPlugin, tailwindPlugin } from '@deckio/deck-engine/vite'

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

export default defineConfig({
  base: '/',
  plugins: [
    react({
      include: [/\.[jt]sx?$/, /node_modules\/@deckio\/deck-engine\/.+\.jsx$/],
    }),
    deckPlugin({ inlineEditing: false }),
    tailwindPlugin(),
    forbidGoogleFonts(),
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
