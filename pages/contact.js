import Head from 'next/head'
import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', date: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Greška')
      setStatus('success')
      setForm({ name: '', email: '', date: '', message: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  return (
    <>
      <Head>
        <title>Contact — Le Café Studio</title>
        <meta name="description" content="Get in touch with Davorin Vranić, wedding photographer based in Croatia. Available for weddings across Croatia and Europe." />
        <meta property="og:title" content="Contact — Le Café Studio" />
        <meta property="og:description" content="Get in touch with Davorin Vranić, wedding photographer based in Croatia." />
        <meta property="og:url" content="https://le-cafe-studio.com/contact" />
      </Head>

      <div className="contact-wrap">
        <div className="contact-info fade-up">
          <h1 className="contact-info-header">Let&apos;s talk<br />about your day.</h1>
          <p className="contact-info-sub">Available for weddings across Croatia &amp; Europe</p>
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
            <label htmlFor="name">Your name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Marija & Toni"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Wedding date</label>
            <input
              id="date"
              name="date"
              type="text"
              placeholder="June 2026"
              value={form.date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Your message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell me about your wedding day…"
              rows={4}
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <button
              type="submit"
              className="btn-submit"
              disabled={status === 'loading'}
              style={{ opacity: status === 'loading' ? 0.5 : 1, cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}
            >
              {status === 'loading' ? 'Sending…' : 'Send message'}
            </button>
            {status === 'success' && (
              <span style={{ fontSize: '11px', color: 'var(--accent)', letterSpacing: '2px' }}>
                Message sent ✓
              </span>
            )}
            {status === 'error' && (
              <span style={{ fontSize: '11px', color: '#c0392b', letterSpacing: '1px' }}>
                {errorMsg}
              </span>
            )}
          </div>
        </form>
      </div>
    </>
  )
}