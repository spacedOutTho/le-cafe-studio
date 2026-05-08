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

  return (
    <>
      <Link href="/weddings" className="detail-back">← Back to Weddings</Link>

      <div className="detail-header">
        <div className="detail-couple">{wedding.couple_name}</div>
        <div className="detail-year">{wedding.year}</div>
      </div>

      {wedding.testimonial && (
        <div className="detail-testimonial">
          <p>{wedding.testimonial}</p>
          <cite>— {wedding.couple_name}</cite>
        </div>
      )}

      <div className="detail-gallery">
        {images.map((img, i) => (
          <div
            key={img.id}
            className="detail-gallery-item"
            onClick={() => { setLbIndex(i); setLbOpen(true) }}
          >
            <img
              src={img.url}
              alt=""
              loading="lazy"
              onLoad={e => e.target.classList.add('loaded')}
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