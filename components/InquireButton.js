import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function InquireButton() {
  const [visible, setVisible] = useState(false)
  const router = useRouter()

  // Sakrij na contact i admin stranicama
  const hidden = router.pathname === '/contact' || router.pathname === '/admin'

  useEffect(() => {
    if (hidden) return
    const onScroll = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [hidden])

  if (hidden) return null

  return (
    <Link
      href="/contact"
      className={`inquire-btn ${visible ? 'inquire-btn--visible' : ''}`}
      aria-label="Inquire about your wedding"
    >
      <span className="inquire-btn-text">Inquire</span>
      <span className="inquire-btn-arrow">→</span>
    </Link>
  )
}