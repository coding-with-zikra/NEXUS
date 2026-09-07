'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const SAFETY_DATA = {
  readiness: 61,
  status: 'NOT READY',
  dataQuality: 74,
  evidenceStrength: 58,
  riskLevel: 'High',
  checks: [
    { label: 'Financial Data', status: 'warning', detail: 'Cash flow data is 3 days old', score: 65 },
    { label: 'Inventory Data', status: 'fail', detail: 'Raw material stock not updated', score: 42 },
    { label: 'Production Data', status: 'pass', detail: 'Real-time data available', score: 91 },
    { label: 'Sales Data', status: 'pass', detail: 'Updated 2 hours ago', score: 88 },
    { label: 'Supplier Data', status: 'fail', detail: 'Supplier X capacity unknown', score: 38 },
    { label: 'HR Data', status: 'pass', detail: 'Current workforce data available', score: 85 },
  ],
  missing: [
    'Supplier X delivery capacity for next quarter',
    'Updated cash flow forecast for next 30 days',
    'Raw material stock count (last updated 5 days ago)',
  ],
  conflicts: [
    { dept1: 'Sales', dept2: 'Finance', issue: 'Sales projects 20% growth but Finance shows cash constraints' },
    { dept1: 'Production', dept2: 'Inventory', issue: 'Production wants 30% increase but Inventory has only 18 days of raw material' },
  ],
}

export default function DecisionSafetyPage() {
  const router = useRouter()
  const [decision, setDecision] = useState('')
  const [analyzed, setAnalyzed] = useState(false)
  const [loading, setLoading] = useState(false)

  const analyze = () => {
    if (!decision.trim()) return
    setLoading(true)
    setTimeout(() => {
      setAnalyzed(true)
      setLoading(false)
    }, 1500)
  }

  const scoreColor = (score: number) =>
    score >= 75 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400'

  const scoreBg = (score: number) =>
    score >= 75 ? 'bg-green-400' : score >= 50 ? 'bg-yellow-400' : 'bg-red-400'

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">🛡️ Decision Safety Gate</h1>
        <p className="text-gray-400 text-sm mt-1">
          Before making a major decision, NEXUS validates your data quality, completeness, and evidence strength.
        </p>
      </div>

      {/* Decision Input */}
      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
        <label className="text-gray-400 text-sm mb-2 block">Enter the decision you want to validate</label>
        <div className="flex gap-3">
          <input
            type="text"
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
            placeholder="e.g. Should we increase production by 30% next quarter?"
            className="flex-1 bg-[#1a1a2e] border border-[#2a2a3a] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
            onKeyDown={(e) => e.key === 'Enter' && analyze()}
          />
          <button
            onClick={analyze}
            disabled={loading}
            className="px-6 py-3 text-sm font-bold text-white rounded-lg disabled:opacity-50 transition-all"
            style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}
          >
            {loading ? 'Analyzing...' : 'Check Safety'}
          </button>
        </div>
        <div className="flex gap-2 mt-3 flex-wrap">
          {[
            'Should we increase production by 30%?',
            'Should we hire 20 new employees?',
            'Should we expand to a new market?',
          ].map((s) => (
            <button
              key={s}
              onClick={() => setDecision(s)}
              className="text-xs text-blue-400 border border-blue-500/30 rounded-full px-3 py-1 hover:bg-blue-500/10 transition-all"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {analyzed && (
        <>
          {/* Readiness Score */}
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6 flex flex-col items-center justify-center">
              <p className="text-gray-400 text-sm mb-3">Decision Readiness Score</p>
              <div className="relative w-32 h-32 mb-3">
                <svg viewBox="0 0 36 36" className="w-32 h-32 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1a1a2e" strokeWidth="2.5" />
                  <circle cx="18" cy="18" r="15.9" fill="none"
                    stroke={SAFETY_DATA.readiness >= 75 ? '#10b981' : SAFETY_DATA.readiness >= 50 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="2.5"
                    strokeDasharray={`${SAFETY_DATA.readiness} ${100 - SAFETY_DATA.readiness}`}
                    strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-3xl font-black ${scoreColor(SAFETY_DATA.readiness)}`}>
                    {SAFETY_DATA.readiness}
                  </span>
                  <span className="text-gray-500 text-xs">/ 100</span>
                </div>
              </div>
              <span className="bg-red-500/20 text-red-400 text-sm font-bold px-3 py-1 rounded-full border border-red-500/30">
                ❌ {SAFETY_DATA.status}
              </span>
            </div>

            <div className="col-span-3 grid grid-cols-3 gap-4">
              {[
                { label: 'Data Quality Score', value: SAFETY_DATA.dataQuality, icon: '📊', desc: 'How fresh and accurate is your data' },
                { label: 'Evidence Strength', value: SAFETY_DATA.evidenceStrength, icon: '🔍', desc: 'How strong is the supporting evidence' },
                { label: 'Risk Level', value: null, icon: '⚠️', desc: 'Overall decision risk assessment', risk: SAFETY_DATA.riskLevel },
              ].map((s) => (
                <div key={s.label} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span>{s.icon}</span>
                    <p className="text-gray-400 text-sm">{s.label}</p>
                  </div>
                  {s.value !== null ? (
                    <>
                      <p className={`text-4xl font-black mb-2 ${scoreColor(s.value)}`}>{s.value}</p>
                      <div className="w-full bg-[#2a2a3a] rounded-full h-2">
                        <div className={`${scoreBg(s.value)} h-2 rounded-full`} style={{ width: `${s.value}%` }} />
                      </div>
                    </>
                  ) : (
                    <p className={`text-3xl font-black ${s.risk === 'High' ? 'text-red-400' : s.risk === 'Medium' ? 'text-yellow-400' : 'text-green-400'}`}>
                      {s.risk}
                    </p>
                  )}
                  <p className="text-gray-600 text-xs mt-2">{s.desc}</p>
                </div>
              ))}

              {/* Data Checks */}
              <div className="col-span-3 bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
                <h2 className="text-white font-semibold mb-3">Data Quality Checks</h2>
                <div className="grid grid-cols-3 gap-3">
                  {SAFETY_DATA.checks.map((check) => (
                    <div key={check.label} className={`p-3 rounded-lg border ${
                      check.status === 'pass' ? 'bg-green-500/10 border-green-500/20' :
                      check.status === 'warning' ? 'bg-yellow-500/10 border-yellow-500/20' :
                      'bg-red-500/10 border-red-500/20'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white text-xs font-medium">{check.label}</span>
                        <span className={`text-xs font-bold ${
                          check.status === 'pass' ? 'text-green-400' :
                          check.status === 'warning' ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {check.status === 'pass' ? '✅' : check.status === 'warning' ? '⚠️' : '❌'} {check.score}%
                        </span>
                      </div>
                      <p className="text-gray-500 text-xs">{check.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Missing Data + Conflicts */}
          <div className="grid grid-cols-2 gap-4">
            {/* Missing Data */}
            <div className="bg-[#13131a] border border-red-500/20 rounded-xl p-5">
              <h2 className="text-white font-semibold mb-4">📋 Missing Data Report</h2>
              <div className="space-y-3">
                {SAFETY_DATA.missing.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <span className="text-red-400 text-sm flex-shrink-0">❌</span>
                    <p className="text-gray-300 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Conflicting Data */}
            <div className="bg-[#13131a] border border-yellow-500/20 rounded-xl p-5">
              <h2 className="text-white font-semibold mb-4">⚡ Conflicting Data Flags</h2>
              <div className="space-y-3">
                {SAFETY_DATA.conflicts.map((conflict, i) => (
                  <div key={i} className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-yellow-400 text-xs font-bold">{conflict.dept1}</span>
                      <span className="text-gray-500 text-xs">vs</span>
                      <span className="text-yellow-400 text-xs font-bold">{conflict.dept2}</span>
                    </div>
                    <p className="text-gray-300 text-xs">{conflict.issue}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <h2 className="text-white font-semibold mb-4">🎯 Recommended Actions</h2>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => router.push('/dashboard/contradictions')}
                className="py-3 text-sm font-bold text-white rounded-lg transition-all"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
              >
                🧩 View Contradictions
              </button>
              <button
                onClick={() => router.push('/dashboard/intelligence/root-cause')}
                className="py-3 text-sm font-bold text-white rounded-lg transition-all"
                style={{ background: 'linear-gradient(135deg, #dc2626, #991b1b)' }}
              >
                🔍 Run Root Cause Analysis
              </button>
              <button
                onClick={() => router.push('/dashboard/future-lab')}
                className="py-3 text-sm font-bold text-white rounded-lg transition-all"
                style={{ background: 'linear-gradient(135deg, #0891b2, #0e7490)' }}
              >
                🔮 Simulate Future Impact
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}