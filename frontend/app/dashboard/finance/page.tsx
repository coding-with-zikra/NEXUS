'use client'
 
import { createClient } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
 
export default function ManagerDashboard() {
  const router = useRouter()
  const [greeting, setGreeting] = useState('Good Morning')
  const [userName, setUserName] = useState('Rahul')
  const supabase = createClient()
 
  useEffect(() => {
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
 
  return (
    <div className="flex flex-col min-h-full">
 
      {/* ── Hero Banner ── */}
      <div
        className="relative px-8 py-6 flex items-center justify-between overflow-hidden"
        style={{ minHeight: 110 }}
      >
        <div className="absolute inset-0 z-0" style={{
          backgroundImage: `url('https://img.magnific.com/premium-photo/sleek-desk-computer-modern-office-workspace_1160544-6477.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
        }} />
        <div className="absolute inset-0 z-0" style={{
          background: 'linear-gradient(135deg, rgba(5,10,25,0.93) 0%, rgba(10,20,45,0.87) 60%, rgba(5,10,25,0.78) 100%)'
        }} />
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-white">{greeting}, {userName}! 👋</h1>
          <p className="text-gray-400 text-sm mt-1">Here's what's happening in your department.</p>
        </div>
        <div className="relative z-10 hidden md:block text-right">
          <p className="text-blue-300 text-sm italic">"Better teams. Stronger results."</p>
          <p className="text-gray-500 text-xs mt-1">— NEXUS Ω</p>
        </div>
      </div>
 
      {/* ── Main content ── */}
      <div className="p-6 space-y-5 max-w-5xl w-full">
 
        {/* ── Row 1: 3 KPI cards ── */}
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              label: 'Team Members',
              value: '24',
              sub: '↑ 2 this month',
              icon: '👥',
              color: 'text-blue-400',
              border: 'border-blue-500/30',
              bg: 'from-blue-500/10 to-transparent',
            },
            {
              label: 'Work Output',
              value: '92%',
              sub: '↑ 5% vs last month',
              icon: '📊',
              color: 'text-green-400',
              border: 'border-green-500/30',
              bg: 'from-green-500/10 to-transparent',
            },
            {
              label: 'Pending Tasks',
              value: '8',
              sub: '↓ 3 from last week',
              icon: '📋',
              color: 'text-yellow-400',
              border: 'border-yellow-500/30',
              bg: 'from-yellow-500/10 to-transparent',
            },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className={`bg-gradient-to-br ${kpi.bg} border ${kpi.border} rounded-2xl p-5`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{kpi.icon}</span>
                <p className="text-gray-400 text-xs font-medium">{kpi.label}</p>
              </div>
              <p className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</p>
              <p className="text-gray-500 text-xs mt-1">{kpi.sub}</p>
            </div>
          ))}
        </div>
 
        {/* ── Row 2: Production Efficiency + Critical Issues ── */}
        <div className="grid grid-cols-2 gap-4">
          {/* Production Efficiency */}
          <div className="bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/30 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🏭</span>
              <p className="text-gray-400 text-xs font-medium">Production Efficiency</p>
            </div>
            <p className="text-3xl font-bold text-purple-400">87%</p>
            <p className="text-gray-500 text-xs mt-1">↑ 4% vs last week</p>
          </div>
 
          {/* Critical Issues */}
          <div className="bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/30 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">⚠️</span>
              <p className="text-gray-400 text-xs font-medium">Critical Issues</p>
            </div>
            <p className="text-3xl font-bold text-red-400">2</p>
            <p className="text-red-400 text-xs mt-1">requires attention</p>
          </div>
        </div>
 
        {/* ── NEXUS AI — Department Insight ── */}
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
              <h2 className="text-white font-semibold text-base">NEXUS AI — Department Insight</h2>
              <p className="text-gray-500 text-xs">AI-powered operations intelligence</p>
            </div>
          </div>
 
          {/* Insight text */}
          <div
            className="rounded-xl p-4 mb-5 border border-red-500/20"
            style={{ background: 'rgba(239,68,68,0.06)' }}
          >
            <p className="text-white font-medium text-sm leading-relaxed">
              Production efficiency dropped in the last 7 days.
            </p>
            <p className="text-gray-400 text-xs mt-2 leading-relaxed">
              Root cause: Increased downtime in Machine #04.
            </p>
          </div>
 
          {/* 3 stat badges */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="rounded-xl p-3 text-center border border-[#2a2a3a]" style={{ background: 'rgba(20,20,35,0.8)' }}>
              <p className="text-gray-500 text-xs mb-1">Problem</p>
              <p className="text-red-400 text-sm font-semibold">Machine #04</p>
            </div>
            <div className="rounded-xl p-3 text-center border border-orange-500/25" style={{ background: 'rgba(249,115,22,0.07)' }}>
              <p className="text-gray-500 text-xs mb-1">Root Cause</p>
              <p className="text-orange-400 text-sm font-semibold">Downtime ↑</p>
            </div>
            <div className="rounded-xl p-3 text-center border border-blue-500/25" style={{ background: 'rgba(37,99,235,0.08)' }}>
              <p className="text-gray-500 text-xs mb-1">Recommended Action</p>
              <p className="text-blue-400 text-sm font-semibold">Schedule maintenance</p>
            </div>
          </div>
 
          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/dashboard/operations')}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}
            >
              View Details →
            </button>
            <button
              onClick={() => router.push('/dashboard/operations/maintenance')}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)' }}
            >
              Create Action
            </button>
          </div>
        </div>
 
      </div>
    </div>
  )
}