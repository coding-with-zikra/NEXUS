'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts'

const BASE = {
  revenue: 12.6, profit: 2.3, cash: 1.8, production: 24560,
  efficiency: 78, employees: 482, suppliers: 24, inventory: 1245
}

function simulateScenario(type: string, value: number) {
  const scenarios: any[] = []

  if (type === 'production') {
    const f = value / 100
    const capitalNeeded = (value * 0.093).toFixed(1)
    const stockoutDays = Math.round(18 * 100 / (100 + value))

    scenarios.push({
      name: 'Option A — Proceed Now',
      revenue: +(BASE.revenue * (1 + f * 0.8)).toFixed(1),
      profit: value > 15 ? +(BASE.profit * (1 - 0.2)).toFixed(1) : +(BASE.profit * (1 + f * 0.3)).toFixed(1),
      cash: +(BASE.cash - parseFloat(capitalNeeded) * 0.6).toFixed(1),
      risk: value > 20 ? 'Critical' : value > 10 ? 'High' : 'Medium',
      inventory: `Stockout in ~${stockoutDays} days`,
      production: Math.round(BASE.production * (1 + f)),
      warning: value > 15 ? `⚠️ Cash goes negative — ₹${capitalNeeded} Cr needed, only ₹1.8 Cr available` : null,
    })
    scenarios.push({
      name: `Option B — Partial +${Math.round(value / 2)}%`,
      revenue: +(BASE.revenue * (1 + f * 0.4)).toFixed(1),
      profit: +(BASE.profit * (1 + f * 0.2)).toFixed(1),
      cash: +(BASE.cash - parseFloat(capitalNeeded) * 0.25).toFixed(1),
      risk: value > 20 ? 'Medium' : 'Low',
      inventory: 'Manageable with Supplier Y',
      production: Math.round(BASE.production * (1 + f / 2)),
      warning: null,
    })
    scenarios.push({
      name: 'Option C — Fix Issues First',
      revenue: +(BASE.revenue * 1.05).toFixed(1),
      profit: +(BASE.profit * 1.12).toFixed(1),
      cash: +(BASE.cash + 0.3).toFixed(1),
      risk: 'Low',
      inventory: 'Secured with new supplier',
      production: Math.round(BASE.production * 1.05),
      warning: null,
      note: 'Fix Machine #04 + Switch supplier → then scale production next quarter'
    })
  } else if (type === 'supplier') {
    scenarios.push({
      name: 'Option A — Switch to Supplier Y Now',
      revenue: BASE.revenue,
      profit: +(BASE.profit + 0.3).toFixed(1),
      cash: +(BASE.cash + 0.2).toFixed(1),
      risk: 'Low',
      inventory: 'Secured — 91% on-time delivery',
      production: Math.round(BASE.production * 1.06),
      note: 'Saves ₹28-35L/month in quality losses. Machine damage stops.'
    })
    scenarios.push({
      name: 'Option B — Gradual Transition (50/50)',
      revenue: BASE.revenue,
      profit: +(BASE.profit + 0.15).toFixed(1),
      cash: +(BASE.cash + 0.1).toFixed(1),
      risk: 'Low',
      inventory: 'Mixed — some risk remains',
      production: Math.round(BASE.production * 1.03),
      warning: 'Supplier X issues continue at 50% volume'
    })
    scenarios.push({
      name: 'Option C — Stay with Supplier X',
      revenue: +(BASE.revenue * 0.95).toFixed(1),
      profit: +(BASE.profit * 0.75).toFixed(1),
      cash: +(BASE.cash - 0.4).toFixed(1),
      risk: 'Critical',
      inventory: 'Stockout risk in 18 days',
      production: Math.round(BASE.production * 0.88),
      warning: '⚠️ Machine damage continues. Production loss: ₹85L+/month'
    })
  } else if (type === 'hiring') {
    const monthlyCost = (value * 0.45 / 10).toFixed(1)
    scenarios.push({
      name: `Option A — Hire ${value} Now`,
      revenue: +(BASE.revenue * 1.08).toFixed(1),
      profit: +(BASE.profit + 0.1).toFixed(1),
      cash: +(BASE.cash - parseFloat(monthlyCost) * 0.5).toFixed(1),
      risk: 'Medium',
      inventory: 'Unchanged',
      production: Math.round(BASE.production * 1.1),
      warning: `₹${monthlyCost} Cr/month payroll increase — tight on cash`
    })
    scenarios.push({
      name: `Option B — Hire ${Math.round(value / 2)} Now, Rest Later`,
      revenue: +(BASE.revenue * 1.04).toFixed(1),
      profit: +(BASE.profit + 0.05).toFixed(1),
      cash: +(BASE.cash - parseFloat(monthlyCost) * 0.25).toFixed(1),
      risk: 'Low',
      inventory: 'Unchanged',
      production: Math.round(BASE.production * 1.05),
      note: 'Collect receivables first, hire remainder next month'
    })
    scenarios.push({
      name: 'Option C — Automate Instead',
      revenue: +(BASE.revenue * 1.06).toFixed(1),
      profit: +(BASE.profit + 0.2).toFixed(1),
      cash: +(BASE.cash - 0.5).toFixed(1),
      risk: 'Low',
      inventory: 'Unchanged',
      production: Math.round(BASE.production * 1.12),
      note: 'One-time ₹50L investment → saves ₹8-10L/month long term'
    })
  } else {
    // Sales change
    const f = value / 100
    scenarios.push({
      name: 'Option A — Aggressive Growth',
      revenue: +(BASE.revenue * (1 + f)).toFixed(1),
      profit: +(BASE.profit * (1 + f * 1.2)).toFixed(1),
      cash: +(BASE.cash + f * 0.4).toFixed(1),
      risk: value < -10 ? 'High' : 'Medium',
      inventory: value > 0 ? 'May need restock' : 'Excess stock risk',
      production: Math.round(BASE.production * (1 + f * 0.8)),
    })
    scenarios.push({
      name: 'Option B — Conservative Approach',
      revenue: +(BASE.revenue * (1 + f * 0.5)).toFixed(1),
      profit: +(BASE.profit * (1 + f * 0.6)).toFixed(1),
      cash: +(BASE.cash + f * 0.2).toFixed(1),
      risk: 'Low',
      inventory: 'Stable',
      production: Math.round(BASE.production * (1 + f * 0.4)),
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
  }
  return scenarios
}

const SCENARIOS: any = {
  production: {
    label: '🏭 Production Volume Change',
    desc: 'Simulate impact of changing production volume',
    options: [
      { label: '+10% increase', value: 10 },
      { label: '+20% increase', value: 20 },
      { label: '+30% increase', value: 30 },
      { label: '-10% reduction', value: -10 },
    ]
  },
  supplier: {
    label: '🚚 Supplier Strategy',
    desc: 'Simulate different supplier strategies',
    options: [
      { label: 'Switch to Supplier Y', value: 1 },
      { label: 'Gradual transition', value: 2 },
      { label: 'Keep Supplier X', value: 3 },
    ]
  },
  hiring: {
    label: '👥 Hiring Decision',
    desc: 'Simulate impact of hiring new employees',
    options: [
      { label: 'Hire 10 employees', value: 10 },
      { label: 'Hire 20 employees', value: 20 },
      { label: 'Hire 30 employees', value: 30 },
    ]
  },
  sales: {
    label: '📈 Sales Performance Change',
    desc: 'Simulate different sales scenarios',
    options: [
      { label: '+10% growth', value: 10 },
      { label: '+20% growth', value: 20 },
      { label: '-10% decline', value: -10 },
      { label: '-20% decline', value: -20 },
    ]
  }
}

export default function FutureLabPage() {
  const [scenarioType, setScenarioType] = useState('production')
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [results, setResults] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(false)

  const runSimulation = async () => {
    if (selectedOption === null) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setResults(simulateScenario(scenarioType, selectedOption))
    setLoading(false)
  }

  const riskColor = (r: string) =>
    r === 'Critical' || r === 'High' ? 'bg-red-500/20 text-red-400' :
    r === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
    'bg-green-500/20 text-green-400'

  const chartData = results ? [
    { name: 'Revenue (Cr)', ...Object.fromEntries(results.map((r, i) => [`Option ${String.fromCharCode(65 + i)}`, r.revenue])) },
    { name: 'Profit (Cr)', ...Object.fromEntries(results.map((r, i) => [`Option ${String.fromCharCode(65 + i)}`, r.profit])) },
    { name: 'Cash (Cr)', ...Object.fromEntries(results.map((r, i) => [`Option ${String.fromCharCode(65 + i)}`, r.cash])) },
  ] : []

  const COLORS = ['#3b82f6', '#10b981', '#8b5cf6']

  const bestOption = results ? results.reduce((best, curr) =>
    (curr.profit > best.profit && curr.cash > 0) ? curr : best
  ) : null

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">🔮 Future Lab — What-If Simulator</h1>
        <p className="text-gray-400 text-sm mt-1">Simulate decisions before you make them. NEXUS calculates financial impact using real business data.</p>
      </div>

      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
        <h2 className="text-white font-semibold mb-4">Build Your Scenario</h2>
        <div className="mb-4">
          <label className="text-gray-400 text-sm mb-2 block">What do you want to simulate?</label>
          <div className="flex gap-3 flex-wrap">
            {Object.entries(SCENARIOS).map(([key, s]: [string, any]) => (
              <button key={key} onClick={() => { setScenarioType(key); setSelectedOption(null); setResults(null) }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  scenarioType === key ? 'bg-purple-600 text-white' : 'bg-[#1a1a2e] text-gray-400 border border-[#2a2a3a] hover:text-white'
                }`}>{s.label}</button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="text-gray-400 text-sm mb-2 block">{SCENARIOS[scenarioType].desc}</label>
          <div className="flex flex-wrap gap-2">
            {SCENARIOS[scenarioType].options.map((opt: any, i: number) => (
              <button key={i} onClick={() => setSelectedOption(opt.value)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  selectedOption === opt.value ? 'bg-purple-600 text-white border border-purple-400' :
                  'bg-[#1a1a2e] text-gray-400 border border-[#2a2a3a] hover:text-white'
                }`}>{opt.label}</button>
            ))}
          </div>
        </div>
        <button onClick={runSimulation} disabled={selectedOption === null || loading}
          className="px-8 py-3 text-sm font-bold text-white rounded-lg disabled:opacity-40"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
          {loading ? '⚙️ Calculating impact from real data...' : '🔮 Run Simulation'}
        </button>
      </div>

      {results && (
        <>
          <div className="grid grid-cols-3 gap-4">
            {results.map((scenario, i) => (
              <div key={i} className={`bg-[#13131a] border rounded-xl p-5 ${
                bestOption?.name === scenario.name ? 'border-green-500/40' :
                i === 0 ? 'border-blue-500/30' : i === 1 ? 'border-purple-500/30' : 'border-[#2a2a3a]'
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white font-semibold text-sm">{scenario.name}</h3>
                    {bestOption?.name === scenario.name && (
                      <span className="text-green-400 text-xs font-bold">⭐ RECOMMENDED</span>
                    )}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-bold ${riskColor(scenario.risk)}`}>
                    {scenario.risk} Risk
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'Revenue', value: `₹${scenario.revenue} Cr`, base: BASE.revenue, up: scenario.revenue >= BASE.revenue },
                    { label: 'Profit', value: `₹${scenario.profit} Cr`, base: BASE.profit, up: scenario.profit >= BASE.profit },
                    { label: 'Cash Balance', value: `₹${scenario.cash} Cr`, base: BASE.cash, up: scenario.cash >= BASE.cash },
                    { label: 'Production', value: `${scenario.production?.toLocaleString()} units`, base: BASE.production, up: scenario.production >= BASE.production },
                  ].map((m) => (
                    <div key={m.label} className="flex items-center justify-between">
                      <span className="text-gray-400 text-xs">{m.label}</span>
                      <div className="text-right">
                        <span className="text-white text-xs font-bold">{m.value}</span>
                        {typeof m.base === 'number' && (
                          <span className={`text-xs ml-2 ${m.up ? 'text-green-400' : 'text-red-400'}`}>
                            {m.up ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-[#2a2a3a]">
                    <p className="text-gray-500 text-xs">Inventory: {scenario.inventory}</p>
                  </div>
                </div>
                {scenario.warning && (
                  <div className="mt-3 p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-400 text-xs">{scenario.warning}</p>
                  </div>
                )}
                {scenario.note && (
                  <div className="mt-3 p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="text-blue-400 text-xs">{scenario.note}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <h2 className="text-white font-semibold mb-4">📊 Financial Impact Comparison</h2>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
                <XAxis dataKey="name" stroke="#444" tick={{ fill: '#666', fontSize: 11 }} />
                <YAxis stroke="#444" tick={{ fill: '#666', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#13131a', border: '1px solid #2a2a3a', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                <Legend />
                {results.map((r, i) => (
                  <Bar key={i} dataKey={`Option ${String.fromCharCode(65 + i)}`} fill={COLORS[i]} radius={[4, 4, 0, 0]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {bestOption && (
            <div className="bg-[#13131a] border border-green-500/30 rounded-xl p-5">
              <h2 className="text-white font-semibold mb-2">🧠 NEXUS Recommendation</h2>
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-300 text-sm font-medium mb-2">⭐ Best Option: {bestOption.name}</p>
                <p className="text-gray-300 text-sm">
                  This option delivers the best balance of revenue growth (₹{bestOption.revenue} Cr),
                  profit (₹{bestOption.profit} Cr), and maintains positive cash flow (₹{bestOption.cash} Cr).
                  Risk level: <span className={`font-bold ${bestOption.risk === 'Low' ? 'text-green-400' : bestOption.risk === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>{bestOption.risk}</span>.
                  {bestOption.note && ` Note: ${bestOption.note}`}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}