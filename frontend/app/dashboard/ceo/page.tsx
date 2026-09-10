'use client'
 
import { createClient } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
 
const API = process.env.NEXT_PUBLIC_API_URL
 
export default function CEODashboard() {
  const router = useRouter()
  const [health, setHealth] = useState<any>(null)
  const [greeting, setGreeting] = useState('Good Morning')
  const [userName, setUserName] = useState('Aarav')
  const supabase = createClient()
 
  useEffect(() => {
    fetch(`${API}/api/dashboard/health-score`).then(r => r.json()).then(setHealth).catch(() => {})
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 17) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')
 
    supabase.auth.getSession().then(async ({ data: sessionData }) => {
      const user = sessionData.session?.user
      if (!user) return
      const meta = user.user_metadata
      const name = meta?.full_name?.split(' ')[0]
      if (name) { setUserName(name); return }
      const { data: profile } = await supabase
        .from('profiles').select('full_name').eq('id', user.id).single()
      if (profile?.full_name) setUserName(profile.full_name.split(' ')[0])
    })
  }, [])
 
  const kpis = [
    {
      label: 'Company Health',
      value: `${health?.overall ?? 84}/100`,
      sub: '↑ 6% vs last month',
      icon: '❤️',
      color: 'text-green-400',
      border: 'border-green-500/30',
      bg: 'from-green-500/10 to-transparent',
    },
    {
      label: 'Total Revenue',
      value: '₹12.6 Cr',
      sub: '↑ 12% vs last month',
      icon: '📈',
      color: 'text-blue-400',
      border: 'border-blue-500/30',
      bg: 'from-blue-500/10 to-transparent',
    },
    {
      label: 'Net Profit',
      value: '₹2.8 Cr',
      sub: '↑ 18% vs last month',
      icon: '💰',
      color: 'text-purple-400',
      border: 'border-purple-500/30',
      bg: 'from-purple-500/10 to-transparent',
    },
    {
      label: 'Cash Balance',
      value: '₹4.2 Cr',
      sub: '↑ 9% vs last month',
      icon: '🏦',
      color: 'text-cyan-400',
      border: 'border-cyan-500/30',
      bg: 'from-cyan-500/10 to-transparent',
    },
  ]
 
  return (
    <div className="flex flex-col min-h-full">
 
      {/* ── Hero Banner ── */}
      <div
        className="relative px-8 py-6 flex items-center justify-between overflow-hidden"
        style={{ minHeight: 110 }}
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
          }}
        />
        <div
          className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(135deg, rgba(5,10,25,0.93) 0%, rgba(10,20,45,0.87) 60%, rgba(5,10,25,0.78) 100%)' }}
        />
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-white">
            {greeting}, {userName}! 👋
          </h1>
          <p className="text-gray-400 text-sm mt-1">Here's your company overview for today.</p>
        </div>
        <div className="relative z-10 flex items-center gap-4">
          <button
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}
          >
            📄 Generate Executive Report
          </button>
          <div className="text-right hidden md:block">
            <p className="text-blue-300 text-sm italic">"Better data. Bolder decisions."</p>
            <p className="text-gray-500 text-xs mt-1">— NEXUS Ω</p>
          </div>
        </div>
      </div>
 
      {/* ── Main content ── */}
      <div className="p-6 space-y-5 max-w-5xl w-full">
 
        {/* ── 4 KPI Cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className={`bg-gradient-to-br ${kpi.bg} border ${kpi.border} rounded-2xl p-5`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{kpi.icon}</span>
                <p className="text-gray-400 text-xs font-medium">{kpi.label}</p>
              </div>
              <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
              <p className="text-gray-500 text-xs mt-1">{kpi.sub}</p>
            </div>
          ))}
        </div>
 
        {/* ── NEXUS AI — Critical Insight ── */}
        <div
          className="rounded-2xl p-6 border border-blue-500/25"
          style={{ background: 'rgba(15, 23, 48, 0.85)' }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #7c3aed22, #2563eb22)', border: '1px solid rgba(124,58,237,0.35)' }}
            >
              <span className="text-xl">🧠</span>
            </div>
            <div>
              <h2 className="text-white font-semibold text-base">NEXUS AI — Critical Insight</h2>
              <p className="text-gray-500 text-xs">AI-powered executive intelligence</p>
            </div>
          </div>
 
          {/* Insight text */}
          <div
            className="rounded-xl p-4 mb-5 border border-yellow-500/20"
            style={{ background: 'rgba(234,179,8,0.06)' }}
          >
            <p className="text-white font-medium text-sm leading-relaxed">
              Cash-flow pressure expected next quarter.
            </p>
            <p className="text-gray-400 text-xs mt-2 leading-relaxed">
              Root cause: ₹2.1 Cr outstanding receivables from top 3 customers.
            </p>
          </div>
 
          {/* 3 stat badges */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="rounded-xl p-3 text-center border border-[#2a2a3a]" style={{ background: 'rgba(20,20,35,0.8)' }}>
              <p className="text-gray-500 text-xs mb-1">Root Cause</p>
              <p className="text-orange-400 text-sm font-semibold">Receivables</p>
            </div>
            <div className="rounded-xl p-3 text-center border border-yellow-500/25" style={{ background: 'rgba(234,179,8,0.07)' }}>
              <p className="text-gray-500 text-xs mb-1">Risk Level</p>
              <p className="text-yellow-400 text-sm font-semibold">⚠️ Medium</p>
            </div>
            <div className="rounded-xl p-3 text-center border border-blue-500/25" style={{ background: 'rgba(37,99,235,0.08)' }}>
              <p className="text-gray-500 text-xs mb-1">Decision Readiness</p>
              <p className="text-blue-400 text-sm font-semibold">62%</p>
            </div>
          </div>
 
          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/dashboard/intelligence/root-cause')}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}
            >
              View Analysis →
            </button>
            <button
              onClick={() => router.push('/dashboard/future-lab')}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
            >
              Simulate
            </button>
          </div>
        </div>
 
      </div>
    </div>
  )
}