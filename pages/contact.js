import { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <div className="contact-wrap">
      <div className="contact-info fade-up">
        <h1 className="contact-info-header">Let's talk<br />about your day.</h1>
        <p className="contact-info-sub">Available for weddings across Croatia & Europe</p>
        <div className="contact-item">
          <p className="contact-item-label">Email</p>
          <a className="contact-item-value" href="mailto:davorin@le-cafe-studio.com">
            davorin@le-cafe-studio.com
          </a>
        </div>
        <div className="contact-item">
          <p className="contact-item-label">Instagram</p>
          <a className="contact-item-value" href="https://www.instagram.com/le_cafe_weddings/" target="_blank" rel="noreferrer">
            @le_cafe_weddings
          </a>
        </div>
        <div className="contact-item">
          <p className="contact-item-label">Languages</p>
          <p className="contact-item-value">English · French · Croatian</p>
        </div>
      </div>

      <form className="contact-form fade-up" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your name</label>
          <input type="text" placeholder="Marija & Toni" required />
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input type="email" placeholder="your@email.com" required />
        </div>
        <div className="form-group">
          <label>Wedding date</label>
          <input type="text" placeholder="June 2026" />
        </div>
        <div className="form-group">
          <label>Your message</label>
          <textarea placeholder="Tell me about your wedding day…" rows={4} />
        </div>
        <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button type="submit" className="btn-submit">Send message</button>
          {sent && <span style={{ fontSize: '11px', color: 'var(--accent)', letterSpacing: '2px' }}>Message sent ✓</span>}
        </div>
      </form>
    </div>
  )
}