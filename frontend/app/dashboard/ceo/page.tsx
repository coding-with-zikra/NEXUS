'use client'

import { createClient } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const API = process.env.NEXT_PUBLIC_API_URL

const plData = [
  { month: 'Jan', Revenue: 9.2, Profit: 1.4, Cash: 3.1 },
  { month: 'Feb', Revenue: 10.1, Profit: 1.9, Cash: 3.4 },
  { month: 'Mar', Revenue: 11.3, Profit: 2.2, Cash: 3.8 },
  { month: 'Apr', Revenue: 10.8, Profit: 1.9, Cash: 3.2 },
  { month: 'May', Revenue: 11.9, Profit: 2.1, Cash: 3.6 },
  { month: 'Jun', Revenue: 12.6, Profit: 2.3, Cash: 4.2 },
  { month: 'Jul', Revenue: 13.1, Profit: 2.5, Cash: 4.0 },
  { month: 'Aug', Revenue: 12.8, Profit: 2.3, Cash: 3.8 },
  { month: 'Sep', Revenue: 13.4, Profit: 2.6, Cash: 4.2 },
]

const deptData = [
  { dept: 'Sales', Target: 120, Actual: 108 },
  { dept: 'Production', Target: 100, Actual: 87 },
  { dept: 'Inventory', Target: 95, Actual: 92 },
  { dept: 'HR', Target: 90, Actual: 88 },
  { dept: 'Finance', Target: 85, Actual: 82 },
  { dept: 'R&D', Target: 70, Actual: 65 },
]

export default function CEODashboard() {
  const router = useRouter()
  const [health, setHealth] = useState<any>(null)
  const [alerts, setAlerts] = useState<any[]>([])
  const [greeting, setGreeting] = useState('Good Morning')
  const [userName, setUserName] = useState('Aarav')
  const supabase = createClient()

  useEffect(() => {
    fetch(`${API}/api/dashboard/health-score`).then(r => r.json()).then(setHealth)
    fetch(`${API}/api/dashboard/alerts`).then(r => r.json()).then(d => setAlerts(d.alerts))
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
        <div
        className="relative px-8 py-6 flex items-center justify-between overflow-hidden"
        style={{
          minHeight: '120px',
        }}
      >
        {/* Mountain background photo */}
        <div className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(135deg, rgba(5,10,25,0.92) 0%, rgba(10,20,45,0.85) 50%, rgba(5,10,25,0.75) 100%)' }}
        />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white">
            {greeting}, {userName}! 👋
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Here's the complete view of your company.
          </p>
        </div>
        <div className="flex items-center gap-4 relative z-10">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all"
            style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}
          >
            📄 Generate Executive Report
          </button>
          <div className="text-right">
            <p className="text-blue-300 text-sm italic">"Better insights.</p>
            <p className="text-blue-300 text-sm italic">Brighter decisions."</p>
            <p className="text-gray-500 text-xs mt-1">— NEXUS Ω</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">

        {/* Row 1 — KPI Cards */}
        <div className="grid grid-cols-6 gap-3">
          {[
            { label: 'Company Health', value: `${health?.overall ?? 76}/100`, sub: 'Stable', icon: '❤️', color: 'text-green-400', bg: 'from-green-500/20 to-green-600/10', border: 'border-green-500/30' },
            { label: 'Revenue', value: '₹12.6 Cr', sub: '+12% vs last month', icon: '📈', color: 'text-blue-400', bg: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/30' },
            { label: 'Profit', value: '₹2.8 Cr', sub: '+18% vs last month', icon: '💰', color: 'text-purple-400', bg: 'from-purple-500/20 to-purple-600/10', border: 'border-purple-500/30' },
            { label: 'Cash Balance', value: '₹4.2 Cr', sub: '+5% vs last month', icon: '🏦', color: 'text-cyan-400', bg: 'from-cyan-500/20 to-cyan-600/10', border: 'border-cyan-500/30' },
            { label: 'Overall Risk', value: 'Moderate', sub: '3 critical areas', icon: '🛡️', color: 'text-yellow-400', bg: 'from-yellow-500/20 to-yellow-600/10', border: 'border-yellow-500/30' },
            { label: 'Employees', value: '482', sub: '+12 new this month', icon: '👥', color: 'text-pink-400', bg: 'from-pink-500/20 to-pink-600/10', border: 'border-pink-500/30' },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className={`bg-gradient-to-br ${kpi.bg} border ${kpi.border} rounded-xl p-4`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{kpi.icon}</span>
                <p className="text-gray-400 text-xs">{kpi.label}</p>
              </div>
              <p className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</p>
              <p className="text-gray-500 text-xs mt-0.5">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Row 2 — Secondary KPIs */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Sales Growth', value: '+14%', sub: 'vs last month', icon: '📊', up: true },
            { label: 'Production Efficiency', value: '87%', sub: '+3% vs target', icon: '🏭', up: true },
            { label: 'Inventory Status', value: '92% in stock', sub: '3 low-stock items', icon: '📦', up: false },
            { label: 'Supplier Reliability', value: '78%', sub: '2 delayed deliveries', icon: '🚚', up: false },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-4 flex items-center gap-4">
              <span className="text-3xl">{kpi.icon}</span>
              <div>
                <p className="text-gray-400 text-xs mb-0.5">{kpi.label}</p>
                <p className="text-white text-lg font-bold">{kpi.value}</p>
                <p className={`text-xs ${kpi.up ? 'text-green-400' : 'text-yellow-400'}`}>{kpi.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Row 3 — Charts */}
        <div className="grid grid-cols-3 gap-4">
          {/* Revenue Profit Cash Chart */}
          <div className="col-span-2 bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">Revenue, Profit & Cash Flow</h2>
              <span className="text-gray-500 text-xs bg-[#1a1a2e] px-3 py-1 rounded-lg">Last 9 Months</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={plData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
                <XAxis dataKey="month" stroke="#444" tick={{ fill: '#666', fontSize: 11 }} />
                <YAxis stroke="#444" tick={{ fill: '#666', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#13131a', border: '1px solid #2a2a3a', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                <Legend />
                <Line type="monotone" dataKey="Revenue" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Profit" stroke="#10b981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Cash" stroke="#8b5cf6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* NEXUS AI Executive Intelligence */}
          <div className="bg-[#13131a] border border-blue-500/30 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🧠</span>
              <h2 className="text-white font-semibold text-sm">NEXUS AI — Executive Intelligence</h2>
            </div>
            <div className="flex gap-2 mb-4">
              {['Key Insights', 'Contradictions', 'Blind Spots'].map((tab, i) => (
                <button key={tab} className={`px-2 py-1 rounded text-xs font-medium transition-all ${i === 0 ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {[
                { icon: '⚠️', text: 'Sales recommends 20% higher production, but inventory suggests reducing production.', color: 'text-yellow-400' },
                { icon: '🔴', text: 'Cash flow may face pressure in next quarter.', color: 'text-red-400' },
                { icon: '🔵', text: 'Supplier risk increased due to 2 delayed deliveries.', color: 'text-blue-400' },
                { icon: '🟢', text: 'Overall operations are stable.', color: 'text-green-400' },
              ].map((insight, i) => (
                <div key={i} className="flex items-start gap-2 p-2 bg-[#1a1a2e] rounded-lg">
                  <span className="text-sm flex-shrink-0">{insight.icon}</span>
                  <p className={`text-xs ${insight.color}`}>{insight.text}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => router.push('/dashboard/intelligence/root-cause')}
              className="w-full mt-4 py-2 text-xs font-bold text-white rounded-lg transition-all"
              style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}
            >
              View Full Analysis →
            </button>
          </div>
        </div>

        {/* Row 4 — Department Overview */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">Department Overview</h2>
              <span className="text-gray-500 text-xs bg-[#1a1a2e] px-3 py-1 rounded-lg">This Month</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={deptData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
                <XAxis dataKey="dept" stroke="#444" tick={{ fill: '#666', fontSize: 11 }} />
                <YAxis stroke="#444" tick={{ fill: '#666', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#13131a', border: '1px solid #2a2a3a', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                <Legend />
                <Bar dataKey="Target" fill="#2a2a5a" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Actual" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Critical Alerts */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">🚨 Critical Alerts</h2>
              <button className="text-blue-400 text-xs hover:underline">View All</button>
            </div>
            <div className="space-y-2">
              {[
                { msg: 'Machine #04 downtime increased', time: '2 hours ago', level: 'high' },
                { msg: 'Raw material delay from Supplier X', time: '4 hours ago', level: 'high' },
                { msg: 'Cash flow may be tight next quarter', time: '6 hours ago', level: 'medium' },
                { msg: '3 inventory items below threshold', time: '1 day ago', level: 'medium' },
              ].map((alert, i) => (
                <div key={i} className={`flex items-start gap-2 p-2 rounded-lg ${
                  alert.level === 'high' ? 'bg-red-500/10 border border-red-500/20' : 'bg-yellow-500/10 border border-yellow-500/20'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${alert.level === 'high' ? 'bg-red-400' : 'bg-yellow-400'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-300 text-xs">{alert.msg}</p>
                    <p className="text-gray-600 text-xs">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 5 — Production, Inventory, Employee */}
        <div className="grid grid-cols-3 gap-4">
          {/* Production Status */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <h2 className="text-white font-semibold mb-4">🏭 Production Status</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-20 h-20">
                <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1a1a2e" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3b82f6" strokeWidth="3"
                    strokeDasharray={`${87} ${100 - 87}`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">87%</span>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Efficiency</p>
                <p className="text-white font-bold text-lg">87%</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Total Output', value: '24,560 units', sub: '-6% vs last month' },
                { label: 'Downtime', value: '4.2%', sub: '+1%' },
                { label: 'Wastage', value: '2.8%', sub: '-0.5%' },
                { label: 'Machines', value: '12/14', sub: '2 under maintenance' },
              ].map((s) => (
                <div key={s.label} className="bg-[#1a1a2e] rounded-lg p-2">
                  <p className="text-gray-500 text-xs">{s.label}</p>
                  <p className="text-white text-xs font-bold">{s.value}</p>
                  <p className="text-gray-600 text-xs">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Inventory Status */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <h2 className="text-white font-semibold mb-4">📦 Inventory Status</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-20 h-20">
                <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1a1a2e" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#10b981" strokeWidth="3"
                    strokeDasharray={`${92} ${100 - 92}`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">92%</span>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-xs">In Stock</p>
                <p className="text-white font-bold text-lg">92%</p>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: 'In Stock', value: '1,145', color: 'text-green-400', dot: 'bg-green-400' },
                { label: 'Low Stock', value: '3', color: 'text-red-400', dot: 'bg-red-400' },
                { label: 'Overstock', value: '5', color: 'text-yellow-400', dot: 'bg-yellow-400' },
                { label: 'Total', value: '1,245', color: 'text-gray-300', dot: 'bg-gray-400' },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${s.dot}`} />
                    <span className="text-gray-400 text-xs">{s.label}</span>
                  </div>
                  <span className={`text-xs font-bold ${s.color}`}>{s.value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-blue-400 mt-3">Stock Value: ₹8.4 Cr</p>
          </div>

          {/* Employee & Payroll */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <h2 className="text-white font-semibold mb-4">👥 Employee & Payroll</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-20 h-20">
                <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1a1a2e" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#8b5cf6" strokeWidth="3"
                    strokeDasharray={`${96} ${100 - 96}`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">96%</span>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Attendance</p>
                <p className="text-white font-bold text-lg">96%</p>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Total Employees', value: '482' },
                { label: 'New This Month', value: '+12' },
                { label: 'Payroll (Monthly)', value: '₹1.8 Cr' },
                { label: 'Overtime Cost', value: '₹12.5 L' },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">{s.label}</span>
                  <span className="text-white text-xs font-bold">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 6 — Future Simulator, Decision Center, Digital Twin, Reports */}
        <div className="grid grid-cols-4 gap-4">
          {/* Future Simulator */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <h2 className="text-white font-semibold mb-2 text-sm">🔮 Future Simulator</h2>
            <p className="text-gray-400 text-xs mb-3">What if we increase production by 20%?</p>
            <div className="space-y-1.5 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500 text-xs">Potential Profit</span>
                <span className="text-green-400 text-xs font-bold">+₹1.2 Cr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-xs">Risk Level</span>
                <span className="text-red-400 text-xs font-bold">High</span>
              </div>
            </div>
            <button
              onClick={() => router.push('/dashboard/future-lab')}
              className="w-full py-2 text-xs font-bold text-white rounded-lg"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
            >
              Run Simulation
            </button>
          </div>

          {/* Decision Center */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <h2 className="text-white font-semibold mb-2 text-sm">⚔️ Decision Center</h2>
            <p className="text-gray-400 text-xs mb-3">5 decisions pending your review</p>
            <div className="space-y-1.5 mb-4">
              {[
                { text: 'Approve new supplier', status: 'Pending' },
                { text: 'Expand to new market', status: 'Under Review' },
                { text: 'Increase production capacity', status: 'Pending' },
              ].map((d) => (
                <div key={d.text} className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs truncate flex-1">{d.text}</span>
                  <span className={`text-xs ml-2 flex-shrink-0 ${d.status === 'Pending' ? 'text-yellow-400' : 'text-blue-400'}`}>{d.status}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => router.push('/dashboard/decision-center')}
              className="w-full py-2 text-xs font-bold text-white rounded-lg"
              style={{ background: 'linear-gradient(135deg, #dc2626, #991b1b)' }}
            >
              Go to Decision Center
            </button>
          </div>

          {/* Digital Twin */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <h2 className="text-white font-semibold mb-2 text-sm">🌐 Digital Twin</h2>
            <p className="text-gray-400 text-xs mb-3">Live simulation of your business</p>
            <div className="h-16 bg-[#1a1a2e] rounded-lg flex items-center justify-center mb-4 border border-[#2a2a3a]">
              <div className="flex gap-2 items-center">
                {['🏭', '→', '📦', '→', '🚚', '→', '💰'].map((icon, i) => (
                  <span key={i} className="text-sm opacity-70">{icon}</span>
                ))}
              </div>
            </div>
            <button
              onClick={() => router.push('/dashboard/digital-twin')}
              className="w-full py-2 text-xs font-bold text-white rounded-lg"
              style={{ background: 'linear-gradient(135deg, #0891b2, #0e7490)' }}
            >
              Open Digital Twin
            </button>
          </div>

          {/* Recent Reports */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-semibold text-sm">📄 Recent Reports</h2>
              <button className="text-blue-400 text-xs hover:underline">View All</button>
            </div>
            <div className="space-y-2">
              {[
                { name: 'Executive Summary — Sep 2026', time: 'Generated 2 hours ago' },
                { name: 'Financial Performance', time: 'Generated 1 day ago' },
                { name: 'Operations Report', time: 'Generated 7 days ago' },
              ].map((r) => (
                <div key={r.name} className="flex items-start gap-2 p-2 bg-[#1a1a2e] rounded-lg cursor-pointer hover:bg-[#2a2a3e] transition-colors">
                  <span className="text-red-400 text-sm">📕</span>
                  <div>
                    <p className="text-gray-300 text-xs font-medium">{r.name}</p>
                    <p className="text-gray-600 text-xs">{r.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}