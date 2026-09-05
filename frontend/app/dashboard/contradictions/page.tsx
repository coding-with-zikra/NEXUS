'use client'

import { useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL

export default function ContradictionsPage() {
  const [decision, setDecision] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const analyze = async () => {
    if (!decision.trim()) return
    setLoading(true)
    const res = await fetch(`${API}/api/contradictions/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ decision }),
    })
    const data = await res.json()
    setResult(data)
    setLoading(false)
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">🧩 Decision Contradiction Engine</h1>
        <p className="text-gray-400 mt-1">Submit a decision — NEXUS checks all departments for conflicts.</p>
      </div>

      {/* Decision Input */}
      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
        <label className="text-gray-400 text-sm mb-2 block">Enter your decision</label>
        <div className="flex gap-3">
          <input
            type="text"
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
            placeholder="e.g. Should we increase production by 30% next quarter?"
            className="flex-1 bg-[#1a1a2e] border border-[#2a2a3a] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500"
            onKeyDown={(e) => e.key === 'Enter' && analyze()}
          />
          <button
            onClick={analyze}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-medium rounded-lg px-6 py-3 text-sm transition-colors"
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>

        {/* Quick suggestions */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {[
            'Should we increase production by 30%?',
            'Should we hire 20 new employees?',
            'Should we expand to a new market?',
          ].map((s) => (
            <button
              key={s}
              onClick={() => setDecision(s)}
              className="text-xs text-purple-400 border border-purple-500/30 rounded-full px-3 py-1 hover:bg-purple-500/10 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          {/* Readiness Score */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">Decision Readiness Score</h2>
              <span className={`text-3xl font-bold ${
                result.readiness_score >= 75 ? 'text-green-400' :
                result.readiness_score >= 50 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {result.readiness_score}/100
              </span>
            </div>
            <div className="w-full bg-[#2a2a3a] rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all ${
                  result.readiness_score >= 75 ? 'bg-green-400' :
                  result.readiness_score >= 50 ? 'bg-yellow-400' : 'bg-red-400'
                }`}
                style={{ width: `${result.readiness_score}%` }}
              />
            </div>
            <p className="text-gray-400 text-sm mt-2">
              {result.conflict_count} conflict{result.conflict_count !== 1 ? 's' : ''} detected across departments
            </p>
          </div>

          {/* Department Verdicts */}
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(result.verdicts).map(([dept, data]: [string, any]) => (
              <div
                key={dept}
                className={`bg-[#13131a] border rounded-xl p-5 ${
                  data.verdict === 'YES'
                    ? 'border-green-500/30'
                    : 'border-red-500/30'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-medium capitalize">{dept}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    data.verdict === 'YES'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {data.verdict === 'YES' ? '✅ YES' : '❌ NO'}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{data.reason}</p>
              </div>
            ))}
          </div>

          {/* Conflicts */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
            <h2 className="text-white font-semibold mb-4">
              ⚔️ Conflicts Detected ({result.conflict_count})
            </h2>
            <div className="space-y-4">
              {result.conflicts.map((conflict: any, i: number) => (
                <div
                  key={i}
                  className={`p-4 rounded-lg border ${
                    conflict.severity === 'critical'
                      ? 'bg-red-500/10 border-red-500/30'
                      : 'bg-yellow-500/10 border-yellow-500/30'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      conflict.severity === 'critical'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {conflict.severity.toUpperCase()}
                    </span>
                    <span className="text-white font-medium">
                      {conflict.dept_a} vs {conflict.dept_b}
                    </span>
                    <span className="text-gray-500 text-sm">— {conflict.type}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#1a1a2e] rounded-lg p-3">
                      <p className="text-red-400 text-xs font-medium mb-1">{conflict.dept_a} says:</p>
                      <p className="text-gray-300 text-xs">
                        {conflict.finance_says || conflict.inventory_says}
                      </p>
                    </div>
                    <div className="bg-[#1a1a2e] rounded-lg p-3">
                      <p className="text-green-400 text-xs font-medium mb-1">{conflict.dept_b} says:</p>
                      <p className="text-gray-300 text-xs">
                        {conflict.production_says || conflict.sales_says}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Summary */}
          <div className="bg-[#13131a] border border-purple-500/30 rounded-xl p-6">
            <h2 className="text-white font-semibold mb-3">
              🧠 NEXUS Analysis
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">{result.ai_summary}</p>
          </div>
        </div>
      )}
    </div>
  )
}