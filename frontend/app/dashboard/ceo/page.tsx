'use client'

import { useEffect, useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const API = process.env.NEXT_PUBLIC_API_URL

export default function CEODashboard() {
  const [kpis, setKpis] = useState<any>(null)
  const [health, setHealth] = useState<any>(null)
  const [alerts, setAlerts] = useState<any[]>([])
  const [pl, setPl] = useState<any>(null)

  useEffect(() => {
    fetch(`${API}/api/dashboard/kpis`).then(r => r.json()).then(setKpis)
    fetch(`${API}/api/dashboard/health-score`).then(r => r.json()).then(setHealth)
    fetch(`${API}/api/dashboard/alerts`).then(r => r.json()).then(d => setAlerts(d.alerts))
    fetch(`${API}/api/finance/pl`).then(r => r.json()).then(setPl)
  }, [])

  const plData = pl ? pl.months.map((m: string, i: number) => ({
    month: m,
    Revenue: pl.revenue[i],
    Expenses: pl.expenses[i],
    Profit: pl.profit[i],
  })) : []

  const kpiList = kpis ? [
    { label: 'Total Revenue', value: `₹${kpis.revenue.value} Cr`, change: `+${kpis.revenue.change}%`, up: kpis.revenue.up },
    { label: 'Net Profit', value: `₹${kpis.profit.value} Cr`, change: `+${kpis.profit.change}%`, up: kpis.profit.up },
    { label: 'Production Output', value: `${kpis.production.value.toLocaleString()} units`, change: `${kpis.production.change}%`, up: kpis.production.up },
    { label: 'Inventory Value', value: `₹${kpis.inventory.value} Cr`, change: `+${kpis.inventory.change}%`, up: kpis.inventory.up },
    { label: 'Cash Balance', value: `₹${kpis.cash.value} Cr`, change: `${kpis.cash.change}%`, up: kpis.cash.up },
    { label: 'Outstanding Receivables', value: `₹${kpis.receivables.value} Cr`, change: `+${kpis.receivables.change}%`, up: kpis.receivables.up },
  ] : []

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Good Evening, Aarav 👋</h1>
        <p className="text-gray-400 mt-1">Your company is stable, but there are important insights to act on.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4">
        {kpiList.map((kpi) => (
          <div key={kpi.label} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <p className="text-gray-400 text-sm mb-2">{kpi.label}</p>
            <p className="text-white text-2xl font-bold">{kpi.value}</p>
            <p className={`text-sm mt-1 ${kpi.up ? 'text-green-400' : 'text-red-400'}`}>
              {kpi.change} vs last month
            </p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* P&L Chart */}
        <div className="col-span-2 bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4">Financial Overview</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={plData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
              <XAxis dataKey="month" stroke="#666" tick={{ fill: '#888', fontSize: 12 }} />
              <YAxis stroke="#666" tick={{ fill: '#888', fontSize: 12 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#13131a', border: '1px solid #2a2a3a', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Line type="monotone" dataKey="Revenue" stroke="#818cf8" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Expenses" stroke="#f87171" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Profit" stroke="#34d399" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Health Score */}
        <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4">Business Health Score</h2>
          {health && (
            <div>
              <div className="flex items-center justify-center mb-4">
                <div className="text-center">
                  <p className="text-6xl font-bold text-purple-400">{health.overall}</p>
                  <p className="text-gray-400 text-sm mt-1">/ 100 — {health.label}</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Financial', value: health.financial, color: 'bg-green-400' },
                  { label: 'Operational', value: health.operational, color: 'bg-blue-400' },
                  { label: 'Customer', value: health.customer, color: 'bg-purple-400' },
                  { label: 'People', value: health.people, color: 'bg-yellow-400' },
                  { label: 'Compliance', value: health.compliance, color: 'bg-orange-400' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className="text-gray-400 text-xs w-20">{item.label}</span>
                    <div className="flex-1 bg-[#2a2a3a] rounded-full h-1.5">
                      <div
                        className={`${item.color} h-1.5 rounded-full`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                    <span className="text-gray-400 text-xs w-6">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
        <h2 className="text-white font-semibold mb-4">Critical Alerts</h2>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.msg}
              className={`flex items-start gap-3 p-3 rounded-lg ${
                alert.level === 'high' ? 'bg-red-500/10 border border-red-500/20' :
                alert.level === 'medium' ? 'bg-yellow-500/10 border border-yellow-500/20' :
                'bg-blue-500/10 border border-blue-500/20'
              }`}
            >
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                alert.level === 'high' ? 'bg-red-400' :
                alert.level === 'medium' ? 'bg-yellow-400' : 'bg-blue-400'
              }`} />
              <p className="text-gray-300 text-sm">{alert.msg}</p>
              <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                alert.level === 'high' ? 'bg-red-500/20 text-red-400' :
                alert.level === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {alert.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}