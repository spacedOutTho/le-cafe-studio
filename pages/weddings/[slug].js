import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import Lightbox from '../../components/Lightbox'

export async function getStaticPaths() {
  const { data: weddings } = await supabase
    .from('weddings')
    .select('slug')

  return {
    paths: (weddings || []).map(w => ({ params: { slug: w.slug } })),
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {
  const { data: wedding } = await supabase
    .from('weddings')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!wedding) return { notFound: true }

  const { data: images } = await supabase
    .from('wedding_images')
    .select('*')
    .eq('wedding_id', wedding.id)
    .order('sort_order')

  return {
    props: { wedding, images: images || [] },
    revalidate: 60
  }
}

export default function WeddingDetail({ wedding, images }) {
  const [lbOpen, setLbOpen] = useState(false)
  const [lbIndex, setLbIndex] = useState(0)

  const pageTitle = `${wedding.couple_name} ${wedding.year ? `· ${wedding.year}` : ''} — Le Café Studio`
  const pageDesc = wedding.testimonial
    ? `${wedding.testimonial.slice(0, 120)}…`
    : `Wedding of ${wedding.couple_name} — photographed by Davorin Vranić, Le Café Studio.`
  const ogImage = images[0]?.url || wedding.cover_image

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={`https://le-cafe-studio.com/weddings/${wedding.slug}`} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        <link rel="canonical" href={`https://le-cafe-studio.com/weddings/${wedding.slug}`} />
      </Head>

      <Link href="/weddings" className="detail-back">← Back to Weddings</Link>

      <div className="detail-header sr">
        <div className="detail-couple">{wedding.couple_name}</div>
        <div className="detail-year">{wedding.year}</div>
      </div>

      {wedding.testimonial && (
        <div className="detail-testimonial sr" style={{ '--delay': '0.15s' }}>
          <p>{wedding.testimonial}</p>
          <cite>— {wedding.couple_name}</cite>
        </div>
      )}

      <div className="detail-gallery">
        {images.map((img, i) => (
          <div
            key={img.id}
            className="detail-gallery-item sr"
            style={{ '--delay': `${(i % 3) * 0.1}s` }}
            onClick={() => { setLbIndex(i); setLbOpen(true) }}
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