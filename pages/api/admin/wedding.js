import { supabaseAdmin } from '../../../lib/supabase'

function checkAuth(req) {
  return req.headers['x-admin-password'] === process.env.ADMIN_PASSWORD
}

export default async function handler(req, res) {
  if (!checkAuth(req)) return res.status(401).json({ error: 'Unauthorized' })

  if (req.method === 'POST') {
    const { couple_name, slug, year, cover_image, testimonial, imageUrls } = req.body

    const { data: wedding, error } = await supabaseAdmin
      .from('weddings')
      .insert({ couple_name, slug, year, cover_image, testimonial })
      .select()
      .single()

    if (error) return res.status(500).json({ error: error.message })

    if (imageUrls && imageUrls.length > 0) {
      const images = imageUrls.map((url, i) => ({
        wedding_id: wedding.id,
        url,
        sort_order: i
      }))
      await supabaseAdmin.from('wedding_images').insert(images)
    }

    return res.status(200).json(wedding)
  }

  if (req.method === 'DELETE') {
    const { id } = req.body
    await supabaseAdmin.from('weddings').delete().eq('id', id)
    return res.status(200).json({ success: true })
  }

  res.status(405).end()
}