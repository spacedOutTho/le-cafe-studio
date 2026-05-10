import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Nav() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  if (router.pathname === '/admin') return null

  return (
    <>
      <nav>
        <div className="nav-left">
          <Link href="/" className={router.pathname === '/' ? 'active' : ''}>Portfolio</Link>
          <Link href="/weddings" className={router.pathname === '/weddings' ? 'active' : ''}>Weddings</Link>
        </div>

        <Link href="/" className="nav-logo">LE CAFÉ STUDIO</Link>

        <div className="nav-right">
          <Link href="/about" className={router.pathname === '/about' ? 'active' : ''}>About me</Link>
          <Link href="/contact" className={router.pathname === '/contact' ? 'active' : ''}>Contact</Link>
        </div>

        <div className="burger" onClick={() => setMenuOpen(true)}>
          <span></span><span></span><span></span>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          <button className="mobile-menu-close" onClick={() => setMenuOpen(false)}>✕</button>
          <div className="mobile-menu-links">
            <Link href="/" onClick={() => setMenuOpen(false)}>Portfolio</Link>
            <Link href="/weddings" onClick={() => setMenuOpen(false)}>Weddings</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>About me</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </>
  )
}