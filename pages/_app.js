import Nav from '../components/Nav'
import Footer from '../components/Footer'
import '../styles/globals.css'
import { Cormorant_Garamond, Raleway } from 'next/font/google'

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
  return (
    <div className={`${cormorant.variable} ${raleway.variable}`}>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}