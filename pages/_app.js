import Head from 'next/head'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import PageTransition from '../components/PageTransition'
import InquireButton from '../components/InquireButton'
import '../styles/globals.css'
import { Cormorant_Garamond, Raleway } from 'next/font/google'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
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
  const router = useRouter()
  const [preloaderHiding, setPreloaderHiding] = useState(false)
  const [preloaderGone, setPreloaderGone] = useState(false)
  const [cursor, setCursor] = useState({ x: -200, y: -200, hovering: false })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.matchMedia('(pointer: coarse)').matches)
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

  // Preloader
  useEffect(() => {
    const t1 = setTimeout(() => setPreloaderHiding(true), 1800)
    const t2 = setTimeout(() => setPreloaderGone(true), 2500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  // Custom cursor
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

  // Scroll reveal — re-run on every page change
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    // Small delay so DOM is painted after page transition
    const timer = setTimeout(() => {
      document.querySelectorAll('.sr').forEach(el => observer.observe(el))
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [router.asPath])

  return (
    <div className={`${cormorant.variable} ${raleway.variable}`}>
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

      <PageTransition />
      <InquireButton />
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}