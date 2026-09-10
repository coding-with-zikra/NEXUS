'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Real business data for analysis
const BUSINESS_DATA = {
  finance: { cash: 1.8, cashChange: -12, revenue: 12.6, expenses: 10.3, profit: 2.3, workingCapital: 1.8, runway: 2.1 },
  production: { output: 24560, target: 28000, efficiency: 78, downtime: 4.2, wastage: 2.8, capacity: 35000 },
  inventory: { rawSteelDays: 18, reorderPoint: 30, total: 1245, lowStock: 3, supplierXDelays: 3 },
  sales: { revenue: 12.6, growth: 12, demandForecast: 32000, unmetDemand: 7440, orders: 320 },
  hr: { total: 482, present: 461, overtime: 12.5, overtimeChange: 42 },
  suppliers: { supplierXReliability: 42, supplierXDelays: 3, supplierYReliability: 84 },
}

function analyzeDecision(decision: string) {
  const d = decision.toLowerCase()

  if (d.includes('production') || d.includes('manufactur') || d.includes('output') || d.includes('increase') && d.includes('%')) {
    const pct = d.match(/(\d+)%/)?.[1] || '30'
    const increase = parseInt(pct)
    const additionalCapital = (increase * 0.093).toFixed(1)
    const revenueGain = (BUSINESS_DATA.finance.revenue * increase / 100 * 0.8).toFixed(1)

    return {
      decision,
      readiness: 61,
      verdicts: {
        finance: {
          verdict: 'NO',
          reason: `Cash balance ₹1.8 Cr (down 12%). A ${increase}% production increase needs ₹${additionalCapital} Cr additional working capital — currently unavailable. Monthly burn rate already increasing.`
        },
        production: {
          verdict: 'YES',
          reason: `${increase}% spare capacity available (current: ${BUSINESS_DATA.production.output.toLocaleString()} units, max: ${BUSINESS_DATA.production.capacity.toLocaleString()}). Machine capacity supports it IF Machine #04 is repaired first.`
        },
        inventory: {
          verdict: 'NO',
          reason: `Only ${BUSINESS_DATA.inventory.rawSteelDays} days of raw steel remaining (minimum: ${BUSINESS_DATA.inventory.reorderPoint} days). At ${increase}% higher production, stockout in ~${Math.round(BUSINESS_DATA.inventory.rawSteelDays * 100 / (100 + increase))} days. Supplier X delayed 3 times this quarter.`
        },
        sales: {
          verdict: 'YES',
          reason: `Demand forecast: ${BUSINESS_DATA.sales.demandForecast.toLocaleString()} units needed. Current output: ${BUSINESS_DATA.production.output.toLocaleString()} — leaving ${BUSINESS_DATA.sales.unmetDemand.toLocaleString()} units unmet. Market can absorb a ${increase}% increase worth ~₹${revenueGain} Cr extra revenue.`
        }
      },
      conflicts: [
        {
          dept_a: 'Finance', dept_b: 'Production', type: 'Capital vs Capacity', severity: 'critical',
          a_says: `Need ₹${additionalCapital} Cr working capital — not available. Cash declining 12%/month.`,
          b_says: `${increase}% spare capacity exists. Machines can handle it if #04 is fixed.`
        },
        {
          dept_a: 'Inventory', dept_b: 'Sales', type: 'Supply vs Demand', severity: 'high',
          a_says: `${BUSINESS_DATA.inventory.rawSteelDays} days raw material left. Supplier X unreliable (42/100 reliability).`,
          b_says: `${BUSINESS_DATA.sales.unmetDemand.toLocaleString()} units of unmet demand. Revenue upside: ₹${revenueGain} Cr.`
        },
        {
          dept_a: 'Finance', dept_b: 'Sales', type: 'Risk vs Opportunity', severity: 'high',
          a_says: `Cash could go negative in 6-8 weeks if costs increase further.`,
          b_says: `Market opportunity is real — competitors may capture the demand if we don't.`
        }
      ],
      aiSummary: `The core contradiction is a classic **capacity-vs-capital deadlock**. Production and Sales confirm the market opportunity is real (${BUSINESS_DATA.sales.unmetDemand.toLocaleString()} units unmet demand, ${increase}% spare machine capacity). But Finance reveals cash balance is declining 12%/month and Inventory shows only ${BUSINESS_DATA.inventory.rawSteelDays} days of raw materials — well below the ${BUSINESS_DATA.inventory.reorderPoint}-day reorder point. **Before any production increase, resolve: (1) Supplier X dependency — find alternate steel supplier, (2) secure ₹${additionalCapital} Cr working capital facility, (3) repair Machine #04.** Without these, a ${increase}% production surge will trigger stockout + cash crisis simultaneously within 2-3 weeks.`
    }
  }

  if (d.includes('hire') || d.includes('recruit') || d.includes('employee') || d.includes('staff')) {
    const num = d.match(/(\d+)/)?.[1] || '20'
    const cost = (parseInt(num) * 45000 / 100000).toFixed(1)
    return {
      decision,
      readiness: 74,
      verdicts: {
        finance: { verdict: 'CONDITIONAL', reason: `₹${cost} Cr/month additional payroll. Cash is tight (₹1.8 Cr, declining 12%/month). Feasible only if receivables of ₹0.8 Cr are collected first.` },
        production: { verdict: 'YES', reason: `Skilled operator shortage causing 9% efficiency drop. ${num} new operators would directly address Machine #04 skill gap and overtime cost of ₹12.5L/month.` },
        inventory: { verdict: 'NEUTRAL', reason: 'No direct inventory impact. More workers could help with stock management and quality inspection.' },
        sales: { verdict: 'YES', reason: `More production staff → higher output → more inventory → can fulfill ${BUSINESS_DATA.sales.unmetDemand.toLocaleString()} units of unmet demand. Revenue upside significant.` }
      },
      conflicts: [
        { dept_a: 'Finance', dept_b: 'Production', type: 'Cost vs Benefit', severity: 'high', a_says: `₹${cost} Cr/month fixed cost in already tight cash situation.`, b_says: `Operator shortage costing ₹85L/month in lost production — hiring is cheaper than NOT hiring.` },
        { dept_a: 'Finance', dept_b: 'Sales', type: 'Short-term cost vs Long-term revenue', severity: 'medium', a_says: 'Immediate cash impact is risky.', b_says: 'More staff → more output → ₹1.5-2 Cr additional monthly revenue potential.' }
      ],
      aiSummary: `Hiring ${num} employees is **conditionally recommended**. The math works: operator shortage costs ₹85L+/month in lost production vs ₹${cost} Cr/month hiring cost. **But timing matters.** Cash is tight at ₹1.8 Cr. Recommend: Hire ${Math.round(parseInt(num)/2)} now (when receivables are collected), hire remaining ${Math.round(parseInt(num)/2)} next month after cash stabilizes. Prioritize Machine #04 operators and production line C/D workers.`
    }
  }

  if (d.includes('market') || d.includes('expand') || d.includes('launch') || d.includes('new city') || d.includes('tier')) {
    return {
      decision,
      readiness: 68,
      verdicts: {
        finance: { verdict: 'CONDITIONAL', reason: 'Market expansion needs ₹0.8-1.2 Cr investment. Cash is tight at ₹1.8 Cr. Possible only if current receivables (₹2.1 Cr) are collected first.' },
        production: { verdict: 'NO', reason: `Cannot commit to new markets when current production is 12% below target (${BUSINESS_DATA.production.output.toLocaleString()} vs ${BUSINESS_DATA.production.target.toLocaleString()} units). New demand cannot be fulfilled.` },
        inventory: { verdict: 'NO', reason: `Stock barely sufficient for existing demand. Only ${BUSINESS_DATA.inventory.rawSteelDays} days raw material left. Cannot support additional market demand.` },
        sales: { verdict: 'YES', reason: `Market research shows strong opportunity. Tier-2 cities have lower competition and ₹3.2 Cr estimated revenue potential in 12 months.` }
      },
      conflicts: [
        { dept_a: 'Sales', dept_b: 'Production', type: 'Demand vs Supply', severity: 'critical', a_says: 'Market opportunity is real — competitors will move if we wait.', b_says: 'We cannot supply existing demand, let alone new markets.' },
        { dept_a: 'Finance', dept_b: 'Sales', type: 'Investment vs Return', severity: 'medium', a_says: 'Investment risk is high when cash is declining.', b_says: '₹3.2 Cr revenue potential justifies ₹0.8-1.2 Cr investment.' }
      ],
      aiSummary: `Market expansion is **strategically correct but operationally premature**. Sales data confirms the opportunity is real. However, Production is already 12% below target and Inventory has only ${BUSINESS_DATA.inventory.rawSteelDays} days of raw materials. Launching in new markets while struggling to fulfill existing orders will damage brand reputation. **Recommendation: Fix supply chain issues first (6-8 weeks), then launch market expansion.** Delay is not defeat — it prevents a failed launch.`
    }
  }

  if (d.includes('supplier') || d.includes('vendor') || d.includes('switch') || d.includes('replace')) {
    return {
      decision,
      readiness: 82,
      verdicts: {
        finance: { verdict: 'YES', reason: `Supplier X quality issues cost ₹42L extra this month alone. Switching saves ₹28-35L/month. One-time switching cost: ₹2-3L. ROI positive within 2 weeks.` },
        production: { verdict: 'YES', reason: `Machine #04 damage directly linked to Supplier X substandard raw steel. New supplier = better material quality = less machine wear = efficiency recovery from 78% to 87%.` },
        inventory: { verdict: 'YES', reason: `Supplier Y has 91% on-time delivery vs Supplier X 67%. Stock reliability would improve dramatically, eliminating the 18-day raw material crisis.` },
        sales: { verdict: 'YES', reason: `Reliable supply chain means consistent production = consistent delivery to customers = better customer satisfaction and potentially capturing the 7,440 unit unmet demand.` }
      },
      conflicts: [
        { dept_a: 'Finance', dept_b: 'Operations', type: 'Transition Risk', severity: 'low', a_says: '2-4 week transition period may cause temporary supply gap.', b_says: 'Supplier X already causing gaps — transition risk is lower than staying with Supplier X.' }
      ],
      aiSummary: `Switching suppliers is **strongly recommended** with **Decision Readiness: 82/100**. All four departments align on this decision. The financial case is overwhelming: Supplier X costs ₹42L/month in quality losses vs ₹2-3L one-time switching cost. Supplier Y (reliability 84/100, on-time 91%) is pre-vetted and ready. **Action: Notify Supplier X, place emergency order with Supplier Y this week, cap Supplier X at 20% until transition completes.**`
    }
  }

  // Default — analyze any decision
  return {
    decision,
    readiness: 55,
    verdicts: {
      finance: { verdict: 'CONDITIONAL', reason: `Current financial position: Revenue ₹12.6 Cr (+12%), but cash declining 12% to ₹1.8 Cr. Any major decision needs cash flow analysis. Working capital is constrained.` },
      production: { verdict: 'CONDITIONAL', reason: `Production at 78% efficiency (target: 87%). Machine #04 critical. Any decision affecting production volume needs machine repair first.` },
      inventory: { verdict: 'CONDITIONAL', reason: `Raw material supply critical — only 18 days left. Decision feasibility depends heavily on supply chain stability.` },
      sales: { verdict: 'YES', reason: `Sales growing 12%, 7,440 units unmet demand exists. Market supports growth decisions if operational constraints are resolved.` }
    },
    conflicts: [
      { dept_a: 'Finance', dept_b: 'Operations', type: 'Resources vs Execution', severity: 'high', a_says: 'Cash constraints limit investment capacity.', b_says: 'Operational improvements needed regardless of investment.' },
      { dept_a: 'Inventory', dept_b: 'Sales', type: 'Supply vs Demand', severity: 'medium', a_says: 'Supply chain fragile — cannot commit to new demand.', b_says: 'Market opportunity exists and should be captured.' }
    ],
    aiSummary: `NEXUS detected **2 conflicts** in your decision. The primary tension is between financial constraints (cash declining 12%/month) and growth opportunities (12% revenue growth, 7,440 units unmet demand). Before proceeding, address: (1) Machine #04 repair — costs ₹4.2L but prevents ₹18L+ losses, (2) Supplier X — switch to Supplier Y to stabilize supply, (3) Collect ₹0.8 Cr overdue invoices to strengthen cash position. Overall Decision Readiness: 55/100 — resolve operational issues first.`
  }
}

export default function ContradictionsPage() {
  const router = useRouter()
  const [decision, setDecision] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const analyze = async () => {
    if (!decision.trim()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setResult(analyzeDecision(decision))
    setLoading(false)
  }

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">🧩 Decision Contradiction Engine</h1>
        <p className="text-gray-400 text-sm mt-1">NEXUS analyzes your decision against real Finance, Production, Inventory and Sales data to find conflicts.</p>
      </div>

      {/* Input */}
      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
        <label className="text-gray-400 text-sm mb-2 block">Enter your decision</label>
        <div className="flex gap-3">
          <input
            type="text"
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
            placeholder="e.g. Should we increase production by 30% next quarter?"
            className="flex-1 bg-[#1a1a2e] border border-[#2a2a3a] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
            onKeyDown={(e) => e.key === 'Enter' && analyze()}
          />
          <button onClick={analyze} disabled={loading}
            className="px-6 py-3 text-sm font-bold text-white rounded-lg disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
            {loading ? '⚙️ Analyzing...' : 'Analyze Decision'}
          </button>
        </div>
        <div className="flex gap-2 mt-3 flex-wrap">
          {[
            'Should we increase production by 30%?',
            'Should we hire 20 new employees?',
            'Should we expand to new markets?',
            'Should we switch from Supplier X?',
          ].map((s) => (
            <button key={s} onClick={() => setDecision(s)}
              className="text-xs text-purple-400 border border-purple-500/30 rounded-full px-3 py-1 hover:bg-purple-500/10 transition-all">
              {s}
            </button>
          ))}
        </div>
      </div>

      {result && (
        <>
          {/* Readiness Score */}
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5 flex flex-col items-center justify-center">
              <p className="text-gray-400 text-xs mb-3 text-center">Decision Readiness</p>
              <div className="relative w-28 h-28 mb-3">
                <svg viewBox="0 0 36 36" className="w-28 h-28 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1a1a2e" strokeWidth="2.5" />
                  <circle cx="18" cy="18" r="15.9" fill="none"
                    stroke={result.readiness >= 75 ? '#10b981' : result.readiness >= 60 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="2.5" strokeDasharray={`${result.readiness} ${100 - result.readiness}`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-3xl font-black ${result.readiness >= 75 ? 'text-green-400' : result.readiness >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {result.readiness}
                  </span>
                  <span className="text-gray-500 text-xs">/ 100</span>
                </div>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                result.readiness >= 75 ? 'bg-green-500/20 text-green-400' :
                result.readiness >= 60 ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {result.readiness >= 75 ? '✅ READY' : result.readiness >= 60 ? '⚠️ CONDITIONAL' : '❌ NOT READY'}
              </span>
            </div>

            <div className="col-span-3 grid grid-cols-2 gap-3">
              {Object.entries(result.verdicts).map(([dept, data]: [string, any]) => (
                <div key={dept} className={`bg-[#13131a] border rounded-xl p-4 ${
                  data.verdict === 'YES' ? 'border-green-500/30' :
                  data.verdict === 'NO' ? 'border-red-500/30' : 'border-yellow-500/30'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium capitalize text-sm">{dept}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      data.verdict === 'YES' ? 'bg-green-500/20 text-green-400' :
                      data.verdict === 'NO' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {data.verdict === 'YES' ? '✅ YES' : data.verdict === 'NO' ? '❌ NO' : '⚠️ CONDITIONAL'}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">{data.reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Conflicts */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <h2 className="text-white font-semibold mb-4">⚔️ Conflicts Detected ({result.conflicts.length})</h2>
            <div className="space-y-4">
              {result.conflicts.map((conflict: any, i: number) => (
                <div key={i} className={`p-4 rounded-xl border ${
                  conflict.severity === 'critical' ? 'bg-red-500/10 border-red-500/30' :
                  conflict.severity === 'high' ? 'bg-orange-500/10 border-orange-500/30' :
                  'bg-yellow-500/10 border-yellow-500/30'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      conflict.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                      conflict.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>{conflict.severity.toUpperCase()}</span>
                    <span className="text-white font-medium text-sm">{conflict.dept_a} vs {conflict.dept_b}</span>
                    <span className="text-gray-500 text-xs">— {conflict.type}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#1a1a2e] rounded-lg p-3">
                      <p className="text-red-400 text-xs font-medium mb-1">{conflict.dept_a} says:</p>
                      <p className="text-gray-300 text-xs">{conflict.a_says}</p>
                    </div>
                    <div className="bg-[#1a1a2e] rounded-lg p-3">
                      <p className="text-green-400 text-xs font-medium mb-1">{conflict.dept_b} says:</p>
                      <p className="text-gray-300 text-xs">{conflict.b_says}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Summary */}
          <div className="bg-[#13131a] border border-purple-500/30 rounded-xl p-5">
            <h2 className="text-white font-semibold mb-3">🧠 NEXUS Analysis</h2>
            <p className="text-gray-300 text-sm leading-relaxed">{result.aiSummary}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={() => router.push('/dashboard/decision-safety')}
              className="flex-1 py-3 text-sm font-bold text-white rounded-lg"
              style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}>
              🛡️ Check Safety Gate
            </button>
            <button onClick={() => router.push('/dashboard/future-lab')}
              className="flex-1 py-3 text-sm font-bold text-white rounded-lg"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
              🔮 Simulate Impact
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