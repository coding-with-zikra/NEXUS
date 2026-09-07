'use client'

import { useState, useRef, useEffect } from 'react'

type Message = {
  role: 'user' | 'nexus'
  text: string
  time: string
}

const SMART_RESPONSES: Record<string, string> = {
  production: `📊 **Production Analysis:**\n\nCurrent output is 24,560 units — 12% below the 28,000 unit target.\n\n**Key issues detected:**\n• Machine #04 causing 62% of all downtime\n• Efficiency dropped from 87% to 78% this month\n• 4 skilled operators on simultaneous leave\n\n**Root cause:** Supplier X raw material quality issues → increased wastage → lower output.\n\n**Recommended action:** Schedule emergency maintenance for Machine #04 and replace Supplier X.`,

  profit: `💰 **Profit Analysis:**\n\nNet profit is ₹2.3 Cr — down 8% from last month's ₹2.5 Cr.\n\n**Why profit dropped:**\n• Raw material costs up ₹42L (+18%)\n• Production wastage increased to 2.8%\n• 680 units scrapped this month\n\n**The chain:** Supplier X quality → Machine #04 downtime → wastage → higher costs → lower profit.\n\n**Quick win:** Fixing Supplier X issue could recover ₹28-35L in monthly profit.`,

  inventory: `📦 **Inventory Status:**\n\nCurrent stock: 1,245 items total\n• In Stock: 1,145 (92%)\n• Low Stock: 3 items ⚠️\n• Overstock: 5 items\n\n**Critical alert:** Raw Steel has only 18 days remaining (reorder point is 30 days).\n\n**Risk:** If Supplier X delays again, production will halt in approximately 18 days.\n\n**Action needed:** Place emergency purchase order for Raw Steel from alternate supplier immediately.`,

  salary: `💰 **Your Salary Information:**\n\nCurrent month salary: ₹45,000\nNext payment: Due in 12 days\n\nBreakdown:\n• Basic Salary: ₹35,000\n• HRA: ₹7,000\n• Transport: ₹2,000\n• Other allowances: ₹1,000\n\nDeductions:\n• PF: ₹4,200\n• Tax: ₹2,100\n\n**Net Salary: ₹38,700**`,

  leave: `🌴 **Your Leave Balance:**\n\nTotal annual leave: 12 days\n• Used: 4 days\n• Remaining: 8 days ✅\n\nLeave types available:\n• Casual Leave: 5 days remaining\n• Sick Leave: 3 days remaining\n\nTo apply for leave, click "Apply for Leave" in your dashboard or go to Leave → Apply for Leave in the sidebar.`,

  attendance: `📅 **Your Attendance Summary:**\n\nThis month: 21/22 working days present\nAttendance rate: 95.4% ✅\n\nToday: Present (Check-in at 09:02 AM)\n\nLast 5 days:\n• Mon: Present ✅\n• Tue: Present ✅\n• Wed: Present ✅\n• Thu: Leave 🌴\n• Fri: Present ✅`,

  supplier: `🚚 **Supplier Risk Analysis:**\n\n**Supplier X (Critical Risk):**\n• 3 of last 4 deliveries had quality issues\n• 2 deliveries were late this quarter\n• Reliability score: 42/100 ❌\n• Recommended: Switch to alternate supplier immediately\n\n**Supplier Y (Good):**\n• Reliability: 84/100 ✅\n• On-time delivery: 91%\n\n**Supplier Z (Good):**\n• Reliability: 79/100 ✅\n• On-time delivery: 88%`,

  cash: `🏦 **Cash Flow Analysis:**\n\nCurrent cash balance: ₹1.8 Cr (down 12% from last month)\n\n**Cash flow this month:**\n• Inflow: ₹12.1 Cr\n• Outflow: ₹11.8 Cr\n• Net: +₹0.3 Cr\n\n**Warning:** Cash balance is tightening. At current burn rate, working capital could become constrained in 6-8 weeks.\n\n**Key risk:** If production increases 30%, additional ₹2.8 Cr working capital needed — currently unavailable.`,

  default: `🧠 I'm NEXUS Ω, your AI decision intelligence assistant.\n\nI can help you with:\n• 📊 Production & Operations analysis\n• 💰 Financial insights & profit analysis\n• 📦 Inventory status & alerts\n• 🚚 Supplier risk assessment\n• 👥 HR & attendance queries\n• 🔍 Root cause investigation\n• 🔮 What-if scenario simulation\n\nTry asking:\n• "Why did profit decrease?"\n• "What's the inventory status?"\n• "How many leave days do I have?"\n• "What's the supplier risk?"`
}

function getResponse(question: string): string {
  const q = question.toLowerCase()
  if (q.includes('production') || q.includes('output') || q.includes('efficiency')) return SMART_RESPONSES.production
  if (q.includes('profit') || q.includes('revenue') || q.includes('cost') || q.includes('expense')) return SMART_RESPONSES.profit
  if (q.includes('inventory') || q.includes('stock')) return SMART_RESPONSES.inventory
  if (q.includes('salary') || q.includes('payslip') || q.includes('pay')) return SMART_RESPONSES.salary
  if (q.includes('leave') || q.includes('holiday') || q.includes('vacation')) return SMART_RESPONSES.leave
  if (q.includes('attendance') || q.includes('present') || q.includes('absent')) return SMART_RESPONSES.attendance
  if (q.includes('supplier') || q.includes('delivery') || q.includes('vendor')) return SMART_RESPONSES.supplier
  if (q.includes('cash') || q.includes('balance') || q.includes('flow')) return SMART_RESPONSES.cash
  return SMART_RESPONSES.default
}

export default function AskNexusPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'nexus',
      text: `👋 Hello! I'm **NEXUS Ω**, your AI enterprise intelligence assistant.\n\nI can analyze your business data and answer questions about production, finance, inventory, suppliers, HR, and more.\n\nWhat would you like to know?`,
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

    setTimeout(() => {
      const response = getResponse(question)
      setMessages(prev => [...prev, {
        role: 'nexus',
        text: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
      setLoading(false)
    }, 1000)
  }

  const suggestions = [
    'Why did profit decrease this month?',
    'What is the inventory status?',
    'Show supplier risk analysis',
    'How many leave days do I have?',
    'What is the cash flow situation?',
    'Why did production efficiency drop?',
  ]

  return (
    <div className="flex flex-col h-full" style={{ height: 'calc(100vh - 56px)' }}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#1e1e2e] bg-[#0d0d14]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-lg">✨</span>
          </div>
          <div>
            <h1 className="text-white font-bold">Ask NEXUS</h1>
            <p className="text-gray-400 text-xs">AI Enterprise Intelligence — Always available</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-green-400 text-xs">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-3`}>
            {msg.role === 'nexus' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs">N</span>
              </div>
            )}
            <div className={`max-w-2xl ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
              <div className={`px-4 py-3 rounded-2xl text-sm ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-sm'
                  : 'bg-[#13131a] border border-[#2a2a3a] text-gray-200 rounded-bl-sm'
              }`}>
                {msg.text.split('\n').map((line, j) => (
                  <p key={j} className={line === '' ? 'mb-2' : 'mb-0.5'}>
                    {line.startsWith('**') && line.endsWith('**')
                      ? <strong className="text-white">{line.slice(2, -2)}</strong>
                      : line.startsWith('• ')
                      ? <span>• {line.slice(2)}</span>
                      : line
                    }
                  </p>
                ))}
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
              <span className="text-white text-xs">N</span>
            </div>
            <div className="bg-[#13131a] border border-[#2a2a3a] px-4 py-3 rounded-2xl rounded-bl-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-6 pb-3">
          <p className="text-gray-500 text-xs mb-2">Try asking:</p>
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
      <div className="px-6 py-4 border-t border-[#1e1e2e] bg-[#0d0d14]">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Ask NEXUS anything about your business..."
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
      </div>
    </div>
  )
}