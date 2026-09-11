'use client'

import { useState } from 'react'

const invoices = [
  { id: 'INV-2026-089', client: 'Reliance Industries', amount: '₹42L', due: '15 Aug 2026', status: 'overdue', days: 22 },
  { id: 'INV-2026-091', client: 'Tata Motors', amount: '₹28L', due: '20 Aug 2026', status: 'overdue', days: 17 },
  { id: 'INV-2026-093', client: 'Infosys Ltd', amount: '₹18L', due: '25 Aug 2026', status: 'overdue', days: 12 },
  { id: 'INV-2026-095', client: 'HDFC Bank', amount: '₹35L', due: '10 Sep 2026', status: 'pending', days: 0 },
  { id: 'INV-2026-097', client: 'Wipro Ltd', amount: '₹22L', due: '15 Sep 2026', status: 'pending', days: 0 },
  { id: 'INV-2026-099', client: 'Mahindra & M', amount: '₹15L', due: '20 Sep 2026', status: 'pending', days: 0 },
  { id: 'INV-2026-101', client: 'TCS Ltd', amount: '₹48L', due: '25 Sep 2026', status: 'sent', days: 0 },
  { id: 'INV-2026-078', client: 'L&T Finance', amount: '₹62L', due: '1 Aug 2026', status: 'paid', days: 0 },
  { id: 'INV-2026-080', client: 'Asian Paints', amount: '₹31L', due: '5 Aug 2026', status: 'paid', days: 0 },
]

export default function InvoicesPage() {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? invoices : invoices.filter(i => i.status === filter)

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">🧾 Invoices</h1>
          <p className="text-gray-400 text-sm mt-1">Track all invoices — pending, paid, and overdue.</p>
        </div>
        <button className="px-4 py-2 text-sm font-bold text-white rounded-lg"
          style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}>
          + New Invoice
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total', value: '172', amount: '₹9.3 Cr', color: 'text-blue-400' },
          { label: 'Pending', value: '42', amount: '₹2.1 Cr', color: 'text-yellow-400' },
          { label: 'Overdue', value: '12', amount: '₹0.8 Cr', color: 'text-red-400' },
          { label: 'Paid', value: '118', amount: '₹6.4 Cr', color: 'text-green-400' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">{kpi.label} Invoices</p>
            <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
            <p className="text-gray-500 text-xs mt-0.5">{kpi.amount}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {['all', 'overdue', 'pending', 'sent', 'paid'].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
              filter === f ? 'bg-blue-600 text-white' : 'bg-[#13131a] text-gray-400 border border-[#2a2a3a] hover:text-white'
            }`}>{f}</button>
        ))}
      </div>

      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a3a] bg-[#1a1a2e]">
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Invoice ID</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Client</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Amount</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Due Date</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Status</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((inv) => (
              <tr key={inv.id} className="border-b border-[#2a2a3a] hover:bg-[#1a1a2e] transition-colors">
                <td className="px-5 py-3 text-blue-400 font-mono text-xs">{inv.id}</td>
                <td className="px-5 py-3 text-white font-medium">{inv.client}</td>
                <td className="px-5 py-3 text-white font-bold">{inv.amount}</td>
                <td className="px-5 py-3">
                  <p className="text-gray-300">{inv.due}</p>
                  {inv.days > 0 && <p className="text-red-400 text-xs">{inv.days} days overdue</p>}
                </td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    inv.status === 'paid' ? 'bg-green-500/20 text-green-400' :
                    inv.status === 'overdue' ? 'bg-red-500/20 text-red-400' :
                    inv.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>{inv.status}</span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    <button className="px-2 py-1 text-xs text-gray-400 border border-[#2a2a3a] rounded hover:text-white">View</button>
                    {inv.status !== 'paid' && (
                      <button className="px-2 py-1 text-xs text-blue-400 border border-blue-500/30 rounded hover:bg-blue-500/10">Send Reminder</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}