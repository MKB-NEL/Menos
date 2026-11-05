import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Sparkles, BarChart2, ArrowRight, Lock, ChevronRight } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

const features = [
  {
    icon: Zap,
    title: 'Auto-Posting',
    description:
      'Schedule and publish content to Facebook and Instagram automatically. Set it, forget it, and watch your reach grow.',
    badge: 'Active',
    badgeStyle: 'bg-neon/10 border border-neon/30 text-neon',
    locked: false,
  },
  {
    icon: Sparkles,
    title: 'AI Generation',
    description:
      'Let Menos AI craft compelling captions, hashtags, and hooks tailored to your brand voice and audience.',
    badge: 'Coming Soon',
    badgeStyle: 'bg-white/5 border border-white/10 text-muted',
    locked: true,
  },
  {
    icon: BarChart2,
    title: 'Analytics',
    description:
      'Deep insights into post performance, reach, engagement rates, and audience growth across all connected platforms.',
    badge: 'Coming Soon',
    badgeStyle: 'bg-white/5 border border-white/10 text-muted',
    locked: true,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 glass border-b border-glass-border">
        <motion.span
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold tracking-tight neon-text"
        >
          Menos.
        </motion.span>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/dashboard"
            className="btn-ghost inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm"
          >
            Go to Dashboard
            <ChevronRight size={15} />
          </Link>
        </motion.div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-20 text-center">
        {/* Background glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div
            style={{
              width: 700,
              height: 700,
              borderRadius: '50%',
              background:
                'radial-gradient(ellipse at center, rgba(57,255,20,0.09) 0%, rgba(57,255,20,0.03) 45%, transparent 70%)',
            }}
          />
        </div>

        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-neon/20 text-xs font-semibold text-neon tracking-widest uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
          Social Media Automation
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6 max-w-5xl"
        >
          Automate your{' '}
          <span className="neon-text">Social&nbsp;Presence</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-muted text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
        >
          Menos connects your media library to Facebook and Instagram and handles
          publishing on autopilot — so you can focus on creating.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <Link
            to="/dashboard"
            className="btn-neon inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm"
          >
            Start Publishing Now
            <ArrowRight size={16} />
          </Link>
          <a
            href="#features"
            className="text-muted text-sm hover:text-white transition-colors"
          >
            See what&apos;s included ↓
          </a>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="relative px-6 pb-32 max-w-6xl mx-auto">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Everything you need
          </h2>
          <p className="text-muted text-lg max-w-md mx-auto">
            One platform to manage, schedule, and grow your social presence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -4 }}
              className={`glass glass-hover rounded-2xl p-8 relative overflow-hidden ${
                feature.locked ? 'opacity-70' : ''
              }`}
            >
              {feature.locked && (
                <div className="absolute top-4 right-4 text-muted/40">
                  <Lock size={14} />
                </div>
              )}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: feature.locked
                    ? 'rgba(255,255,255,0.05)'
                    : 'rgba(57,255,20,0.1)',
                  border: feature.locked
                    ? '1px solid rgba(255,255,255,0.08)'
                    : '1px solid rgba(57,255,20,0.25)',
                }}
              >
                <feature.icon
                  size={20}
                  color={feature.locked ? '#A3A3A3' : '#39FF14'}
                />
              </div>
              <div
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide mb-3 ${feature.badgeStyle}`}
              >
                {feature.badge}
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-muted text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm font-bold neon-text">Menos.</span>
        <span className="text-muted text-xs">
          &copy; {new Date().getFullYear()} Menos. All rights reserved.
        </span>
      </footer>
    </div>
  )
}

