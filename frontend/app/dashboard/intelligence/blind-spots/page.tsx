'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const BLIND_SPOTS = [
  {
    id: 1,
    title: 'Supplier Concentration Risk',
    category: 'Supply Chain',
    severity: 'critical',
    icon: '🚚',
    hidden: 'You source 73% of raw steel from a single supplier (Supplier X)',
    impact: 'A single delivery failure could halt production within 18 days',
    evidence: [
      'Supplier X accounts for 73% of raw material spend',
      '3 quality issues in last 4 deliveries',
      'No backup supplier contract in place',
      'Raw material stock: only 18 days remaining',
    ],
    recommendation: 'Immediately onboard 2 alternate suppliers and cap any single supplier at 40% of volume',
    financialImpact: '₹2.8 Cr potential loss if production halts for 2 weeks',
  },
  {
    id: 2,
    title: 'Hidden Cash Flow Pressure',
    category: 'Finance',
    severity: 'high',
    icon: '💸',
    hidden: 'Cash balance declining 12% monthly while receivables growing 15%',
    impact: 'Working capital could become negative in 6-8 weeks if trend continues',
    evidence: [
      'Cash balance: ₹1.8 Cr (down from ₹2.1 Cr last month)',
      'Outstanding receivables: ₹2.1 Cr (42 invoices)',
      '12 invoices are overdue by more than 30 days',
      'Monthly burn rate increasing due to raw material costs',
    ],
    recommendation: 'Accelerate collections — target ₹0.8 Cr recovery from overdue invoices within 2 weeks',
    financialImpact: '₹0.8 Cr recoverable immediately from overdue invoices',
  },
  {
    id: 3,
    title: 'Machine Maintenance Cascade Risk',
    category: 'Operations',
    severity: 'high',
    icon: '⚙️',
    hidden: 'Machine #04 failure pattern suggests 2 more machines at similar risk',
    impact: 'If Machine #07 and #11 fail, efficiency drops below 60% — production crisis',
    evidence: [
      'Machine #04: 3 weeks overdue for maintenance',
      'Machine #07: last serviced 8 months ago (recommended: 6 months)',
      'Machine #11: showing similar vibration patterns as #04 pre-failure',
      'Maintenance budget underspent by 34% this quarter',
    ],
    recommendation: 'Schedule preventive maintenance for all 3 machines this week — cost: ₹4.2L vs ₹18L+ if they fail',
    financialImpact: 'Prevent ₹18L+ in emergency repair costs and lost production',
  },
  {
    id: 4,
    title: 'Sales-Inventory Disconnect',
    category: 'Strategy',
    severity: 'medium',
    icon: '📊',
    hidden: 'Sales team forecasting 20% growth but inventory planning for 5% growth',
    impact: 'Either stockout risk (if sales are right) or excess inventory cost (if inventory is right)',
    evidence: [
      'Sales forecast: ₹15.1 Cr next quarter (+20%)',
      'Inventory procurement plan: +5% only',
      'Gap: 15% demand-supply mismatch',
      'No cross-department forecast alignment meeting this quarter',
    ],
    recommendation: 'Convene Sales + Inventory + Finance alignment meeting within 48 hours to reconcile forecasts',
    financialImpact: '₹1.2 Cr stockout risk OR ₹0.6 Cr excess inventory carrying cost',
  },
  {
    id: 5,
    title: 'Overtime Cost Creep',
    category: 'HR',
    severity: 'medium',
    icon: '👥',
    hidden: 'Overtime costs up 42% over 3 months — hidden in payroll, not flagged',
    impact: 'Unsustainable labor cost increase reducing profit margin by 0.8%',
    evidence: [
      'Overtime: ₹12.5L this month vs ₹8.8L 3 months ago (+42%)',
      'Concentrated in production line C and D',
      'Root cause: 4 key operators on extended leave',
      'No overtime approval threshold currently enforced',
    ],
    recommendation: 'Set ₹10L monthly overtime cap with approval workflow — hire 2 contract operators for Line C/D',
    financialImpact: 'Save ₹2-3L monthly in unnecessary overtime costs',
  },
]

export default function BlindSpotsPage() {
  const router = useRouter()
  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [expanded, setExpanded] = useState<number | null>(null)

  const runScan = () => {
    setScanning(true)
    setTimeout(() => {
      setScanning(false)
      setScanned(true)
    }, 2000)
  }

  const severityColor = (s: string) =>
    s === 'critical' ? 'border-red-500/40 bg-red-500/5' :
    s === 'high' ? 'border-orange-500/40 bg-orange-500/5' :
    'border-yellow-500/40 bg-yellow-500/5'

  const severityBadge = (s: string) =>
    s === 'critical' ? 'bg-red-500/20 text-red-400' :
    s === 'high' ? 'bg-orange-500/20 text-orange-400' :
    'bg-yellow-500/20 text-yellow-400'

  const categoryColor = (c: string) =>
    c === 'Finance' ? 'text-blue-400' :
    c === 'Supply Chain' ? 'text-orange-400' :
    c === 'Operations' ? 'text-purple-400' :
    c === 'HR' ? 'text-pink-400' : 'text-cyan-400'

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">👁️ Blind Spot Discovery</h1>
        <p className="text-gray-400 text-sm mt-1">
          NEXUS scans across all departments to find hidden risks that normal dashboards don't show.
        </p>
      </div>

      {/* Scan Button */}
      {!scanned && (
        <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">👁️</span>
          </div>
          <h2 className="text-white font-semibold text-lg mb-2">Run Blind Spot Scan</h2>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
            NEXUS will analyze data across Finance, Operations, Sales, Inventory, HR and Suppliers
            to find hidden risks and patterns you may have missed.
          </p>
          <button
            onClick={runScan}
            disabled={scanning}
            className="px-8 py-3 text-sm font-bold text-white rounded-lg transition-all"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
          >
            {scanning ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⚙️</span> Scanning all departments...
              </span>
            ) : '🔍 Start Blind Spot Scan'}
          </button>
        </div>
      )}

      {scanned && (
        <>
          {/* Summary */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Blind Spots Found', value: '5', icon: '👁️', color: 'text-purple-400', border: 'border-purple-500/30' },
              { label: 'Critical', value: '1', icon: '🔴', color: 'text-red-400', border: 'border-red-500/30' },
              { label: 'High Priority', value: '2', icon: '🟠', color: 'text-orange-400', border: 'border-orange-500/30' },
              { label: 'Total Financial Risk', value: '₹23.6L+', icon: '💰', color: 'text-yellow-400', border: 'border-yellow-500/30' },
            ].map((s) => (
              <div key={s.label} className={`bg-[#13131a] border ${s.border} rounded-xl p-4 text-center`}>
                <span className="text-2xl">{s.icon}</span>
                <p className={`text-2xl font-black mt-1 ${s.color}`}>{s.value}</p>
                <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Blind Spots List */}
          <div className="space-y-3">
            {BLIND_SPOTS.map((spot) => (
              <div
                key={spot.id}
                className={`bg-[#13131a] border rounded-xl overflow-hidden transition-all ${severityColor(spot.severity)}`}
              >
                {/* Header */}
                <div
                  className="flex items-center gap-4 p-5 cursor-pointer"
                  onClick={() => setExpanded(expanded === spot.id ? null : spot.id)}
                >
                  <span className="text-2xl">{spot.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-white font-semibold">{spot.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${severityBadge(spot.severity)}`}>
                        {spot.severity}
                      </span>
                      <span className={`text-xs font-medium ${categoryColor(spot.category)}`}>
                        {spot.category}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{spot.hidden}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-red-400 text-xs font-medium">{spot.financialImpact}</p>
                    <p className="text-gray-500 text-xs mt-1">{expanded === spot.id ? '▲ Hide' : '▼ Details'}</p>
                  </div>
                </div>

                {/* Expanded */}
                {expanded === spot.id && (
                  <div className="px-5 pb-5 space-y-4 border-t border-[#2a2a3a]">
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      {/* Impact */}
                      <div className="bg-[#1a1a2e] rounded-lg p-4">
                        <h4 className="text-white text-sm font-medium mb-2">⚠️ Potential Impact</h4>
                        <p className="text-gray-300 text-sm">{spot.impact}</p>
                      </div>

                      {/* Evidence */}
                      <div className="bg-[#1a1a2e] rounded-lg p-4">
                        <h4 className="text-white text-sm font-medium mb-2">🔍 Evidence Found</h4>
                        <ul className="space-y-1">
                          {spot.evidence.map((e, i) => (
                            <li key={i} className="text-gray-300 text-xs flex items-start gap-2">
                              <span className="text-purple-400 flex-shrink-0">•</span>
                              {e}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <h4 className="text-green-400 text-sm font-medium mb-1">✅ Recommended Action</h4>
                      <p className="text-gray-300 text-sm">{spot.recommendation}</p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => router.push('/dashboard/intelligence/root-cause')}
                        className="px-4 py-2 text-xs font-bold text-white rounded-lg"
                        style={{ background: 'linear-gradient(135deg, #dc2626, #991b1b)' }}
                      >
                        🔍 Root Cause
                      </button>
                      <button
                        onClick={() => router.push('/dashboard/future-lab')}
                        className="px-4 py-2 text-xs font-bold text-white rounded-lg"
                        style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
                      >
                        🔮 Simulate Fix
                      </button>
                      <button
                        onClick={() => router.push('/dashboard/contradictions')}
                        className="px-4 py-2 text-xs font-bold text-white rounded-lg"
                        style={{ background: 'linear-gradient(135deg, #0891b2, #0e7490)' }}
                      >
                        🧩 Check Contradictions
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Rescan button */}
          <div className="text-center">
            <button
              onClick={() => { setScanned(false); setExpanded(null) }}
              className="px-6 py-2 text-sm text-gray-400 border border-[#2a2a3a] rounded-lg hover:text-white hover:border-purple-500/30 transition-all"
            >
              🔄 Run New Scan
            </button>
          </div>
        </>
      )}
    </div>
  )
}