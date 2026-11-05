import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Upload,
  X,
  Send,
  Sparkles,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Loader2,
  Image,
  FileVideo,
} from 'lucide-react'

function TooltipWrapper({ tip, children }) {
  const [show, setShow] = useState(false)
  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg glass border border-white/10 text-xs text-muted whitespace-nowrap pointer-events-none z-50"
          >
            {tip}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DropZone({ file, onFile, onClear }) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      setDragging(false)
      const dropped = e.dataTransfer.files[0]
      if (dropped) onFile(dropped)
    },
    [onFile],
  )

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => setDragging(false)

  const previewUrl = file ? URL.createObjectURL(file) : null
  const isVideo = file?.type?.startsWith('video/')

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => !file && inputRef.current?.click()}
      className={`relative rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer
        ${dragging ? 'border-neon bg-neon/5' : 'border-white/10 hover:border-neon/40 hover:bg-white/[0.02]'}
        ${file ? 'cursor-default' : ''}
      `}
      style={{ minHeight: 180 }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={(e) => e.target.files[0] && onFile(e.target.files[0])}
      />

      {file ? (
        <div className="relative w-full h-48 rounded-2xl overflow-hidden">
          {isVideo ? (
            <video
              src={previewUrl}
              className="w-full h-full object-cover"
              muted
              loop
              autoPlay
            />
          ) : (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClear()
              }}
              className="p-2 rounded-full bg-black/80 text-white hover:text-red-400 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 glass px-2 py-1 rounded-lg text-xs text-white">
            {isVideo ? <FileVideo size={12} /> : <Image size={12} />}
            <span className="max-w-[160px] truncate">{file.name}</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 py-12">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              background: 'rgba(57,255,20,0.08)',
              border: '1px solid rgba(57,255,20,0.2)',
            }}
          >
            <Upload size={22} color="#39FF14" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-white mb-1">
              Drop your media here
            </p>
            <p className="text-xs text-muted">
              Images & videos supported · Click to browse
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

function AccountSelect({ accounts, value, onChange, loading }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const selected = accounts.find((a) => a.id === value)

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={loading}
        className="w-full input-field flex items-center justify-between gap-2 px-4 py-3 rounded-xl text-sm"
      >
        {loading ? (
          <span className="flex items-center gap-2 text-muted">
            <Loader2 size={14} className="animate-spin" />
            Loading accounts…
          </span>
        ) : selected ? (
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon" />
            {selected.name}
            <span className="text-muted text-xs capitalize">
              · {selected.type}
            </span>
          </span>
        ) : (
          <span className="text-muted">Select account…</span>
        )}
        <ChevronDown
          size={14}
          className={`text-muted transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && accounts.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 glass rounded-xl overflow-hidden z-50 shadow-xl"
          >
            {accounts.map((account) => (
              <li key={account.id}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(account.id)
                    setOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-white/5 transition-colors"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      background:
                        account.type === 'facebook' ? '#1877F2' : '#E1306C',
                    }}
                  />
                  <span className="text-white">{account.name}</span>
                  <span className="text-muted text-xs capitalize ml-auto">
                    {account.type}
                  </span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
        {open && accounts.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-full left-0 right-0 mt-2 glass rounded-xl px-4 py-4 text-sm text-muted text-center z-50"
          >
            No accounts connected. Visit{' '}
            <a href="/dashboard/connections" className="text-neon hover:underline">
              Connections
            </a>{' '}
            to add one.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Compose() {
  const [caption, setCaption] = useState('')
  const [file, setFile] = useState(null)
  const [accounts, setAccounts] = useState([])
  const [accountsLoading, setAccountsLoading] = useState(true)
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await fetch('/api/integrations')
        if (!res.ok) throw new Error('Failed to fetch accounts')
        const data = await res.json()
        setAccounts(data.accounts ?? [])
      } catch (err) {
        console.error(err)
        setAccounts([])
      } finally {
        setAccountsLoading(false)
      }
    }
    fetchAccounts()
  }, [])

  const canSubmit =
    caption.trim().length > 0 && selectedAccount && status !== 'loading'

  const handlePublish = async () => {
    if (!canSubmit) return
    setStatus('loading')
    setErrorMsg('')

    try {
      let mediaUrl = null

      if (file) {
        const form = new FormData()
        form.append('file', file)
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: form })
        if (!uploadRes.ok) throw new Error('Media upload failed')
        const uploadData = await uploadRes.json()
        mediaUrl = uploadData.url
      }

      const account = accounts.find((a) => a.id === selectedAccount)
      const res = await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caption: caption.trim(),
          mediaUrl,
          platform: account?.type ?? 'unknown',
          accountId: selectedAccount,
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message ?? 'Post failed')
      }

      setStatus('success')
      setCaption('')
      setFile(null)
      setTimeout(() => setStatus(null), 4000)
    } catch (err) {
      setErrorMsg(err.message)
      setStatus('error')
      setTimeout(() => setStatus(null), 5000)
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-black tracking-tight mb-1">Compose</h2>
        <p className="text-muted text-sm">
          Write your caption, attach media, and hit publish.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Caption */}
        <div className="glass rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <label className="text-xs font-semibold text-muted uppercase tracking-widest">
              Caption
            </label>
            <TooltipWrapper tip="Coming Soon — Menos AI is in development">
              <button
                disabled
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                  bg-white/5 border border-white/10 text-muted cursor-not-allowed opacity-60"
              >
                <Sparkles size={12} />
                Generate with Menos AI
              </button>
            </TooltipWrapper>
          </div>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write something worth sharing…"
            rows={5}
            className="input-field w-full rounded-xl px-4 py-3 text-sm resize-none"
          />
          <div className="flex justify-end">
            <span
              className={`text-xs ${caption.length > 2000 ? 'text-red-400' : 'text-muted'}`}
            >
              {caption.length} / 2000
            </span>
          </div>
        </div>

        {/* Media */}
        <div className="glass rounded-2xl p-6 flex flex-col gap-3">
          <label className="text-xs font-semibold text-muted uppercase tracking-widest">
            Media
          </label>
          <DropZone
            file={file}
            onFile={setFile}
            onClear={() => setFile(null)}
          />
        </div>

        {/* Account */}
        <div className="glass rounded-2xl p-6 flex flex-col gap-3">
          <label className="text-xs font-semibold text-muted uppercase tracking-widest">
            Publish to
          </label>
          <AccountSelect
            accounts={accounts}
            value={selectedAccount}
            onChange={setSelectedAccount}
            loading={accountsLoading}
          />
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 px-5 py-3.5 rounded-xl"
              style={{
                background: 'rgba(57,255,20,0.08)',
                border: '1px solid rgba(57,255,20,0.25)',
              }}
            >
              <CheckCircle size={16} color="#39FF14" />
              <span className="text-sm font-semibold text-neon">
                Post published successfully!
              </span>
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 px-5 py-3.5 rounded-xl"
              style={{
                background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.25)',
              }}
            >
              <AlertCircle size={16} color="#f87171" />
              <span className="text-sm font-semibold text-red-400">
                {errorMsg || 'Something went wrong. Try again.'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit */}
        <button
          onClick={handlePublish}
          disabled={!canSubmit}
          className={`btn-neon flex items-center justify-center gap-2 w-full py-4 rounded-xl text-sm font-bold
            ${!canSubmit ? 'opacity-40 cursor-not-allowed !shadow-none !transform-none' : ''}`}
        >
          {status === 'loading' ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Publishing…
            </>
          ) : (
            <>
              <Send size={16} />
              Publish Now
            </>
          )}
        </button>
      </div>
    </div>
  )
}

