'use client'

import { useEffect, useState } from 'react'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const API = process.env.NEXT_PUBLIC_API_URL

export default function OperationsDashboard() {
  const [production, setProduction] = useState<any>(null)

  useEffect(() => {
    fetch(`${API}/api/operations/production`).then(r => r.json()).then(setProduction)
  }, [])

  const productionData = production ? production.weeks.map((w: string, i: number) => ({
    week: w,
    Output: production.output[i],
    Efficiency: production.efficiency[i],
  })) : []

  const wastageData = production ? production.weeks.map((w: string, i: number) => ({
    week: w,
    Downtime: production.downtime[i],
    Wastage: production.wastage[i],
  })) : []

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Operations</h1>
        <p className="text-gray-400 mt-1">Production, machines, wastage, inventory, and suppliers.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Production Output', value: '24,560', unit: 'units', change: '-6%', up: false },
          { label: 'Efficiency', value: '78%', unit: '', change: '-2%', up: false },
          { label: 'Machine Downtime', value: '4.2%', unit: '', change: '+1%', up: false },
          { label: 'Wastage', value: '2.8%', unit: '', change: '-0.5%', up: true },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <p className="text-gray-400 text-sm mb-2">{kpi.label}</p>
            <p className="text-white text-2xl font-bold">
              {kpi.value}
              <span className="text-gray-400 text-sm ml-1">{kpi.unit}</span>
            </p>
            <p className={`text-sm mt-1 ${kpi.up ? 'text-green-400' : 'text-red-400'}`}>
              {kpi.change} vs last month
            </p>
          </div>
        ))}
      </div>

      {/* Production Chart */}
      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
        <h2 className="text-white font-semibold mb-4">Production Performance</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={productionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
            <XAxis dataKey="week" stroke="#666" tick={{ fill: '#888', fontSize: 12 }} />
            <YAxis stroke="#666" tick={{ fill: '#888', fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#13131a', border: '1px solid #2a2a3a', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend />
            <Bar dataKey="Output" fill="#818cf8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Efficiency" fill="#34d399" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Downtime & Wastage */}
      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
        <h2 className="text-white font-semibold mb-4">Downtime & Wastage</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={wastageData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
            <XAxis dataKey="week" stroke="#666" tick={{ fill: '#888', fontSize: 12 }} />
            <YAxis stroke="#666" tick={{ fill: '#888', fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#13131a', border: '1px solid #2a2a3a', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend />
            <Line type="monotone" dataKey="Downtime" stroke="#f87171" strokeWidth={2} dot={true} />
            <Line type="monotone" dataKey="Wastage" stroke="#fbbf24" strokeWidth={2} dot={true} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Supplier Table */}
      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
        <h2 className="text-white font-semibold mb-4">Supplier Performance</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-[#2a2a3a]">
              <th className="text-left pb-3">Supplier</th>
              <th className="text-left pb-3">Material</th>
              <th className="text-left pb-3">On-Time Delivery</th>
              <th className="text-left pb-3">Quality Score</th>
              <th className="text-left pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Supplier X', material: 'Raw Steel', delivery: '67%', quality: '58/100', status: 'critical' },
              { name: 'Supplier Y', material: 'Electronics', delivery: '91%', quality: '84/100', status: 'good' },
              { name: 'Supplier Z', material: 'Packaging', delivery: '88%', quality: '79/100', status: 'good' },
              { name: 'Supplier W', material: 'Chemicals', delivery: '73%', quality: '71/100', status: 'warning' },
            ].map((s) => (
              <tr key={s.name} className="border-b border-[#2a2a3a]">
                <td className="py-3 text-white font-medium">{s.name}</td>
                <td className="py-3 text-gray-300">{s.material}</td>
                <td className="py-3 text-gray-300">{s.delivery}</td>
                <td className="py-3 text-gray-300">{s.quality}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    s.status === 'critical' ? 'bg-red-500/20 text-red-400' :
                    s.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {s.status}
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