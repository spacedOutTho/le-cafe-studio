import Head from 'next/head'
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
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Le Café Studio" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}