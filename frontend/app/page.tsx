'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    supabase.auth.getUser().then(({ data, error }) => setLoggedIn(!error && !!data.user))

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const features = [
    { icon: '📊', title: 'Live Command Center', desc: 'Revenue, cash flow, production and attendance in one real-time view. No more chasing spreadsheets across departments.' },
    { icon: '🧠', title: 'AI Insights Engine', desc: 'NEXUS Ω reads your data every hour and tells you what changed, what it means, and what to do next — in plain language.' },
    { icon: '💰', title: 'Finance & GST', desc: 'Invoices, expenses, GST filing status and receivables ageing tracked automatically for your CA team.' },
    { icon: '🏭', title: 'Operations & Inventory', desc: 'Production targets, machine downtime, stock levels and reorder alerts before you run out of material.' },
    { icon: '🕒', title: 'Attendance & HR', desc: 'Daily attendance, leave balances, shift records and performance scores for every employee.' },
    { icon: '🔐', title: 'Role-Based Access', desc: 'CEO, CA, Operations Manager and Employee each see exactly what they need — and nothing they should not.' },
  ]

  const roles = [
    { badge: '👑 CEO', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', line: 'Full company overview, profit trends, critical alerts and AI recommendations.' },
    { badge: '💰 CA / Finance', color: 'bg-green-500/20 text-green-400 border-green-500/30', line: 'Books, GST returns, tax deadlines, payables and receivables in one workspace.' },
    { badge: '🏭 Operations', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', line: 'Production dashboards, inventory movement, downtime logs and team output.' },
    { badge: '👤 Employee', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', line: 'Personal attendance, leave requests, tasks and performance snapshot.' },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Glow background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20" style={{ background: '#1e90ff' }} />
        <div className="absolute top-1/2 -right-40 w-[400px] h-[400px] rounded-full blur-[120px] opacity-15" style={{ background: '#8b5cf6' }} />
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? 'bg-[#0a0a0f]/90 backdrop-blur-md border-b border-[#2a2a3a]' : ''}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm" style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}>Ω</div>
            <span className="font-bold tracking-tight">NEXUS <span className="text-blue-400">Ω</span></span>
          </div>
          <div className="hidden md:flex items-center gap-7 text-sm text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#roles" className="hover:text-white transition-colors">For Teams</a>
            <a href="#how" className="hover:text-white transition-colors">How It Works</a>
          </div>
          <div className="flex items-center gap-3">
            {loggedIn ? (
              <Link href="/dashboard" className="px-4 py-2 text-xs font-bold rounded-lg transition-all" style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}>
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">Log in</Link>
                <Link href="/signup" className="px-4 py-2 text-xs font-bold rounded-lg transition-all" style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 pt-36 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-500/10 border border-blue-500/30 text-blue-400">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            AI-powered business operating system
          </span>

          <h1 className="mt-6 text-4xl md:text-6xl font-black leading-tight tracking-tight">
            Run your entire company<br />
            from <span style={{ background: 'linear-gradient(135deg, #1e90ff, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>one screen</span>
          </h1>

          <p className="mt-5 text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            NEXUS Ω pulls finance, operations, inventory and attendance into a single live dashboard —
            then uses AI to tell you what needs your attention today.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href={loggedIn ? '/dashboard' : '/signup'} className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold rounded-xl transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}>
              {loggedIn ? 'Open Dashboard' : 'Start Free Trial'} →
            </Link>
            <a href="#features" className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold rounded-xl border border-[#2a2a3a] text-gray-300 hover:text-white hover:bg-[#13131a] transition-all">
              See what it does
            </a>
          </div>

          <p className="mt-4 text-gray-600 text-xs">No credit card required · Setup in under 10 minutes</p>

          {/* Stat strip */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { v: '4', l: 'Role dashboards' },
              { v: '20+', l: 'Live metrics' },
              { v: '24/7', l: 'AI monitoring' },
              { v: '₹0', l: 'To get started' },
            ].map((s) => (
              <div key={s.l} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-4">
                <p className="text-2xl font-black text-white">{s.v}</p>
                <p className="text-gray-500 text-xs mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 py-20 px-6 border-t border-[#1a1a24]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Everything your business runs on</h2>
            <p className="mt-3 text-gray-400 text-sm md:text-base">
              Six connected modules that replace the pile of spreadsheets, WhatsApp groups and follow-up calls.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="group bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6 hover:border-blue-500/40 transition-all">
                <div className="w-11 h-11 rounded-lg bg-[#1a1a2e] flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="mt-4 font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="relative z-10 py-20 px-6 border-t border-[#1a1a24]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">One system, four points of view</h2>
            <p className="mt-3 text-gray-400 text-sm md:text-base">
              Each person logs in and lands on a dashboard built for their job — permissions handled automatically.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-4">
            {roles.map((r) => (
              <div key={r.badge} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${r.color}`}>{r.badge}</span>
                <p className="mt-3 text-gray-400 text-sm leading-relaxed">{r.line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative z-10 py-20 px-6 border-t border-[#1a1a24]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Live in three steps</h2>
          </div>

          <div className="mt-12 space-y-4">
            {[
              { n: '01', t: 'Create your account', d: 'Sign up, name your company and pick your role. Your workspace is ready instantly.' },
              { n: '02', t: 'Add your team & data', d: 'Invite employees, import invoices and set production targets. Everyone gets the right access level.' },
              { n: '03', t: 'Let NEXUS Ω watch it', d: 'The AI tracks every metric, flags what is off-track and sends you a weekly summary you will actually read.' },
            ].map((s) => (
              <div key={s.n} className="flex gap-5 bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
                <span className="text-2xl font-black flex-shrink-0" style={{ background: 'linear-gradient(135deg, #1e90ff, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {s.n}
                </span>
                <div>
                  <h3 className="font-bold text-white">{s.t}</h3>
                  <p className="mt-1 text-gray-400 text-sm leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-20 px-6 border-t border-[#1a1a24]">
        <div className="max-w-3xl mx-auto text-center bg-[#13131a] border border-[#2a2a3a] rounded-2xl p-10 md:p-14">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">Stop guessing. Start seeing.</h2>
          <p className="mt-4 text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            Give your team one place to work and yourself one place to check. Set it up today.
          </p>
          <Link href={loggedIn ? '/dashboard' : '/signup'} className="inline-block mt-8 px-8 py-3.5 text-sm font-bold rounded-xl transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}>
            {loggedIn ? 'Open Dashboard' : 'Create Free Account'} →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#1a1a24] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-6 h-6 rounded-md flex items-center justify-center font-black text-xs" style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}>Ω</div>
            <span>© {new Date().getFullYear()} NEXUS Ω. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-gray-500">
            <Link href="/login" className="hover:text-white transition-colors">Log in</Link>
            <Link href="/signup" className="hover:text-white transition-colors">Sign up</Link>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
