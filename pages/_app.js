import Head from 'next/head'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import '../styles/globals.css'
import { Cormorant_Garamond, Raleway } from 'next/font/google'
import { useState, useEffect } from 'react'
import { ThemeContext } from '../lib/theme'
import Lenis from 'lenis'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant'
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--font-raleway'
})

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState('dark')
  const [preloaderHiding, setPreloaderHiding] = useState(false)
  const [preloaderGone, setPreloaderGone] = useState(false)
  const [cursor, setCursor] = useState({ x: -200, y: -200, hovering: false })
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile (no cursor on touch devices)
  useEffect(() => {
    setIsMobile(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  // Load saved theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('lcs-theme')
    if (saved) setTheme(saved)
  }, [])

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    })
    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
    return () => {
      lenis.destroy()
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Preloader: start hiding at 1800ms, remove from DOM at 2500ms
  useEffect(() => {
    const t1 = setTimeout(() => setPreloaderHiding(true), 1800)
    const t2 = setTimeout(() => setPreloaderGone(true), 2500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  // Custom cursor tracking
  useEffect(() => {
    if (isMobile) return
    const onMove = (e) => {
      const hovering = !!e.target.closest(
        'a, button, .masonry-item, .wedding-card, .detail-gallery-item, [data-hover]'
      )
      setCursor({ x: e.clientX, y: e.clientY, hovering })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [isMobile])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('lcs-theme', next)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`${cormorant.variable} ${raleway.variable} theme-${theme}`}>

        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Le Café Studio" />
          <meta name="twitter:card" content="summary_large_image" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* Preloader */}
        {!preloaderGone && (
          <div className={`preloader ${preloaderHiding ? 'preloader--hiding' : ''}`}>
            <p className="preloader-logo">LE CAFÉ STUDIO</p>
            <div className="preloader-bar">
              <div className="preloader-bar-fill" />
            </div>
            <p className="preloader-sub">Wedding Photography</p>
          </div>
        )}

        {/* Custom cursor — desktop only */}
        {!isMobile && (
          <div
            className={`custom-cursor ${cursor.hovering ? 'custom-cursor--hover' : ''}`}
            style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}
            aria-hidden="true"
          />
        )}

        <Nav />
        <Component {...pageProps} />
        <Footer />

      </div>
    </ThemeContext.Provider>
  )
}