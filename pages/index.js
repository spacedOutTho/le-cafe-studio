import Head from 'next/head'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import Lightbox from '../components/Lightbox'

export async function getStaticProps() {
  const { data: images } = await supabase
    .from('portfolio_images')
    .select('*')
    .order('sort_order')

  return {
    props: { images: images || [] },
    revalidate: 60
  }
}

export default function Portfolio({ images }) {
  const [lbOpen, setLbOpen] = useState(false)
  const [lbIndex, setLbIndex] = useState(0)

  function openLightbox(i) {
    setLbIndex(i)
    setLbOpen(true)
  }

  return (
    <>
      <Head>
        <title>Le Café Studio — Wedding Photography Croatia</title>
        <meta name="description" content="Davorin Vranić is a wedding photographer based in Croatia, capturing authentic moments across Croatia and Europe. Candid, elegant, emotional." />
        <meta property="og:title" content="Le Café Studio — Wedding Photography Croatia" />
        <meta property="og:description" content="Davorin Vranić — wedding photographer based in Croatia, available across Europe." />
        <meta property="og:url" content="https://le-cafe-studio.com" />
        <meta property="og:image" content="https://le-cafe-studio.com/og-image.jpg" />
        <link rel="canonical" href="https://le-cafe-studio.com" />
      </Head>

      <div className="portfolio-hero">
        <p className="portfolio-hero-tag">Wedding Photography</p>
        <h1 className="portfolio-hero-title">Le Café Studio</h1>
        <p className="portfolio-hero-sub">Croatia &amp; Europe</p>
      </div>

      <div className="masonry-grid">
        {images.map((img, i) => (
          <div
            key={img.id}
            className="masonry-item sr"
            style={{ '--delay': `${(i % 3) * 0.1}s` }}
            onClick={() => openLightbox(i)}
          >
            <img
              src={img.url}
              alt=""
              loading="lazy"
              onLoad={e => e.target.classList.add('loaded')}
              ref={el => { if (el?.complete) el.classList.add('loaded') }}
            />
          </div>
        ))}
      </div>

      <Lightbox
        images={images.map(i => i.url)}
        index={lbIndex}
        open={lbOpen}
        onClose={() => setLbOpen(false)}
        onNav={setLbIndex}
      />
    </>
  )
}