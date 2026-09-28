import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { deckPlugin, tailwindPlugin } from '@deckio/deck-engine/vite'

// Served from GitHub Pages project subpath:
// https://natethebuilder.github.io/agentic-data-winter-bootcamp/
export default defineConfig({
  base: '/agentic-data-winter-bootcamp/',
  plugins: [
    react({
      include: [/\.[jt]sx?$/, /node_modules\/@deckio\/deck-engine\/.+\.jsx$/],
    }),
    deckPlugin({ inlineEditing: false }),
    tailwindPlugin(),
  ],
  server: {
    fs: {
      allow: ['..', '../..'],
    },
  },
})
