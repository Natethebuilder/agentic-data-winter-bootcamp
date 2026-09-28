import { InlineEditProvider, Navigation, SlideErrorBoundary, SlideProvider, useSlides } from '@deckio/deck-engine'
import '@deckio/deck-engine/styles/editable.css'
import project from '../deck.config.js'
import { Mascot } from './winter/Decor.jsx'
import { SnowToggle } from './winter/Snowfall.jsx'

function FloatingCopilot() {
  const { current, totalSlides } = useSlides()
  if (current <= 0 || current === totalSlides - 1) return null
  return <Mascot className="floating-copilot" />
}

export default function DeckView({ snow, onToggleSnow }) {
  const { id, slides, theme } = project
  return (
    <InlineEditProvider overrides={{}} project={id}>
      <SlideProvider totalSlides={slides.length} project={id} slides={slides} theme={theme}>
        <div className="deck-chrome">
          <a className="deck-home-link" href="#/">← Website</a>
          <SnowToggle enabled={snow} onToggle={onToggleSnow} />
        </div>
        <Navigation />
        <div className="deck" data-project-id={id}>
          {slides.map((SlideComponent, index) => (
            <SlideErrorBoundary key={`${id}-slide-${index}`} index={index}>
              <SlideComponent index={index} project={project} />
            </SlideErrorBoundary>
          ))}
        </div>
        <FloatingCopilot />
      </SlideProvider>
    </InlineEditProvider>
  )
}
