'use client'

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const expenseCategories = [
  { name: 'Raw Materials', value: 32, amount: '₹3.3 Cr', color: '#3b82f6', change: '+22%', up: false },
  { name: 'Salaries & Payroll', value: 18, amount: '₹1.85 Cr', color: '#8b5cf6', change: '+5%', up: false },
  { name: 'Utilities', value: 12, amount: '₹1.24 Cr', color: '#10b981', change: '+3%', up: false },
  { name: 'Marketing', value: 10, amount: '₹1.03 Cr', color: '#f59e0b', change: '-8%', up: true },
  { name: 'Admin & Overhead', value: 8, amount: '₹0.82 Cr', color: '#ef4444', change: '+1%', up: false },
  { name: 'Maintenance & Repair', value: 12, amount: '₹1.24 Cr', color: '#f97316', change: '+85%', up: false },
  { name: 'Others', value: 8, amount: '₹0.82 Cr', color: '#6b7280', change: '+2%', up: false },
]

const monthlyExpenses = [
  { month: 'Apr', amount: 7.8 },
  { month: 'May', amount: 8.2 },
  { month: 'Jun', amount: 9.1 },
  { month: 'Jul', amount: 8.9 },
  { month: 'Aug', amount: 9.8 },
  { month: 'Sep', amount: 10.3 },
]

export default function ExpensesPage() {
  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">💸 Expenses</h1>
        <p className="text-gray-400 text-sm mt-1">Track and analyze all business expenses by category.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Expenses', value: '₹10.3 Cr', sub: '+18% vs last month', color: 'text-red-400' },
          { label: 'Largest Category', value: 'Raw Materials', sub: '32% of total — up 22%', color: 'text-orange-400' },
          { label: 'Fastest Growing', value: 'Maintenance', sub: '+85% due to Machine #04', color: 'text-red-400' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">{kpi.label}</p>
            <p className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</p>
            <p className="text-gray-500 text-xs mt-0.5">{kpi.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
          <h2 className="text-white font-semibold mb-4">Expense Breakdown</h2>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={expenseCategories} cx={75} cy={75} innerRadius={45} outerRadius={70} dataKey="value">
                  {expenseCategories.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {expenseCategories.map((e) => (
                <div key={e.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: e.color }} />
                    <span className="text-gray-400 text-xs">{e.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-white text-xs font-bold">{e.amount}</span>
                    <span className={`text-xs ml-2 ${e.up ? 'text-green-400' : 'text-red-400'}`}>{e.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
          <h2 className="text-white font-semibold mb-4">Monthly Expense Trend</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyExpenses}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
              <XAxis dataKey="month" stroke="#444" tick={{ fill: '#666', fontSize: 11 }} />
              <YAxis stroke="#444" tick={{ fill: '#666', fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: '#13131a', border: '1px solid #2a2a3a', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
              <Bar dataKey="amount" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[#13131a] border border-orange-500/20 rounded-xl p-5">
        <h2 className="text-white font-semibold mb-3">🚨 Expense Alerts</h2>
        <div className="space-y-2">
          {[
            { msg: 'Maintenance costs up 85% — Machine #04 emergency repairs ₹18L', level: 'critical' },
            { msg: 'Raw material costs up 22% — Supplier X quality issues causing wastage', level: 'high' },
            { msg: 'Total expenses growing 18% vs revenue 12% — margin compression', level: 'high' },
          ].map((a, i) => (
            <div key={i} className={`flex gap-3 p-3 rounded-lg ${
              a.level === 'critical' ? 'bg-red-500/10 border border-red-500/20' : 'bg-orange-500/10 border border-orange-500/20'
            }`}>
              <span className={a.level === 'critical' ? 'text-red-400' : 'text-orange-400'}>⚠️</span>
              <p className="text-gray-300 text-sm">{a.msg}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}