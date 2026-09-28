const BASE = import.meta.env.BASE_URL

export function SantaHat({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 120 90" aria-hidden="true">
      <defs>
        <linearGradient id="hat-red" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#ff5a6a" />
          <stop offset="1" stopColor="#c81e36" />
        </linearGradient>
      </defs>
      <path d="M14 70 C 26 30, 60 6, 96 22 C 104 26, 108 40, 104 52 L 92 48 C 90 36, 80 30, 70 32 C 52 36, 40 52, 34 70 Z" fill="url(#hat-red)" />
      <rect x="6" y="62" width="92" height="20" rx="10" fill="#f4f8ff" />
      <circle cx="104" cy="56" r="11" fill="#f4f8ff" />
    </svg>
  )
}

export function Mascot({ kind = 'copilot', className = '', hat = true }) {
  const src = kind === 'duck' ? `${BASE}mascot-duck.png` : `${BASE}copilot-mascot.png`
  return (
    <span className={`mascot mascot-${kind} ${className}`}>
      <img src={src} alt="" className="mascot-img" />
      {hat && <SantaHat className="mascot-hat" />}
    </span>
  )
}

export function ChristmasLights({ count = 28, className = '' }) {
  return (
    <div className={`xmas-lights ${className}`} aria-hidden="true">
      <svg className="xmas-wire" preserveAspectRatio="none" viewBox="0 0 100 10">
        <path d="M0 2 Q 2.5 8 5 2 T 10 2 T 15 2 T 20 2 T 25 2 T 30 2 T 35 2 T 40 2 T 45 2 T 50 2 T 55 2 T 60 2 T 65 2 T 70 2 T 75 2 T 80 2 T 85 2 T 90 2 T 95 2 T 100 2" />
      </svg>
      <ul>
        {Array.from({ length: count }, (_, i) => (
          <li key={i} className={`bulb bulb-${i % 4}`} />
        ))}
      </ul>
    </div>
  )
}

export function Logos({ className = '', size = 'md' }) {
  return (
    <div className={`logos logos-${size} ${className}`}>
      <img src={`${BASE}logos/microsoft-mark.svg`} alt="Microsoft" />
      <span className="logos-divider" />
      <img src={`${BASE}logos/github-mark.svg`} alt="GitHub" className="logo-github" />
      <span className="logos-divider" />
      <img src={`${BASE}logos/fabric.svg`} alt="Microsoft Fabric" />
    </div>
  )
}

export function Snowflake({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7" />
      <path d="m9 4 3 2 3-2M9 20l3-2 3 2M4.5 10.5 5 7l-3.2-1M19.5 13.5 19 17l3.2 1M4.5 13.5 5 17l-3.2 1M19.5 10.5 19 7l3.2-1" />
    </svg>
  )
}
