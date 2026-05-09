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

      <div className="about-wrap">
        <div className="about-image-wrap fade-up">
          <div className="about-image-frame">
            <img
              src="https://le-cafe-studio.com/wp-content/uploads/2024/11/MiaiIvan173of254.jpg"
              alt="Davorin Vranić"
            />
          </div>
        </div>
        <div className="about-content">
          <p className="about-tag fade-up">Wedding photographer based in Croatia</p>
          <h1 className="about-name fade-up">Davorin<br />Vranić</h1>
          <div className="about-divider fade-up"></div>
          <div className="about-bio fade-up">
            <p>Before photography I was a professional handball player in France. During my career I got the chance to meet many wonderful people. Now as a photographer I am glad that I can continue getting to know more interesting personalities.</p>
            <p>My style of photography is documenting your most beautiful day. I aim to tell the story of your wedding day from start to finish, documenting not just the couple but also details, guests and the overall atmosphere.</p>
            <p>For me the most beautiful images are of candid moments. I like to capture genuine emotions, laughter and intimate moments as they unfold — the connections and feelings shared among the couple, family and friends.</p>
          </div>
          <div className="about-langs fade-up">
            <span className="about-langs-label">Languages</span>
            <span className="lang-badge">EN</span>
            <span className="lang-badge">FR</span>
            <span className="lang-badge">HR</span>
          </div>
        </div>
      </div>
    </>
  )
}