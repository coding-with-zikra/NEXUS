'use client'

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const monthlyData = [
  { month: 'Apr', Inflow: 8.5, Outflow: 7.2, Net: 1.3 },
  { month: 'May', Inflow: 9.2, Outflow: 8.8, Net: 0.4 },
  { month: 'Jun', Inflow: 10.8, Outflow: 9.5, Net: 1.3 },
  { month: 'Jul', Inflow: 9.9, Outflow: 9.1, Net: 0.8 },
  { month: 'Aug', Inflow: 11.2, Outflow: 10.5, Net: 0.7 },
  { month: 'Sep', Inflow: 12.1, Outflow: 11.8, Net: 0.3 },
]

const weeklyData = [
  { week: 'W1', Inflow: 3.1, Outflow: 2.8 },
  { week: 'W2', Inflow: 2.9, Outflow: 3.2 },
  { week: 'W3', Inflow: 3.4, Outflow: 3.1 },
  { week: 'W4', Inflow: 2.7, Outflow: 2.7 },
]

export default function CashFlowPage() {
  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">💧 Cash Flow</h1>
        <p className="text-gray-400 text-sm mt-1">Track money coming in and going out of the business.</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Cash Balance', value: '₹1.8 Cr', sub: '-12% this month', color: 'text-red-400', icon: '🏦' },
          { label: 'Monthly Inflow', value: '₹12.1 Cr', sub: '+8% vs last month', color: 'text-green-400', icon: '📥' },
          { label: 'Monthly Outflow', value: '₹11.8 Cr', sub: '+14% vs last month', color: 'text-red-400', icon: '📤' },
          { label: 'Net Cash Flow', value: '₹0.3 Cr', sub: 'Very thin margin ⚠️', color: 'text-yellow-400', icon: '📊' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2"><span>{kpi.icon}</span><p className="text-gray-400 text-xs">{kpi.label}</p></div>
            <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
            <p className="text-gray-500 text-xs mt-0.5">{kpi.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
        <h2 className="text-white font-semibold mb-4">6-Month Cash Flow Trend</h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
            <XAxis dataKey="month" stroke="#444" tick={{ fill: '#666', fontSize: 11 }} />
            <YAxis stroke="#444" tick={{ fill: '#666', fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: '#13131a', border: '1px solid #2a2a3a', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
            <Legend />
            <Line type="monotone" dataKey="Inflow" stroke="#10b981" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Outflow" stroke="#ef4444" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Net" stroke="#f59e0b" strokeWidth={2} dot={true} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
        <h2 className="text-white font-semibold mb-4">This Month — Weekly Breakdown</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
            <XAxis dataKey="week" stroke="#444" tick={{ fill: '#666', fontSize: 11 }} />
            <YAxis stroke="#444" tick={{ fill: '#666', fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: '#13131a', border: '1px solid #2a2a3a', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
            <Legend />
            <Bar dataKey="Inflow" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Outflow" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-[#13131a] border border-red-500/20 rounded-xl p-5">
        <h2 className="text-white font-semibold mb-3">⚠️ Cash Flow Warnings</h2>
        <div className="space-y-2">
          {[
            { msg: 'Net cash flow dropped to ₹0.3 Cr — lowest in 6 months', level: 'critical' },
            { msg: '₹2.1 Cr stuck in receivables — 12 invoices overdue', level: 'high' },
            { msg: 'Outflow growing 14% vs inflow 8% — unsustainable trend', level: 'high' },
            { msg: 'Machine repair costs added ₹18L to outflow this month', level: 'medium' },
          ].map((w, i) => (
            <div key={i} className={`flex gap-3 p-3 rounded-lg ${
              w.level === 'critical' ? 'bg-red-500/10 border border-red-500/20' :
              w.level === 'high' ? 'bg-orange-500/10 border border-orange-500/20' :
              'bg-yellow-500/10 border border-yellow-500/20'
            }`}>
              <span className={w.level === 'critical' ? 'text-red-400' : w.level === 'high' ? 'text-orange-400' : 'text-yellow-400'}>⚠️</span>
              <p className="text-gray-300 text-sm">{w.msg}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}