import { PRIVACY_LINKS } from '../content.js'
import s from './PrivacyLinks.module.css'

const OPT_OUT_ICON = `${import.meta.env.BASE_URL}ccpa-opt-out.svg`

// Microsoft's privacy links for the website footer and every slide. The opt-out icon is the unmodified
// one from microsoft.com's footer, with the alt text Microsoft specifies. The parent sets the layout and
// font size; all three links always share one style.
export default function PrivacyLinks({ className = '' }) {
  return (
    <ul className={`${s.links} ${className}`}>
      {PRIVACY_LINKS.map(({ text, href, optOutIcon }) => (
        <li key={text}>
          <a href={href}>
            {optOutIcon && (
              <img src={OPT_OUT_ICON} alt="California Consumer Privacy Act (CCPA) Opt-Out Icon" width="43" height="16" />
            )}
            {text}
          </a>
        </li>
      ))}
    </ul>
  )
}
