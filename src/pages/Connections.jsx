import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Link2,
  ExternalLink,
  Loader2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react'

function FacebookIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.028 4.388 11.023 10.125 11.927v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.27h3.328l-.532 3.49h-2.796v8.437C19.612 23.096 24 18.1 24 12.073z" />
    </svg>
  )
}

function InstagramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#E1306C">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' },
  }),
}

function PlatformIcon({ type }) {
  if (type === 'facebook')
    return (
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ background: 'rgba(24,119,242,0.15)', border: '1px solid rgba(24,119,242,0.3)' }}
      >
        <FacebookIcon size={16} />
      </div>
    )
  return (
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center"
      style={{
        background: 'rgba(225,48,108,0.15)',
        border: '1px solid rgba(225,48,108,0.3)',
      }}
    >
      <InstagramIcon size={16} />
    </div>
  )
}

export default function Connections() {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [connectUrl, setConnectUrl] = useState(null)

  const fetchAccounts = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/integrations')
      if (!res.ok) throw new Error('Failed to load integrations')
      const data = await res.json()
      setAccounts(data.accounts ?? [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchConnectUrl = async () => {
    try {
      const res = await fetch('/api/connect')
      if (!res.ok) throw new Error()
      const data = await res.json()
      setConnectUrl(data.url)
    } catch {
      setConnectUrl(null)
    }
  }

  useEffect(() => {
    fetchAccounts()
    fetchConnectUrl()
  }, [])

  const handleConnect = () => {
    if (connectUrl) {
      window.open(connectUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight mb-1">
            Connections
          </h2>
          <p className="text-muted text-sm">
            Manage your linked Facebook Pages and Instagram accounts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchAccounts}
            disabled={loading}
            className="p-2.5 rounded-xl glass glass-hover text-muted hover:text-white transition-colors"
            title="Refresh"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={handleConnect}
            disabled={!connectUrl}
            className={`btn-neon inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm
              ${!connectUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Link2 size={14} />
            Connect New Account
            <ExternalLink size={12} />
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 size={28} className="animate-spin text-neon" />
          <p className="text-muted text-sm">Loading connected accounts…</p>
        </div>
      ) : error ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-2xl p-8 flex flex-col items-center gap-4 text-center"
        >
          <AlertCircle size={32} color="#f87171" />
          <div>
            <p className="font-semibold text-white mb-1">
              Could not load accounts
            </p>
            <p className="text-muted text-sm">{error}</p>
          </div>
          <button
            onClick={fetchAccounts}
            className="btn-ghost px-5 py-2 rounded-xl text-sm"
          >
            Try again
          </button>
        </motion.div>
      ) : accounts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-2xl p-12 flex flex-col items-center gap-5 text-center"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: 'rgba(57,255,20,0.07)',
              border: '1px solid rgba(57,255,20,0.2)',
            }}
          >
            <Link2 size={28} color="#39FF14" />
          </div>
          <div>
            <p className="text-lg font-bold mb-2">No accounts connected</p>
            <p className="text-muted text-sm max-w-xs">
              Connect your Facebook Pages or Instagram accounts to start
              publishing content automatically.
            </p>
          </div>
          <button
            onClick={handleConnect}
            disabled={!connectUrl}
            className="btn-neon inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm"
          >
            <Link2 size={14} />
            Connect your first account
          </button>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-3">
          {accounts.map((account, i) => (
            <motion.div
              key={account.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="glass glass-hover rounded-2xl px-6 py-4 flex items-center gap-4"
            >
              <PlatformIcon type={account.type} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {account.name}
                </p>
                <p className="text-xs text-muted capitalize mt-0.5">
                  {account.type}
                  {account.username ? ` · @${account.username}` : ''}
                </p>
              </div>
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: 'rgba(57,255,20,0.08)',
                  border: '1px solid rgba(57,255,20,0.25)',
                  color: '#39FF14',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
                Connected
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
