import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  ArrowRight,
  Play,
  LayoutDashboard,
  PenSquare,
  Link2,
  Clock,
  TrendingUp,
  Users,
  FileText,
  Search,
  Bell,
  CheckCircle,
  X,
  Menu,
} from 'lucide-react'

// ─── Design tokens ───────────────────────────────────────────────
const PRIMARY = '#00FF66'
const PRIMARY_DIM = 'rgba(0,255,102,0.18)'
const PRIMARY_GLOW = 'rgba(0,255,102,0.35)'

// ─── Sparkle SVG (4-point star) ──────────────────────────────────
function SparkleIcon({ size = 28, color = PRIMARY, opacity = 0.9 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ opacity }}
    >
      <path
        d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
        fill={color}
        filter="url(#sparkleGlow)"
      />
      <defs>
        <filter id="sparkleGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  )
}

// ─── Floating sparkle positions ──────────────────────────────────
const SPARKLES = [
  { top: '8%',  left: '6%',  size: 22, delay: 0,    dur: 4.2, color: PRIMARY,     opacity: 0.8 },
  { top: '52%', left: '4%',  size: 14, delay: 1.5,  dur: 3.6, color: '#39FF14',   opacity: 0.55 },
  { top: '15%', right: '7%', size: 20, delay: 0.8,  dur: 5,   color: PRIMARY,     opacity: 0.75 },
  { top: '58%', right: '5%', size: 12, delay: 2.2,  dur: 3.8, color: '#39FF14',   opacity: 0.5 },
]

// ─── Fake line chart SVG ─────────────────────────────────────────
function LineChart() {
  const pts = [
    [0, 70], [60, 55], [120, 65], [180, 30], [240, 42], [300, 18], [360, 28],
  ]
  const toStr = (arr) => arr.map(([x, y]) => `${x},${y}`).join(' ')
  const fill = `${toStr(pts)} 360,90 0,90`

  return (
    <svg viewBox="0 0 360 90" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={PRIMARY} stopOpacity="0.25" />
          <stop offset="100%" stopColor={PRIMARY} stopOpacity="0" />
        </linearGradient>
        <filter id="lineGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <polygon points={fill} fill="url(#chartFill)" />
      <polyline
        points={toStr(pts)}
        fill="none"
        stroke={PRIMARY}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        filter="url(#lineGlow)"
      />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill={PRIMARY} />
      ))}
    </svg>
  )
}

// ─── Dashboard mockup ────────────────────────────────────────────
const STAT_CARDS = [
  { label: 'Total Posts', value: '1,284', delta: '+12%', Icon: FileText },
  { label: 'Engagement Rate', value: '8.4%', delta: '+3.2%', Icon: TrendingUp },
  { label: 'Connected Accounts', value: '5', delta: '+1', Icon: Users },
]

const RECENT_POSTS = [
  { text: 'Summer collection drop — catch the vibe 🌊', platform: 'Instagram', time: '2h ago' },
  { text: 'Behind the scenes at the studio session 🎵', platform: 'Facebook',  time: '5h ago' },
  { text: 'New blog: 10 tips for brand growth in 2026', platform: 'Instagram', time: '1d ago' },
]

const UPCOMING_POSTS = [
  { text: 'Product launch teaser',   time: 'Today, 6 PM' },
  { text: 'Weekly engagement post',  time: 'Tomorrow, 9 AM' },
  { text: 'Collab announcement',     time: 'Fri, 12 PM' },
]

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: 'Overview',    active: true  },
  { icon: PenSquare,       label: 'Compose',     active: false },
  { icon: Link2,           label: 'Connections', active: false },
  { icon: Clock,           label: 'History',     active: false },
]

function DashboardMockup() {
  return (
    <div
      className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
      style={{
        background: 'rgba(10,10,10,0.85)',
        border: '1px solid rgba(255,255,255,0.09)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* Window chrome dots */}
      <div className="flex items-center gap-1.5 px-4 pt-3 pb-0">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
      </div>

      <div className="flex" style={{ minHeight: 420 }}>
        {/* Sidebar */}
        <aside
          className="hidden sm:flex flex-col py-4 px-3 gap-1 flex-shrink-0"
          style={{
            width: 180,
            borderRight: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="px-2 mb-5 mt-1">
            <span className="text-xs font-black tracking-tight" style={{ color: PRIMARY }}>
              Menos.
            </span>
          </div>
          {SIDEBAR_ITEMS.map(({ icon: Icon, label, active }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all"
              style={{
                background: active ? PRIMARY_DIM : 'transparent',
                border: active ? `1px solid rgba(0,255,102,0.2)` : '1px solid transparent',
                color: active ? PRIMARY : '#A3A3A3',
              }}
            >
              <Icon size={13} />
              {label}
            </div>
          ))}
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between gap-3">
            <div
              className="flex items-center gap-2 flex-1 max-w-xs px-3 py-1.5 rounded-lg text-xs text-[#A3A3A3]"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <Search size={11} />
              <span>Search…</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <Bell size={11} color="#A3A3A3" />
              </div>
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: PRIMARY, color: '#000' }}
              >
                M
              </div>
            </div>
          </div>

          {/* Title */}
          <div>
            <p className="text-xs font-bold text-white">Dashboard Overview</p>
            <p className="text-[10px] text-[#A3A3A3] mt-0.5">Last 30 days</p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-3">
            {STAT_CARDS.map(({ label, value, delta, Icon }) => (
              <div
                key={label}
                className="rounded-xl p-3 flex flex-col gap-2"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-[#A3A3A3] font-medium uppercase tracking-wide">
                    {label}
                  </span>
                  <Icon size={10} color="#A3A3A3" />
                </div>
                <p className="text-sm font-black text-white">{value}</p>
                <div className="flex items-center gap-1">
                  <TrendingUp size={9} color={PRIMARY} />
                  <span className="text-[9px] font-semibold" style={{ color: PRIMARY }}>
                    {delta}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Chart + Upcoming */}
          <div className="flex gap-3 flex-1 min-h-0">
            {/* Chart */}
            <div
              className="flex-1 rounded-xl p-3 flex flex-col gap-2 min-w-0"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] font-bold text-white">Post Engagement</p>
                <span
                  className="text-[9px] px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: PRIMARY_DIM, color: PRIMARY }}
                >
                  Live
                </span>
              </div>
              <div className="flex-1" style={{ minHeight: 60 }}>
                <LineChart />
              </div>

              {/* Recent posts */}
              <div className="mt-2 flex flex-col gap-1.5">
                <p className="text-[9px] text-[#A3A3A3] uppercase tracking-widest font-semibold mb-1">
                  Recent Posts
                </p>
                {RECENT_POSTS.map((p, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle size={9} color={PRIMARY} className="flex-shrink-0" />
                    <span className="text-[9px] text-[#A3A3A3] flex-1 truncate">{p.text}</span>
                    <span
                      className="text-[8px] px-1.5 py-0.5 rounded-full font-semibold flex-shrink-0"
                      style={{ background: PRIMARY_DIM, color: PRIMARY }}
                    >
                      Published
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming */}
            <div
              className="hidden md:flex flex-col rounded-xl p-3 gap-2"
              style={{
                width: 160,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                flexShrink: 0,
              }}
            >
              <p className="text-[10px] font-bold text-white mb-1">Upcoming Posts</p>
              {UPCOMING_POSTS.map((p, i) => (
                <div
                  key={i}
                  className="rounded-lg p-2"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <p className="text-[9px] text-white font-medium leading-snug">{p.text}</p>
                  <p className="text-[8px] mt-1" style={{ color: PRIMARY }}>{p.time}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

// ─── Navbar ──────────────────────────────────────────────────────
const NAV_LINKS = ['Home', 'Features', 'Pricing', 'About']

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4"
      style={{
        background: 'rgba(5,5,5,0.75)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-1.5">
        <Sparkles size={15} color={PRIMARY} />
        <span className="text-lg font-black tracking-tight text-white">Menos</span>
      </Link>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((l) => (
          <li key={l}>
            <a
              href="#"
              className="text-sm text-[#A3A3A3] hover:text-white transition-colors duration-200 font-medium"
            >
              {l}
            </a>
          </li>
        ))}
      </ul>

      {/* Desktop CTA */}
      <Link
        to="/dashboard"
        className="hidden md:inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200"
        style={{
          border: '1px solid rgba(255,255,255,0.3)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = PRIMARY
          e.currentTarget.style.color = '#000'
          e.currentTarget.style.borderColor = PRIMARY
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = '#fff'
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
        }}
      >
        Get Started
        <ArrowRight size={13} />
      </Link>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-[#A3A3A3] hover:text-white transition-colors"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 flex flex-col px-6 py-4 gap-4"
            style={{
              background: 'rgba(5,5,5,0.97)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                href="#"
                className="text-sm text-[#A3A3A3] hover:text-white transition-colors font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {l}
              </a>
            ))}
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold text-black"
              style={{ background: PRIMARY }}
              onClick={() => setMenuOpen(false)}
            >
              Get Started
              <ArrowRight size={13} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

// ─── Main page ───────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: '#050505', color: '#fff' }}
    >
      <Navbar />

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative flex flex-col items-center text-center px-6 pt-32 pb-0 overflow-hidden">

        {/* ── Background radial glow ─── */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 45% at 50% 60%, rgba(0,255,102,0.07) 0%, transparent 70%)',
          }}
        />

        {/* ── Floating sparkles (desktop only) ─── */}
        {SPARKLES.map((s, i) => (
          <motion.div
            key={i}
            className="pointer-events-none absolute hidden md:block"
            style={{ top: s.top, left: s.left, right: s.right }}
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: s.dur, delay: s.delay, ease: 'easeInOut' }}
          >
            <SparkleIcon size={s.size} color={s.color} opacity={s.opacity} />
          </motion.div>
        ))}

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-semibold tracking-wide"
          style={{
            background: 'rgba(0,255,102,0.08)',
            border: '1px solid rgba(0,255,102,0.2)',
            color: PRIMARY,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: PRIMARY,
              boxShadow: `0 0 6px ${PRIMARY}`,
              animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
            }}
          />
          ✨ The future of social automation.
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.03] max-w-4xl mb-6"
        >
          Take Control Of Your
          <br />
          <em
            className="not-italic"
            style={{
              color: PRIMARY,
              textShadow: `0 0 40px rgba(0,255,102,0.45)`,
            }}
          >
            Social Growth
          </em>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#A3A3A3] text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
        >
          Menos is an AI-powered platform that automates your content generation and
          instantly posts to Facebook and Instagram. Upload once, publish everywhere.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-black transition-all duration-200"
            style={{
              background: PRIMARY,
              boxShadow: `0 0 28px ${PRIMARY_GLOW}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 48px rgba(0,255,102,0.55)`
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 0 28px ${PRIMARY_GLOW}`
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Start Publishing Now
            <ArrowRight size={15} />
          </Link>

          <button
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
            }}
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: PRIMARY }}
            >
              <Play size={8} fill="#000" color="#000" />
            </div>
            Watch Demo
          </button>
        </motion.div>

        {/* ── LIGHT BEAMS ──────────────────────────── */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 right-0 overflow-hidden"
          style={{ height: 340 }}
        >
          {[
            { left: '12%',  width: 56,  opacity: 0.55, delay: 0 },
            { left: '24%',  width: 36,  opacity: 0.38, delay: 0.4 },
            { left: '38%',  width: 80,  opacity: 0.65, delay: 0.1 },
            { left: '50%',  width: 48,  opacity: 0.72, delay: 0.6 },
            { left: '63%',  width: 70,  opacity: 0.58, delay: 0.2 },
            { left: '76%',  width: 40,  opacity: 0.42, delay: 0.8 },
            { left: '87%',  width: 54,  opacity: 0.5,  delay: 0.3 },
          ].map((beam, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: beam.opacity }}
              transition={{ duration: 1.4, delay: beam.delay + 0.4 }}
              style={{
                position: 'absolute',
                bottom: 0,
                left: beam.left,
                width: beam.width,
                height: '100%',
                background: `linear-gradient(to top, rgba(0,255,102,0.45) 0%, rgba(0,255,102,0.1) 55%, transparent 100%)`,
                filter: 'blur(28px)',
                transform: 'translateX(-50%)',
                borderRadius: 9999,
              }}
            />
          ))}
        </div>

        {/* ── DASHBOARD MOCKUP ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-5xl mx-auto px-4"
          style={{
            transformOrigin: 'top center',
          }}
        >
          {/* 3D tilt wrapper — desktop only */}
          <div
            className="hidden md:block"
            style={{
              transform: 'perspective(1200px) rotateX(10deg)',
              transformOrigin: 'top center',
            }}
          >
            <DashboardMockup />
          </div>

          {/* Mobile: flat */}
          <div className="block md:hidden">
            <DashboardMockup />
          </div>

          {/* Bottom fade-out gradient */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-1 left-0 right-0"
            style={{
              height: 160,
              background: 'linear-gradient(to bottom, transparent 0%, #050505 100%)',
            }}
          />
        </motion.div>
      </section>

      {/* ── FOOTER ───────────────────────────────── */}
      <footer
        className="flex flex-col sm:flex-row items-center justify-between gap-4 px-8 py-8 mt-16"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-1.5">
          <Sparkles size={13} color={PRIMARY} />
          <span
            className="text-sm font-black tracking-tight"
            style={{ color: PRIMARY }}
          >
            Menos
          </span>
        </div>
        <p className="text-xs text-[#A3A3A3]">
          &copy; {new Date().getFullYear()} Menos. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
