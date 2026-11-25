import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Self-hosted Inter in the weights the deck engine uses, so no font request leaves the site.
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import '@fontsource/inter/900.css'
import './index.css'
import App from './App.jsx'

// The site keeps its state in sessionStorage only. Remove what earlier versions left in localStorage.
const LEGACY_LOCAL_STORAGE_KEYS = [
  'winter-bootcamp:prep',
  'deck-navbar-dismissed',
  'winter-bootcamp:snow',
  'winter-bootcamp:snow-v2',
  'agentic-data-winter-bootcamp:registration-token',
]
for (const key of LEGACY_LOCAL_STORAGE_KEYS) {
  try { localStorage.removeItem(key) } catch { /* storage unavailable */ }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
