'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ROOT_CAUSE_DB: Record<string, any> = {
  profit: {
    title: 'Why did profit decrease?',
    summary: 'Net profit dropped 8% (₹2.5 Cr → ₹2.3 Cr) despite revenue growing 12%. Root cause traces to Supplier X quality failures creating a cascade of operational problems.',
    chain: [
      { level: 0, icon: '📉', label: 'Net Profit Dropped 8%', detail: 'From ₹2.5 Cr to ₹2.3 Cr — revenue grew 12% but costs rose 18%', severity: 'critical' },
      { level: 1, icon: '💸', label: 'Operating Costs Up 18% (₹10.3 Cr)', detail: 'Raw material + repair costs added ₹42L extra this month alone', severity: 'high' },
      { level: 2, icon: '🏭', label: 'Production Wastage at 2.8% — 680 Units Scrapped', detail: 'Defective output due to substandard raw material from Supplier X', severity: 'high' },
      { level: 3, icon: '⚙️', label: 'Machine #04 Downtime at 18.5%', detail: 'Was 4.2% last month — 4x increase. Causing 62% of all production losses', severity: 'critical' },
      { level: 4, icon: '🔧', label: 'Maintenance Overdue by 3 Months', detail: 'Machine #04 last serviced June 2025. Recommended: every 3 months', severity: 'high' },
      { level: 5, icon: '🚚', label: '⬆️ ROOT CAUSE: Supplier X Raw Material Quality Failures', detail: 'Substandard steel in 3 of 4 shipments → accelerated machine wear → unplanned downtime → scrapped units → higher costs', severity: 'critical' },
    ],
    recommendations: [
      { action: 'Switch to Supplier Y for raw steel immediately', priority: 'critical', impact: 'Stops the root cause — estimated ₹28-35L/month savings', timeline: 'This week' },
      { action: 'Emergency maintenance for Machine #04', priority: 'critical', impact: 'Fixes 62% of downtime — cost ₹4.2L vs ₹18L+ if it fails', timeline: '48 hours' },
      { action: 'Increase incoming quality inspection', priority: 'high', impact: 'Catches defective materials before they damage machines', timeline: 'This week' },
    ]
  },
  efficiency: {
    title: 'Why did production efficiency drop?',
    summary: 'Efficiency fell from 87% to 78% over 4 weeks — a 9-point drop costing ~₹85L/month in lost production. Root cause is a combination of machine failure and operator shortage.',
    chain: [
      { level: 0, icon: '⚡', label: 'Production Efficiency at 78% (Target: 87%)', detail: '9-point drop this month. Output: 24,560 units vs 28,000 target — 3,440 units shortfall', severity: 'critical' },
      { level: 1, icon: '🏭', label: 'Output 12% Below Target', detail: '3,440 units short × avg ₹4,100/unit = ~₹1.4 Cr monthly revenue loss', severity: 'high' },
      { level: 2, icon: '⚙️', label: 'Machine #04 at 18.5% Downtime', detail: '3 unplanned stops this month. Affects entire Production Line B', severity: 'critical' },
      { level: 3, icon: '👥', label: '4 Skilled Machine Operators on Simultaneous Leave', detail: 'No staggered leave policy — all 4 Line B specialists on leave same week', severity: 'high' },
      { level: 4, icon: '📅', label: '⬆️ ROOT CAUSE: No Leave Staggering Policy + Overdue Maintenance', detail: 'Two simultaneous failures: (1) Human — no backup for critical skill, (2) Equipment — 3-month maintenance delay', severity: 'high' },
    ],
    recommendations: [
      { action: 'Emergency repair of Machine #04', priority: 'critical', impact: 'Restores Line B — recovers 62% of lost efficiency', timeline: '48 hours' },
      { action: 'Implement mandatory leave staggering for operators', priority: 'high', impact: 'Prevents recurrence — never more than 1 critical operator on leave', timeline: 'This week' },
      { action: 'Cross-train 4 backup operators for Machine #04', priority: 'high', impact: 'Eliminates single-point dependency', timeline: '2 weeks' },
    ]
  },
  inventory: {
    title: 'Why is inventory critically low?',
    summary: 'Raw steel inventory at only 18 days (minimum: 30 days). Root cause is Supplier X failures combined with no alternative supplier contract.',
    chain: [
      { level: 0, icon: '📦', label: 'Raw Steel at Critical Level — 18 Days Remaining', detail: 'Below 30-day reorder point. At current consumption, stockout in 18 days', severity: 'critical' },
      { level: 1, icon: '🚚', label: 'Supplier X Deliveries Unreliable', detail: '3 of 4 recent deliveries either late, short, or substandard quality', severity: 'critical' },
      { level: 2, icon: '⚠️', label: 'No Backup Supplier Contract in Place', detail: '73% of raw steel from single supplier — no diversification strategy', severity: 'high' },
      { level: 3, icon: '📋', label: 'Procurement Policy Gap', detail: 'Single-supplier policy never reviewed despite supplier performance decline', severity: 'medium' },
      { level: 4, icon: '🔴', label: '⬆️ ROOT CAUSE: Supplier Concentration Risk', detail: '73% dependency on unreliable supplier + no backup = guaranteed stockout risk', severity: 'critical' },
    ],
    recommendations: [
      { action: 'Emergency Raw Steel order from Supplier Y TODAY', priority: 'critical', impact: 'Prevents stockout — buys 30+ days of supply', timeline: 'Today' },
      { action: 'Onboard 2 additional steel suppliers within 2 weeks', priority: 'critical', impact: 'Cap any single supplier at 40% of volume', timeline: '2 weeks' },
      { action: 'Implement 45-day minimum stock policy', priority: 'high', impact: 'Buffer against future supply disruptions', timeline: 'This month' },
    ]
  },
  cash: {
    title: 'Why is cash flow declining?',
    summary: 'Cash balance dropped 12% this month (₹2.1 Cr → ₹1.8 Cr). Multiple factors: rising costs, slow collections, and operational inefficiencies.',
    chain: [
      { level: 0, icon: '🏦', label: 'Cash Balance Down 12% to ₹1.8 Cr', detail: 'Declining monthly. At this rate: cash becomes critical in 6-8 weeks', severity: 'critical' },
      { level: 1, icon: '💸', label: 'Expenses Growing Faster Than Revenue', detail: 'Revenue: +12% | Expenses: +18% — cost growing 1.5x faster than income', severity: 'high' },
      { level: 2, icon: '📋', label: '₹2.1 Cr Stuck in Receivables (42 Invoices)', detail: '12 invoices overdue — ₹0.8 Cr immediately recoverable', severity: 'high' },
      { level: 3, icon: '⚙️', label: 'Emergency Repair Costs — ₹18L+ This Quarter', detail: 'Machine failures due to delayed maintenance adding to expenses', severity: 'high' },
      { level: 4, icon: '🚚', label: '⬆️ ROOT CAUSE: Supplier X Quality Issues Cascading into Cost Increases', detail: 'Substandard materials → machine damage → emergency repairs → scrapped production → higher total cost', severity: 'critical' },
    ],
    recommendations: [
      { action: 'Aggressive receivables collection — target ₹0.8 Cr this week', priority: 'critical', impact: 'Immediate cash injection — contact Reliance, Tata, Infosys', timeline: 'This week' },
      { action: 'Fix root cause (Supplier X) to stop cost bleeding', priority: 'critical', impact: 'Stops ₹28-35L/month in quality-related costs', timeline: '1 week' },
      { action: 'Negotiate 15-day early payment terms with top customers', priority: 'high', impact: '₹0.5-1 Cr faster cash cycle', timeline: 'This month' },
    ]
  },
  overtime: {
    title: 'Why is overtime cost increasing?',
    summary: 'Overtime costs up 42% in 3 months — from ₹8.8L to ₹12.5L/month. Root cause is operator shortage on specific production lines.',
    chain: [
      { level: 0, icon: '⏱️', label: 'Overtime Cost Up 42% — ₹12.5L/Month', detail: 'Was ₹8.8L/month 3 months ago. Concentrated in Production Lines C & D', severity: 'high' },
      { level: 1, icon: '👥', label: 'Production Lines C & D Running Understaffed', detail: '6 positions unfilled for 3+ months. Existing staff covering 130% of capacity', severity: 'high' },
      { level: 2, icon: '🏖️', label: '4 Senior Operators on Extended Leave', detail: 'Long-term absence creating chronic understaffing on critical lines', severity: 'medium' },
      { level: 3, icon: '📋', label: '⬆️ ROOT CAUSE: No Minimum Staffing Policy + Leave Gap', detail: 'No rule preventing all senior operators from being absent simultaneously', severity: 'medium' },
    ],
    recommendations: [
      { action: 'Set ₹10L monthly overtime cap with CFO approval above that', priority: 'high', impact: 'Controls cost immediately', timeline: 'This week' },
      { action: 'Hire 2 contract operators for Lines C & D', priority: 'high', impact: 'Saves ₹2-3L/month in overtime', timeline: '2 weeks' },
      { action: 'Implement leave staggering policy for all production lines', priority: 'medium', impact: 'Prevents future occurrence', timeline: 'This month' },
    ]
  }
}

function analyzeRootCause(problem: string) {
  const p = problem.toLowerCase()
  if (p.includes('profit') || p.includes('loss') || p.includes('margin') || p.includes('earning')) return ROOT_CAUSE_DB.profit
  if (p.includes('efficiency') || p.includes('production') || p.includes('output') || p.includes('manufactur')) return ROOT_CAUSE_DB.efficiency
  if (p.includes('inventory') || p.includes('stock') || p.includes('material') || p.includes('shortage')) return ROOT_CAUSE_DB.inventory
  if (p.includes('cash') || p.includes('flow') || p.includes('liquidity') || p.includes('money')) return ROOT_CAUSE_DB.cash
  if (p.includes('overtime') || p.includes('salary') || p.includes('cost') || p.includes('expense') || p.includes('payroll')) return ROOT_CAUSE_DB.overtime
  return ROOT_CAUSE_DB.profit // default
}

export default function RootCausePage() {
  const router = useRouter()
  const [problem, setProblem] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const analyze = async () => {
    if (!problem.trim()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setResult(analyzeRootCause(problem))
    setLoading(false)
  }

  const severityColor = (s: string) =>
    s === 'critical' ? 'border-red-500 bg-red-500/10 text-red-300' :
    s === 'high' ? 'border-orange-500 bg-orange-500/10 text-orange-300' :
    'border-yellow-500 bg-yellow-500/10 text-yellow-300'

  const severityBadge = (s: string) =>
    s === 'critical' ? 'bg-red-500/20 text-red-400' :
    s === 'high' ? 'bg-orange-500/20 text-orange-400' :
    'bg-yellow-500/20 text-yellow-400'

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">🔍 Root Cause Analysis</h1>
        <p className="text-gray-400 text-sm mt-1">NEXUS traces problems to their actual root cause — not just symptoms, but the real underlying issue with actual data.</p>
      </div>

      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
        <label className="text-gray-400 text-sm mb-2 block">What problem do you want to investigate?</label>
        <div className="flex gap-3">
          <input type="text" value={problem} onChange={(e) => setProblem(e.target.value)}
            placeholder="e.g. Why did profit decrease this month?"
            className="flex-1 bg-[#1a1a2e] border border-[#2a2a3a] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-500"
            onKeyDown={(e) => e.key === 'Enter' && analyze()} />
          <button onClick={analyze} disabled={loading}
            className="px-6 py-3 text-sm font-bold text-white rounded-lg disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #dc2626, #991b1b)' }}>
            {loading ? '🔍 Analyzing...' : 'Find Root Cause'}
          </button>
        </div>
        <div className="flex gap-2 mt-3 flex-wrap">
          {[
            'Why did profit decrease this month?',
            'Why did production efficiency drop?',
            'Why is inventory critically low?',
            'Why is cash flow declining?',
            'Why is overtime cost increasing?',
          ].map((s) => (
            <button key={s} onClick={() => setProblem(s)}
              className="text-xs text-red-400 border border-red-500/30 rounded-full px-3 py-1 hover:bg-red-500/10 transition-all">{s}</button>
          ))}
        </div>
      </div>

      {result && (
        <>
          <div className="bg-[#13131a] border border-blue-500/30 rounded-xl p-5">
            <h2 className="text-white font-semibold mb-2">🧠 NEXUS Analysis — {result.title}</h2>
            <p className="text-gray-300 text-sm">{result.summary}</p>
          </div>

          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
            <h2 className="text-white font-semibold mb-6">🔗 Root Cause Chain</h2>
            <div className="relative">
              {result.chain.map((node: any, i: number) => (
                <div key={i} className="flex items-start gap-4 mb-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${severityColor(node.severity)}`}>
                      <span className="text-lg">{node.icon}</span>
                    </div>
                    {i < result.chain.length - 1 && <div className="w-0.5 h-6 bg-[#2a2a3a] mt-1" />}
                  </div>
                  <div className={`flex-1 p-4 rounded-xl border mb-2 ${severityColor(node.severity)}`}
                    style={{ marginLeft: `${node.level * 16}px` }}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-white font-medium text-sm">{node.label}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${severityBadge(node.severity)}`}>{node.severity}</span>
                    </div>
                    <p className="text-gray-400 text-xs">{node.detail}</p>
                    {i < result.chain.length - 1 && <p className="text-gray-600 text-xs mt-2">↓ caused by</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

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
                  <div className="text-right flex-shrink-0">
                    <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                      rec.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                      rec.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>{rec.priority}</span>
                    <p className="text-gray-500 text-xs mt-1">{rec.timeline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => router.push('/dashboard/contradictions')}
              className="flex-1 py-3 text-sm font-bold text-white rounded-lg"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
              🧩 Check Contradictions
            </button>
            <button onClick={() => router.push('/dashboard/future-lab')}
              className="flex-1 py-3 text-sm font-bold text-white rounded-lg"
              style={{ background: 'linear-gradient(135deg, #0891b2, #0e7490)' }}>
              🔮 Simulate Fix Impact
            </button>
            <button onClick={() => router.push('/dashboard/decision-center')}
              className="flex-1 py-3 text-sm font-bold text-white rounded-lg"
              style={{ background: 'linear-gradient(135deg, #dc2626, #991b1b)' }}>
              ⚔️ Challenge Decision
            </button>
          </div>
        </>
      )}
    </div>
  )
}