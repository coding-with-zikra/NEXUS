'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ROOT_CAUSE_CHAINS = {
  profit: {
    title: 'Why did profit decrease?',
    summary: 'Profit dropped 8% this month. The root cause traces back to a single supplier quality issue that created a cascade of operational problems.',
    chain: [
      { level: 0, icon: '📉', label: 'Net Profit Dropped 8%', detail: 'From ₹2.5 Cr to ₹2.3 Cr this month', severity: 'critical' },
      { level: 1, icon: '💸', label: 'Operating Costs Increased 18%', detail: 'Raw material costs up ₹42L vs last month', severity: 'high' },
      { level: 2, icon: '🏭', label: 'Production Wastage Up 2.8%', detail: 'Defective output increased — 680 units scrapped', severity: 'high' },
      { level: 3, icon: '⚙️', label: 'Machine #04 Downtime 4.2%', detail: '62% of total downtime caused by Machine #04 alone', severity: 'high' },
      { level: 4, icon: '🔧', label: 'Maintenance Delay — 3 Weeks Overdue', detail: 'Scheduled maintenance was postponed 3 times', severity: 'medium' },
      { level: 5, icon: '🚚', label: 'Supplier X Raw Material Quality Issues', detail: 'Supplier X delivered substandard steel in 3 of last 4 shipments', severity: 'critical' },
    ],
    recommendations: [
      { action: 'Replace Supplier X immediately', priority: 'critical', impact: 'Stops cascade at root' },
      { action: 'Schedule emergency maintenance for Machine #04', priority: 'high', impact: 'Reduces wastage by ~60%' },
      { action: 'Increase quality inspection at goods receipt', priority: 'medium', impact: 'Catches defects earlier' },
    ]
  },
  efficiency: {
    title: 'Why did production efficiency drop?',
    summary: 'Production efficiency fell from 87% to 78% over 4 weeks. The chain leads to workforce scheduling and machine maintenance issues.',
    chain: [
      { level: 0, icon: '⚡', label: 'Production Efficiency Dropped to 78%', detail: 'Was 87% last month — 9% decline', severity: 'critical' },
      { level: 1, icon: '🏭', label: 'Output Below Target by 12%', detail: '24,560 units vs 28,000 target', severity: 'high' },
      { level: 2, icon: '⚙️', label: 'Machine Downtime at 4.2%', detail: '3 machines had unplanned stops this week', severity: 'high' },
      { level: 3, icon: '👥', label: 'Skilled Operator Shortage', detail: '4 experienced operators on leave simultaneously', severity: 'medium' },
      { level: 4, icon: '📅', label: 'Leave Policy Not Staggered', detail: 'No system to prevent simultaneous critical-skill leave', severity: 'medium' },
    ],
    recommendations: [
      { action: 'Implement leave staggering for critical operators', priority: 'high', impact: 'Prevents skill gaps' },
      { action: 'Cross-train backup operators for Machine #04', priority: 'high', impact: 'Reduces dependency' },
      { action: 'Predictive maintenance schedule for all machines', priority: 'medium', impact: 'Reduces unplanned downtime' },
    ]
  },
}

export default function RootCausePage() {
  const router = useRouter()
  const [problem, setProblem] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const analyze = () => {
    if (!problem.trim()) return
    setLoading(true)
    setTimeout(() => {
      if (problem.toLowerCase().includes('profit') || problem.toLowerCase().includes('cost')) {
        setResult(ROOT_CAUSE_CHAINS.profit)
      } else {
        setResult(ROOT_CAUSE_CHAINS.efficiency)
      }
      setLoading(false)
    }, 1500)
  }

  const severityColor = (s: string) =>
    s === 'critical' ? 'border-red-500 bg-red-500/10 text-red-400' :
    s === 'high' ? 'border-orange-500 bg-orange-500/10 text-orange-400' :
    'border-yellow-500 bg-yellow-500/10 text-yellow-400'

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">🔍 Root Cause Analysis</h1>
        <p className="text-gray-400 text-sm mt-1">
          NEXUS traces problems to their origin — not just symptoms, but the actual root cause.
        </p>
      </div>

      {/* Input */}
      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
        <label className="text-gray-400 text-sm mb-2 block">What problem do you want to investigate?</label>
        <div className="flex gap-3">
          <input
            type="text"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="e.g. Why did profit decrease this month?"
            className="flex-1 bg-[#1a1a2e] border border-[#2a2a3a] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
            onKeyDown={(e) => e.key === 'Enter' && analyze()}
          />
          <button
            onClick={analyze}
            disabled={loading}
            className="px-6 py-3 text-sm font-bold text-white rounded-lg disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #dc2626, #991b1b)' }}
          >
            {loading ? 'Analyzing...' : 'Find Root Cause'}
          </button>
        </div>
        <div className="flex gap-2 mt-3 flex-wrap">
          {[
            'Why did profit decrease this month?',
            'Why did production efficiency drop?',
            'Why is inventory low?',
          ].map((s) => (
            <button
              key={s}
              onClick={() => setProblem(s)}
              className="text-xs text-red-400 border border-red-500/30 rounded-full px-3 py-1 hover:bg-red-500/10 transition-all"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {result && (
        <>
          {/* Summary */}
          <div className="bg-[#13131a] border border-blue-500/30 rounded-xl p-5">
            <h2 className="text-white font-semibold mb-2">🧠 NEXUS Analysis — {result.title}</h2>
            <p className="text-gray-300 text-sm">{result.summary}</p>
          </div>

          {/* Root Cause Chain */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
            <h2 className="text-white font-semibold mb-6">🔗 Root Cause Chain</h2>
            <div className="relative">
              {result.chain.map((node: any, i: number) => (
                <div key={i} className="flex items-start gap-4 mb-4">
                  {/* Connector line */}
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${severityColor(node.severity)}`}>
                      <span className="text-lg">{node.icon}</span>
                    </div>
                    {i < result.chain.length - 1 && (
                      <div className="w-0.5 h-6 bg-[#2a2a3a] mt-1" />
                    )}
                  </div>
                  {/* Content */}
                  <div className={`flex-1 p-4 rounded-xl border ${severityColor(node.severity)} mb-2`}
                    style={{ marginLeft: `${node.level * 20}px` }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-white font-medium text-sm">{node.label}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        node.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                        node.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>{node.severity}</span>
                    </div>
                    <p className="text-gray-400 text-xs">{node.detail}</p>
                    {i < result.chain.length - 1 && (
                      <p className="text-gray-600 text-xs mt-2">↓ caused by</p>
                    )}
                    {i === result.chain.length - 1 && (
                      <p className="text-red-400 text-xs mt-2 font-bold">⬆ ROOT CAUSE</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-[#13131a] border border-green-500/20 rounded-xl p-5">
            <h2 className="text-white font-semibold mb-4">✅ Recommended Actions</h2>
            <div className="space-y-3">
              {result.recommendations.map((rec: any, i: number) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-[#1a1a2e] rounded-xl border border-[#2a2a3a]">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm ${
                    rec.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                    rec.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>{i + 1}</div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{rec.action}</p>
                    <p className="text-gray-500 text-xs mt-0.5">Impact: {rec.impact}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                    rec.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                    rec.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>{rec.priority}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/dashboard/contradictions')}
              className="flex-1 py-3 text-sm font-bold text-white rounded-lg"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
            >
              🧩 Check Contradictions
            </button>
            <button
              onClick={() => router.push('/dashboard/future-lab')}
              className="flex-1 py-3 text-sm font-bold text-white rounded-lg"
              style={{ background: 'linear-gradient(135deg, #0891b2, #0e7490)' }}
            >
              🔮 Simulate Fix Impact
            </button>
            <button
              onClick={() => router.push('/dashboard/decision-center')}
              className="flex-1 py-3 text-sm font-bold text-white rounded-lg"
              style={{ background: 'linear-gradient(135deg, #dc2626, #991b1b)' }}
            >
              ⚔️ Challenge Decision
            </button>
          </div>
        </>
      )}
    </div>
  )
}