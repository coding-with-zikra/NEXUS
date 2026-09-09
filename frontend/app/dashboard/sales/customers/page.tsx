'use client'

import { useState } from 'react'

const customers = [
  { id: 'C001', name: 'Reliance Industries', contact: 'Mukesh Sharma', email: 'mukesh@reliance.com', revenue: '₹4.2 Cr', orders: 42, status: 'active', growth: '+18%' },
  { id: 'C002', name: 'Tata Motors', contact: 'Priya Tata', email: 'priya@tata.com', revenue: '₹3.8 Cr', orders: 38, status: 'active', growth: '+12%' },
  { id: 'C003', name: 'Infosys Ltd', contact: 'Raj Narayana', email: 'raj@infosys.com', revenue: '₹2.9 Cr', orders: 29, status: 'active', growth: '-5%' },
  { id: 'C004', name: 'HDFC Bank', contact: 'Sara Patel', email: 'sara@hdfc.com', revenue: '₹1.7 Cr', orders: 17, status: 'active', growth: '+22%' },
  { id: 'C005', name: 'Wipro Ltd', contact: 'Amit Kumar', email: 'amit@wipro.com', revenue: '₹1.2 Cr', orders: 12, status: 'inactive', growth: '-8%' },
  { id: 'C006', name: 'Mahindra & Mahindra', contact: 'Deepa Singh', email: 'deepa@mahindra.com', revenue: '₹0.8 Cr', orders: 8, status: 'active', growth: '+5%' },
]

export default function CustomersPage() {
  const [search, setSearch] = useState('')
  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.contact.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">👥 Customers</h1>
        <p className="text-gray-400 text-sm mt-1">Manage and track all your customers.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Customers', value: '284', icon: '👥', color: 'text-blue-400' },
          { label: 'Active', value: '271', icon: '✅', color: 'text-green-400' },
          { label: 'New This Month', value: '+18', icon: '🆕', color: 'text-purple-400' },
          { label: 'Avg Revenue/Customer', value: '₹4.4L', icon: '💰', color: 'text-yellow-400' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span>{kpi.icon}</span>
              <p className="text-gray-400 text-xs">{kpi.label}</p>
            </div>
            <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customers..."
          className="w-full bg-[#1a1a2e] border border-[#2a2a3a] text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Table */}
      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a3a] bg-[#1a1a2e]">
              <th className="text-left px-5 py-3 text-gray-400 font-medium">ID</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Customer</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Contact</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Revenue</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Orders</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Growth</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-[#2a2a3a] hover:bg-[#1a1a2e] transition-colors">
                <td className="px-5 py-3 text-blue-400 font-mono text-xs">{c.id}</td>
                <td className="px-5 py-3">
                  <p className="text-white font-medium">{c.name}</p>
                  <p className="text-gray-500 text-xs">{c.email}</p>
                </td>
                <td className="px-5 py-3 text-gray-300">{c.contact}</td>
                <td className="px-5 py-3 text-white font-bold">{c.revenue}</td>
                <td className="px-5 py-3 text-gray-300">{c.orders}</td>
                <td className={`px-5 py-3 font-medium ${c.growth.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{c.growth}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${c.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                    {c.status}
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