import { getSupabase } from './db.js'

/**
 * POST /api/post
 * Creates a post via Postiz and logs it to Supabase.
 *
 * Body: { caption: string, mediaUrl?: string, platform: string, accountId: string }
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { caption, mediaUrl, platform, accountId } = req.body ?? {}

  if (!caption || typeof caption !== 'string' || caption.trim().length === 0) {
    return res.status(400).json({ error: 'caption is required.' })
  }

  if (!accountId) {
    return res.status(400).json({ error: 'accountId is required.' })
  }

  const postizUrl = process.env.POSTIZ_API_URL
  const postizKey = process.env.POSTIZ_API_KEY

  if (!postizUrl || postizUrl.startsWith('[PLACEHOLDER')) {
    return res.status(503).json({
      error: 'Postiz API is not configured. Set POSTIZ_API_URL in your environment.',
    })
  }

  let postizPostId = null
  let postStatus = 'published'

  try {
    // Build the Postiz payload. Adjust field names per your Postiz API schema.
    const payload = {
      integrationId: accountId,
      content: caption.trim(),
      ...(mediaUrl ? { media: [{ url: mediaUrl }] } : {}),
    }

    const postizRes = await fetch(`${postizUrl}/api/posts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${postizKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!postizRes.ok) {
      const errText = await postizRes.text()
      console.error('[post] Postiz error:', postizRes.status, errText)
      postStatus = 'failed'
    } else {
      const postizData = await postizRes.json()
      postizPostId = postizData.id ?? postizData._id ?? null
    }
  } catch (err) {
    console.error('[post] Postiz request failed:', err)
    postStatus = 'failed'
  }

  // Log to Supabase regardless of Postiz result so there is always an audit trail.
  try {
    const supabase = getSupabase()
    const { error: dbError } = await supabase.from('posts').insert({
      caption: caption.trim(),
      media_url: mediaUrl ?? null,
      platform: platform ?? 'unknown',
      account_id: accountId,
      postiz_post_id: postizPostId,
      status: postStatus,
    })

    if (dbError) {
      console.error('[post] Supabase insert error:', dbError)
    }
  } catch (err) {
    console.error('[post] Supabase error:', err)
  }

  if (postStatus === 'failed') {
    return res.status(502).json({ error: 'Post delivery to platform failed.' })
  }

  return res.status(200).json({ success: true, postizPostId })
}

