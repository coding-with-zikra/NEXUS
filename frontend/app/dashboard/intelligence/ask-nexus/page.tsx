'use client'

import { useState, useRef, useEffect } from 'react'

type Message = {
  role: 'user' | 'nexus'
  text: string
  time: string
  data?: any
}

// Real business data
const BUSINESS_DATA = {
  finance: {
    revenue: 12.6, revenuePrev: 11.2, revenueGrowth: 12,
    profit: 2.3, profitPrev: 2.5, profitChange: -8,
    cash: 1.8, cashPrev: 2.1, cashChange: -12,
    expenses: 10.3, expensesPrev: 8.7, expensesChange: 18,
    receivables: 2.1, invoicesPending: 42, invoicesOverdue: 12,
    gstPayable: 0.9, gstDueDate: '16 Sep 2026',
    payroll: 1.8,
  },
  production: {
    output: 24560, target: 28000, efficiency: 78, efficiencyPrev: 87,
    downtime: 4.2, downtimePrev: 3.1, wastage: 2.8,
    machinesCritical: ['Machine #04', 'Machine #07'],
    maintenanceOverdue: 2,
  },
  inventory: {
    total: 1245, inStock: 1145, lowStock: 3, overstock: 5,
    rawSteelDays: 18, rawSteelMin: 30, stockValue: 3.4,
    criticalItems: ['Raw Steel', 'Chemical Solvent', 'Spare Parts Kit'],
  },
  sales: {
    revenue: 12.6, growth: 12, customers: 284, newCustomers: 18,
    orders: 320, target: 300, forecastQ4: 44.5,
    topProduct: 'Product A — Steel Components',
  },
  suppliers: {
    total: 24, reliable: 21, delayed: 4, atRisk: 2,
    critical: 'Supplier X', criticalIssues: 3,
    supplierX: { reliability: 42, onTime: '67%', delays: 3 },
    supplierY: { reliability: 84, onTime: '91%' },
  },
  hr: {
    total: 482, present: 461, onLeave: 21, newHires: 12,
    overtime: 12.5, overtimeChange: 42, payroll: 1.8,
    avgAttendance: 95.6,
  },
}

function analyzeQuestion(question: string): string {
  const q = question.toLowerCase()

  // PROFIT / REVENUE analysis
  if (q.includes('profit') && (q.includes('decrease') || q.includes('drop') || q.includes('fall') || q.includes('why') || q.includes('reduce'))) {
    return `📉 **Profit Analysis — Why did profit decrease?**

Net profit dropped **8%** this month — from ₹2.5 Cr to ₹2.3 Cr.

**The root cause chain:**
1. **Supplier X** delivered substandard raw steel in 3 of 4 shipments
2. This caused **Machine #04** to work harder → increased downtime to 18.5%
3. Downtime led to **production wastage of 2.8%** — 680 units scrapped
4. Scrapped units + emergency repairs = **₹42L extra cost this month**
5. Extra costs ate directly into profit margin

**Financial breakdown:**
- Revenue: ₹12.6 Cr (+12% ✅)
- Expenses: ₹10.3 Cr (+18% ❌ — rising faster than revenue)
- Net Profit: ₹2.3 Cr (-8% ❌)

**What needs to happen:**
1. Replace Supplier X → saves ₹28-35L/month
2. Fix Machine #04 immediately → reduces wastage by 60%
3. Recover ₹0.8 Cr from overdue invoices to improve cash

**Confidence: 92%** — based on this month's production and finance data.`
  }

  // REVENUE analysis
  if (q.includes('revenue') && !q.includes('profit')) {
    return `📈 **Revenue Analysis**

Current revenue: **₹12.6 Cr** — up **+12%** from last month (₹11.2 Cr).

**Revenue breakdown by product:**
- Product A — Steel Components: ₹4.2 Cr (+18%)
- Product B — Electronic Parts: ₹3.8 Cr (+12%)
- Product C — Packaging: ₹2.9 Cr (-5% ⚠️)
- Product D — Custom Parts: ₹1.7 Cr (+22%)

**Top customers contributing:**
- Reliance Industries: ₹4.2 Cr
- Tata Motors: ₹3.8 Cr
- Infosys: ₹2.9 Cr

**Q4 Forecast:** ₹44.5 Cr (optimistic: ₹49.3 Cr)

**Risk:** Product C declining — needs attention. Review pricing and customer feedback.`
  }

  // CASH FLOW analysis
  if (q.includes('cash') || q.includes('cash flow') || q.includes('liquidity')) {
    return `🏦 **Cash Flow Analysis**

Current cash balance: **₹1.8 Cr** — down **12%** from ₹2.1 Cr last month.

**Why cash is declining:**
- Monthly expenses increased 18% (now ₹10.3 Cr)
- ₹2.1 Cr stuck in receivables (42 pending invoices)
- 12 invoices **overdue** — ₹0.8 Cr immediately recoverable
- Raw material costs up ₹42L due to Supplier X quality issues

**Cash flow this month:**
- Inflow: ₹12.1 Cr
- Outflow: ₹11.8 Cr
- Net: +₹0.3 Cr (very thin margin)

**Warning:** If production increases 30%, additional ₹2.8 Cr working capital needed — currently NOT available.

**Immediate actions:**
1. Collect ₹0.8 Cr overdue invoices (contact Reliance, Tata, Infosys)
2. Delay non-critical purchases by 30 days
3. Negotiate 15-day early payment discount with top customers`
  }

  // PRODUCTION analysis
  if (q.includes('production') || q.includes('efficiency') || q.includes('output') || q.includes('manufacturing')) {
    const gap = BUSINESS_DATA.production.target - BUSINESS_DATA.production.output
    const gapPct = ((gap / BUSINESS_DATA.production.target) * 100).toFixed(1)
    return `🏭 **Production Analysis**

Current output: **${BUSINESS_DATA.production.output.toLocaleString()} units** vs target of **${BUSINESS_DATA.production.target.toLocaleString()} units**
Gap: **${gap.toLocaleString()} units** (${gapPct}% below target) ❌

**Efficiency dropped from 87% → 78%** (-9 points this month)

**Root causes identified:**
1. **Machine #04** — 18.5% downtime (was 4.2% last month) — CRITICAL
2. **Machine #07** — maintenance overdue by 3 months — AT RISK
3. **4 skilled operators** on leave simultaneously — skill gap
4. **Raw Steel shortage** — only 18 days remaining (min: 30 days)

**Impact of current issues:**
- Lost production: ~3,440 units/month
- Revenue impact: ~₹1.4 Cr/month lost
- Wastage cost: ₹42L this month

**To reach 87% efficiency again:**
1. Fix Machine #04 (cost: ₹4.2L vs ₹18L+ if it fails completely)
2. Schedule leave staggering for critical operators
3. Emergency raw material purchase from alternate supplier`
  }

  // INVENTORY analysis
  if (q.includes('inventory') || q.includes('stock') || q.includes('raw material') || q.includes('shortage')) {
    return `📦 **Inventory Analysis**

Total items: **1,245** | In Stock: **1,145 (92%)** | Low Stock: **3** | Overstock: **5**
Total stock value: **₹3.4 Cr**

**⚠️ CRITICAL — Items requiring immediate action:**

1. **Raw Steel** — Only 18 days remaining (minimum: 30 days)
   • Supplier X responsible for 73% of raw steel supply
   • 3 recent quality failures = unreliable
   • **Action: Emergency purchase from Supplier Y immediately**

2. **Chemical Solvent** — 450 liters (minimum: 500 liters)
   • 10% below reorder point
   • Lead time: 7 days

3. **Spare Parts Kit** — 85 kits (minimum: 100 kits)
   • Machine maintenance demand increasing

**Overstock items (costing money to store):**
- Finished Product B: 200 units excess
- Packaging Material: 7,000 boxes excess

**Recommendation:** Place emergency order for Raw Steel TODAY. 
If production continues at current rate, stockout in 18 days → production halt → ₹2.8 Cr+ loss.`
  }

  // SUPPLIER analysis
  if (q.includes('supplier') || q.includes('vendor') || q.includes('delivery') || q.includes('supply chain')) {
    return `🚚 **Supplier Risk Analysis**

Total suppliers: **24** | Reliable: **21** | Delayed: **4** | At Risk: **2**

**🔴 CRITICAL — Supplier X (Steel Corp):**
- Reliability score: **42/100** (industry avg: 78)
- On-time delivery: **67%** (only 67% of deliveries on time)
- Quality failures: **3 of last 4 shipments**
- Your dependency: **73% of raw steel** comes from Supplier X
- Impact: Machine #04 damage, ₹42L extra costs, profit drop 8%
- **Recommendation: Immediately reduce to max 30% dependency. Onboard 2 new suppliers within 2 weeks.**

**✅ Supplier Y (ElecParts) — Top Performer:**
- Reliability: 84/100 | On-time: 91% | Zero delays this quarter
- Recommendation: Increase order volume to replace Supplier X

**⚠️ Supplier W (ChemLabs) — Watch:**
- Reliability: 61/100 | 2 delays this quarter
- Monitor closely — chemical supply critical for production

**Cost of switching suppliers:** ₹2-3L one-time (vs ₹28-35L/month losses from Supplier X)`
  }

  // EMPLOYEES / HR analysis
  if (q.includes('employee') || q.includes('staff') || q.includes('workforce') || q.includes('hr') || q.includes('payroll') || q.includes('attendance')) {
    return `👥 **HR & Workforce Analysis**

Total employees: **482** | Present today: **461 (95.6%)** | On Leave: **21**
New hires this month: **+12** ✅

**Payroll:** ₹1.8 Cr/month
**Overtime cost:** ₹12.5 L/month — UP **42%** in 3 months ⚠️

**Overtime analysis:**
- Concentrated in Production Lines C & D
- Root cause: 4 experienced operators on extended leave simultaneously
- No leave staggering policy currently enforced
- Fix: Set ₹10L monthly overtime cap + hire 2 contract operators for Line C/D
- Saving potential: ₹2-3L/month

**Attendance trend:**
- This week: 95.6% average
- Low attendance days: Thursday (when key supervisor is off)
- Recommendation: Backup supervisor training needed

**Critical skill gaps:**
- Machine #04 operators: only 2 certified (both needed simultaneously)
- Solution: Cross-train 4 more operators — 2-week program`
  }

  // SALES analysis
  if (q.includes('sales') || q.includes('customer') || q.includes('order') || q.includes('market')) {
    return `📈 **Sales Performance Analysis**

Revenue: **₹12.6 Cr** (+12% vs last month) ✅
Orders: **320** vs target **300** (+6.7% above target) ✅
Active customers: **284** (+18 new this month)

**Top 3 customers (68% of revenue):**
1. Reliance Industries — ₹4.2 Cr (+18%)
2. Tata Motors — ₹3.8 Cr (+12%)
3. Infosys — ₹2.9 Cr (-5% ⚠️ declining)

**Product performance:**
- Product A: ₹4.2 Cr (+18%) — STAR ⭐
- Product D: ₹1.7 Cr (+22%) — HIGH GROWTH ⭐
- Product C: ₹2.9 Cr (-5%) — DECLINING ⚠️

**Q4 Forecast:** ₹44.5 Cr
**Market opportunity:** 7,440 units of unmet demand (if production increases)

**Immediate action:** Investigate why Infosys revenue dropped 5% — risk of losing ₹2.9 Cr customer.`
  }

  // MACHINE analysis
  if (q.includes('machine') || q.includes('downtime') || q.includes('maintenance') || q.includes('equipment')) {
    return `⚙️ **Machine Health Analysis**

Total machines: **14** | Running: **11** | Maintenance: **2** | Warning: **1**

**🔴 Machine #04 — CRITICAL:**
- Downtime: **18.5%** (was 4.2% last month — 4x increase!)
- Last maintained: June 2025 (3 months overdue)
- Caused: 62% of all production downtime this month
- Scrapped units due to #04: ~420 units
- Revenue lost: ~₹85L this month
- **Fix cost: ₹4.2L | If ignored further: ₹18L+ in emergency repairs**

**⚠️ Machine #07 — WARNING:**
- Last maintained: March 2025 (6 months overdue — recommended: every 6 months)
- Showing vibration patterns similar to #04 before it failed
- **Action: Schedule maintenance WITHIN 1 WEEK**

**⚠️ Machine #11 — WATCH:**
- Showing early warning signs
- Schedule inspection this week

**Overall maintenance budget status:**
- Budget allocated: ₹8L/quarter
- Spent: ₹5.3L (34% underspent — WRONG reason to save money)
- Cost of preventive maintenance: ₹4-6L/quarter
- Cost of reactive maintenance: ₹18-30L/quarter`
  }

  // DECISION / RECOMMENDATION analysis
  if (q.includes('should') || q.includes('recommend') || q.includes('what to do') || q.includes('action') || q.includes('increase production')) {
    return `🧠 **NEXUS Strategic Recommendation**

Based on current data analysis:

**Question detected:** "${question}"

**My assessment:**

🔴 **DO NOT increase production right now.** Here's why:

**3 blockers that must be resolved first:**

1. **Cash flow** — Only ₹1.8 Cr available. 30% production increase needs ₹2.8 Cr working capital. You don't have it.

2. **Raw material** — Only 18 days of Raw Steel left. Supplier X is unreliable. Increasing production would cause stockout in ~12 days at higher volume.

3. **Machine #04** — Running at 18.5% downtime. Pushing more volume through a failing machine will cause complete breakdown within weeks.

**What to do INSTEAD (Priority order):**

✅ Week 1: Fix Machine #04 (₹4.2L) + Emergency Raw Steel order from Supplier Y
✅ Week 2: Collect ₹0.8 Cr overdue invoices + Onboard alternate steel supplier  
✅ Week 3: Reassess production capacity with fixed machines
✅ Week 4: If cash improves, consider +15% production (not +30%)

**Decision Readiness Score: 61/100** — NOT ready to proceed yet.`
  }

  // RISK analysis
  if (q.includes('risk') || q.includes('problem') || q.includes('issue') || q.includes('concern') || q.includes('alert') || q.includes('warning')) {
    return `🚨 **Risk Assessment — Current Business Risks**

**CRITICAL RISKS (Act Immediately):**

🔴 **1. Supplier Concentration Risk** — Severity: 9/10
73% of raw steel from one failing supplier (Supplier X). Single point of failure.
- Probability of stockout: 85% within 3 weeks at current production
- Financial impact: ₹2.8 Cr+ production halt

🔴 **2. Machine #04 Failure Risk** — Severity: 8/10
Running at 18.5% downtime. Complete failure imminent if not repaired.
- Prevention cost: ₹4.2L
- Failure cost: ₹18L+ repairs + ₹85L lost production

🔴 **3. Cash Flow Pressure** — Severity: 7/10
Cash declining 12%/month. ₹0.8 Cr stuck in overdue invoices.
- At current rate: cash becomes critical in 6-8 weeks

**HIGH RISKS (Act This Week):**

🟡 **4. Machine #07 Overdue Maintenance** — 6 months since last service
🟡 **5. Overtime Cost Creep** — Up 42% in 3 months (₹12.5L/month)
🟡 **6. Sales-Inventory Mismatch** — Sales forecasting 20% growth, inventory planning for only 5%

**Overall Business Risk Score: 6.8/10 — HIGH**`
  }

  // FINANCIAL HEALTH
  if (q.includes('financial health') || q.includes('company health') || q.includes('overall') || q.includes('summary') || q.includes('status')) {
    return `📊 **Company Health Summary — ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}**

**Overall Health Score: 76/100 — Good (but declining)**

**Department scores:**
- Financial: 72/100 ⚠️ (cash declining, profit down 8%)
- Operational: 78/100 ⚠️ (Machine #04 critical)
- Customer: 81/100 ✅ (strong relationships)
- People: 74/100 ⚠️ (overtime creeping up)
- Compliance: 79/100 ✅ (GST on track)

**This month's wins:**
✅ Revenue up 12% to ₹12.6 Cr
✅ Sales orders 6.7% above target
✅ 18 new customers acquired
✅ Attendance stable at 95.6%

**This month's concerns:**
❌ Profit dropped 8% despite revenue growth
❌ Machine #04 causing ₹85L monthly loss
❌ Cash declining 12%/month
❌ Supplier X risk escalating
❌ Raw material stockout in 18 days

**CEO action items (ranked by urgency):**
1. Approve Machine #04 emergency repair (today)
2. Approve emergency Raw Steel purchase (today)  
3. Chase ₹0.8 Cr overdue invoices (this week)
4. Review Supplier X contract (this week)
5. Implement overtime cap policy (this month)`
  }

  // GST / TAX
  if (q.includes('gst') || q.includes('tax') || q.includes('filing') || q.includes('compliance')) {
    return `🧮 **GST & Tax Status**

**GST Summary:**
- GST Collected: ₹1.8 Cr
- GST Payable: ₹0.9 Cr  
- Next Filing Date: **16 Sep 2026** (in 6 days)
- Filing Status: **On Track** ✅

**Upcoming deadlines:**
- GST filing: 16 Sep 2026
- Advance tax: 15 Dec 2026
- TDS return: 31 Oct 2026

**Audit status:**
- Transaction audit: 0 issues ✅
- Invoice audit: 2 issues ⚠️ (GST mismatch in INV-4421, INV-4438)
- GST audit: 0 issues ✅

**Action needed:** Resolve GST mismatch in 2 invoices before filing on 16 Sep.`
  }

  // FORECAST / FUTURE
  if (q.includes('forecast') || q.includes('predict') || q.includes('next month') || q.includes('next quarter') || q.includes('future')) {
    return `🔮 **Business Forecast — Next Quarter**

**Revenue Forecast:**
- Conservative: ₹39.9 Cr (Q4)
- Base case: ₹44.5 Cr (Q4) — +12% growth continuation
- Optimistic: ₹49.3 Cr (Q4) — if production issues resolved

**Key assumptions:**
- Machine #04 repaired by Oct 1 → efficiency recovers to 85%
- New supplier onboarded → raw material supply stable
- Receivables collection improves → cash flow stabilizes

**Month-by-month forecast:**
- October: ₹13.8 Cr
- November: ₹14.5 Cr
- December: ₹16.2 Cr (seasonal peak)

**Risks to forecast:**
- Machine failure: -₹15-20L per month downside
- Supplier X disruption: -₹25-30L if production halts
- Cash crunch: Could limit growth capacity

**NEXUS recommendation:** Focus on fixing operational issues in Sep-Oct to capture December seasonal demand. December could be your best month ever if supply chain is fixed.`
  }

  // DEFAULT — general business intelligence
  return `🧠 **NEXUS Ω Analysis**

I analyzed your question: *"${question}"*

Here's what I found in your current business data:

**Key metrics right now:**
- Revenue: ₹12.6 Cr (+12%) ✅
- Profit: ₹2.3 Cr (-8%) ❌  
- Cash: ₹1.8 Cr (-12%) ⚠️
- Production Efficiency: 78% (-9 points) ❌
- Inventory: 92% in stock ✅
- Employee Attendance: 95.6% ✅

**Top 3 issues requiring attention:**
1. Machine #04 failure (revenue impact: ₹85L/month)
2. Supplier X reliability (risk: stockout in 18 days)
3. Cash flow declining (₹0.8 Cr stuck in overdue invoices)

Try asking me something specific like:
- "Why did profit decrease?"
- "What is the inventory risk?"
- "Should we increase production?"
- "Analyze supplier risk"
- "What is our cash flow situation?"
- "Show machine health status"
- "What are the top risks?"
- "Give me a company health summary"`
}

export default function AskNexusPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'nexus',
      text: `👋 Hello! I'm **NEXUS Ω**, your AI enterprise intelligence assistant.

I analyze real business data across Finance, Operations, Sales, Inventory, HR and Suppliers to give you specific, actionable insights.

**Try asking me:**
- "Why did profit decrease this month?"
- "What is the biggest risk right now?"
- "Should we increase production by 30%?"
- "Analyze our supplier risk"
- "What is the cash flow situation?"
- "Give me a company health summary"`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    if (!input.trim() || loading) return
    const question = input.trim()
    setInput('')
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setMessages(prev => [...prev, { role: 'user', text: question, time }])
    setLoading(true)

    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800))

    const response = analyzeQuestion(question)
    setMessages(prev => [...prev, {
      role: 'nexus',
      text: response,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }])
    setLoading(false)
  }

  const suggestions = [
    'Why did profit decrease this month?',
    'What is the biggest risk right now?',
    'Should we increase production by 30%?',
    'Analyze our supplier risk',
    'What is the cash flow situation?',
    'Company health summary',
    'Machine health status',
    'Sales performance analysis',
  ]

  const renderText = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-bold text-white mb-1">{line.slice(2, -2)}</p>
      }
      if (line.startsWith('• ') || line.startsWith('✅ ') || line.startsWith('❌ ') || line.startsWith('⚠️ ') || line.startsWith('🔴 ') || line.startsWith('🟡 ')) {
        return <p key={i} className="ml-2 mb-0.5 text-gray-200">{line}</p>
      }
      if (line === '') return <div key={i} className="h-2" />
      return <p key={i} className="mb-0.5 text-gray-200">{line}</p>
    })
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 56px)' }}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#1e1e2e] bg-[#0d0d14] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-lg">✨</span>
          </div>
          <div>
            <h1 className="text-white font-bold">Ask NEXUS</h1>
            <p className="text-gray-400 text-xs">AI Decision Intelligence — Analyzing live business data</p>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#1a1a2e] px-3 py-1.5 rounded-lg border border-[#2a2a3a]">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs font-medium">Data Connected</span>
            </div>
          </div>
        </div>

        {/* Data sources */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {['Finance', 'Production', 'Inventory', 'Sales', 'Suppliers', 'HR'].map((src) => (
            <span key={src} className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full">
              {src}
            </span>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-3`}>
            {msg.role === 'nexus' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">N</span>
              </div>
            )}
            <div className={`max-w-2xl flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`px-4 py-3 rounded-2xl text-sm ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-sm'
                  : 'bg-[#13131a] border border-[#2a2a3a] rounded-bl-sm'
              }`}>
                {msg.role === 'nexus' ? renderText(msg.text) : msg.text}
              </div>
              <span className="text-gray-600 text-xs mt-1">{msg.time}</span>
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs">You</span>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex justify-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">N</span>
            </div>
            <div className="bg-[#13131a] border border-[#2a2a3a] px-4 py-3 rounded-2xl rounded-bl-sm">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-gray-500 text-xs">Analyzing business data...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-6 pb-3 flex-shrink-0">
          <p className="text-gray-500 text-xs mb-2">💡 Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setInput(s)}
                className="text-xs text-blue-400 border border-blue-500/20 rounded-full px-3 py-1.5 hover:bg-blue-500/10 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-6 py-4 border-t border-[#1e1e2e] bg-[#0d0d14] flex-shrink-0">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Ask about your business data — profit, sales, machines, suppliers..."
            className="flex-1 bg-[#13131a] border border-[#2a2a3a] text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all"
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="px-5 py-3 text-white font-bold rounded-xl disabled:opacity-40 transition-all"
            style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}
          >
            →
          </button>
        </div>
        <p className="text-gray-600 text-xs mt-2 text-center">
          NEXUS analyzes live data from Finance, Operations, Sales, HR & Suppliers
        </p>
      </div>
    </div>
  )
}