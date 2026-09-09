'use client'

import { useState } from 'react'

const allAlerts = [
  { id: 1, msg: 'Machine #04 downtime increased to 18.5%', dept: 'Operations', level: 'critical', time: '2 hours ago', resolved: false },
  { id: 2, msg: 'Raw material delay from Supplier X — 3 days late', dept: 'Supply Chain', level: 'critical', time: '4 hours ago', resolved: false },
  { id: 3, msg: 'Cash flow may be tight next quarter', dept: 'Finance', level: 'high', time: '6 hours ago', resolved: false },
  { id: 4, msg: '3 inventory items below reorder threshold', dept: 'Inventory', level: 'high', time: '1 day ago', resolved: false },
  { id: 5, msg: 'GST filing due in 12 days', dept: 'Finance', level: 'medium', time: '1 day ago', resolved: false },
  { id: 6, msg: 'Production efficiency dropped 8% this week', dept: 'Operations', level: 'high', time: '2 days ago', resolved: false },
  { id: 7, msg: 'New market opportunity in Tier-2 cities', dept: 'Sales', level: 'low', time: '3 days ago', resolved: true },
  { id: 8, msg: 'Employee overtime costs up 42% this quarter', dept: 'HR', level: 'medium', time: '3 days ago', resolved: false },
]

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(allAlerts)
  const [filter, setFilter] = useState('all')

  const filtered = alerts.filter(a =>
    filter === 'all' ? true :
    filter === 'resolved' ? a.resolved :
    filter === 'unresolved' ? !a.resolved :
    a.level === filter
  )

  const resolve = (id: number) => setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a))

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">🚨 Critical Alerts</h1>
        <p className="text-gray-400 text-sm mt-1">All system alerts across departments.</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Critical', value: alerts.filter(a => a.level === 'critical' && !a.resolved).length, color: 'text-red-400' },
          { label: 'High', value: alerts.filter(a => a.level === 'high' && !a.resolved).length, color: 'text-orange-400' },
          { label: 'Medium', value: alerts.filter(a => a.level === 'medium' && !a.resolved).length, color: 'text-yellow-400' },
          { label: 'Resolved', value: alerts.filter(a => a.resolved).length, color: 'text-green-400' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">{kpi.label}</p>
            <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {['all', 'critical', 'high', 'medium', 'low', 'resolved', 'unresolved'].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${filter === f ? 'bg-blue-600 text-white' : 'bg-[#13131a] text-gray-400 border border-[#2a2a3a] hover:text-white'}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((alert) => (
          <div key={alert.id} className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
            alert.resolved ? 'bg-[#13131a] border-[#2a2a3a] opacity-50' :
            alert.level === 'critical' ? 'bg-red-500/10 border-red-500/30' :
            alert.level === 'high' ? 'bg-orange-500/10 border-orange-500/30' :
            alert.level === 'medium' ? 'bg-yellow-500/10 border-yellow-500/30' :
            'bg-blue-500/10 border-blue-500/30'
          }`}>
            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
              alert.resolved ? 'bg-gray-400' :
              alert.level === 'critical' ? 'bg-red-400' :
              alert.level === 'high' ? 'bg-orange-400' :
              alert.level === 'medium' ? 'bg-yellow-400' : 'bg-blue-400'
            }`} />
            <div className="flex-1">
              <p className="text-white text-sm font-medium">{alert.msg}</p>
              <div className="flex gap-3 mt-1">
                <span className="text-gray-500 text-xs">{alert.dept}</span>
                <span className="text-gray-600 text-xs">•</span>
                <span className="text-gray-500 text-xs">{alert.time}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                alert.level === 'critical' ? 'bg-red-500/20 text-red-400' :
                alert.level === 'high' ? 'bg-orange-500/20 text-orange-400' :
                alert.level === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>{alert.level}</span>
              {!alert.resolved && (
                <button onClick={() => resolve(alert.id)}
                  className="px-3 py-1 text-xs font-bold text-white rounded-lg bg-green-600 hover:bg-green-700">
                  Resolve
                </button>
              )}
              {alert.resolved && <span className="text-green-400 text-xs">✅ Resolved</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}