'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function EmployeeDashboard() {
  const router = useRouter()
  const [userName, setUserName] = useState('Aarav')
  const [greeting, setGreeting] = useState('Good Evening')
  const [checkedIn, setCheckedIn] = useState(true)
  const [checkInTime] = useState('09:02 AM')
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
      {/* Hero Banner */}
      <div className="relative px-8 py-6 flex items-center justify-between overflow-hidden" style={{ minHeight: '120px' }}>
        <div className="absolute inset-0 z-0"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center 60%' }}
        />
        <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(90deg, rgba(5,10,25,0.92) 0%, rgba(5,10,25,0.70) 60%, rgba(5,10,25,0.50) 100%)' }} />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white">{greeting}, {userName}! 👋</h1>
          <p className="text-gray-400 text-sm mt-1">Stay productive. Keep learning. You make a difference.</p>
        </div>
        <div className="relative z-10 text-right">
          <p className="text-blue-300 text-sm italic">"Small steps everyday</p>
          <p className="text-blue-300 text-sm italic">lead to big results."</p>
          <p className="text-gray-500 text-xs mt-1">— NEXUS Ω</p>
        </div>
      </div>

      <div className="p-6 space-y-5">

        {/* KPI Row */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Days Present', value: '21 / 22', sub: 'This Month', sub2: '↑ 5%', icon: '📅', color: 'text-green-400', border: 'border-green-500/30', bg: 'from-green-500/10' },
            { label: 'Leave Balance', value: '8 days', sub: 'of 12 days', sub2: '→', icon: '🌴', color: 'text-blue-400', border: 'border-blue-500/30', bg: 'from-blue-500/10' },
            { label: 'Next Salary', value: '₹45,000', sub: 'Due in 12 days', sub2: '→', icon: '💰', color: 'text-purple-400', border: 'border-purple-500/30', bg: 'from-purple-500/10' },
            { label: 'Overtime Hours', value: '12 hrs', sub: 'This Month', sub2: '↑ 20%', icon: '⏱️', color: 'text-orange-400', border: 'border-orange-500/30', bg: 'from-orange-500/10' },
          ].map((kpi) => (
            <div key={kpi.label} className={`bg-gradient-to-br ${kpi.bg} to-transparent border ${kpi.border} rounded-xl p-5 flex items-center gap-4`}>
              <div className="w-12 h-12 rounded-xl bg-[#1a1a2e] flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">{kpi.icon}</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-400 text-xs mb-1">{kpi.label}</p>
                <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-gray-500 text-xs">{kpi.sub}</p>
                  <p className="text-green-400 text-xs">{kpi.sub2}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-3 gap-4">
          {/* Today's Attendance */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">Today's Attendance</h2>
              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full border border-green-500/30">
                ● Present
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 border-2 border-green-400 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Check In</p>
                  <p className="text-white font-bold">{checkInTime}</p>
                </div>
              </div>
              <div className="w-0.5 h-4 bg-[#2a2a3a] ml-4" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2a2a3a] border-2 border-gray-600 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-gray-600" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Check Out</p>
                  <p className="text-gray-500 font-bold">— : —</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setCheckedIn(!checkedIn)}
              className="w-full mt-4 py-2.5 text-sm font-bold text-white rounded-lg transition-all"
              style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}
            >
              ⏱ Check Out
            </button>
          </div>

          {/* My Tasks */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">My Tasks</h2>
              <button className="text-blue-400 text-xs hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {[
                { task: 'Prepare monthly report', status: 'Completed', color: 'bg-green-500/20 text-green-400', done: true },
                { task: 'Update project documents', status: 'In Progress', color: 'bg-blue-500/20 text-blue-400', done: false },
                { task: 'Attend team meeting', status: 'Pending', color: 'bg-gray-500/20 text-gray-400', done: false },
                { task: 'Learn new system module', status: 'Pending', color: 'bg-gray-500/20 text-gray-400', done: false },
              ].map((t) => (
                <div key={t.task} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${t.done ? 'bg-green-500' : 'border-2 border-gray-600'}`}>
                    {t.done && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span className={`text-xs flex-1 ${t.done ? 'text-gray-500 line-through' : 'text-gray-300'}`}>{t.task}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${t.color}`}>{t.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Leave Summary */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">Leave Summary</h2>
              <button className="text-blue-400 text-xs hover:underline">View All</button>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-24 h-24">
                <svg viewBox="0 0 36 36" className="w-24 h-24 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1a1a2e" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3b82f6" strokeWidth="3"
                    strokeDasharray="67 33" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-white font-bold text-lg">8</span>
                  <span className="text-gray-500 text-xs">Days Left</span>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Used', value: 4, color: 'bg-purple-400' },
                  { label: 'Remaining', value: 8, color: 'bg-blue-400' },
                  { label: 'Total', value: 12, color: 'bg-gray-400' },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${l.color}`} />
                    <span className="text-gray-400 text-xs">{l.label}</span>
                    <span className="text-white text-xs font-bold ml-auto">{l.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="w-full py-2 text-xs font-bold text-white rounded-lg transition-all"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
            >
              🌴 Apply for Leave
            </button>
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-3 gap-4">
          {/* Recent Payslip */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">Recent Payslip</h2>
              <button className="text-blue-400 text-xs hover:underline">View All</button>
            </div>
            <div className="flex items-center gap-4 p-3 bg-[#1a1a2e] rounded-lg border border-[#2a2a3a] mb-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-400 text-lg">📄</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-400 text-xs">August 2025</p>
                <p className="text-white font-bold">₹45,000</p>
              </div>
              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">Downloaded</span>
            </div>
            <button className="text-blue-400 text-xs hover:underline">View Details →</button>
          </div>

          {/* Upcoming Holidays */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">Upcoming Holidays</h2>
              <button className="text-blue-400 text-xs hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {[
                { date: '2 Oct 2025', name: 'Gandhi Jayanti' },
                { date: '12 Nov 2025', name: 'Diwali' },
                { date: '25 Dec 2025', name: 'Christmas' },
              ].map((h) => (
                <div key={h.name} className="flex items-center gap-3 p-2 bg-[#1a1a2e] rounded-lg">
                  <span className="text-blue-400 text-sm">📅</span>
                  <div>
                    <p className="text-gray-400 text-xs">{h.date}</p>
                    <p className="text-white text-sm font-medium">{h.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Overview */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">Performance Overview</h2>
              <button className="text-blue-400 text-xs hover:underline">View Details</button>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-20 h-20">
                <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1a1a2e" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#10b981" strokeWidth="3"
                    strokeDasharray="78 22" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-white font-bold">78%</span>
                  <span className="text-gray-500 text-xs">Overall</span>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                {[
                  { label: 'Productivity', value: 85, color: 'bg-green-400' },
                  { label: 'Teamwork', value: 80, color: 'bg-blue-400' },
                  { label: 'Punctuality', value: 90, color: 'bg-purple-400' },
                  { label: 'Quality of Work', value: 75, color: 'bg-yellow-400' },
                ].map((p) => (
                  <div key={p.label} className="flex items-center gap-2">
                    <span className="text-gray-400 text-xs w-24">{p.label}</span>
                    <div className="flex-1 bg-[#2a2a3a] rounded-full h-1.5">
                      <div className={`${p.color} h-1.5 rounded-full`} style={{ width: `${p.value}%` }} />
                    </div>
                    <span className="text-gray-400 text-xs w-8">{p.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ask NEXUS */}
        <div className="bg-[#13131a] border border-blue-500/30 rounded-xl p-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg">✨</span>
            </div>
            <div className="flex-1">
              <h2 className="text-white font-semibold mb-1">Ask NEXUS</h2>
              <p className="text-gray-400 text-xs mb-3">Get instant answers about your attendance, salary, leave, tasks and more.</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  className="flex-1 bg-[#1a1a2e] border border-[#2a2a3a] text-white text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                />
                <button
                  className="px-4 py-2 text-white rounded-lg font-bold transition-all"
                  style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}
                >
                  →
                </button>
              </div>
              <div className="flex gap-2 mt-3 flex-wrap">
                {[
                  'How many leave days do I have left?',
                  'Show my last payslip',
                  'Was I present yesterday?',
                  'When is my next salary?',
                ].map((q) => (
                  <button key={q} className="text-xs text-blue-400 border border-blue-500/20 rounded-full px-3 py-1 hover:bg-blue-500/10 transition-all">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}