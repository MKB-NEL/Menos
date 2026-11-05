/**
 * GET /api/integrations
 * Fetches the list of connected social accounts from the Postiz API.
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const postizUrl = process.env.POSTIZ_API_URL
  const postizKey = process.env.POSTIZ_API_KEY

  if (!postizUrl || postizUrl.startsWith('[PLACEHOLDER')) {
    return res.status(200).json({ accounts: [] })
  }

  try {
    const response = await fetch(`${postizUrl}/api/integrations`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${postizKey}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('[integrations] Postiz error:', response.status, text)
      return res.status(502).json({ error: 'Failed to fetch integrations from Postiz.' })
    }

    const data = await response.json()

    // Normalise Postiz response into our standard shape.
    // Adjust field names based on your actual Postiz API response schema.
    const accounts = (data.integrations ?? data.accounts ?? data ?? []).map((item) => ({
      id: item.id ?? item._id,
      name: item.name ?? item.displayName ?? item.pageId ?? item.id,
      type: (item.type ?? item.network ?? item.platform ?? 'unknown').toLowerCase(),
      username: item.username ?? item.handle ?? null,
    }))

    return res.status(200).json({ accounts })
  } catch (err) {
    console.error('[integrations] Unexpected error:', err)
    return res.status(500).json({ error: 'Internal server error.' })
  }
}

