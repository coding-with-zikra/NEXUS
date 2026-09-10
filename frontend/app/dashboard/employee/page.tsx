'use client'
 
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
 
export default function EmployeeDashboard() {
  const router = useRouter()
  const [userName, setUserName] = useState('Sara')
  const [greeting, setGreeting] = useState('Good Morning')
  const [checkedIn, setCheckedIn] = useState(true)
  const [checkInTime] = useState('09:02 AM')
  const [question, setQuestion] = useState('')
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
          backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 50%',
        }} />
        <div className="absolute inset-0 z-0" style={{
          background: 'linear-gradient(135deg, rgba(5,10,25,0.93) 0%, rgba(10,20,45,0.87) 60%, rgba(5,10,25,0.78) 100%)'
        }} />
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-white">{greeting}, {userName}! 👋</h1>
          <p className="text-gray-400 text-sm mt-1">Here's your personal overview.</p>
        </div>
        <div className="relative z-10 hidden md:block text-right">
          <p className="text-blue-300 text-sm italic">"Small steps everyday lead to big results."</p>
          <p className="text-gray-500 text-xs mt-1">— NEXUS Ω</p>
        </div>
      </div>
 
      {/* ── Main content ── */}
      <div className="p-6 space-y-5 max-w-5xl w-full">
 
        {/* ── 4 KPI Cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: 'Days Present',
              value: '18 / 22',
              sub: '↑ 2 this month',
              icon: '📅',
              color: 'text-green-400',
              border: 'border-green-500/30',
              bg: 'from-green-500/10 to-transparent',
            },
            {
              label: 'Leave Balance',
              value: '6 days',
              sub: '→ 0 used',
              icon: '🌴',
              color: 'text-blue-400',
              border: 'border-blue-500/30',
              bg: 'from-blue-500/10 to-transparent',
            },
            {
              label: 'Next Salary',
              value: '5 Oct 2026',
              sub: 'in 12 days',
              icon: '💰',
              color: 'text-purple-400',
              border: 'border-purple-500/30',
              bg: 'from-purple-500/10 to-transparent',
            },
            {
              label: 'Overtime Hours',
              value: '8 hrs',
              sub: '↑ 2 hrs this week',
              icon: '⏱️',
              color: 'text-orange-400',
              border: 'border-orange-500/30',
              bg: 'from-orange-500/10 to-transparent',
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
              <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
              <p className="text-gray-500 text-xs mt-1">{kpi.sub}</p>
            </div>
          ))}
        </div>
 
        {/* ── Today's Attendance + My Tasks ── */}
        <div className="grid grid-cols-2 gap-4">
 
          {/* Today's Attendance */}
          <div
            className="rounded-2xl p-5 border border-[#2a2a3a]"
            style={{ background: 'rgba(15,20,40,0.8)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">Today's Attendance</h2>
              <span className="bg-green-500/15 text-green-400 text-xs px-3 py-1 rounded-full border border-green-500/30">
                ✓ Present
              </span>
            </div>
 
            {/* Check in/out timeline */}
            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 border-2 border-green-400 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Check In</p>
                  <p className="text-white font-bold text-sm">{checkInTime}</p>
                </div>
                <p className="text-gray-500 text-xs ml-auto">Location: Office</p>
              </div>
              <div className="w-px h-4 bg-[#2a2a3a] ml-4" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2a2a3a] border-2 border-gray-600 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-gray-600" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Check Out</p>
                  <p className="text-gray-500 font-bold text-sm">— : —</p>
                </div>
              </div>
            </div>
 
            <button
              onClick={() => setCheckedIn(!checkedIn)}
              className="w-full py-2.5 text-sm font-bold text-white rounded-xl transition-all hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}
            >
              View Attendance
            </button>
          </div>
 
          {/* My Tasks */}
          <div
            className="rounded-2xl p-5 border border-[#2a2a3a]"
            style={{ background: 'rgba(15,20,40,0.8)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">My Tasks</h2>
              <span className="text-yellow-400 text-xs">3 pending</span>
            </div>
 
            <div className="space-y-3 mb-5">
              {[
                { task: 'Complete report', done: true },
                { task: 'Team meeting', done: false },
                { task: 'Update records', done: false },
              ].map((t) => (
                <div key={t.task} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                    t.done
                      ? 'bg-green-500'
                      : 'border-2 border-gray-600'
                  }`}>
                    {t.done && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span className={`text-sm ${t.done ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                    {t.task}
                  </span>
                </div>
              ))}
            </div>
 
            <button
              onClick={() => router.push('/dashboard/employee/tasks')}
              className="w-full py-2.5 text-sm font-bold text-white rounded-xl transition-all hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
            >
              View All Tasks
            </button>
          </div>
        </div>
 
        {/* ── Ask NEXUS ── */}
        <div
          className="rounded-2xl p-6 border border-blue-500/25"
          style={{ background: 'rgba(15, 23, 48, 0.85)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #2563eb33, #7c3aed33)', border: '1px solid rgba(124,58,237,0.35)' }}
            >
              <span className="text-xl">✨</span>
            </div>
            <div>
              <h2 className="text-white font-semibold text-base">Ask NEXUS</h2>
              <p className="text-gray-500 text-xs">Get instant answers to your work questions.</p>
            </div>
          </div>
 
          {/* Input */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything about your work..."
              className="flex-1 bg-[#0d1220] border border-[#2a2a3a] text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 placeholder-gray-600"
            />
            <button
              className="px-4 py-2.5 text-white rounded-xl font-bold transition-all hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}
            >
              →
            </button>
          </div>
 
          {/* Quick question pills */}
          <div className="flex flex-wrap gap-2">
            {[
              'Was I present yesterday?',
              'How many leave days do I have?',
              'When is my next salary?',
            ].map((q) => (
              <button
                key={q}
                onClick={() => setQuestion(q)}
                className="text-xs text-blue-400 border border-blue-500/20 rounded-full px-3 py-1.5 hover:bg-blue-500/10 transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
 
      </div>
    </div>
  )
}