import { useState, useEffect } from 'react'
import Head from 'next/head'
import { supabase } from '../lib/supabase'

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('portfolio')

  // Portfolio state
  const [portfolioImages, setPortfolioImages] = useState([])
  const [newImageUrl, setNewImageUrl] = useState('')

  // Weddings state
  const [weddings, setWeddings] = useState([])
  const [newWedding, setNewWedding] = useState({ couple_name: '', year: '', cover_image: '', testimonial: '', images: '' })

  // Edit state
  const [editingWedding, setEditingWedding] = useState(null) // { id, couple_name, year, cover_image, testimonial, images: '' }

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_pw')
    if (saved) { setLoggedIn(true); loadData() }
  }, [])

  async function login() {
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })
    if (res.ok) {
      sessionStorage.setItem('admin_pw', password)
      setLoggedIn(true)
      loadData()
    } else {
      setError('Pogrešna lozinka')
    }
  }

  async function loadData() {
    const { data: imgs } = await supabase.from('portfolio_images').select('*').order('sort_order')
    setPortfolioImages(imgs || [])
    const { data: ws } = await supabase.from('weddings').select('*').order('sort_order')
    setWeddings(ws || [])
  }

  async function addPortfolioImage() {
    if (!newImageUrl) return
    const pw = sessionStorage.getItem('admin_pw')
    await fetch('/api/admin/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': pw },
      body: JSON.stringify({ url: newImageUrl })
    })
    setNewImageUrl('')
    loadData()
  }

  async function deletePortfolioImage(id) {
    if (!confirm('Obrisati ovu sliku?')) return
    const pw = sessionStorage.getItem('admin_pw')
    await fetch('/api/admin/portfolio', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': pw },
      body: JSON.stringify({ id })
    })
    loadData()
  }

  async function addWedding() {
    if (!newWedding.couple_name || !newWedding.cover_image) {
      alert('Ime para i cover slika su obavezni!')
      return
    }
    const pw = sessionStorage.getItem('admin_pw')
    const slug = newWedding.couple_name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const imageUrls = newWedding.images.split('\n').map(u => u.trim()).filter(Boolean)
    await fetch('/api/admin/weddings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': pw },
      body: JSON.stringify({ ...newWedding, slug, imageUrls })
    })
    setNewWedding({ couple_name: '', year: '', cover_image: '', testimonial: '', images: '' })
    loadData()
  }

  async function deleteWedding(id, name) {
    if (!confirm(`Obrisati ${name}?`)) return
    const pw = sessionStorage.getItem('admin_pw')
    await fetch('/api/admin/weddings', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': pw },
      body: JSON.stringify({ id })
    })
    loadData()
  }

  // Load wedding images for editing
  async function startEditWedding(w) {
    const { data: imgs } = await supabase
      .from('wedding_images')
      .select('url')
      .eq('wedding_id', w.id)
      .order('sort_order')
    setEditingWedding({
      ...w,
      images: (imgs || []).map(i => i.url).join('\n')
    })
  }

  async function saveEditWedding() {
    if (!editingWedding.couple_name || !editingWedding.cover_image) {
      alert('Ime para i cover slika su obavezni!')
      return
    }
    const pw = sessionStorage.getItem('admin_pw')
    const imageUrls = editingWedding.images.split('\n').map(u => u.trim()).filter(Boolean)
    const res = await fetch('/api/admin/weddings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': pw },
      body: JSON.stringify({
        id: editingWedding.id,
        couple_name: editingWedding.couple_name,
        year: editingWedding.year,
        cover_image: editingWedding.cover_image,
        testimonial: editingWedding.testimonial,
        imageUrls
      })
    })
    if (res.ok) {
      setEditingWedding(null)
      loadData()
    } else {
      alert('Greška pri spremanju. Pokušaj ponovo.')
    }
  }

  const inputStyle = { width:'100%', border:'1px solid #e0e0e0', padding:'10px 12px', fontSize:'14px', outline:'none', fontFamily:'Raleway, sans-serif', boxSizing:'border-box' }
  const labelStyle = { display:'block', fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', color:'#aaa', marginBottom:'6px' }

  if (!loggedIn) return (
    <>
      <Head><title>Admin — Le Café Studio</title></Head>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh' }}>
        <div style={{ width:'360px', padding:'48px', background:'#111', border:'1px solid #2a2a2a' }}>
          <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'28px', letterSpacing:'4px', textAlign:'center', marginBottom:'8px' }}>LE CAFÉ STUDIO</h2>
          <p style={{ fontSize:'10px', letterSpacing:'3px', opacity:0.4, textAlign:'center', marginBottom:'40px', textTransform:'uppercase' }}>Content Management</p>
          <div style={{ marginBottom:'20px' }}>
            <label style={{ display:'block', fontSize:'9px', letterSpacing:'3px', textTransform:'uppercase', opacity:0.5, marginBottom:'8px' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && login()}
              style={{ width:'100%', background:'transparent', border:'1px solid #2a2a2a', color:'white', padding:'12px', fontSize:'15px', outline:'none' }}
            />
          </div>
          <button onClick={login} style={{ width:'100%', padding:'13px', background:'white', color:'black', border:'none', cursor:'pointer', fontFamily:'Raleway, sans-serif', fontSize:'10px', letterSpacing:'4px', textTransform:'uppercase' }}>
            Enter
          </button>
          {error && <p style={{ color:'#c0392b', fontSize:'11px', marginTop:'12px', textAlign:'center' }}>{error}</p>}
        </div>
      </div>
    </>
  )

  return (
    <>
      <Head><title>Admin — Le Café Studio</title></Head>
      <div style={{ background:'#f5f4f0', minHeight:'100vh', color:'#1a1a1a' }}>
        {/* Header */}
        <div style={{ background:'white', borderBottom:'1px solid #e8e8e8', padding:'16px 40px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'20px', letterSpacing:'4px' }}>LE CAFÉ STUDIO · Admin</span>
          <button onClick={() => { sessionStorage.removeItem('admin_pw'); setLoggedIn(false) }}
            style={{ background:'none', border:'1px solid #ccc', padding:'8px 20px', cursor:'pointer', fontFamily:'Raleway, sans-serif', fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase' }}>
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div style={{ background:'white', borderBottom:'1px solid #e0e0e0', padding:'0 40px', display:'flex' }}>
          {['portfolio', 'weddings'].map(tab => (
            <div key={tab} onClick={() => setActiveTab(tab)} style={{
              padding:'14px 0', marginRight:'36px', fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase',
              cursor:'pointer', color: activeTab === tab ? '#1a1a1a' : '#aaa',
              borderBottom: activeTab === tab ? '2px solid #c9a870' : '2px solid transparent'
            }}>{tab}</div>
          ))}
        </div>

        <div style={{ padding:'40px', maxWidth:'1200px' }}>

          {/* Portfolio Tab */}
          {activeTab === 'portfolio' && (
            <div>
              <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'28px', marginBottom:'8px' }}>Portfolio Images</h2>
              <p style={{ fontSize:'11px', color:'#999', marginBottom:'36px' }}>Dodaj ili obriši slike s glavnog portfolio grida</p>

              <div style={{ background:'white', padding:'28px', marginBottom:'32px', border:'1px solid #eee' }}>
                <p style={{ fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase', color:'#999', marginBottom:'16px' }}>Dodaj sliku</p>
                <div style={{ display:'flex', gap:'12px' }}>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newImageUrl}
                    onChange={e => setNewImageUrl(e.target.value)}
                    style={{ flex:1, border:'1px solid #e0e0e0', padding:'10px 12px', fontSize:'14px', outline:'none', fontFamily:'Raleway, sans-serif' }}
                  />
                  <button onClick={addPortfolioImage} style={{ padding:'10px 24px', background:'#1a1a1a', color:'white', border:'none', cursor:'pointer', fontFamily:'Raleway, sans-serif', fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase' }}>
                    Dodaj
                  </button>
                </div>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))', gap:'12px' }}>
                {portfolioImages.map(img => (
                  <div key={img.id} style={{ position:'relative', aspectRatio:'2/3', overflow:'hidden', background:'#eee' }}>
                    <img src={img.url} style={{ width:'100%', height:'100%', objectFit:'cover' }} alt="" />
                    <button onClick={() => deletePortfolioImage(img.id)} style={{
                      position:'absolute', top:'8px', right:'8px', background:'rgba(0,0,0,0.7)',
                      color:'white', border:'none', width:'28px', height:'28px', cursor:'pointer', borderRadius:'50%', fontSize:'12px'
                    }}>✕</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Weddings Tab */}
          {activeTab === 'weddings' && (
            <div>
              <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'28px', marginBottom:'8px' }}>Wedding Galleries</h2>
              <p style={{ fontSize:'11px', color:'#999', marginBottom:'36px' }}>Upravljaj galerijama vjenčanja</p>

              {/* Add new wedding form */}
              <div style={{ background:'white', padding:'28px', marginBottom:'32px', border:'1px solid #eee' }}>
                <p style={{ fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase', color:'#999', marginBottom:'16px' }}>Dodaj novo vjenčanje</p>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'12px', marginBottom:'12px' }}>
                  <div>
                    <label style={labelStyle}>Ime para *</label>
                    <input value={newWedding.couple_name} onChange={e => setNewWedding({...newWedding, couple_name: e.target.value})}
                      placeholder="Marija & Toni" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Godina</label>
                    <input value={newWedding.year} onChange={e => setNewWedding({...newWedding, year: e.target.value})}
                      placeholder="2026" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Cover slika URL *</label>
                    <input value={newWedding.cover_image} onChange={e => setNewWedding({...newWedding, cover_image: e.target.value})}
                      placeholder="https://..." style={inputStyle} />
                  </div>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'12px' }}>
                  <div>
                    <label style={labelStyle}>Slike galerije (jedan URL po liniji)</label>
                    <textarea value={newWedding.images} onChange={e => setNewWedding({...newWedding, images: e.target.value})}
                      placeholder={"https://slika1.jpg\nhttps://slika2.jpg"} rows={4}
                      style={{ ...inputStyle, resize:'vertical' }} />
                  </div>
                  <div>
                    <label style={labelStyle}>Testimonial</label>
                    <textarea value={newWedding.testimonial} onChange={e => setNewWedding({...newWedding, testimonial: e.target.value})}
                      placeholder="Hvala Davorine..." rows={4}
                      style={{ ...inputStyle, resize:'vertical' }} />
                  </div>
                </div>
                <button onClick={addWedding} style={{ padding:'10px 24px', background:'#1a1a1a', color:'white', border:'none', cursor:'pointer', fontFamily:'Raleway, sans-serif', fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase' }}>
                  Dodaj vjenčanje
                </button>
              </div>

              {/* Edit modal */}
              {editingWedding && (
                <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:500, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}>
                  <div style={{ background:'white', padding:'36px', width:'100%', maxWidth:'700px', maxHeight:'90vh', overflowY:'auto', position:'relative' }}>
                    <button onClick={() => setEditingWedding(null)} style={{ position:'absolute', top:'16px', right:'20px', background:'none', border:'none', fontSize:'20px', cursor:'pointer', opacity:0.4 }}>✕</button>
                    <p style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'22px', marginBottom:'24px' }}>Uredi: {editingWedding.couple_name}</p>

                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'12px', marginBottom:'12px' }}>
                      <div>
                        <label style={labelStyle}>Ime para *</label>
                        <input value={editingWedding.couple_name} onChange={e => setEditingWedding({...editingWedding, couple_name: e.target.value})} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Godina</label>
                        <input value={editingWedding.year || ''} onChange={e => setEditingWedding({...editingWedding, year: e.target.value})} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Cover slika URL *</label>
                        <input value={editingWedding.cover_image} onChange={e => setEditingWedding({...editingWedding, cover_image: e.target.value})} style={inputStyle} />
                      </div>
                    </div>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'20px' }}>
                      <div>
                        <label style={labelStyle}>Slike galerije (jedan URL po liniji)</label>
                        <textarea value={editingWedding.images} onChange={e => setEditingWedding({...editingWedding, images: e.target.value})}
                          rows={6} style={{ ...inputStyle, resize:'vertical' }} />
                      </div>
                      <div>
                        <label style={labelStyle}>Testimonial</label>
                        <textarea value={editingWedding.testimonial || ''} onChange={e => setEditingWedding({...editingWedding, testimonial: e.target.value})}
                          rows={6} style={{ ...inputStyle, resize:'vertical' }} />
                      </div>
                    </div>
                    <div style={{ display:'flex', gap:'12px' }}>
                      <button onClick={saveEditWedding} style={{ padding:'10px 24px', background:'#1a1a1a', color:'white', border:'none', cursor:'pointer', fontFamily:'Raleway, sans-serif', fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase' }}>
                        Spremi
                      </button>
                      <button onClick={() => setEditingWedding(null)} style={{ padding:'10px 24px', background:'none', color:'#999', border:'1px solid #ddd', cursor:'pointer', fontFamily:'Raleway, sans-serif', fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase' }}>
                        Odustani
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Weddings list */}
              <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                {weddings.map(w => (
                  <div key={w.id} style={{ background:'white', border:'1px solid #eee', display:'grid', gridTemplateColumns:'80px 1fr auto', gap:'16px', alignItems:'center', padding:'16px' }}>
                    <img src={w.cover_image} style={{ width:'80px', height:'80px', objectFit:'cover' }} alt="" />
                    <div>
                      <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'22px', marginBottom:'4px' }}>{w.couple_name}</div>
                      <div style={{ fontSize:'11px', color:'#aaa' }}>{w.year}{w.testimonial ? ' · testimonial ✓' : ''}</div>
                    </div>
                    <div style={{ display:'flex', gap:'8px' }}>
                      <button onClick={() => startEditWedding(w)} style={{ padding:'8px 16px', background:'none', color:'#1a1a1a', border:'1px solid #ddd', cursor:'pointer', fontFamily:'Raleway, sans-serif', fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase' }}>
                        Uredi
                      </button>
                      <button onClick={() => deleteWedding(w.id, w.couple_name)} style={{ padding:'8px 16px', background:'none', color:'#c0392b', border:'1px solid #f0c0bb', cursor:'pointer', fontFamily:'Raleway, sans-serif', fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase' }}>
                        Obriši
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}