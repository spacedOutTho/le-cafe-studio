import { useEffect } from 'react'

export default function Lightbox({ images, index, open, onClose, onNav }) {
  useEffect(() => {
    function handleKey(e) {
      if (!open) return
      if (e.key === 'ArrowRight') onNav((index + 1) % images.length)
      if (e.key === 'ArrowLeft') onNav((index - 1 + images.length) % images.length)
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, index, images])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  if (!open) return null

  return (
    <div className="lightbox open" onClick={onClose}>
      <span className="lightbox-close" onClick={onClose}>✕</span>

      <span
        className="lightbox-nav lb-prev"
        onClick={e => { e.stopPropagation(); onNav((index - 1 + images.length) % images.length) }}
      >‹</span>

      <img
        className="lightbox-img"
        src={images[index]}
        alt=""
        onClick={e => e.stopPropagation()}
      />

      <span
        className="lightbox-nav lb-next"
        onClick={e => { e.stopPropagation(); onNav((index + 1) % images.length) }}
      >›</span>

      <div className="lightbox-counter">
        {index + 1} / {images.length}
      </div>
    </div>
  )
}