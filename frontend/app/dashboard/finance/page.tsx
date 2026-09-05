'use client'

import { useEffect, useState } from 'react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const API = process.env.NEXT_PUBLIC_API_URL

export default function FinanceDashboard() {
  const [pl, setPl] = useState<any>(null)
  const [cashflow, setCashflow] = useState<any>(null)

  useEffect(() => {
    fetch(`${API}/api/finance/pl`).then(r => r.json()).then(setPl)
    fetch(`${API}/api/finance/cashflow`).then(r => r.json()).then(setCashflow)
  }, [])

  const plData = pl ? pl.months.map((m: string, i: number) => ({
    month: m,
    Revenue: pl.revenue[i],
    Expenses: pl.expenses[i],
    Profit: pl.profit[i],
  })) : []

  const cashData = cashflow ? cashflow.months.map((m: string, i: number) => ({
    month: m,
    Inflow: cashflow.inflow[i],
    Outflow: cashflow.outflow[i],
  })) : []

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Finance & CA</h1>
        <p className="text-gray-400 mt-1">P&L, cash flow, invoices, and audit intelligence.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Revenue', value: '₹12.6 Cr', change: '+12%', up: true },
          { label: 'Total Expenses', value: '₹10.3 Cr', change: '+18%', up: false },
          { label: 'Net Profit', value: '₹2.3 Cr', change: '+8%', up: true },
          { label: 'Cash Balance', value: '₹1.8 Cr', change: '-12%', up: false },
          { label: 'Pending Invoices', value: '₹2.1 Cr', change: '23 invoices', up: false },
          { label: 'GST Liability', value: '₹0.9 Cr', change: 'Due in 12 days', up: false },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <p className="text-gray-400 text-sm mb-2">{kpi.label}</p>
            <p className="text-white text-2xl font-bold">{kpi.value}</p>
            <p className={`text-sm mt-1 ${kpi.up ? 'text-green-400' : 'text-red-400'}`}>
              {kpi.change}
            </p>
          </div>
        ))}
      </div>

      {/* P&L Chart */}
      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
        <h2 className="text-white font-semibold mb-4">P&L Statement</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={plData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
            <XAxis dataKey="month" stroke="#666" tick={{ fill: '#888', fontSize: 12 }} />
            <YAxis stroke="#666" tick={{ fill: '#888', fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#13131a', border: '1px solid #2a2a3a', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend />
            <Bar dataKey="Revenue" fill="#818cf8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Expenses" fill="#f87171" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Profit" fill="#34d399" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Cash Flow Chart */}
      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
        <h2 className="text-white font-semibold mb-4">Cash Flow</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={cashData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
            <XAxis dataKey="month" stroke="#666" tick={{ fill: '#888', fontSize: 12 }} />
            <YAxis stroke="#666" tick={{ fill: '#888', fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#13131a', border: '1px solid #2a2a3a', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend />
            <Line type="monotone" dataKey="Inflow" stroke="#34d399" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Outflow" stroke="#f87171" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Invoice Table */}
      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
        <h2 className="text-white font-semibold mb-4">Pending Invoices</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-[#2a2a3a]">
              <th className="text-left pb-3">Invoice</th>
              <th className="text-left pb-3">Client</th>
              <th className="text-left pb-3">Amount</th>
              <th className="text-left pb-3">Due Date</th>
              <th className="text-left pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="space-y-2">
            {[
              { id: 'INV-2024-089', client: 'Reliance Industries', amount: '₹42L', due: '15 Sep 2024', status: 'overdue' },
              { id: 'INV-2024-091', client: 'Tata Motors', amount: '₹28L', due: '20 Sep 2024', status: 'pending' },
              { id: 'INV-2024-093', client: 'Infosys Ltd', amount: '₹18L', due: '25 Sep 2024', status: 'pending' },
              { id: 'INV-2024-095', client: 'HDFC Bank', amount: '₹35L', due: '30 Sep 2024', status: 'sent' },
            ].map((inv) => (
              <tr key={inv.id} className="border-b border-[#2a2a3a]">
                <td className="py-3 text-purple-400">{inv.id}</td>
                <td className="py-3 text-gray-300">{inv.client}</td>
                <td className="py-3 text-white font-medium">{inv.amount}</td>
                <td className="py-3 text-gray-400">{inv.due}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    inv.status === 'overdue' ? 'bg-red-500/20 text-red-400' :
                    inv.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {inv.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}