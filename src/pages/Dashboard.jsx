import { NavLink, Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Link2, Clock, Wifi } from 'lucide-react'
import Compose from './Compose'
import Connections from './Connections'
import History from './History'

const navLinks = [
  { to: '/dashboard/compose', label: 'Compose', icon: Send },
  { to: '/dashboard/connections', label: 'Connections', icon: Link2 },
  { to: '/dashboard/history', label: 'History', icon: Clock },
]

export default function Dashboard() {
  const location = useLocation()

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Sidebar */}
      <aside
        className="w-60 flex-shrink-0 flex flex-col py-6 px-4 glass"
        style={{ borderRight: '1px solid rgba(57,255,20,0.1)' }}
      >
        <div className="mb-10 px-2">
          <span className="text-lg font-black tracking-tight neon-text">
            Menos.
          </span>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto px-2 pt-6 border-t border-white/5">
          <p className="text-muted text-xs">Social Automation Platform</p>
          <p className="text-white/30 text-xs mt-0.5">v1.0.0</p>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header
          className="flex items-center justify-between px-8 py-4 glass"
          style={{ borderBottom: '1px solid rgba(57,255,20,0.08)' }}
        >
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-semibold text-muted tracking-wide uppercase">
              {navLinks.find((l) => location.pathname.startsWith(l.to))
                ?.label ?? 'Dashboard'}
            </h1>
          </div>
          <div className="status-pill status-online">
            <Wifi size={10} className="animate-pulse" />
            System: Online
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-charcoal">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="h-full"
            >
              <Routes>
                <Route index element={<Compose />} />
                <Route path="compose" element={<Compose />} />
                <Route path="connections" element={<Connections />} />
                <Route path="history" element={<History />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

