'use client'

import { createClient } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell
} from 'recharts'

const API = process.env.NEXT_PUBLIC_API_URL

const plData = [
  { month: 'Mar', Revenue: 9.2, Expenses: 7.8, Profit: 1.4 },
  { month: 'Apr', Revenue: 10.1, Expenses: 8.2, Profit: 1.9 },
  { month: 'May', Revenue: 11.3, Expenses: 9.1, Profit: 2.2 },
  { month: 'Jun', Revenue: 10.8, Expenses: 8.9, Profit: 1.9 },
  { month: 'Jul', Revenue: 11.9, Expenses: 9.8, Profit: 2.1 },
  { month: 'Aug', Revenue: 12.6, Expenses: 10.3, Profit: 2.3 },
]

const cashflowData = [
  { month: 'Jul', Inflow: 9.5, Outflow: 8.2 },
  { month: 'Aug', Inflow: 10.8, Outflow: 9.5 },
  { month: 'Sep', Inflow: 12.1, Outflow: 11.8 },
]

const expenseData = [
  { name: 'Raw Materials', value: 32, color: '#3b82f6' },
  { name: 'Salaries & Payroll', value: 18, color: '#8b5cf6' },
  { name: 'Utilities', value: 12, color: '#10b981' },
  { name: 'Marketing', value: 10, color: '#f59e0b' },
  { name: 'Admin', value: 8, color: '#ef4444' },
  { name: 'Others', value: 20, color: '#6b7280' },
]

const budgetData = [
  { dept: 'Production', Budget: 12.0, Actual: 10.8 },
  { dept: 'Sales & Mktg', Budget: 5.0, Actual: 4.6 },
  { dept: 'HR & Payroll', Budget: 4.0, Actual: 3.8 },
  { dept: 'Admin', Budget: 3.0, Actual: 2.9 },
  { dept: 'R&D', Budget: 2.0, Actual: 1.4 },
]

export default function FinanceDashboard() {
  const [greeting, setGreeting] = useState('Good Evening')
  const [userName, setUserName] = useState('Priya')
  const supabase = createClient()

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 17) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')

    supabase.auth.getSession().then(async ({ data: sessionData }) => {
      const user = sessionData.session?.user
      if (!user) return
      const meta = user.user_metadata
      const name = meta?.full_name?.split(' ')[0]
      if (name) { setUserName(name); return }
      const { data: profile } = await supabase
        .from('profiles').select('full_name').eq('id', user.id).single()
      if (profile?.full_name) setUserName(profile.full_name.split(' ')[0])
    })
  }, [])

  return (
    <div className="flex flex-col min-h-full">

            {/* Hero Banner */}
      <div className="relative px-8 py-8 flex items-center justify-between overflow-hidden" style={{ height: 90 }}>
        {/* Office desk photo */}
        <div className="absolute inset-0 z-0" style={{
          backgroundImage: `url('https://twopeas.com.au/wp-content/uploads/Professional-at-accounting-workstation-1024x574.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 60%',
        }} />
        {/* Dark overlay */}
        <div className="absolute inset-0 z-0" style={{
          background: 'linear-gradient(135deg, rgba(5,10,25,0.93) 0%, rgba(10,20,45,0.80) 60%, rgba(5,10,25,0.65) 100%)'
        }} />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white">{greeting}, {userName}! 👋</h1>
          <p className="text-gray-400 text-sm mt-1">Here's your financial snapshot for today.</p>
        </div>
        <div className="relative z-10 text-right">
          <p className="text-blue-300 text-sm italic">"Accurate numbers.</p>
          <p className="text-blue-300 text-sm italic">Stronger decisions."</p>
          <p className="text-gray-500 text-xs mt-1">— NEXUS Ω</p>
        </div>
      </div>

      <div className="p-6 space-y-5">

        {/* KPI Row */}
        <div className="grid grid-cols-6 gap-3">
          {[
            { label: 'Total Revenue', value: '₹12.6 Cr', trend: '+12%', up: true, sub: 'vs last month', icon: '💹', color: 'text-green-400', iconBg: 'bg-green-500/20', border: 'border-green-500/30', bg: 'from-green-500/10 to-transparent' },
            { label: 'Total Expenses', value: '₹10.3 Cr', trend: '+8%', up: false, sub: 'vs last month', icon: '📤', color: 'text-red-400', iconBg: 'bg-red-500/20', border: 'border-red-500/30', bg: 'from-red-500/10 to-transparent' },
            { label: 'Net Profit', value: '₹2.3 Cr', trend: '+18%', up: true, sub: 'vs last month', icon: '📊', color: 'text-purple-400', iconBg: 'bg-purple-500/20', border: 'border-purple-500/30', bg: 'from-purple-500/10 to-transparent' },
            { label: 'Cash Balance', value: '₹1.8 Cr', trend: '-5%', up: false, sub: 'vs last month', icon: '🏦', color: 'text-blue-400', iconBg: 'bg-blue-500/20', border: 'border-blue-500/30', bg: 'from-blue-500/10 to-transparent' },
            { label: 'Outstanding Receivables', value: '₹2.1 Cr', trend: '', up: true, sub: '42 invoices', icon: '📋', color: 'text-yellow-400', iconBg: 'bg-yellow-500/20', border: 'border-yellow-500/30', bg: 'from-yellow-500/10 to-transparent' },
            { label: 'GST Liability', value: '₹0.9 Cr', trend: '', up: false, sub: 'Due in 12 days', icon: '🧮', color: 'text-orange-400', iconBg: 'bg-orange-500/20', border: 'border-orange-500/30', bg: 'from-orange-500/10 to-transparent' },
          ].map((kpi) => (
            <div key={kpi.label} className={`bg-gradient-to-br ${kpi.bg} border ${kpi.border} rounded-xl p-4 hover:scale-[1.02] transition-transform`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-6 h-6 rounded-lg ${kpi.iconBg} flex items-center justify-center text-lg`}>
                  {kpi.icon}
                </div>
                {kpi.trend && (
                  <div className={`flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
                    kpi.up ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    <span>{kpi.up ? '▲' : '▼'}</span>
                    <span>{kpi.trend}</span>
                  </div>
                )}
              </div>
              <p className="text-gray-400 text-xs mb-1">{kpi.label}</p>
              <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
              <p className="text-gray-500 text-xs mt-1">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-3 gap-4">
          {/* P&L Statement */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl px-3 pt-2 pb-1">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-white font-semibold">P&L Statement</h2>
              <span className="text-gray-500 text-xs bg-[#1a1a2e] px-2 py-0.5 rounded">Last 6 Months</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={plData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
                <XAxis dataKey="month" stroke="#444" tick={{ fill: '#666', fontSize: 10 }} />
                <YAxis stroke="#444" tick={{ fill: '#666', fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#13131a', border: '1px solid #2a2a3a', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                <Legend />
                <Line type="monotone" dataKey="Revenue" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Expenses" stroke="#ef4444" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Profit" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Cash Flow */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">Cash Flow</h2>
              <span className="text-gray-500 text-xs bg-[#1a1a2e] px-2 py-1 rounded">This Quarter</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={cashflowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
                <XAxis dataKey="month" stroke="#444" tick={{ fill: '#666', fontSize: 10 }} />
                <YAxis stroke="#444" tick={{ fill: '#666', fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#13131a', border: '1px solid #2a2a3a', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                <Legend />
                <Bar dataKey="Inflow" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Outflow" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Balance Sheet + Financial Health */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <h2 className="text-white font-semibold mb-3">Balance Sheet</h2>
            <div className="space-y-2 mb-4">
              {[
                { label: 'Total Assets', value: '₹28.4 Cr' },
                { label: 'Total Liabilities', value: '₹12.1 Cr' },
                { label: 'Shareholder Equity', value: '₹16.3 Cr' },
              ].map((b) => (
                <div key={b.label} className="flex justify-between py-1 border-b border-[#2a2a3a]">
                  <span className="text-gray-400 text-xs">{b.label}</span>
                  <span className="text-white text-xs font-bold">{b.value}</span>
                </div>
              ))}
            </div>
            <h3 className="text-white text-sm font-semibold mb-2">Financial Health</h3>
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14">
                <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1a1a2e" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#10b981" strokeWidth="3"
                    strokeDasharray="78 22" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">78</span>
                </div>
              </div>
              <div className="space-y-1">
                {[
                  { label: 'Liquidity', value: 82, color: 'bg-green-400' },
                  { label: 'Solvency', value: 75, color: 'bg-blue-400' },
                  { label: 'Profitability', value: 80, color: 'bg-purple-400' },
                  { label: 'Efficiency', value: 77, color: 'bg-yellow-400' },
                ].map((h) => (
                  <div key={h.label} className="flex items-center gap-2">
                    <span className="text-gray-500 text-xs w-20">{h.label}</span>
                    <div className="w-16 bg-[#2a2a3a] rounded-full h-1">
                      <div className={`${h.color} h-1 rounded-full`} style={{ width: `${h.value}%` }} />
                    </div>
                    <span className="text-gray-400 text-xs">{h.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-3 gap-4">
          {/* Invoices */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">🧾 Invoices</h2>
              <button className="text-blue-400 text-xs hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[
                { label: 'Pending', value: '42', amount: '₹2.1 Cr', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
                { label: 'Paid', value: '118', amount: '₹6.4 Cr', color: 'text-green-400', bg: 'bg-green-500/10' },
                { label: 'Overdue', value: '12', amount: '₹0.8 Cr', color: 'text-red-400', bg: 'bg-red-500/10' },
                { label: 'Total', value: '172', amount: '₹9.3 Cr', color: 'text-blue-400', bg: 'bg-blue-500/10' },
              ].map((inv) => (
                <div key={inv.label} className={`${inv.bg} rounded-lg p-2 text-center`}>
                  <p className={`text-lg font-bold ${inv.color}`}>{inv.value}</p>
                  <p className="text-gray-500 text-xs">{inv.label}</p>
                  <p className="text-gray-400 text-xs font-medium">{inv.amount}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {[
                { client: 'Reliance Industries', amount: '₹42L', status: 'overdue' },
                { client: 'Tata Motors', amount: '₹28L', status: 'pending' },
                { client: 'Infosys Ltd', amount: '₹18L', status: 'pending' },
              ].map((inv) => (
                <div key={inv.client} className="flex items-center justify-between py-1.5 border-b border-[#2a2a3a]">
                  <span className="text-gray-300 text-xs">{inv.client}</span>
                  <span className="text-white text-xs font-bold">{inv.amount}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    inv.status === 'overdue' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>{inv.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Expenses by Category */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">Expenses by Category</h2>
              <span className="text-gray-500 text-xs bg-[#1a1a2e] px-2 py-1 rounded">This Month</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <ResponsiveContainer width={120} height={120}>
                  <PieChart>
                    <Pie data={expenseData} cx={55} cy={55} innerRadius={35} outerRadius={55} dataKey="value">
                      {expenseData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white font-bold text-xs">₹10.3 Cr</p>
                    <p className="text-gray-500 text-xs">Total</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-1.5">
                {expenseData.map((e) => (
                  <div key={e.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: e.color }} />
                      <span className="text-gray-400 text-xs">{e.name}</span>
                    </div>
                    <span className="text-gray-300 text-xs font-medium">{e.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Budget vs Actual */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">Budget vs Actual</h2>
              <span className="text-gray-500 text-xs bg-[#1a1a2e] px-2 py-1 rounded">This Month</span>
            </div>
            <div className="space-y-3">
              {budgetData.map((b) => (
                <div key={b.dept}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-xs">{b.dept}</span>
                    <span className="text-gray-400 text-xs">{b.Actual} / {b.Budget} Cr</span>
                  </div>
                  <div className="flex gap-1 h-2">
                    <div className="bg-[#2a2a5a] rounded-full flex-1">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(b.Budget / 12) * 100}%` }} />
                    </div>
                    <div className="bg-[#2a2a5a] rounded-full flex-1">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${(b.Actual / 12) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-3">
              <div className="flex items-center gap-1"><div className="w-3 h-1 bg-blue-500 rounded" /><span className="text-gray-500 text-xs">Budget</span></div>
              <div className="flex items-center gap-1"><div className="w-3 h-1 bg-purple-500 rounded" /><span className="text-gray-500 text-xs">Actual</span></div>
            </div>
          </div>
        </div>

        {/* Row 3 — GST, Payroll, Anomalies, Audit */}
        <div className="grid grid-cols-4 gap-4">
          {/* GST / Tax */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-semibold text-sm">🧮 GST / Tax</h2>
              <button className="text-blue-400 text-xs hover:underline">View Details</button>
            </div>
            <div className="space-y-2">
              {[
                { label: 'GST Collected', value: '₹1.8 Cr' },
                { label: 'GST Payable', value: '₹0.9 Cr' },
                { label: 'Next Filing Date', value: '16 Sep 2025' },
                { label: 'Filing Status', value: 'On Track', green: true },
              ].map((g) => (
                <div key={g.label} className="flex justify-between items-center py-1 border-b border-[#2a2a3a]">
                  <span className="text-gray-400 text-xs">{g.label}</span>
                  <span className={`text-xs font-bold ${g.green ? 'text-green-400' : 'text-white'}`}>{g.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payroll Cost */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-semibold text-sm">👥 Payroll Cost</h2>
              <span className="text-red-400 text-xs">+5%</span>
            </div>
            <p className="text-white text-2xl font-bold mb-3">₹1.8 Cr <span className="text-gray-500 text-sm font-normal">Total Payroll</span></p>
            <div className="space-y-2">
              {[
                { label: 'Basic Salary', value: '₹1.2 Cr' },
                { label: 'Overtime', value: '₹0.3 Cr' },
                { label: 'Benefits & PF', value: '₹0.2 Cr' },
                { label: 'Total Employees', value: '482' },
              ].map((p) => (
                <div key={p.label} className="flex justify-between py-1 border-b border-[#2a2a3a]">
                  <span className="text-gray-400 text-xs">{p.label}</span>
                  <span className="text-white text-xs font-bold">{p.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Anomalies */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-semibold text-sm">🚨 Financial Anomalies</h2>
              <button className="text-blue-400 text-xs hover:underline">View All</button>
            </div>
            <div className="space-y-2">
              {[
                { msg: 'Unusual expense: ₹4.8L (Vendor X)', time: '2 hours ago', level: 'high' },
                { msg: 'Duplicate payment detected', time: '5 hours ago', level: 'high' },
                { msg: 'GST mismatch in Invoice #INV-4421', time: '1 day ago', level: 'medium' },
                { msg: 'Cash flow may be tight next month', time: '1 day ago', level: 'medium' },
              ].map((a, i) => (
                <div key={i} className={`p-2 rounded-lg ${a.level === 'high' ? 'bg-red-500/10 border border-red-500/20' : 'bg-yellow-500/10 border border-yellow-500/20'}`}>
                  <p className={`text-xs ${a.level === 'high' ? 'text-red-300' : 'text-yellow-300'}`}>{a.msg}</p>
                  <p className="text-gray-600 text-xs">{a.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Center */}
          <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-semibold text-sm">🔍 Audit Center</h2>
              <button className="text-blue-400 text-xs hover:underline">View All</button>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Transactions Audit', issues: 0, color: 'text-green-400' },
                { label: 'Invoice Audit', issues: 2, color: 'text-red-400' },
                { label: 'GST Audit', issues: 0, color: 'text-green-400' },
                { label: 'Access Log', issues: 0, color: 'text-green-400' },
              ].map((a) => (
                <div key={a.label} className="flex items-center justify-between py-1.5 border-b border-[#2a2a3a]">
                  <span className="text-gray-400 text-xs">{a.label}</span>
                  <span className={`text-xs font-bold ${a.color}`}>
                    {a.issues === 0 ? '0 issues' : `${a.issues} issues`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* NEXUS AI Financial Analysis */}
        <div className="bg-[#13131a] border border-blue-500/30 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-sm">🧠</span>
            </div>
            <h2 className="text-white font-semibold">NEXUS AI — Financial Analysis</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              {[
                { icon: '🟢', text: 'Profit increased by 18% mainly due to higher sales and lower raw material costs.' },
                { icon: '🔴', text: 'Cash flow may face pressure in next quarter due to pending receivables.' },
                { icon: '🟡', text: '3 invoices from Supplier X are higher than usual (avg +42%).' },
                { icon: '🔵', text: 'Recommended: Review supplier contracts and accelerate receivables collection.' },
              ].map((insight, i) => (
                <div key={i} className="flex items-start gap-2 p-2 bg-[#1a1a2e] rounded-lg">
                  <span className="text-sm flex-shrink-0">{insight.icon}</span>
                  <p className="text-gray-300 text-xs">{insight.text}</p>
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-2 mb-3 flex-wrap">
                {['Ask a Question', 'Generate Report', 'Compare Periods', 'What-If Analysis'].map((btn) => (
                  <button key={btn} className="px-3 py-1.5 text-xs font-medium text-white rounded-lg border border-blue-500/30 hover:bg-blue-500/20 transition-all">
                    {btn}
                  </button>
                ))}
              </div>
              <div className="bg-[#1a1a2e] rounded-lg p-3 border border-[#2a2a3a]">
                <input
                  type="text"
                  placeholder="Ask NEXUS about your financial data..."
                  className="w-full bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none"
                />
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {['Why did expenses increase?', 'Show cash flow forecast', 'List overdue invoices', 'Generate GST report'].map((q) => (
                  <button key={q} className="text-xs text-blue-400 border border-blue-500/20 rounded-full px-2 py-1 hover:bg-blue-500/10 transition-all">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}