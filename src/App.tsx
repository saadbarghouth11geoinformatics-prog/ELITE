import { Suspense, lazy } from 'react'
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

// Cinematic page transition wrapper
function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -20, scale: 1.01, filter: 'blur(4px)' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
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
