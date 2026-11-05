/**
 * GET /api/connect
 * Returns the OAuth initiation URL for the Postiz integration flow.
 */
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const postizUrl = process.env.POSTIZ_API_URL
  const postizKey = process.env.POSTIZ_API_KEY

  if (!postizUrl || postizUrl.startsWith('[PLACEHOLDER')) {
    return res.status(503).json({
      error: 'Postiz API is not yet configured. Set POSTIZ_API_URL in your environment.',
    })
  }

  // The Postiz OAuth flow entry point. Adjust path as per your Postiz deployment.
  const connectUrl = `${postizUrl}/integrations/social?apiKey=${postizKey}`

  return res.status(200).json({ url: connectUrl })
}

