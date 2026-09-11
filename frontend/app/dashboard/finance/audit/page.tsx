'use client'

import { useState } from 'react'

const auditLogs = [
  { id: 'TXN-8821', type: 'Payment', amount: '₹4.8L', party: 'Vendor X Corp', date: '5 Sep 2026', flag: 'Unusual amount — 3x average', severity: 'high' },
  { id: 'TXN-8819', type: 'Duplicate', amount: '₹2.1L', party: 'Office Supplies Co', date: '4 Sep 2026', flag: 'Same invoice paid twice', severity: 'critical' },
  { id: 'TXN-8815', type: 'Payment', amount: '₹1.2L', party: 'Travel Agency', date: '3 Sep 2026', flag: 'No approval record found', severity: 'high' },
  { id: 'TXN-8810', type: 'Invoice', amount: '₹42L', party: 'Reliance Industries', date: '2 Sep 2026', flag: 'GST mismatch ₹2.4L', severity: 'high' },
  { id: 'TXN-8805', type: 'Payment', amount: '₹85K', party: 'IT Services Ltd', date: '1 Sep 2026', flag: 'Vendor not in approved list', severity: 'medium' },
  { id: 'TXN-8800', type: 'Expense', amount: '₹45K', party: 'Canteen Vendor', date: '31 Aug 2026', flag: 'Amount 40% above contract rate', severity: 'medium' },
]

export default function AuditPage() {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? auditLogs : auditLogs.filter(a => a.severity === filter)

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">🔍 Audit Center</h1>
        <p className="text-gray-400 text-sm mt-1">Transaction audit, anomaly detection and compliance tracking.</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Transactions Audited', value: '1,284', color: 'text-blue-400' },
          { label: 'Issues Found', value: '6', color: 'text-red-400' },
          { label: 'Duplicate Payments', value: '1', color: 'text-red-400' },
          { label: 'Total at Risk', value: '₹8.7L', color: 'text-orange-400' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">{kpi.label}</p>
            <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {['all', 'critical', 'high', 'medium'].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
              filter === f ? 'bg-blue-600 text-white' : 'bg-[#13131a] text-gray-400 border border-[#2a2a3a] hover:text-white'
            }`}>{f}</button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((log) => (
          <div key={log.id} className={`bg-[#13131a] border rounded-xl p-5 ${
            log.severity === 'critical' ? 'border-red-500/40' :
            log.severity === 'high' ? 'border-orange-500/30' : 'border-yellow-500/20'
          }`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-blue-400 font-mono text-xs">{log.id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    log.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                    log.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>{log.severity}</span>
                  <span className="text-gray-500 text-xs">{log.type}</span>
                </div>
                <p className="text-white font-medium">{log.party}</p>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">{log.amount}</p>
                <p className="text-gray-500 text-xs">{log.date}</p>
              </div>
            </div>
            <div className={`flex gap-2 p-2 rounded-lg ${
              log.severity === 'critical' ? 'bg-red-500/10' :
              log.severity === 'high' ? 'bg-orange-500/10' : 'bg-yellow-500/10'
            }`}>
              <span className={log.severity === 'critical' ? 'text-red-400' : log.severity === 'high' ? 'text-orange-400' : 'text-yellow-400'}>🚩</span>
              <p className="text-gray-300 text-sm">{log.flag}</p>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="px-3 py-1 text-xs font-bold text-white rounded-lg bg-blue-600 hover:bg-blue-700">Investigate</button>
              <button className="px-3 py-1 text-xs text-gray-400 border border-[#2a2a3a] rounded-lg hover:text-white">Mark Reviewed</button>
              <button className="px-3 py-1 text-xs text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10">Escalate</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}