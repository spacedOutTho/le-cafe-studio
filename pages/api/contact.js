import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { name, email, date, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Ime, email i poruka su obavezni.' })
  }

  try {
    await resend.emails.send({
      from: 'Le Café Studio <onboarding@resend.dev>',
      to: 'spacedouttho1@gmail.com',
      replyTo: email,
      subject: `Nova upita od ${name}${date ? ` — ${date}` : ''}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="font-size: 28px; font-weight: 300; letter-spacing: 4px; margin-bottom: 32px; border-bottom: 1px solid #e0e0e0; padding-bottom: 20px;">
            LE CAFÉ STUDIO — Nova upita
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; opacity: 0.5; width: 120px;">Ime</td>
              <td style="padding: 12px 0; font-size: 18px;">${name}</td>
            </tr>
            <tr style="border-top: 1px solid #f0f0f0;">
              <td style="padding: 12px 0; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; opacity: 0.5;">Email</td>
              <td style="padding: 12px 0; font-size: 18px;"><a href="mailto:${email}" style="color: #c9a870;">${email}</a></td>
            </tr>
            ${date ? `
            <tr style="border-top: 1px solid #f0f0f0;">
              <td style="padding: 12px 0; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; opacity: 0.5;">Datum</td>
              <td style="padding: 12px 0; font-size: 18px;">${date}</td>
            </tr>` : ''}
            <tr style="border-top: 1px solid #f0f0f0;">
              <td style="padding: 12px 0; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; opacity: 0.5; vertical-align: top;">Poruka</td>
              <td style="padding: 12px 0; font-size: 17px; line-height: 1.7; font-style: italic;">${message.replace(/\n/g, '<br>')}</td>
            </tr>
          </table>
          <p style="margin-top: 40px; font-size: 11px; opacity: 0.4; letter-spacing: 2px; text-transform: uppercase;">
            Le Café Studio · le-cafe-studio.com
          </p>
        </div>
      `
    })

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Resend error:', err)
    return res.status(500).json({ error: 'Slanje poruke nije uspjelo. Pokušaj ponovo.' })
  }
}