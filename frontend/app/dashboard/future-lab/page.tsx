'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

type Scenario = {
  name: string
  revenue: number
  profit: number
  cash: number
  risk: string
  inventory: string
  production: number
}

const BASE = { revenue: 12.6, profit: 2.3, cash: 1.8, production: 24560 }

const SCENARIOS: Record<string, { label: string, description: string, options: { label: string, value: number }[] }> = {
  production: {
    label: 'Production Change',
    description: 'What happens if we change production volume?',
    options: [
      { label: '+10% increase', value: 10 },
      { label: '+20% increase', value: 20 },
      { label: '+30% increase', value: 30 },
      { label: '-10% decrease', value: -10 },
      { label: '-20% decrease', value: -20 },
    ]
  },
  sales: {
    label: 'Sales Change',
    description: 'What happens if sales performance changes?',
    options: [
      { label: '+10% growth', value: 10 },
      { label: '+20% growth', value: 20 },
      { label: '-10% decline', value: -10 },
      { label: '-20% decline', value: -20 },
    ]
  },
  supplier: {
    label: 'Supplier Delay',
    description: 'What if supplier delivery is delayed?',
    options: [
      { label: '7 days delay', value: 7 },
      { label: '14 days delay', value: 14 },
      { label: '30 days delay', value: 30 },
    ]
  },
}

function calculateImpact(type: string, value: number): Scenario[] {
  const scenarios: Scenario[] = []

  if (type === 'production') {
    const factor = value / 100
    scenarios.push({
      name: 'Option A — Proceed',
      revenue: +(BASE.revenue * (1 + factor * 0.8)).toFixed(1),
      profit: +(BASE.profit * (1 + factor * 0.5)).toFixed(1),
      cash: +(BASE.cash - Math.abs(factor) * 0.8).toFixed(1),
      risk: value > 20 ? 'High' : value > 10 ? 'Medium' : 'Low',
      inventory: value > 0 ? 'Under Pressure' : 'Adequate',
      production: Math.round(BASE.production * (1 + factor)),
    })
    scenarios.push({
      name: `Option B — Partial ${value > 0 ? '+' : ''}${Math.round(value / 2)}%`,
      revenue: +(BASE.revenue * (1 + factor * 0.4)).toFixed(1),
      profit: +(BASE.profit * (1 + factor * 0.3)).toFixed(1),
      cash: +(BASE.cash - Math.abs(factor) * 0.4).toFixed(1),
      risk: value > 20 ? 'Medium' : 'Low',
      inventory: 'Manageable',
      production: Math.round(BASE.production * (1 + factor / 2)),
    })
    scenarios.push({
      name: 'Option C — Delay 1 Quarter',
      revenue: BASE.revenue,
      profit: +(BASE.profit * 1.05).toFixed(1),
      cash: +(BASE.cash + 0.3).toFixed(1),
      risk: 'Low',
      inventory: 'Good',
      production: BASE.production,
    })
  } else if (type === 'sales') {
    const factor = value / 100
    scenarios.push({
      name: 'Option A — Aggressive Growth',
      revenue: +(BASE.revenue * (1 + factor)).toFixed(1),
      profit: +(BASE.profit * (1 + factor * 1.2)).toFixed(1),
      cash: +(BASE.cash + factor * 0.5).toFixed(1),
      risk: value < -10 ? 'High' : 'Medium',
      inventory: value > 0 ? 'May need restock' : 'Excess stock risk',
      production: Math.round(BASE.production * (1 + factor * 0.8)),
    })
    scenarios.push({
      name: 'Option B — Conservative',
      revenue: +(BASE.revenue * (1 + factor * 0.5)).toFixed(1),
      profit: +(BASE.profit * (1 + factor * 0.6)).toFixed(1),
      cash: +(BASE.cash + factor * 0.2).toFixed(1),
      risk: 'Low',
      inventory: 'Stable',
      production: Math.round(BASE.production * (1 + factor * 0.4)),
    })
    scenarios.push({
      name: 'Option C — Status Quo',
      revenue: BASE.revenue,
      profit: BASE.profit,
      cash: BASE.cash,
      risk: 'Low',
      inventory: 'Current',
      production: BASE.production,
    })
  } else {
    scenarios.push({
      name: 'Option A — Find Alternate Supplier',
      revenue: BASE.revenue,
      profit: +(BASE.profit * 0.95).toFixed(1),
      cash: +(BASE.cash - 0.2).toFixed(1),
      risk: 'Medium',
      inventory: 'Manageable',
      production: Math.round(BASE.production * 0.92),
    })
    scenarios.push({
      name: 'Option B — Emergency Stock Purchase',
      revenue: +(BASE.revenue * 0.95).toFixed(1),
      profit: +(BASE.profit * 0.85).toFixed(1),
      cash: +(BASE.cash - 0.6).toFixed(1),
      risk: 'High',
      inventory: 'Secured',
      production: BASE.production,
    })
    scenarios.push({
      name: 'Option C — Reduce Production',
      revenue: +(BASE.revenue * 0.85).toFixed(1),
      profit: +(BASE.profit * 0.9).toFixed(1),
      cash: +(BASE.cash + 0.1).toFixed(1),
      risk: 'Low',
      inventory: 'Preserved',
      production: Math.round(BASE.production * 0.75),
    })
  }
  return scenarios
}

export default function FutureLabPage() {
  const [scenarioType, setScenarioType] = useState('production')
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [results, setResults] = useState<Scenario[] | null>(null)
  const [loading, setLoading] = useState(false)

  const runSimulation = () => {
    if (selectedOption === null) return
    setLoading(true)
    setTimeout(() => {
      setResults(calculateImpact(scenarioType, selectedOption))
      setLoading(false)
    }, 1500)
  }

  const riskColor = (risk: string) =>
    risk === 'High' ? 'text-red-400 bg-red-500/20' :
    risk === 'Medium' ? 'text-yellow-400 bg-yellow-500/20' :
    'text-green-400 bg-green-500/20'

  const chartData = results ? [
    { name: 'Revenue (Cr)', ...Object.fromEntries(results.map(r => [r.name.split('—')[0].trim(), r.revenue])) },
    { name: 'Profit (Cr)', ...Object.fromEntries(results.map(r => [r.name.split('—')[0].trim(), r.profit])) },
    { name: 'Cash (Cr)', ...Object.fromEntries(results.map(r => [r.name.split('—')[0].trim(), r.cash])) },
  ] : []

  const COLORS = ['#3b82f6', '#10b981', '#8b5cf6']

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">🔮 Future Lab — What-If Simulator</h1>
        <p className="text-gray-400 text-sm mt-1">
          Simulate decisions before you make them. Compare Option A vs B vs C with financial impact.
        </p>
      </div>

      {/* Scenario Builder */}
      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
        <h2 className="text-white font-semibold mb-4">Build Your Scenario</h2>

        {/* Scenario Type */}
        <div className="mb-4">
          <label className="text-gray-400 text-sm mb-2 block">What do you want to simulate?</label>
          <div className="flex gap-3">
            {Object.entries(SCENARIOS).map(([key, s]) => (
              <button
                key={key}
                onClick={() => { setScenarioType(key); setSelectedOption(null); setResults(null) }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  scenarioType === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#1a1a2e] text-gray-400 hover:text-white border border-[#2a2a3a]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Options */}
        <div className="mb-4">
          <label className="text-gray-400 text-sm mb-2 block">{SCENARIOS[scenarioType].description}</label>
          <div className="flex flex-wrap gap-2">
            {SCENARIOS[scenarioType].options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelectedOption(opt.value)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  selectedOption === opt.value
                    ? 'bg-purple-600 text-white border border-purple-400'
                    : 'bg-[#1a1a2e] text-gray-400 hover:text-white border border-[#2a2a3a]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={runSimulation}
          disabled={selectedOption === null || loading}
          className="px-8 py-3 text-sm font-bold text-white rounded-lg disabled:opacity-40 transition-all"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
        >
          {loading ? '⚙️ Running Simulation...' : '🔮 Run Simulation'}
        </button>
      </div>

      {results && (
        <>
          {/* Option Cards */}
          <div className="grid grid-cols-3 gap-4">
            {results.map((scenario, i) => (
              <div
                key={i}
                className={`bg-[#13131a] border rounded-xl p-5 ${
                  i === 0 ? 'border-blue-500/40' :
                  i === 1 ? 'border-green-500/40' :
                  'border-purple-500/40'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-sm">{scenario.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-bold ${riskColor(scenario.risk)}`}>
                    {scenario.risk} Risk
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Revenue', value: `₹${scenario.revenue} Cr`, change: scenario.revenue > BASE.revenue ? `+${(scenario.revenue - BASE.revenue).toFixed(1)}` : `${(scenario.revenue - BASE.revenue).toFixed(1)}`, up: scenario.revenue >= BASE.revenue },
                    { label: 'Profit', value: `₹${scenario.profit} Cr`, change: scenario.profit > BASE.profit ? `+${(scenario.profit - BASE.profit).toFixed(1)}` : `${(scenario.profit - BASE.profit).toFixed(1)}`, up: scenario.profit >= BASE.profit },
                    { label: 'Cash Balance', value: `₹${scenario.cash} Cr`, change: scenario.cash > BASE.cash ? `+${(scenario.cash - BASE.cash).toFixed(1)}` : `${(scenario.cash - BASE.cash).toFixed(1)}`, up: scenario.cash >= BASE.cash },
                    { label: 'Production', value: `${scenario.production.toLocaleString()} units`, change: '', up: scenario.production >= BASE.production },
                  ].map((metric) => (
                    <div key={metric.label} className="flex items-center justify-between">
                      <span className="text-gray-400 text-xs">{metric.label}</span>
                      <div className="text-right">
                        <span className="text-white text-xs font-bold">{metric.value}</span>
                        {metric.change && (
                          <span className={`text-xs ml-2 ${metric.up ? 'text-green-400' : 'text-red-400'}`}>
                            {metric.change} Cr
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-[#2a2a3a]">
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-xs">Inventory</span>
                      <span className="text-gray-300 text-xs">{scenario.inventory}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Chart */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <h2 className="text-white font-semibold mb-4">📊 Financial Impact Comparison</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
                <XAxis dataKey="name" stroke="#444" tick={{ fill: '#666', fontSize: 11 }} />
                <YAxis stroke="#444" tick={{ fill: '#666', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#13131a', border: '1px solid #2a2a3a', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                <Legend />
                {results.map((r, i) => (
                  <Bar key={i} dataKey={r.name.split('—')[0].trim()} fill={COLORS[i]} radius={[4, 4, 0, 0]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recommendation */}
          <div className="bg-[#13131a] border border-green-500/30 rounded-xl p-5">
            <h2 className="text-white font-semibold mb-3">🧠 NEXUS Recommendation</h2>
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-green-300 text-sm font-medium mb-2">
                ✅ Recommended: {results[1].name}
              </p>
              <p className="text-gray-300 text-sm">
                This option provides the best balance of revenue growth and risk management.
                It avoids cash flow pressure while still capturing market opportunity.
                Estimated additional profit: ₹{(results[1].profit - BASE.profit).toFixed(1)} Cr with {results[1].risk} risk level.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}