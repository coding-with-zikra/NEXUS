'use client'

import { useRouter } from 'next/navigation'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const productionData = [
  { week: 'W1', Output: 28000, Target: 30000 },
  { week: 'W2', Output: 31000, Target: 30000 },
  { week: 'W3', Output: 27000, Target: 30000 },
  { week: 'W4', Output: 24560, Target: 30000 },
]

const teamData = [
  { name: 'Line A', performance: 82 },
  { name: 'Line B', performance: 91 },
  { name: 'Line C', performance: 74 },
  { name: 'Line D', performance: 88 },
]

export default function OperationsDashboard() {
  const router = useRouter()

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Good Morning, Manager 👋</h1>
          <p className="text-gray-400 text-sm mt-0.5">Here's what needs your attention today.</p>
        </div>
        <div className="text-right">
          <p className="text-gray-500 text-xs">TechManufacture Pvt Ltd</p>
          <p className="text-gray-600 text-xs">Operations Division</p>
        </div>
      </div>

      {/* Top KPI Bar */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { label: 'Team', value: '42', icon: '👥', color: 'text-blue-400', sub: 'members' },
          { label: 'Output', value: '24,560', icon: '🏭', color: 'text-purple-400', sub: 'units today' },
          { label: 'Efficiency', value: '78%', icon: '⚡', color: 'text-yellow-400', sub: '-2% vs target' },
          { label: 'Stock', value: '92%', icon: '📦', color: 'text-green-400', sub: 'capacity' },
          { label: 'Issues', value: '4', icon: '🔴', color: 'text-red-400', sub: 'need attention' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-4 text-center">
            <span className="text-2xl">{kpi.icon}</span>
            <p className={`text-2xl font-bold mt-1 ${kpi.color}`}>{kpi.value}</p>
            <p className="text-gray-400 text-xs mt-0.5">{kpi.label}</p>
            <p className="text-gray-600 text-xs">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Team Performance */}
        <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold">📊 Team Performance</h2>
            <span className="text-gray-500 text-xs">This Week</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={teamData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
              <XAxis dataKey="name" stroke="#666" tick={{ fill: '#888', fontSize: 11 }} />
              <YAxis stroke="#666" tick={{ fill: '#888', fontSize: 11 }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#13131a', border: '1px solid #2a2a3a', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="performance" fill="#818cf8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {[
              { name: 'Raj K.', status: 'present', role: 'Supervisor' },
              { name: 'Priya M.', status: 'present', role: 'Operator' },
              { name: 'Amit S.', status: 'leave', role: 'Technician' },
              { name: 'Sara K.', status: 'present', role: 'QC Lead' },
            ].map((m) => (
              <div key={m.name} className="bg-[#1a1a2e] rounded-lg p-2 text-center">
                <div className={`w-2 h-2 rounded-full mx-auto mb-1 ${m.status === 'present' ? 'bg-green-400' : 'bg-yellow-400'}`} />
                <p className="text-white text-xs font-medium truncate">{m.name}</p>
                <p className="text-gray-500 text-xs truncate">{m.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Production Status */}
        <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold">🏭 Production Status</h2>
            <span className="text-gray-500 text-xs">This Month</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={productionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
              <XAxis dataKey="week" stroke="#666" tick={{ fill: '#888', fontSize: 11 }} />
              <YAxis stroke="#666" tick={{ fill: '#888', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#13131a', border: '1px solid #2a2a3a', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Line type="monotone" dataKey="Output" stroke="#818cf8" strokeWidth={2} dot={true} />
              <Line type="monotone" dataKey="Target" stroke="#f87171" strokeWidth={2} dot={false} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[
              { label: 'Downtime', value: '4.2%', up: false },
              { label: 'Wastage', value: '2.8%', up: true },
              { label: 'Efficiency', value: '78%', up: false },
            ].map((s) => (
              <div key={s.label} className="bg-[#1a1a2e] rounded-lg p-2 text-center">
                <p className="text-gray-500 text-xs">{s.label}</p>
                <p className={`font-bold text-sm ${s.up ? 'text-green-400' : 'text-red-400'}`}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory + Supplier Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Inventory Alerts */}
        <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white font-semibold">📦 Inventory Alerts</h2>
            <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full">3 items low</span>
          </div>
          <div className="space-y-2">
            {[
              { item: 'Raw Steel', current: 18, min: 30, unit: 'days', status: 'critical' },
              { item: 'Electronic Parts', current: 45, min: 60, unit: 'units', status: 'warning' },
              { item: 'Packaging Material', current: 22, min: 30, unit: 'days', status: 'warning' },
              { item: 'Finished Goods A', current: 1240, min: 500, unit: 'units', status: 'good' },
            ].map((inv) => (
              <div key={inv.item} className="flex items-center justify-between p-2 bg-[#1a1a2e] rounded-lg">
                <div>
                  <p className="text-white text-xs font-medium">{inv.item}</p>
                  <p className="text-gray-500 text-xs">{inv.current} {inv.unit} remaining</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  inv.status === 'critical' ? 'bg-red-500/20 text-red-400' :
                  inv.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>{inv.status}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => router.push('/dashboard/operations/inventory')}
            className="w-full mt-3 py-2 text-xs text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/10 transition-all"
          >
            View Full Inventory →
          </button>
        </div>

        {/* Supplier Delays */}
        <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white font-semibold">🚚 Supplier Delays</h2>
            <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-0.5 rounded-full">2 delayed</span>
          </div>
          <div className="space-y-2">
            {[
              { name: 'Supplier X', material: 'Raw Steel', delay: '3 days late', status: 'critical' },
              { name: 'Supplier W', material: 'Chemicals', delay: '1 day late', status: 'warning' },
              { name: 'Supplier Y', material: 'Electronics', delay: 'On time', status: 'good' },
              { name: 'Supplier Z', material: 'Packaging', delay: 'On time', status: 'good' },
            ].map((s) => (
              <div key={s.name} className="flex items-center justify-between p-2 bg-[#1a1a2e] rounded-lg">
                <div>
                  <p className="text-white text-xs font-medium">{s.name}</p>
                  <p className="text-gray-500 text-xs">{s.material} — {s.delay}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  s.status === 'critical' ? 'bg-red-500/20 text-red-400' :
                  s.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>{s.status}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => router.push('/dashboard/operations/suppliers')}
            className="w-full mt-3 py-2 text-xs text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/10 transition-all"
          >
            View All Suppliers →
          </button>
        </div>
      </div>

      {/* NEXUS AI Problems */}
      <div className="bg-[#13131a] border border-purple-500/30 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold">🧠 NEXUS AI — Problems Requiring Attention</h2>
          <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-0.5 rounded-full">3 issues</span>
        </div>
        <div className="space-y-3">
          {[
            {
              icon: '⚠',
              title: 'Production efficiency dropped 8% this week',
              detail: 'Root cause: Machine #04 downtime — 4.2 hours lost. Estimated impact: ₹18L revenue loss.',
              level: 'high',
            },
            {
              icon: '⚠',
              title: 'Inventory shortage predicted in 4 days',
              detail: 'Raw Steel stock at 18 days — below 30-day reorder point. Supplier X delayed.',
              level: 'high',
            },
            {
              icon: '⚡',
              title: 'Team Line C underperforming at 74% efficiency',
              detail: 'Below 80% target. Overtime costs up 12% this week.',
              level: 'medium',
            },
          ].map((issue, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg border ${
                issue.level === 'high'
                  ? 'bg-red-500/10 border-red-500/20'
                  : 'bg-yellow-500/10 border-yellow-500/20'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg">{issue.icon}</span>
                <div className="flex-1">
                  <p className={`font-medium text-sm ${issue.level === 'high' ? 'text-red-300' : 'text-yellow-300'}`}>
                    {issue.title}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">{issue.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => router.push('/dashboard/intelligence/root-cause')}
            className="flex-1 py-2.5 text-xs font-bold text-white rounded-lg transition-all"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
          >
            🔍 Root Cause
          </button>
          <button
            onClick={() => router.push('/dashboard/contradictions')}
            className="flex-1 py-2.5 text-xs font-bold text-white rounded-lg transition-all"
            style={{ background: 'linear-gradient(135deg, #dc2626, #991b1b)' }}
          >
            🧩 Investigate
          </button>
          <button
            onClick={() => router.push('/dashboard/future-lab')}
            className="flex-1 py-2.5 text-xs font-bold text-white rounded-lg transition-all"
            style={{ background: 'linear-gradient(135deg, #0891b2, #0e7490)' }}
          >
            🔮 Simulate
          </button>
        </div>
      </div>
    </div>
  )
}