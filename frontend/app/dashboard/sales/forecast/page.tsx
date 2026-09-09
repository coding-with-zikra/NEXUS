'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const forecastData = [
  { month: 'Oct', Actual: null, Forecast: 13.8, Optimistic: 15.2, Conservative: 12.4 },
  { month: 'Nov', Actual: null, Forecast: 14.5, Optimistic: 16.1, Conservative: 13.0 },
  { month: 'Dec', Actual: null, Forecast: 16.2, Optimistic: 18.0, Conservative: 14.5 },
  { month: 'Jan', Actual: null, Forecast: 14.8, Optimistic: 16.4, Conservative: 13.2 },
  { month: 'Feb', Actual: null, Forecast: 15.3, Optimistic: 17.0, Conservative: 13.8 },
  { month: 'Mar', Actual: null, Forecast: 16.8, Optimistic: 18.6, Conservative: 15.0 },
]

const historicalData = [
  { month: 'Apr', Actual: 9.8 },
  { month: 'May', Actual: 11.1 },
  { month: 'Jun', Actual: 12.6 },
  { month: 'Jul', Actual: 13.1 },
  { month: 'Aug', Actual: 12.8 },
  { month: 'Sep', Actual: 13.4 },
]

export default function ForecastPage() {
  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">📈 Sales Forecast</h1>
        <p className="text-gray-400 text-sm mt-1">AI-powered sales predictions for the next 6 months.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Q4 Forecast', value: '₹44.5 Cr', sub: 'Oct-Dec 2026', color: 'text-blue-400' },
          { label: 'Optimistic Case', value: '₹49.3 Cr', sub: '+10% above forecast', color: 'text-green-400' },
          { label: 'Conservative Case', value: '₹39.9 Cr', sub: '-10% below forecast', color: 'text-yellow-400' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <p className="text-gray-400 text-xs mb-2">{kpi.label}</p>
            <p className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</p>
            <p className="text-gray-500 text-xs mt-1">{kpi.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
        <h2 className="text-white font-semibold mb-4">Historical Performance</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
            <XAxis dataKey="month" stroke="#444" tick={{ fill: '#666', fontSize: 11 }} />
            <YAxis stroke="#444" tick={{ fill: '#666', fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: '#13131a', border: '1px solid #2a2a3a', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
            <Line type="monotone" dataKey="Actual" stroke="#3b82f6" strokeWidth={2} dot={true} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
        <h2 className="text-white font-semibold mb-4">6-Month Forecast</h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
            <XAxis dataKey="month" stroke="#444" tick={{ fill: '#666', fontSize: 11 }} />
            <YAxis stroke="#444" tick={{ fill: '#666', fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: '#13131a', border: '1px solid #2a2a3a', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
            <Legend />
            <Line type="monotone" dataKey="Forecast" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            <Line type="monotone" dataKey="Optimistic" stroke="#10b981" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
            <Line type="monotone" dataKey="Conservative" stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-[#13131a] border border-blue-500/30 rounded-xl p-5">
        <h2 className="text-white font-semibold mb-3">🧠 AI Forecast Insights</h2>
        <div className="space-y-2">
          {[
            { icon: '🟢', text: 'December shows highest forecast at ₹16.2 Cr due to seasonal demand spike' },
            { icon: '🟡', text: 'January dip expected — plan inventory accordingly to avoid overstock' },
            { icon: '🔵', text: 'Q1 2027 shows strong growth trajectory — consider capacity expansion now' },
          ].map((insight, i) => (
            <div key={i} className="flex items-start gap-2 p-3 bg-[#1a1a2e] rounded-lg">
              <span>{insight.icon}</span>
              <p className="text-gray-300 text-sm">{insight.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}