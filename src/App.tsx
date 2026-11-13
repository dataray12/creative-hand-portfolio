import { useEffect, useState } from 'react'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { ScrollTrigger, prefersReducedMotion } from './lib/motion'
import { Preloader } from './components/Preloader'
import { Cursor } from './components/Cursor'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Clients } from './components/Clients'
import { Services } from './components/Services'
import { Work } from './components/Work'
import { Digital } from './components/Digital'
import { Tech } from './components/Tech'
import { Process } from './components/Process'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  const [ready, setReady] = useState(() => prefersReducedMotion())

  useSmoothScroll()

  // Recalculate pinned/scrubbed triggers once the intro clears and fonts settle.
  useEffect(() => {
    if (!ready) return
    const refresh = () => ScrollTrigger.refresh()
    const id = window.setTimeout(refresh, 300)
    document.fonts?.ready.then(refresh).catch(() => {})
    window.addEventListener('resize', refresh)
    return () => {
      window.clearTimeout(id)
      window.removeEventListener('resize', refresh)
    }
  }, [ready])

  return (
    <div className="grain relative">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-fg focus:px-5 focus:py-2.5 focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>

      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <Nav />

      <main>
        <Hero ready={ready} />
        <About />
        <Clients />
        <Services />
        <Work />
        <Digital />
        <Tech />
        <Process />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
