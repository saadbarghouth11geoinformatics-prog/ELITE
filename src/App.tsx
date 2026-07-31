import { Suspense, lazy, useLayoutEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import Seo from './components/Seo'
import './App.css'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Menu = lazy(() => import('./pages/Menu'))
const MenuShowcase = lazy(() => import('./pages/MenuShowcase'))
const MenuText = lazy(() => import('./pages/MenuText'))
const Kitchen = lazy(() => import('./pages/Kitchen'))
const Booking = lazy(() => import('./pages/Booking'))
const Contact = lazy(() => import('./pages/Contact'))

const IMAGE_FALLBACK =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 640 480%22%3E%3Crect width=%22640%22 height=%22480%22 fill=%22%23131313%22/%3E%3Cg fill=%22none%22 stroke=%22%23d4af37%22 stroke-width=%2214%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 opacity=%22.75%22%3E%3Crect x=%22170%22 y=%22115%22 width=%22300%22 height=%22250%22 rx=%2224%22/%3E%3Ccircle cx=%22260%22 cy=%22200%22 r=%2232%22/%3E%3Cpath d=%22m205 325 92-90 55 55 38-38 45 73%22/%3E%3C/g%3E%3C/svg%3E'

function ImageReliabilityManager() {
  useLayoutEffect(() => {
    const retryTimers = new Set<number>()

    const handleLoad = (event: Event) => {
      const image = event.target
      if (!(image instanceof HTMLImageElement)) return
      image.dataset.imageState = image.dataset.fallback === 'true' ? 'fallback' : 'loaded'
    }

    const handleError = (event: Event) => {
      const image = event.target
      if (!(image instanceof HTMLImageElement) || image.dataset.fallback === 'true') return

      const originalSource = image.dataset.originalSource || image.currentSrc || image.src
      if (!originalSource || originalSource.startsWith('data:')) return

      image.dataset.originalSource = originalSource
      const retryCount = Number(image.dataset.retryCount || 0)

      if (retryCount < 2) {
        const nextRetry = retryCount + 1
        image.dataset.retryCount = String(nextRetry)
        image.dataset.imageState = 'retrying'

        const timerId = window.setTimeout(() => {
          retryTimers.delete(timerId)
          const retryUrl = new URL(originalSource, window.location.href)
          retryUrl.searchParams.set('image-retry', String(nextRetry))
          image.src = retryUrl.toString()
        }, nextRetry === 1 ? 350 : 1000)
        retryTimers.add(timerId)
        return
      }

      image.dataset.fallback = 'true'
      image.dataset.imageState = 'fallback'
      image.src = IMAGE_FALLBACK
    }

    document.addEventListener('load', handleLoad, true)
    document.addEventListener('error', handleError, true)

    return () => {
      document.removeEventListener('load', handleLoad, true)
      document.removeEventListener('error', handleError, true)
      retryTimers.forEach((timerId) => window.clearTimeout(timerId))
    }
  }, [])

  return null
}

// Cinematic page transition wrapper
function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}


function RouteFallback() {
  return (
    <div className="min-h-[55vh] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-gold/40 border-t-gold rounded-full animate-spin" />
    </div>
  )
}

function App() {
  const location = useLocation()

  return (
    <>
      <div className="min-h-screen bg-dark overflow-x-hidden pb-24 xl:pb-0">
        <ImageReliabilityManager />
        <Seo />
        <ScrollProgress />
        <Navigation />
        <AnimatePresence mode="wait">
          <Suspense fallback={<RouteFallback />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
              <Route path="/menu" element={<PageTransition><Menu /></PageTransition>} />
              <Route path="/menu-pages" element={<PageTransition><MenuShowcase /></PageTransition>} />
              <Route path="/menu-text" element={<PageTransition><MenuText /></PageTransition>} />
              <Route path="/kitchen" element={<PageTransition><Kitchen /></PageTransition>} />
              <Route path="/booking" element={<PageTransition><Booking /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            </Routes>
          </Suspense>
        </AnimatePresence>
        <Footer />
      </div>
    </>
  )
}

export default App
