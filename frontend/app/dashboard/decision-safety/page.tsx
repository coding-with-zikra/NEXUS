'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

function analyzeDecisionSafety(decision: string) {
  const d = decision.toLowerCase()

  const baseChecks = [
    { label: 'Financial Data', status: 'warning', detail: 'Cash flow data is 3 days old — declining 12%/month', score: 65 },
    { label: 'Production Data', status: 'pass', detail: 'Real-time data: 78% efficiency, 24,560 units output', score: 88 },
    { label: 'Sales Data', status: 'pass', detail: 'Updated 2 hours ago — ₹12.6 Cr revenue, +12% growth', score: 91 },
    { label: 'Inventory Data', status: 'fail', detail: 'Raw material stock not updated in 5 days — CRITICAL gap', score: 38 },
    { label: 'Supplier Data', status: 'fail', detail: 'Supplier X capacity for Q4 unknown — 3 recent failures', score: 35 },
    { label: 'HR Data', status: 'pass', detail: '482 employees, 95.6% attendance — current', score: 87 },
  ]

  if (d.includes('production') || d.includes('output') || d.includes('manufactur')) {
    return {
      readiness: 61,
      status: 'NOT READY',
      dataQuality: 68,
      evidenceStrength: 54,
      riskLevel: 'High',
      checks: baseChecks,
      missing: [
        'Supplier X delivery capacity for next quarter (critical for production increase)',
        'Updated cash flow forecast — current shows declining trend',
        'Machine #04 repair timeline — currently at 18.5% downtime',
        'Raw material stock count (last updated 5 days ago)',
      ],
      conflicts: [
        { dept1: 'Finance', dept2: 'Production', issue: 'Finance shows ₹1.8 Cr cash (declining) — Production needs ₹2.8 Cr working capital for 30% increase' },
        { dept1: 'Inventory', dept2: 'Sales', issue: 'Only 18 days raw material vs Sales forecasting 20% demand growth — stockout risk in 12 days at higher volume' },
      ],
      recommendation: 'Resolve Machine #04 downtime and secure alternate raw material supplier before proceeding. Current data gaps make this decision high-risk.'
    }
  }

  if (d.includes('hire') || d.includes('recruit') || d.includes('employee')) {
    return {
      readiness: 74,
      status: 'CONDITIONAL',
      dataQuality: 78,
      evidenceStrength: 71,
      riskLevel: 'Medium',
      checks: [
        { label: 'Financial Data', status: 'warning', detail: 'Cash tight at ₹1.8 Cr — payroll commitment needs receivables collection first', score: 62 },
        { label: 'HR Data', status: 'pass', detail: 'Overtime up 42% — confirms urgent need for more staff', score: 92 },
        { label: 'Production Data', status: 'pass', detail: 'Efficiency at 78% — operator shortage confirmed root cause', score: 88 },
        { label: 'Sales Data', status: 'pass', detail: 'Demand supports additional capacity', score: 85 },
        { label: 'Budget Data', status: 'warning', detail: 'HR budget not updated for Q4 headcount', score: 58 },
        { label: 'Training Data', status: 'fail', detail: 'Training capacity and timeline not assessed', score: 40 },
      ],
      missing: [
        'Q4 HR budget allocation for new hires',
        'Training capacity assessment — how many can be onboarded simultaneously',
        'Updated cash flow forecast showing impact of additional payroll',
      ],
      conflicts: [
        { dept1: 'Finance', dept2: 'HR', issue: 'Cash at ₹1.8 Cr declining — additional ₹0.9L/month payroll needs receivables collection first' },
      ],
      recommendation: 'Collect ₹0.8 Cr overdue receivables first, then proceed with hiring in 2 phases — 10 now, 10 next month.'
    }
  }

  if (d.includes('supplier') || d.includes('switch') || d.includes('vendor')) {
    return {
      readiness: 88,
      status: 'READY',
      dataQuality: 90,
      evidenceStrength: 85,
      riskLevel: 'Low',
      checks: [
        { label: 'Supplier X Performance', status: 'pass', detail: '3 quality failures documented — strong evidence for switch', score: 95 },
        { label: 'Supplier Y Assessment', status: 'pass', detail: '84/100 reliability, 91% on-time — ready to onboard', score: 88 },
        { label: 'Financial Impact', status: 'pass', detail: 'Switch saves ₹28-35L/month vs ₹2-3L one-time cost', score: 92 },
        { label: 'Production Impact', status: 'pass', detail: 'Better material quality directly fixes Machine #04 damage', score: 85 },
        { label: 'Contract Data', status: 'warning', detail: 'Supplier X contract exit clauses not fully reviewed', score: 62 },
        { label: 'Transition Plan', status: 'warning', detail: '2-4 week overlap supply plan needed', score: 55 },
      ],
      missing: [
        'Supplier X contract exit clause review (legal)',
        'Transition overlap supply plan for 2-4 weeks',
      ],
      conflicts: [],
      recommendation: 'Strong evidence supports switching. Review contract exit terms and create 4-week transition plan. Begin Supplier Y onboarding immediately.'
    }
  }

  // Default
  return {
    readiness: 58,
    status: 'NEEDS REVIEW',
    dataQuality: 72,
    evidenceStrength: 60,
    riskLevel: 'Medium',
    checks: baseChecks,
    missing: [
      'Specific impact analysis for this decision type',
      'Updated financial projections',
      'Risk assessment from all departments',
    ],
    conflicts: [
      { dept1: 'Finance', dept2: 'Operations', issue: 'Cash constraints vs operational needs — review both before deciding' },
    ],
    recommendation: 'Gather more specific data before proceeding. Run the Contradiction Engine for detailed department analysis.'
  }
}

export default function DecisionSafetyPage() {
  const router = useRouter()
  const [decision, setDecision] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const analyze = async () => {
    if (!decision.trim()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setResult(analyzeDecisionSafety(decision))
    setLoading(false)
  }

  const scoreColor = (s: number) => s >= 75 ? 'text-green-400' : s >= 50 ? 'text-yellow-400' : 'text-red-400'
  const scoreBg = (s: number) => s >= 75 ? 'bg-green-400' : s >= 50 ? 'bg-yellow-400' : 'bg-red-400'

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">🛡️ Decision Safety Gate</h1>
        <p className="text-gray-400 text-sm mt-1">NEXUS validates data quality, completeness and evidence strength before any major decision.</p>
      </div>

      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
        <label className="text-gray-400 text-sm mb-2 block">Enter the decision you want to validate</label>
        <div className="flex gap-3">
          <input type="text" value={decision} onChange={(e) => setDecision(e.target.value)}
            placeholder="e.g. Should we increase production by 30%?"
            className="flex-1 bg-[#1a1a2e] border border-[#2a2a3a] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
            onKeyDown={(e) => e.key === 'Enter' && analyze()} />
          <button onClick={analyze} disabled={loading}
            className="px-6 py-3 text-sm font-bold text-white rounded-lg disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}>
            {loading ? 'Checking...' : 'Check Safety'}
          </button>
        </div>
        <div className="flex gap-2 mt-3 flex-wrap">
          {['Should we increase production by 30%?', 'Should we hire 20 new employees?', 'Should we switch from Supplier X?', 'Should we expand to new markets?'].map((s) => (
            <button key={s} onClick={() => setDecision(s)}
              className="text-xs text-blue-400 border border-blue-500/30 rounded-full px-3 py-1 hover:bg-blue-500/10 transition-all">{s}</button>
          ))}
        </div>
      </div>

      {result && (
        <>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5 flex flex-col items-center justify-center">
              <p className="text-gray-400 text-xs mb-3">Decision Readiness</p>
              <div className="relative w-24 h-24 mb-3">
                <svg viewBox="0 0 36 36" className="w-24 h-24 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1a1a2e" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.9" fill="none"
                    stroke={result.readiness >= 75 ? '#10b981' : result.readiness >= 60 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="3" strokeDasharray={`${result.readiness} ${100 - result.readiness}`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-2xl font-black ${scoreColor(result.readiness)}`}>{result.readiness}</span>
                  <span className="text-gray-500 text-xs">/ 100</span>
                </div>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                result.status === 'READY' ? 'bg-green-500/20 text-green-400' :
                result.status === 'CONDITIONAL' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>{result.status === 'READY' ? '✅' : result.status === 'CONDITIONAL' ? '⚠️' : '❌'} {result.status}</span>
            </div>

            {[
              { label: 'Data Quality', value: result.dataQuality, icon: '📊', desc: 'Freshness and accuracy of data' },
              { label: 'Evidence Strength', value: result.evidenceStrength, icon: '🔍', desc: 'Supporting evidence quality' },
              { label: 'Risk Level', value: null, icon: '⚠️', desc: 'Overall decision risk', risk: result.riskLevel },
            ].map((s) => (
              <div key={s.label} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3"><span>{s.icon}</span><p className="text-gray-400 text-sm">{s.label}</p></div>
                {s.value !== null ? (
                  <>
                    <p className={`text-4xl font-black mb-2 ${scoreColor(s.value)}`}>{s.value}</p>
                    <div className="w-full bg-[#2a2a3a] rounded-full h-2">
                      <div className={`${scoreBg(s.value)} h-2 rounded-full`} style={{ width: `${s.value}%` }} />
                    </div>
                  </>
                ) : (
                  <p className={`text-3xl font-black ${s.risk === 'High' ? 'text-red-400' : s.risk === 'Medium' ? 'text-yellow-400' : 'text-green-400'}`}>{s.risk}</p>
                )}
                <p className="text-gray-600 text-xs mt-2">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <h2 className="text-white font-semibold mb-3">📋 Data Quality Checks</h2>
            <div className="grid grid-cols-3 gap-3">
              {result.checks.map((check: any) => (
                <div key={check.label} className={`p-3 rounded-lg border ${
                  check.status === 'pass' ? 'bg-green-500/10 border-green-500/20' :
                  check.status === 'warning' ? 'bg-yellow-500/10 border-yellow-500/20' :
                  'bg-red-500/10 border-red-500/20'
                }`}>
                  <div className="flex justify-between mb-1">
                    <span className="text-white text-xs font-medium">{check.label}</span>
                    <span className={`text-xs font-bold ${check.status === 'pass' ? 'text-green-400' : check.status === 'warning' ? 'text-yellow-400' : 'text-red-400'}`}>
                      {check.status === 'pass' ? '✅' : check.status === 'warning' ? '⚠️' : '❌'} {check.score}%
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs">{check.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#13131a] border border-red-500/20 rounded-xl p-5">
              <h2 className="text-white font-semibold mb-3">📋 Missing Data</h2>
              <div className="space-y-2">
                {result.missing.map((item: string, i: number) => (
                  <div key={i} className="flex gap-2 p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <span className="text-red-400 flex-shrink-0">❌</span>
                    <p className="text-gray-300 text-xs">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#13131a] border border-yellow-500/20 rounded-xl p-5">
              <h2 className="text-white font-semibold mb-3">⚡ Data Conflicts</h2>
              {result.conflicts.length === 0 ? (
                <p className="text-green-400 text-sm">✅ No data conflicts detected</p>
              ) : (
                <div className="space-y-2">
                  {result.conflicts.map((c: any, i: number) => (
                    <div key={i} className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <div className="flex gap-2 mb-1">
                        <span className="text-yellow-400 text-xs font-bold">{c.dept1}</span>
                        <span className="text-gray-500 text-xs">vs</span>
                        <span className="text-yellow-400 text-xs font-bold">{c.dept2}</span>
                      </div>
                      <p className="text-gray-300 text-xs">{c.issue}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#13131a] border border-green-500/20 rounded-xl p-5">
            <h2 className="text-white font-semibold mb-2">🧠 NEXUS Recommendation</h2>
            <p className="text-gray-300 text-sm">{result.recommendation}</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button onClick={() => router.push('/dashboard/contradictions')}
              className="py-3 text-sm font-bold text-white rounded-lg"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
              🧩 View Contradictions
            </button>
            <button onClick={() => router.push('/dashboard/intelligence/root-cause')}
              className="py-3 text-sm font-bold text-white rounded-lg"
              style={{ background: 'linear-gradient(135deg, #dc2626, #991b1b)' }}>
              🔍 Root Cause Analysis
            </button>
            <button onClick={() => router.push('/dashboard/future-lab')}
              className="py-3 text-sm font-bold text-white rounded-lg"
              style={{ background: 'linear-gradient(135deg, #0891b2, #0e7490)' }}>
              🔮 Simulate Impact
            </button>
          </div>
        </>
      )}
    </div>
  )
}