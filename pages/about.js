import Head from 'next/head'

export default function About() {
  return (
    <>
      <Head>
        <title>About — Davorin Vranić · Le Café Studio</title>
        <meta name="description" content="Davorin Vranić is a wedding photographer based in Croatia. Former professional handball player turned photographer, capturing candid emotions and authentic moments." />
        <meta property="og:title" content="About — Davorin Vranić · Le Café Studio" />
        <meta property="og:description" content="Former handball player turned wedding photographer, based in Croatia. Candid, emotional, authentic." />
        <meta property="og:url" content="https://le-cafe-studio.com/about" />
        <link rel="canonical" href="https://le-cafe-studio.com/about" />
      </Head>

      {/* ─── Hero ─── */}
      <div className="about-hero sr">
        <p className="about-hero-tag">The photographer</p>
        <h1 className="about-hero-title">Davorin Vranić</h1>
        <div className="about-hero-line" />
      </div>

      {/* ─── Main two-column ─── */}
      <div className="about-wrap">
        <div className="about-image-wrap">
          <div className="about-image-frame sr">
            <img
              src="https://le-cafe-studio.com/wp-content/uploads/2024/11/MiaiIvan173of254.jpg"
              alt="Davorin Vranić"
            />
          </div>
        </div>

        <div className="about-content">
          <p className="about-tag sr">Wedding photographer based in Croatia</p>
          <div className="about-bio">
            <p className="sr" style={{ '--delay': '0.05s' }}>
              Before photography I was a professional handball player in France.
              During my career I got the chance to meet many wonderful people.
              Now as a photographer I am glad that I can continue getting to
              know more interesting personalities.
            </p>
            <p className="sr" style={{ '--delay': '0.1s' }}>
              My style of photography is documenting your most beautiful day.
              I aim to tell the story of your wedding day from start to finish —
              documenting not just the couple but also details, guests and the
              overall atmosphere.
            </p>
            <p className="sr" style={{ '--delay': '0.15s' }}>
              For me the most beautiful images are of candid moments. I like to
              capture genuine emotions, laughter and intimate moments as they
              unfold — the connections and feelings shared among the couple,
              family and friends.
            </p>
          </div>

          <div className="about-langs sr" style={{ '--delay': '0.2s' }}>
            <span className="about-langs-label">Languages</span>
            <span className="lang-badge">EN</span>
            <span className="lang-badge">FR</span>
            <span className="lang-badge">HR</span>
          </div>
        </div>
      </div>

      {/* ─── Stats row ─── */}
      <div className="about-stats sr" style={{ '--delay': '0.1s' }}>
        <div className="about-stat">
          <span className="about-stat-number">7+</span>
          <span className="about-stat-label">Years of experience</span>
        </div>
        <div className="about-stat-divider" />
        <div className="about-stat">
          <span className="about-stat-number">150+</span>
          <span className="about-stat-label">Weddings captured</span>
        </div>
        <div className="about-stat-divider" />
        <div className="about-stat">
          <span className="about-stat-number">12+</span>
          <span className="about-stat-label">Countries</span>
        </div>
        <div className="about-stat-divider" />
        <div className="about-stat">
          <span className="about-stat-number">3</span>
          <span className="about-stat-label">Languages spoken</span>
        </div>
      </div>

      {/* ─── Philosophy quote ─── */}
      <div className="about-philosophy sr">
        <p className="about-philosophy-quote">
          "I believe that the most honest photographs are the ones
          you don't know are being taken."
        </p>
        <span className="about-philosophy-attr">— Davorin Vranić</span>
      </div>

    </>
  )
}