'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'

const productionData = [
  { day: 'Mon', Actual: 12000, Target: 15000 },
  { day: 'Tue', Actual: 14000, Target: 15000 },
  { day: 'Wed', Actual: 13500, Target: 15000 },
  { day: 'Thu', Actual: 16000, Target: 15000 },
  { day: 'Fri', Actual: 15500, Target: 15000 },
  { day: 'Sat', Actual: 24560, Target: 15000 },
  { day: 'Sun', Actual: 14000, Target: 15000 },
]

const salesData = [
  { name: 'Orders', Target: 300, Actual: 320 },
  { name: 'Revenue (₹L)', Target: 350, Actual: 380 },
  { name: 'New Customers', Target: 50, Actual: 42 },
]

const attendanceData = [
  { name: 'Present', value: 38, color: '#10b981' },
  { name: 'Absent', value: 2, color: '#ef4444' },
  { name: 'Leave', value: 2, color: '#f59e0b' },
]

export default function ManagerDashboard() {
  const router = useRouter()
  const [userName, setUserName] = useState('Manager')
  const [greeting, setGreeting] = useState('Good Morning')
  const supabase = createClient()

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 17) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')

    supabase.auth.getUser().then(async ({ data }) => {
      const meta = data.user?.user_metadata
      const name = meta?.full_name?.split(' ')[0]
      if (name) {
        setUserName(name)
      } else if (data.user) {
        // Look up from profiles table
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', data.user.id)
          .single()
        if (profile?.full_name) {
          setUserName(profile.full_name.split(' ')[0])
        }
      }
    })
  }, [])

  return (
    <div className="flex flex-col min-h-full">
      {/* Hero Banner */}
      <div className="relative px-8 py-5 flex items-center justify-between overflow-hidden" style={{ minHeight: '110px' }}>
          <div className="absolute inset-0 z-0" style={{backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80')` }} />
        {/* Stars */}
        <div className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, #7eb8f7 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Mountain layers */}
        <svg className="absolute bottom-0 left-0 right-0 z-0 w-full" viewBox="0 0 1440 110" preserveAspectRatio="none">
          <path d="M0,110 L0,70 L60,45 L120,65 L200,25 L280,55 L360,15 L440,50 L520,30 L600,60 L680,20 L760,55 L840,35 L920,65 L1000,25 L1080,58 L1160,38 L1240,62 L1320,42 L1440,68 L1440,110 Z" fill="#0d2040" opacity="0.9"/>
          <path d="M0,110 L0,80 L150,58 L300,75 L450,48 L600,70 L750,52 L900,72 L1050,55 L1200,75 L1440,62 L1440,110 Z" fill="#162850" opacity="0.95"/>
          <path d="M0,110 L0,92 L360,80 L720,88 L1080,78 L1440,85 L1440,110 Z" fill="#1a3060" opacity="1"/>
        </svg>
        {/* Gradient overlay */}
        <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(90deg, rgba(5,10,25,0.88) 0%, rgba(5,10,25,0.60) 50%, rgba(5,10,25,0.75) 100%)' }} />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-1">
          <h1 className="text-3xl font-bold text-white">{greeting}, {userName}! 👋</h1>
            <div className="bg-[#1a2a3a] border border-blue-500/30 rounded-lg px-3 py-1">
              <p className="text-gray-400 text-xs">Department</p>
              <p className="text-white text-sm font-medium">Operations ▾</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm">Here's what's happening in your department today.</p>
        </div>
        <div className="relative z-10 text-right">
          <p className="text-blue-300 text-sm italic">"Great teams build</p>
          <p className="text-blue-300 text-sm italic">extraordinary results."</p>
          <p className="text-gray-500 text-xs mt-1">— NEXUS Ω</p>
        </div>
      </div>

      <div className="p-6 space-y-5">

        {/* KPI Row */}
        <div className="grid grid-cols-6 gap-3">
          {[
            { label: 'Team Members', value: '42', sub: '↑ 2 new this month', icon: '👥', color: 'text-blue-400', border: 'border-blue-500/30', bg: 'from-blue-500/10' },
            { label: 'Production Output', value: '24,560 units', sub: '↑ 8% vs last week', icon: '🏭', color: 'text-green-400', border: 'border-green-500/30', bg: 'from-green-500/10' },
            { label: 'Efficiency', value: '78%', sub: '↓ 4% vs last week', icon: '⚡', color: 'text-yellow-400', border: 'border-yellow-500/30', bg: 'from-yellow-500/10' },
            { label: 'Inventory Items', value: '1,245', sub: '3 low stock', icon: '📦', color: 'text-purple-400', border: 'border-purple-500/30', bg: 'from-purple-500/10' },
            { label: 'Sales Orders', value: '320', sub: '↑ 12% vs last week', icon: '🛒', color: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'from-cyan-500/10' },
            { label: 'Department Expenses', value: '₹8.4 L', sub: '↓ 6% vs last month', icon: '💰', color: 'text-orange-400', border: 'border-orange-500/30', bg: 'from-orange-500/10' },
          ].map((kpi) => (
            <div key={kpi.label} className={`bg-gradient-to-br ${kpi.bg} to-transparent border ${kpi.border} rounded-xl p-4`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{kpi.icon}</span>
              </div>
              <p className="text-gray-400 text-xs mb-1">{kpi.label}</p>
              <p className={`text-lg font-bold ${kpi.color}`}>{kpi.value}</p>
              <p className="text-gray-500 text-xs mt-0.5">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-3 gap-4">
          {/* Production Performance */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">📊 Production Performance</h2>
              <span className="text-gray-500 text-xs bg-[#1a1a2e] px-2 py-1 rounded">This Week</span>
            </div>
            <div className="mb-2">
              <p className="text-white text-xl font-bold">24,560 units</p>
              <p className="text-green-400 text-xs">(+8%)</p>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
                <XAxis dataKey="day" stroke="#444" tick={{ fill: '#666', fontSize: 10 }} />
                <YAxis stroke="#444" tick={{ fill: '#666', fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#13131a', border: '1px solid #2a2a3a', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                <Line type="monotone" dataKey="Target" stroke="#444" strokeWidth={1} dot={false} strokeDasharray="5 5" />
                <Line type="monotone" dataKey="Actual" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Team Attendance */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">👥 Team Attendance</h2>
              <span className="text-gray-500 text-xs bg-[#1a1a2e] px-2 py-1 rounded">Today</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24">
                <PieChart width={96} height={96}>
                  <Pie data={attendanceData} cx={44} cy={44} innerRadius={28} outerRadius={44} dataKey="value">
                    {attendanceData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-white font-bold text-sm">92%</span>
                  <span className="text-gray-500 text-xs">Present</span>
                </div>
              </div>
              <div className="space-y-2 flex-1">
                {[
                  { label: 'Present', value: 38, color: 'bg-green-400' },
                  { label: 'Absent', value: 2, color: 'bg-red-400' },
                  { label: 'Leave', value: 2, color: 'bg-yellow-400' },
                  { label: 'Total', value: 42, color: 'bg-gray-400' },
                ].map((a) => (
                  <div key={a.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${a.color}`} />
                      <span className="text-gray-400 text-xs">{a.label}</span>
                    </div>
                    <span className="text-white text-xs font-bold">{a.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Task Overview */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">📋 Task Overview</h2>
              <button className="text-blue-400 text-xs hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {[
                { task: 'Complete daily production report', progress: '3/3', status: 'done' },
                { task: 'Inspect machine #04', progress: '1/2', status: 'progress' },
                { task: 'Review supplier delivery', progress: '0/1', status: 'pending' },
                { task: "Plan next week's targets", progress: '0/1', status: 'pending' },
              ].map((t) => (
                <div key={t.task} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                    t.status === 'done' ? 'bg-green-500' :
                    t.status === 'progress' ? 'bg-blue-500' : 'border-2 border-gray-600'
                  }`}>
                    {t.status === 'done' && <span className="text-white text-xs">✓</span>}
                    {t.status === 'progress' && <span className="text-white text-xs">→</span>}
                  </div>
                  <span className={`text-xs flex-1 ${t.status === 'done' ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                    {t.task}
                  </span>
                  <span className="text-gray-500 text-xs">{t.progress}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 — Inventory, Sales, Supplier */}
        <div className="grid grid-cols-3 gap-4">
          {/* Inventory Status */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">📦 Inventory Status</h2>
              <button className="text-blue-400 text-xs hover:underline">View All</button>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-20 h-20">
                <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1a1a2e" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#10b981" strokeWidth="3"
                    strokeDasharray="92 8" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-white font-bold text-sm">92%</span>
                  <span className="text-gray-500 text-xs">In Stock</span>
                </div>
              </div>
              <div className="space-y-1.5">
                {[
                  { label: 'In Stock', value: '1,145', color: 'text-green-400', dot: 'bg-green-400' },
                  { label: 'Low Stock', value: '3', color: 'text-red-400', dot: 'bg-red-400' },
                  { label: 'Overstock', value: '5', color: 'text-yellow-400', dot: 'bg-yellow-400' },
                  { label: 'Total', value: '1,245', color: 'text-gray-300', dot: 'bg-gray-400' },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${s.dot}`} />
                    <span className="text-gray-400 text-xs">{s.label}</span>
                    <span className={`text-xs font-bold ml-auto ${s.color}`}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sales Performance */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">📈 Sales Performance</h2>
              <span className="text-gray-500 text-xs bg-[#1a1a2e] px-2 py-1 rounded">This Month</span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
                <XAxis dataKey="name" stroke="#444" tick={{ fill: '#666', fontSize: 10 }} />
                <YAxis stroke="#444" tick={{ fill: '#666', fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#13131a', border: '1px solid #2a2a3a', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                <Bar dataKey="Target" fill="#2a2a5a" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Actual" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Supplier Status */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">🚚 Supplier Status</h2>
              <button className="text-blue-400 text-xs hover:underline">View All</button>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-20 h-20">
                <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1a1a2e" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3b82f6" strokeWidth="3"
                    strokeDasharray="78 22" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-white font-bold text-sm">78%</span>
                  <span className="text-gray-500 text-xs">On Time</span>
                </div>
              </div>
              <div className="space-y-1.5">
                {[
                  { label: 'On Time', value: '18', color: 'text-green-400', dot: 'bg-green-400' },
                  { label: 'Delayed', value: '4', color: 'text-red-400', dot: 'bg-red-400' },
                  { label: 'At Risk', value: '2', color: 'text-yellow-400', dot: 'bg-yellow-400' },
                  { label: 'Total', value: '24', color: 'text-gray-300', dot: 'bg-gray-400' },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${s.dot}`} />
                    <span className="text-gray-400 text-xs">{s.label}</span>
                    <span className={`text-xs font-bold ml-auto ${s.color}`}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Row 3 — AI Insights, What-If, Quick Actions */}
        <div className="grid grid-cols-3 gap-4">
          {/* AI Insights */}
          <div className="bg-[#13131a] border border-blue-500/30 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span>🧠</span>
                <h2 className="text-white font-semibold text-sm">AI Insights for You</h2>
              </div>
              <button className="text-blue-400 text-xs hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {[
                { icon: '🔴', title: 'Production efficiency dropped by 6%', detail: 'Root cause: Increased downtime in Machine #04', time: '2 hours ago' },
                { icon: '🟡', title: '3 inventory items may go out of stock in 7 days', detail: 'Suggested action: Place purchase order', time: '4 hours ago' },
                { icon: '🔵', title: 'Supplier X has delayed 2 deliveries', detail: 'Consider alternate supplier', time: '6 hours ago' },
              ].map((insight, i) => (
                <div key={i} className="p-3 bg-[#1a1a2e] rounded-lg border border-[#2a2a3a]">
                  <div className="flex items-start gap-2">
                    <span className="text-sm flex-shrink-0">{insight.icon}</span>
                    <div className="flex-1">
                      <p className="text-gray-200 text-xs font-medium">{insight.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{insight.detail}</p>
                    </div>
                    <span className="text-gray-600 text-xs flex-shrink-0">{insight.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What-If Simulation */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <span>🔮</span>
              <h2 className="text-white font-semibold text-sm">What-If Simulation</h2>
            </div>
            <p className="text-gray-400 text-xs mb-4">What if we increase production by 20%?</p>
            <div className="space-y-2 mb-4">
              {[
                { label: 'Estimated Revenue', value: '+₹12.5 L', color: 'text-green-400' },
                { label: 'Additional Cost', value: '+₹4.2 L', color: 'text-yellow-400' },
                { label: 'Inventory Risk', value: 'High', color: 'text-red-400' },
                { label: 'Machine Load', value: '95%', color: 'text-orange-400' },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${
                      s.color === 'text-green-400' ? 'bg-green-400' :
                      s.color === 'text-yellow-400' ? 'bg-yellow-400' :
                      s.color === 'text-red-400' ? 'bg-red-400' : 'bg-orange-400'
                    }`} />
                    <span className="text-gray-400 text-xs">{s.label}</span>
                  </div>
                  <span className={`text-xs font-bold ${s.color}`}>{s.value}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => router.push('/dashboard/future-lab')}
              className="w-full py-2 text-xs font-bold text-white rounded-lg transition-all"
              style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}
            >
              Run Simulation →
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <span>⚡</span>
              <h2 className="text-white font-semibold text-sm">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Approve Leave', icon: '✅', color: 'from-green-500/20 to-green-600/10 border-green-500/30' },
                { label: 'Add Team Member', icon: '👤', color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30' },
                { label: 'Raise Expense Request', icon: '📋', color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30' },
                { label: 'Generate Report', icon: '📄', color: 'from-orange-500/20 to-orange-600/10 border-orange-500/30' },
              ].map((action) => (
                <button
                  key={action.label}
                  className={`bg-gradient-to-br ${action.color} border rounded-xl p-4 text-center transition-all hover:brightness-110`}
                >
                  <span className="text-2xl block mb-2">{action.icon}</span>
                  <span className="text-gray-300 text-xs">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}