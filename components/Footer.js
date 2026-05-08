import { useRouter } from 'next/router'

export default function Footer() {
  const router = useRouter()
  
  if (router.pathname === '/admin') return null

  return (
    <footer>
      <div className="footer-social">
        <a href="https://www.instagram.com/le_cafe_weddings/" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://www.facebook.com/profile.php?id=61572308595128" target="_blank" rel="noreferrer">Facebook</a>
      </div>
      <p className="footer-copy">© Davorin Vranić 2018 – 2026</p>
    </footer>
  )
}