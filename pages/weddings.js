import Head from 'next/head'
import Link from 'next/link'
import { supabase } from '../lib/supabase'

export async function getStaticProps() {
  const { data: weddings } = await supabase
    .from('weddings')
    .select('*')
    .order('sort_order')

  return {
    props: { weddings: weddings || [] },
    revalidate: 60
  }
}

export default function Weddings({ weddings }) {
  return (
    <>
      <Head>
        <title>Weddings — Le Café Studio</title>
        <meta name="description" content="Wedding stories captured by Davorin Vranić — Le Café Studio. Browse galleries from weddings across Croatia and Europe." />
        <meta property="og:title" content="Weddings — Le Café Studio" />
        <meta property="og:description" content="Wedding stories captured by Davorin Vranić across Croatia and Europe." />
        <meta property="og:url" content="https://le-cafe-studio.com/weddings" />
        <link rel="canonical" href="https://le-cafe-studio.com/weddings" />
      </Head>

      <div className="weddings-header">
        <h1>Weddings</h1>
        <p>Stories worth remembering</p>
      </div>
      <div className="weddings-grid">
        {weddings.map(w => (
          <Link key={w.id} href={`/weddings/${w.slug}`} className="wedding-card">
            <img src={w.cover_image} alt={w.couple_name} loading="lazy" />
            <div className="wedding-card-info">
              <span className="wedding-card-name">{w.couple_name}</span>
              <div className="wedding-card-year">{w.year}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}