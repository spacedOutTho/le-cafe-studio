import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Nav() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  if (router.pathname === '/admin') return null  // ← dodaj ovaj red

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
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(9,9,9,0.97)',
          zIndex: 200, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '40px'
        }}>
          <span onClick={() => setMenuOpen(false)} style={{
            position: 'absolute', top: '24px', right: '40px',
            fontSize: '28px', cursor: 'pointer', opacity: 0.6, color: 'white'
          }}>✕</span>
          <Link href="/" onClick={() => setMenuOpen(false)} style={{fontSize:'14px', letterSpacing:'5px', textTransform:'uppercase', color:'white', textDecoration:'none'}}>Portfolio</Link>
          <Link href="/weddings" onClick={() => setMenuOpen(false)} style={{fontSize:'14px', letterSpacing:'5px', textTransform:'uppercase', color:'white', textDecoration:'none'}}>Weddings</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} style={{fontSize:'14px', letterSpacing:'5px', textTransform:'uppercase', color:'white', textDecoration:'none'}}>About me</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} style={{fontSize:'14px', letterSpacing:'5px', textTransform:'uppercase', color:'white', textDecoration:'none'}}>Contact</Link>
        </div>
      )}
    </>
  )
}