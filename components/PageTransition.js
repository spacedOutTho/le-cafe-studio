import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

export default function PageTransition() {
  const router = useRouter()
  const [state, setState] = useState('idle') // idle | entering | leaving
  const timerRef = useRef(null)

  useEffect(() => {
    const handleStart = () => {
      clearTimeout(timerRef.current)
      setState('leaving')
    }

    const handleDone = () => {
      setState('entering')
      timerRef.current = setTimeout(() => {
        setState('idle')
      }, 600)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleDone)
    router.events.on('routeChangeError', handleDone)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleDone)
      router.events.off('routeChangeError', handleDone)
      clearTimeout(timerRef.current)
    }
  }, [router])

  if (state === 'idle') return null

  return (
    <div className={`page-transition page-transition--${state}`} aria-hidden="true" />
  )
}