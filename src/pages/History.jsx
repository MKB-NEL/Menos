import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Loader2, AlertCircle, RefreshCw, CheckCircle, XCircle } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.07, ease: 'easeOut' },
  }),
}

function StatusBadge({ status }) {
  const map = {
    published: { label: 'Published', color: '#39FF14', bg: 'rgba(57,255,20,0.08)', border: 'rgba(57,255,20,0.25)', Icon: CheckCircle },
    failed: { label: 'Failed', color: '#f87171', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.25)', Icon: XCircle },
    pending: { label: 'Pending', color: '#facc15', bg: 'rgba(250,204,21,0.08)', border: 'rgba(250,204,21,0.25)', Icon: Clock },
  }
  const cfg = map[status] ?? map.pending
  return (
    <div
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
      style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}
    >
      <cfg.Icon size={11} />
      {cfg.label}
    </div>
  )
}

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export default function History() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchHistory = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/history')
      if (!res.ok) throw new Error('Failed to load post history')
      const data = await res.json()
      setPosts(data.posts ?? [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight mb-1">History</h2>
          <p className="text-muted text-sm">
            All posts published through Menos.
          </p>
        </div>
        <button
          onClick={fetchHistory}
          disabled={loading}
          className="p-2.5 rounded-xl glass glass-hover text-muted hover:text-white transition-colors"
          title="Refresh"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 size={28} className="animate-spin text-neon" />
          <p className="text-muted text-sm">Loading post history…</p>
        </div>
      ) : error ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-2xl p-8 flex flex-col items-center gap-4 text-center"
        >
          <AlertCircle size={32} color="#f87171" />
          <div>
            <p className="font-semibold text-white mb-1">Could not load history</p>
            <p className="text-muted text-sm">{error}</p>
          </div>
          <button onClick={fetchHistory} className="btn-ghost px-5 py-2 rounded-xl text-sm">
            Try again
          </button>
        </motion.div>
      ) : posts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-2xl p-12 flex flex-col items-center gap-5 text-center"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(57,255,20,0.07)', border: '1px solid rgba(57,255,20,0.2)' }}
          >
            <Clock size={28} color="#39FF14" />
          </div>
          <div>
            <p className="text-lg font-bold mb-2">No posts yet</p>
            <p className="text-muted text-sm max-w-xs">
              Posts you publish will appear here with their status and details.
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="glass glass-hover rounded-2xl px-6 py-5 flex items-start gap-4"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white leading-relaxed line-clamp-2 mb-2">
                  {post.caption}
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs text-muted capitalize">{post.platform}</span>
                  <span className="text-muted text-xs">·</span>
                  <span className="text-xs text-muted">{formatDate(post.created_at)}</span>
                  {post.media_url && (
                    <>
                      <span className="text-muted text-xs">·</span>
                      <a
                        href={post.media_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-neon hover:underline"
                      >
                        View media
                      </a>
                    </>
                  )}
                </div>
              </div>
              <StatusBadge status={post.status} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

