import { useState } from 'react'
import { BrowserRouter, Link, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'

const navigation = [
  { label: 'Inicio', icon: 'home', path: '/inicio' },
  { label: 'Explorar', icon: 'search', path: '/explorar' },
  { label: 'Reseñas', icon: 'review', available: false },
  { label: 'Reclamar', icon: 'document', available: false },
]

const uploadOptions = [
  { label: 'Tomar foto', icon: 'camera', tone: 'aqua', available: false },
  { label: 'Subir captura', icon: 'image', tone: 'sand', available: false },
  { label: 'Pegar enlace', icon: 'link', tone: 'aqua', available: true },
]

const tools = [
  {
    title: 'Alertas de publicidad',
    description: 'Infórmate sobre prácticas engañosas.',
    icon: 'bell',
    tone: 'aqua',
  },
  {
    title: 'Opiniones verificadas',
    description: 'Conoce experiencias reales de otros consumidores.',
    icon: 'people',
    tone: 'sand',
  },
  {
    title: 'Comparar precios',
    description: 'Revisa y encuentra mejores opciones.',
    icon: 'tag',
    tone: 'mint',
  },
  {
    title: 'Guía para reclamar',
    description: 'Aprende tus derechos y cómo ejercerlos.',
    icon: 'document',
    tone: 'rose',
  },
]

function Icon({ name, size = 24 }) {
  const paths = {
    home: (
      <>
        <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />
      </>
    ),
    search: (
      <>
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 5 5" />
      </>
    ),
    review: (
      <>
        <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5 8 8 0 0 1-3.4-.8L4 20l1.5-4.1A7.5 7.5 0 1 1 20 11.5Z" />
        <path d="M9 11h.01M12.5 11h.01M16 11h.01" />
      </>
    ),
    document: (
      <>
        <path d="M6 3h9l4 4v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
        <path d="M14 3v5h5M8 12h8M8 16h8" />
      </>
    ),
    camera: (
      <>
        <path d="M4 7h3l1.5-2h7L17 7h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
        <circle cx="12" cy="13" r="4" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </>
    ),
    link: (
      <>
        <path d="M10 13a5 5 0 0 0 7.1 0l3-3A5 5 0 0 0 13 2.9l-1.7 1.7" />
        <path d="M14 11a5 5 0 0 0-7.1 0l-3 3A5 5 0 0 0 11 21.1l1.7-1.7" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
      </>
    ),
    people: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="10" cy="7" r="4" />
        <path d="M20 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
      </>
    ),
    tag: (
      <>
        <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2a2 2 0 0 1 0-2.8l7.2-7.2A2 2 0 0 1 12 2.8H20a1 1 0 0 1 1 1v8a2 2 0 0 1-.4 1.6Z" />
        <circle cx="16.5" cy="7.5" r="1.2" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

function HomeView() {
  const [linkSelected, setLinkSelected] = useState(false)
  const [advertisementLink, setAdvertisementLink] = useState('')
  const [showResult, setShowResult] = useState(false)

  return (
    <section className="view home-view" aria-labelledby="home-title">
      <header className="view-heading">
        <p className="eyebrow">Compra con confianza</p>
        <h1 id="home-title">Verifica una publicidad</h1>
        <p className="view-description">
          Pega el enlace del anuncio para revisar su riesgo.
        </p>
      </header>

      {!showResult ? (
        <>
          <div className="upload-options" aria-label="Opciones para agregar un anuncio">
            {uploadOptions.map((option) => (
              <button
                className={`upload-option${option.available ? ' selectable' : ' unavailable'}`}
                type="button"
                key={option.label}
                aria-disabled={!option.available}
                aria-expanded={option.available ? linkSelected : undefined}
                disabled={!option.available}
                onClick={() => {
                  if (option.available) setLinkSelected(true)
                }}
              >
                <span className={`option-icon ${option.tone}`}>
                  <Icon name={option.icon} size={25} />
                </span>
                <span className="option-label">{option.label}</span>
                <Icon name="chevron" size={20} />
              </button>
            ))}
          </div>

          {linkSelected && (
            <form
              className="link-form"
              onSubmit={(event) => {
                event.preventDefault()
                if (advertisementLink.trim()) setShowResult(true)
              }}
            >
              <label htmlFor="advertisement-link">Enlace del anuncio</label>
              <input
                id="advertisement-link"
                type="text"
                inputMode="url"
                autoComplete="url"
                placeholder="https://ejemplo.com/anuncio"
                value={advertisementLink}
                onChange={(event) => setAdvertisementLink(event.target.value)}
                required
              />
              <button className="primary-button" type="submit" disabled={!advertisementLink.trim()}>
                <span>Analizar anuncio</span>
                <Icon name="chevron" size={20} />
              </button>
              <p className="prototype-note">Resultado de demostración para cualquier enlace.</p>
            </form>
          )}
        </>
      ) : (
        <section className="analysis-result" aria-live="polite" aria-labelledby="result-title">
          <div className="risk-panel">
            <span className="risk-indicator" aria-hidden="true">!</span>
            <p className="risk-label" id="result-title">Riesgo alto</p>
            <p className="risk-score">78 <span>%</span></p>
            <ul className="risk-signals">
              <li><span aria-hidden="true">◷</span> Falsa urgencia</li>
              <li><span aria-hidden="true">▤</span> Condiciones ocultas</li>
              <li><span aria-hidden="true">↗</span> Promesa difícil de verificar</li>
            </ul>
          </div>
          <p className="result-link" title={advertisementLink}>{advertisementLink}</p>
          <p className="prototype-note">Este porcentaje es fijo y solo representa el mockup.</p>
          <button
            className="secondary-button"
            type="button"
            onClick={() => setShowResult(false)}
          >
            Analizar otro enlace
          </button>
        </section>
      )}
    </section>
  )
}

function ExploreView() {
  return (
    <section className="view explore-view" aria-labelledby="explore-title">
      <header className="view-heading">
        <p className="eyebrow">Información para decidir mejor</p>
        <h1 id="explore-title">Explorar herramientas</h1>
      </header>

      <div className="tool-grid">
        {tools.map((tool) => (
          <button className={`tool-card ${tool.tone}`} type="button" key={tool.title}>
            <span className="tool-icon">
              <Icon name={tool.icon} size={31} />
            </span>
            <span className="tool-title">{tool.title}</span>
            <span className="tool-description">{tool.description}</span>
            <span className="tool-arrow">
              <Icon name="chevron" size={19} />
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

function AppLayout() {
  return (
    <main className="prototype">
      <header className="app-header">
        <Link className="brand" to="/inicio" aria-label="Verifica, inicio">
          <span className="brand-mark">V</span>
          <span>Verifica</span>
        </Link>
        <nav className="bottom-navigation" aria-label="Navegación principal">
          {navigation.map((item) => {
            if (!item.path) {
              return (
                <button
                  className="nav-item"
                  type="button"
                  key={item.label}
                  aria-disabled="true"
                  disabled
                >
                  <Icon name={item.icon} size={21} />
                  <span>{item.label}</span>
                </button>
              )
            }

            return (
              <NavLink
                className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
                to={item.path}
                key={item.label}
              >
                <Icon name={item.icon} size={21} />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>
      </header>
      <div className="view-container">
        <Routes>
          <Route path="/inicio" element={<HomeView />} />
          <Route path="/explorar" element={<ExploreView />} />
          <Route path="*" element={<Navigate to="/inicio" replace />} />
        </Routes>
      </div>
      <footer className="app-footer">
        <span>Verifica</span>
        <span>Compra con confianza</span>
      </footer>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
