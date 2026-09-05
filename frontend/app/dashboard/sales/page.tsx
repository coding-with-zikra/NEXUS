'use client'

import { useEffect, useState } from 'react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const API = process.env.NEXT_PUBLIC_API_URL

export default function SalesDashboard() {
  const [sales, setSales] = useState<any>(null)

  useEffect(() => {
    fetch(`${API}/api/sales/revenue`).then(r => r.json()).then(setSales)
  }, [])

  const revenueData = sales ? sales.months.map((m: string, i: number) => ({
    month: m,
    Revenue: sales.revenue[i],
    Target: sales.target[i],
  })) : []

  const productData = sales?.top_products || []

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Sales</h1>
        <p className="text-gray-400 mt-1">Revenue, customers, products, and forecast.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '₹12.6 Cr', change: '+12%', up: true },
          { label: 'vs Target', value: '109%', change: '+9% above', up: true },
          { label: 'Active Customers', value: '284', change: '+18 this month', up: true },
          { label: 'Avg Deal Size', value: '₹4.4L', change: '-3%', up: false },
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

      {/* Revenue vs Target */}
      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
        <h2 className="text-white font-semibold mb-4">Revenue vs Target</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
            <XAxis dataKey="month" stroke="#666" tick={{ fill: '#888', fontSize: 12 }} />
            <YAxis stroke="#666" tick={{ fill: '#888', fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#13131a', border: '1px solid #2a2a3a', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend />
            <Line type="monotone" dataKey="Revenue" stroke="#818cf8" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Target" stroke="#f87171" strokeWidth={2} dot={false} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Products */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4">Top Products</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={productData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
              <XAxis type="number" stroke="#666" tick={{ fill: '#888', fontSize: 12 }} />
              <YAxis dataKey="name" type="category" stroke="#666" tick={{ fill: '#888', fontSize: 12 }} width={80} />
              <Tooltip
                contentStyle={{ backgroundColor: '#13131a', border: '1px solid #2a2a3a', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="revenue" fill="#818cf8" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4">Product Growth</h2>
          <div className="space-y-4 mt-2">
            {productData.map((p: any) => (
              <div key={p.name} className="flex items-center gap-3">
                <span className="text-gray-400 text-sm w-24">{p.name}</span>
                <div className="flex-1 bg-[#2a2a3a] rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${p.growth >= 0 ? 'bg-purple-400' : 'bg-red-400'}`}
                    style={{ width: `${Math.abs(p.growth) * 3}%` }}
                  />
                </div>
                <span className={`text-sm w-12 text-right ${p.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {p.growth > 0 ? '+' : ''}{p.growth}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}