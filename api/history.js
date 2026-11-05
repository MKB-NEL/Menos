import { getSupabase } from './db.js'

/**
 * GET /api/history
 * Returns all posts logged in Supabase, most recent first.
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('posts')
      .select('id, caption, media_url, platform, status, created_at')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) {
      console.error('[history] Supabase query error:', error)
      return res.status(500).json({ error: 'Failed to fetch post history.' })
    }

    return res.status(200).json({ posts: data ?? [] })
  } catch (err) {
    console.error('[history] Unexpected error:', err)
    return res.status(500).json({ error: 'Internal server error.' })
  }
}

