'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const PENDING_DECISIONS = [
  {
    id: 1,
    title: 'Increase Production by 30%',
    submittedBy: 'Raj Kumar (Manager)',
    date: '2 Sep 2026',
    status: 'pending',
    risk: 'high',
    readiness: 61,
    department: 'Operations',
    description: 'Proposal to increase monthly production from 24,560 to 31,900 units to meet growing demand.',
    pros: ['Market demand supports increase', '30% spare capacity available', 'Revenue could grow by ₹2.8 Cr'],
    cons: ['Cash flow tight — needs ₹2.8 Cr working capital', 'Raw material stock only 18 days', 'Supplier X unreliable'],
    aiVerdict: 'NOT RECOMMENDED — Resolve inventory and cash flow issues first',
  },
  {
    id: 2,
    title: 'Hire 20 New Employees',
    submittedBy: 'Priya Mehta (CA)',
    date: '3 Sep 2026',
    status: 'reviewing',
    risk: 'medium',
    readiness: 74,
    department: 'HR',
    description: 'Hire 20 additional production line operators to support planned capacity expansion.',
    pros: ['Reduces overtime cost by ₹3L/month', 'Addresses skill gap in Line C/D', 'Supports long-term growth'],
    cons: ['₹18L/month additional payroll', 'Training takes 4-6 weeks', 'Needs approval from Finance'],
    aiVerdict: 'CONDITIONAL APPROVAL — Approve 10 now, 10 after cash flow improves',
  },
  {
    id: 3,
    title: 'Expand to Tier-2 Markets',
    submittedBy: 'Aarav Mehta (CEO)',
    date: '4 Sep 2026',
    status: 'approved',
    risk: 'low',
    readiness: 88,
    department: 'Sales',
    description: 'Launch sales operations in 5 Tier-2 cities — Pune, Nagpur, Surat, Jaipur, Lucknow.',
    pros: ['₹3.2 Cr estimated revenue potential', 'Low competition in Tier-2', 'Diversifies customer base'],
    cons: ['₹0.8 Cr initial investment needed', 'Requires 3 new sales managers', '6 month breakeven timeline'],
    aiVerdict: 'APPROVED — Strong market opportunity with manageable risk',
  },
]

const CHALLENGER_RESPONSES: Record<string, string[]> = {
  '1': [
    'Cash flow will likely turn negative — only ₹1.8 Cr balance with ₹2.8 Cr additional requirement',
    'Supplier X has failed 3 of 4 deliveries — increased production will amplify this risk',
    'Machine #04 is already at 4.2% downtime — 30% more load may cause cascading failures',
  ],
  '2': [
    'Training 20 people simultaneously will reduce existing team productivity by 15-20% for 6 weeks',
    'If cash flow tightens, payroll for new hires becomes a fixed liability that cannot be reduced quickly',
    'Competitor may also be hiring — talent war could push costs higher than budgeted',
  ],
  '3': [
    'Tier-2 market research is based on 6-month-old data — market conditions may have changed',
    'Existing sales team is already stretched — adding 5 new markets without new managers risks poor execution',
    'Cash required (₹0.8 Cr) competes with urgent working capital needs',
  ],
}

export default function DecisionCenterPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<any>(null)
  const [challenging, setChallenging] = useState(false)
  const [challenges, setChallenges] = useState<string[]>([])
  const [decisions, setDecisions] = useState(PENDING_DECISIONS)

  const runChallenge = () => {
    setChallenging(true)
    setTimeout(() => {
      setChallenges(CHALLENGER_RESPONSES[selected.id.toString()] || [])
      setChallenging(false)
    }, 1500)
  }

  const approveDecision = (id: number) => {
    setDecisions(prev => prev.map(d => d.id === id ? { ...d, status: 'approved' } : d))
    if (selected?.id === id) setSelected({ ...selected, status: 'approved' })
  }

  const rejectDecision = (id: number) => {
    setDecisions(prev => prev.map(d => d.id === id ? { ...d, status: 'rejected' } : d))
    if (selected?.id === id) setSelected({ ...selected, status: 'rejected' })
  }

  const statusColor = (s: string) =>
    s === 'approved' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
    s === 'rejected' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
    s === 'reviewing' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
    'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'

  const riskColor = (r: string) =>
    r === 'high' ? 'text-red-400' : r === 'medium' ? 'text-yellow-400' : 'text-green-400'

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">⚔️ Decision Center</h1>
        <p className="text-gray-400 text-sm mt-1">
          Challenge, compare, and approve major business decisions with AI assistance.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Decision List */}
        <div className="col-span-1 space-y-3">
          <h2 className="text-white font-semibold text-sm">Pending Decisions</h2>
          {decisions.map((d) => (
            <div
              key={d.id}
              onClick={() => { setSelected(d); setChallenges([]) }}
              className={`bg-[#13131a] border rounded-xl p-4 cursor-pointer transition-all ${
                selected?.id === d.id ? 'border-blue-500/50 bg-blue-500/5' : 'border-[#2a2a3a] hover:border-[#3a3a4a]'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white text-sm font-medium flex-1 pr-2">{d.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 ${statusColor(d.status)}`}>
                  {d.status}
                </span>
              </div>
              <p className="text-gray-500 text-xs mb-2">{d.submittedBy}</p>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium ${riskColor(d.risk)}`}>{d.risk} risk</span>
                <span className="text-gray-500 text-xs">{d.date}</span>
              </div>
              <div className="mt-2">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600 text-xs">Readiness</span>
                  <span className={`text-xs font-bold ${d.readiness >= 75 ? 'text-green-400' : d.readiness >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {d.readiness}/100
                  </span>
                </div>
                <div className="w-full bg-[#2a2a3a] rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${d.readiness >= 75 ? 'bg-green-400' : d.readiness >= 50 ? 'bg-yellow-400' : 'bg-red-400'}`}
                    style={{ width: `${d.readiness}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decision Detail */}
        <div className="col-span-2">
          {!selected ? (
            <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-8 text-center h-full flex flex-col items-center justify-center">
              <span className="text-4xl mb-3">⚔️</span>
              <p className="text-gray-400">Select a decision from the list to analyze it</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Decision Header */}
              <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="text-white font-bold text-lg">{selected.title}</h2>
                    <p className="text-gray-400 text-sm mt-0.5">{selected.description}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full border ${statusColor(selected.status)}`}>
                    {selected.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#1a1a2e] rounded-lg p-3 text-center">
                    <p className="text-gray-400 text-xs">Department</p>
                    <p className="text-white font-bold text-sm">{selected.department}</p>
                  </div>
                  <div className="bg-[#1a1a2e] rounded-lg p-3 text-center">
                    <p className="text-gray-400 text-xs">Risk Level</p>
                    <p className={`font-bold text-sm ${riskColor(selected.risk)}`}>{selected.risk}</p>
                  </div>
                  <div className="bg-[#1a1a2e] rounded-lg p-3 text-center">
                    <p className="text-gray-400 text-xs">Readiness Score</p>
                    <p className={`font-bold text-sm ${selected.readiness >= 75 ? 'text-green-400' : selected.readiness >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {selected.readiness}/100
                    </p>
                  </div>
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#13131a] border border-green-500/20 rounded-xl p-4">
                  <h3 className="text-green-400 font-medium text-sm mb-3">✅ Arguments For</h3>
                  <ul className="space-y-2">
                    {selected.pros.map((p: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300 text-xs">
                        <span className="text-green-400 flex-shrink-0">+</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#13131a] border border-red-500/20 rounded-xl p-4">
                  <h3 className="text-red-400 font-medium text-sm mb-3">❌ Arguments Against</h3>
                  <ul className="space-y-2">
                    {selected.cons.map((c: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300 text-xs">
                        <span className="text-red-400 flex-shrink-0">-</span>{c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* AI Verdict */}
              <div className={`border rounded-xl p-4 ${
                selected.aiVerdict.startsWith('APPROVED') ? 'bg-green-500/10 border-green-500/30' :
                selected.aiVerdict.startsWith('CONDITIONAL') ? 'bg-yellow-500/10 border-yellow-500/30' :
                'bg-red-500/10 border-red-500/30'
              }`}>
                <h3 className="text-white font-medium text-sm mb-1">🧠 NEXUS AI Verdict</h3>
                <p className={`text-sm font-bold ${
                  selected.aiVerdict.startsWith('APPROVED') ? 'text-green-400' :
                  selected.aiVerdict.startsWith('CONDITIONAL') ? 'text-yellow-400' :
                  'text-red-400'
                }`}>{selected.aiVerdict}</p>
              </div>

              {/* Decision Challenger */}
              <div className="bg-[#13131a] border border-orange-500/20 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-medium text-sm">⚔️ Decision Challenger</h3>
                  <button
                    onClick={runChallenge}
                    disabled={challenging}
                    className="px-4 py-1.5 text-xs font-bold text-white rounded-lg transition-all"
                    style={{ background: 'linear-gradient(135deg, #dc2626, #991b1b)' }}
                  >
                    {challenging ? 'Challenging...' : 'Challenge This Decision'}
                  </button>
                </div>
                {challenges.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-gray-400 text-xs mb-2">3 reasons this decision could fail:</p>
                    {challenges.map((c, i) => (
                      <div key={i} className="flex items-start gap-2 p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                        <span className="text-orange-400 font-bold text-xs flex-shrink-0">{i + 1}.</span>
                        <p className="text-gray-300 text-xs">{c}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Approval Actions */}
              {selected.status === 'pending' || selected.status === 'reviewing' ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => approveDecision(selected.id)}
                    className="flex-1 py-3 text-sm font-bold text-white rounded-lg"
                    style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                  >
                    ✅ Approve Decision
                  </button>
                  <button
                    onClick={() => router.push('/dashboard/future-lab')}
                    className="flex-1 py-3 text-sm font-bold text-white rounded-lg"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
                  >
                    🔮 Simulate First
                  </button>
                  <button
                    onClick={() => rejectDecision(selected.id)}
                    className="flex-1 py-3 text-sm font-bold text-white rounded-lg"
                    style={{ background: 'linear-gradient(135deg, #dc2626, #991b1b)' }}
                  >
                    ❌ Reject Decision
                  </button>
                </div>
              ) : (
                <div className={`p-4 rounded-xl text-center ${
                  selected.status === 'approved' ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'
                }`}>
                  <p className={`font-bold ${selected.status === 'approved' ? 'text-green-400' : 'text-red-400'}`}>
                    {selected.status === 'approved' ? '✅ Decision Approved' : '❌ Decision Rejected'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}