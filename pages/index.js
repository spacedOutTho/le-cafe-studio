import { useState, useEffect } from 'react'
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
      <div className="masonry-grid">
        {images.map((img, i) => (
          <div key={img.id} className="masonry-item" onClick={() => openLightbox(i)}>
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