'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import {
  LayoutDashboard, Brain, Factory, DollarSign,
  TrendingUp, Users, FlaskConical, Swords,
  Network, BookOpen, Settings, LogOut,
  Sparkles, ChevronDown, ChevronRight, Bell,
  FileText, CreditCard, Calculator, AlertTriangle,
  Search, BarChart3,
} from 'lucide-react'
import { useState, useEffect } from 'react'

const ceoNav = [
  {
    label: '👑 Executive Overview', icon: LayoutDashboard, children: [
      { label: 'Company Health Score', href: '/dashboard/ceo' },
      { label: 'Overall Risk Level', href: '/dashboard/ceo' },
      { label: 'AI Executive Summary', href: '/dashboard/ceo' },
    ]
  },
  {
    label: '💰 Financial Snapshot', icon: DollarSign, children: [
      { label: 'Revenue', href: '/dashboard/finance' },
      { label: 'Profit', href: '/dashboard/finance' },
      { label: 'Cash', href: '/dashboard/finance' },
      { label: 'Expenses', href: '/dashboard/finance' },
    ]
  },
  {
    label: '📈 Sales Performance', icon: TrendingUp, children: [
      { label: 'Revenue Trend', href: '/dashboard/sales' },
      { label: 'Orders', href: '/dashboard/sales' },
      { label: 'Conversion', href: '/dashboard/sales' },
      { label: 'Sales Forecast', href: '/dashboard/sales/forecast' },
    ]
  },
  {
    label: '🏭 Operations', icon: Factory, children: [
      { label: 'Production Status', href: '/dashboard/operations' },
      { label: 'Machine Health', href: '/dashboard/operations/machines' },
      { label: 'Downtime', href: '/dashboard/operations' },
      { label: 'Wastage', href: '/dashboard/operations' },
    ]
  },
  {
    label: '📦 Inventory', icon: BookOpen, children: [
      { label: 'Current Stock', href: '/dashboard/operations/inventory' },
      { label: 'Low Stock', href: '/dashboard/operations/inventory' },
      { label: 'Overstock', href: '/dashboard/operations/inventory' },
      { label: 'Inventory Risk', href: '/dashboard/operations/inventory' },
    ]
  },
  {
    label: '👥 Workforce', icon: Users, children: [
      { label: 'Employees', href: '/dashboard/hr/employees' },
      { label: 'Attendance', href: '/dashboard/hr/attendance' },
      { label: 'Payroll', href: '/dashboard/hr/salary' },
      { label: 'Overtime Cost', href: '/dashboard/hr/overtime' },
    ]
  },
  {
    label: '🚚 Supplier Risk', icon: Network, children: [
      { label: 'Delayed Suppliers', href: '/dashboard/operations/suppliers' },
      { label: 'Supplier Reliability', href: '/dashboard/operations/suppliers' },
      { label: 'Supply Risk', href: '/dashboard/operations/suppliers' },
    ]
  },
  {
    label: '🧠 AI Intelligence', icon: Brain, children: [
      { label: 'Decision Safety Gate', href: '/dashboard/decision-safety' },
      { label: 'Contradiction Engine', href: '/dashboard/contradictions' },
      { label: 'Blind-Spot Discovery', href: '/dashboard/intelligence/blind-spots' },
      { label: 'Root-Cause Analysis', href: '/dashboard/intelligence/root-cause' },
      { label: 'Ask NEXUS', href: '/dashboard/intelligence/ask-nexus' },
    ]
  },
  {
    label: '🔮 Future Intelligence', icon: FlaskConical, children: [
      { label: 'Future Simulator', href: '/dashboard/future-lab' },
      { label: 'What-If Analysis', href: '/dashboard/future-lab/simulator' },
      { label: 'Black-Swan Stress Test', href: '/dashboard/future-lab/stress-test' },
    ]
  },
  {
    label: '⚔️ Decision Center', icon: Swords, children: [
      { label: 'Decision Challenger', href: '/dashboard/decision-center' },
      { label: 'Strategy Comparison', href: '/dashboard/decision-center/strategy' },
      { label: 'Approval Center', href: '/dashboard/decision-center/approval' },
    ]
  },
  { label: '🌐 Digital Twin', href: '/dashboard/digital-twin', icon: Network },
  { label: '🚨 Critical Alerts', href: '/dashboard/alerts', icon: Bell },
  { label: '🧠 Decision Memory', href: '/dashboard/decision-memory', icon: BookOpen },
  {
    label: '⚙️ Admin', icon: Settings, children: [
      { label: 'Users', href: '/dashboard/admin/users' },
      { label: 'Roles & Permissions', href: '/dashboard/admin/roles' },
      { label: 'Audit Logs', href: '/dashboard/admin/audit' },
    ]
  },
]

const caNav = [
  {
    label: '💰 Financial Overview', icon: DollarSign, children: [
      { label: 'Revenue', href: '/dashboard/finance' },
      { label: 'Expenses', href: '/dashboard/finance' },
      { label: 'Net Profit', href: '/dashboard/finance' },
      { label: 'Cash Balance', href: '/dashboard/finance' },
      { label: 'Financial Health', href: '/dashboard/finance' },
    ]
  },
  {
    label: '📊 Statements', icon: BarChart3, children: [
      { label: 'P&L Statement', href: '/dashboard/finance' },
      { label: 'Cash Flow', href: '/dashboard/finance/cashflow' },
      { label: 'Balance Sheet', href: '/dashboard/finance' },
      { label: 'Revenue', href: '/dashboard/finance' },
      { label: 'Expenses', href: '/dashboard/finance/expenses' },
    ]
  },
  {
    label: '🧾 Invoices', icon: FileText, children: [
      { label: 'Pending', href: '/dashboard/finance/invoices' },
      { label: 'Paid', href: '/dashboard/finance/invoices' },
      { label: 'Overdue', href: '/dashboard/finance/invoices' },
      { label: 'Invoice Tracking', href: '/dashboard/finance/invoices' },
    ]
  },
  {
    label: '💳 Payments', icon: CreditCard, children: [
      { label: 'Receivables', href: '/dashboard/finance' },
      { label: 'Payables', href: '/dashboard/finance' },
      { label: 'Payment Status', href: '/dashboard/finance' },
    ]
  },
  {
    label: '🧮 GST / Tax', icon: Calculator, children: [
      { label: 'GST Collected', href: '/dashboard/finance/gst' },
      { label: 'GST Payable', href: '/dashboard/finance/gst' },
      { label: 'Tax Liability', href: '/dashboard/finance/gst' },
      { label: 'Filing Status', href: '/dashboard/finance/gst' },
    ]
  },
  {
    label: '👥 Payroll Cost', icon: Users, children: [
      { label: 'Total Payroll', href: '/dashboard/hr/salary' },
      { label: 'Overtime Cost', href: '/dashboard/hr/overtime' },
      { label: 'Department-wise Cost', href: '/dashboard/hr/salary' },
    ]
  },
  { label: '📊 Budget vs Actual', href: '/dashboard/finance', icon: BarChart3 },
  {
    label: '🚨 Financial Anomalies', icon: AlertTriangle, children: [
      { label: 'Unusual Expenses', href: '/dashboard/finance' },
      { label: 'Duplicate Payments', href: '/dashboard/finance' },
      { label: 'Suspicious Transactions', href: '/dashboard/finance' },
      { label: 'Cash-Flow Warnings', href: '/dashboard/finance' },
    ]
  },
  {
    label: '🔍 Audit Center', icon: Search, children: [
      { label: 'Transaction Audit', href: '/dashboard/finance/audit' },
      { label: 'Invoice Audit', href: '/dashboard/finance/audit' },
      { label: 'GST Audit', href: '/dashboard/finance/audit' },
      { label: 'Audit Trail', href: '/dashboard/finance/audit' },
    ]
  },
  {
    label: '🧠 AI Financial Analysis', icon: Brain, children: [
      { label: 'Why did profit change?', href: '/dashboard/intelligence/root-cause' },
      { label: 'Expense Risk', href: '/dashboard/intelligence/blind-spots' },
      { label: 'Cash Forecast', href: '/dashboard/future-lab' },
      { label: 'Financial Recommendations', href: '/dashboard/intelligence/ask-nexus' },
    ]
  },
  {
    label: '📄 Financial Reports', icon: FileText, children: [
      { label: 'P&L Report', href: '/dashboard/finance' },
      { label: 'Balance Sheet', href: '/dashboard/finance' },
      { label: 'Cash Flow Report', href: '/dashboard/finance/cashflow' },
      { label: 'GST Report', href: '/dashboard/finance/gst' },
      { label: 'Export', href: '/dashboard/finance' },
    ]
  },
]

const managerNav = [
  {
    label: '📊 Manager Overview', icon: LayoutDashboard, children: [
      { label: 'My Department Overview', href: '/dashboard/operations' },
      { label: "Today's Tasks", href: '/dashboard/operations' },
      { label: 'Team Performance', href: '/dashboard/operations' },
      { label: 'Department Health', href: '/dashboard/operations' },
      { label: 'Critical Issues', href: '/dashboard/operations' },
    ]
  },
  {
    label: '👥 Team Management', icon: Users, children: [
      { label: 'Team Members', href: '/dashboard/hr/employees' },
      { label: 'Attendance', href: '/dashboard/hr/attendance' },
      { label: 'Leave', href: '/dashboard/hr/leave' },
      { label: 'Overtime', href: '/dashboard/hr/overtime' },
      { label: 'Workload', href: '/dashboard/hr/employees' },
      { label: 'Performance', href: '/dashboard/hr/employees' },
    ]
  },
  {
    label: '🏭 Production / Operations', icon: Factory, children: [
      { label: 'Production Status', href: '/dashboard/operations' },
      { label: 'Production Output', href: '/dashboard/operations' },
      { label: 'Machine Health', href: '/dashboard/operations/machines' },
      { label: 'Downtime', href: '/dashboard/operations' },
      { label: 'Wastage', href: '/dashboard/operations' },
      { label: 'Efficiency', href: '/dashboard/operations' },
    ]
  },
  {
    label: '📦 Inventory', icon: BookOpen, children: [
      { label: 'Current Stock', href: '/dashboard/operations/inventory' },
      { label: 'Low Stock', href: '/dashboard/operations/inventory' },
      { label: 'Overstock', href: '/dashboard/operations/inventory' },
      { label: 'Stock Movement', href: '/dashboard/operations/inventory' },
      { label: 'Inventory Alerts', href: '/dashboard/operations/inventory' },
    ]
  },
  {
    label: '📈 Sales', icon: TrendingUp, children: [
      { label: 'Sales Performance', href: '/dashboard/sales' },
      { label: 'Orders', href: '/dashboard/sales' },
      { label: 'Targets', href: '/dashboard/sales' },
      { label: 'Customer Status', href: '/dashboard/sales/customers' },
      { label: 'Sales Forecast', href: '/dashboard/sales/forecast' },
    ]
  },
  {
    label: '🚚 Suppliers', icon: Network, children: [
      { label: 'Supplier Status', href: '/dashboard/operations/suppliers' },
      { label: 'Pending Deliveries', href: '/dashboard/operations/suppliers' },
      { label: 'Delays', href: '/dashboard/operations/suppliers' },
      { label: 'Supplier Performance', href: '/dashboard/operations/suppliers' },
    ]
  },
  {
    label: '💰 Department Expenses', icon: DollarSign, children: [
      { label: 'Expenses', href: '/dashboard/finance' },
      { label: 'Budget', href: '/dashboard/finance' },
      { label: 'Budget vs Actual', href: '/dashboard/finance' },
      { label: 'Cost Analysis', href: '/dashboard/finance' },
    ]
  },
  {
    label: '🧠 AI Intelligence', icon: Brain, children: [
      { label: 'AI Problems Detected', href: '/dashboard/intelligence/blind-spots' },
      { label: 'Root Cause Analysis', href: '/dashboard/intelligence/root-cause' },
      { label: 'Decision Safety Gate', href: '/dashboard/decision-safety' },
      { label: 'Blind-Spot Discovery', href: '/dashboard/intelligence/blind-spots' },
      { label: 'Ask NEXUS', href: '/dashboard/intelligence/ask-nexus' },
    ]
  },
  {
    label: '🔮 Future Lab', icon: FlaskConical, children: [
      { label: 'What-If Simulation', href: '/dashboard/future-lab' },
      { label: 'Production Forecast', href: '/dashboard/future-lab/simulator' },
      { label: 'Risk Simulation', href: '/dashboard/future-lab/stress-test' },
    ]
  },
  {
    label: '📄 Team Reports', icon: FileText, children: [
      { label: 'Daily Report', href: '/dashboard/operations' },
      { label: 'Weekly Report', href: '/dashboard/operations' },
      { label: 'Performance Report', href: '/dashboard/operations' },
      { label: 'Export', href: '/dashboard/operations' },
    ]
  },
]

const employeeNav = [
  {
    label: '🏠 My Dashboard', icon: LayoutDashboard, children: [
      { label: 'Welcome / Profile', href: '/dashboard/employee' },
      { label: "Today's Status", href: '/dashboard/employee' },
      { label: 'Attendance Summary', href: '/dashboard/employee' },
      { label: 'Leave Balance', href: '/dashboard/employee' },
      { label: 'Next Salary', href: '/dashboard/employee' },
    ]
  },
  {
    label: '🕐 Attendance', icon: BookOpen, children: [
      { label: "Today's Attendance", href: '/dashboard/hr/attendance' },
      { label: 'Check In / Check Out', href: '/dashboard/hr/attendance' },
      { label: 'Attendance History', href: '/dashboard/hr/attendance' },
      { label: 'Late / Early Records', href: '/dashboard/hr/attendance' },
      { label: 'Monthly Attendance', href: '/dashboard/hr/attendance' },
    ]
  },
  {
    label: '🌴 Leave', icon: FlaskConical, children: [
      { label: 'Leave Balance', href: '/dashboard/hr/leave' },
      { label: 'Apply for Leave', href: '/dashboard/hr/leave' },
      { label: 'My Leave Requests', href: '/dashboard/hr/leave' },
      { label: 'Leave History', href: '/dashboard/hr/leave' },
    ]
  },
  {
    label: '📋 My Tasks', icon: FileText, children: [
      { label: 'Assigned Tasks', href: '/dashboard/employee' },
      { label: 'Pending', href: '/dashboard/employee' },
      { label: 'In Progress', href: '/dashboard/employee' },
      { label: 'Completed', href: '/dashboard/employee' },
    ]
  },
  {
    label: '💰 Salary', icon: DollarSign, children: [
      { label: 'Salary Details', href: '/dashboard/hr/salary' },
      { label: 'Earnings', href: '/dashboard/hr/salary' },
      { label: 'Deductions', href: '/dashboard/hr/salary' },
      { label: 'Overtime', href: '/dashboard/hr/overtime' },
      { label: 'Net Salary', href: '/dashboard/hr/salary' },
    ]
  },
  {
    label: '📄 Payslips', icon: FileText, children: [
      { label: 'Current Payslip', href: '/dashboard/hr/payslips' },
      { label: 'Previous Payslips', href: '/dashboard/hr/payslips' },
      { label: 'Download Payslip', href: '/dashboard/hr/payslips' },
    ]
  },
  {
    label: '⏱️ Overtime', icon: BookOpen, children: [
      { label: 'Overtime Hours', href: '/dashboard/hr/overtime' },
      { label: 'Overtime Requests', href: '/dashboard/hr/overtime' },
      { label: 'Overtime Payment', href: '/dashboard/hr/overtime' },
    ]
  },
  {
    label: '📅 Holidays', icon: BookOpen, children: [
      { label: 'Company Holidays', href: '/dashboard/employee' },
      { label: 'Upcoming Holidays', href: '/dashboard/employee' },
    ]
  },
  {
    label: '📈 Performance', icon: TrendingUp, children: [
      { label: 'Goals', href: '/dashboard/employee' },
      { label: 'Performance Score', href: '/dashboard/employee' },
      { label: 'Manager Feedback', href: '/dashboard/employee' },
      { label: 'Performance History', href: '/dashboard/employee' },
    ]
  },
  {
    label: '🔔 Notifications', icon: Bell, children: [
      { label: 'Leave Updates', href: '/dashboard/employee' },
      { label: 'Salary Updates', href: '/dashboard/employee' },
      { label: 'Task Notifications', href: '/dashboard/employee' },
      { label: 'Company Announcements', href: '/dashboard/employee' },
    ]
  },
  {
    label: '🧠 Ask NEXUS', icon: Brain, children: [
      { label: 'Ask About Attendance', href: '/dashboard/intelligence/ask-nexus' },
      { label: 'Ask About Salary', href: '/dashboard/intelligence/ask-nexus' },
      { label: 'Ask About Leave', href: '/dashboard/intelligence/ask-nexus' },
      { label: 'Ask About Tasks', href: '/dashboard/intelligence/ask-nexus' },
    ]
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [expanded, setExpanded] = useState<string[]>([])
  const [userRole, setUserRole] = useState<string>('ceo')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const role = data.user?.user_metadata?.role || 'employee'
      setUserRole(role)
      if (role === 'ceo') setExpanded(['👑 Executive Overview', '🧠 AI Intelligence'])
      else if (role === 'ca') setExpanded(['💰 Financial Overview', '🧾 Invoices'])
      else if (role === 'manager') setExpanded(['🏭 Operations'])
      else setExpanded(['🏠 My Dashboard', '🕐 Attendance'])
    })
  }, [])

  const navItems = userRole === 'ceo' ? ceoNav :
    userRole === 'ca' ? caNav :
    userRole === 'manager' ? managerNav :
    employeeNav

  const toggleExpand = (label: string) => {
    setExpanded(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    )
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const roleLabel = userRole === 'ceo' ? '👑 CEO' :
    userRole === 'ca' ? '💰 CA / Finance' :
    userRole === 'manager' ? '🏭 Manager' : '👤 Employee'

  return (
    <aside className="w-64 min-h-screen bg-[#0d0d14] border-r border-[#1e1e2e] flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b border-[#1e1e2e]">
        <h1 className="text-xl font-bold text-white">
          NE<span className="text-blue-400">X</span>US <span className="text-blue-400">Ω</span>
        </h1>
        <p className="text-gray-500 text-xs tracking-widest mt-0.5">
          DISCOVER · CHALLENGE · IMPROVE
        </p>
        <div className="mt-2 px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg inline-block">
          <span className="text-blue-400 text-xs font-medium">{roleLabel}</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item: any) => {
          const Icon = item.icon
          const isExpanded = expanded.includes(item.label)

          if (item.children) {
            const isAnyChildActive = item.children.some((c: any) => pathname === c.href)
            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleExpand(item.label)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all ${
                    isAnyChildActive
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-gray-400 hover:bg-[#1a1a2e] hover:text-white'
                  }`}
                >
                  <Icon size={14} />
                  <span className="flex-1 text-left font-medium">{item.label}</span>
                  {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                </button>
                {isExpanded && (
                  <div className="ml-6 mt-0.5 space-y-0.5 mb-1">
                    {item.children.map((child: any) => (
                      <Link
                        key={child.href + child.label}
                        href={child.href}
                        className={`block px-3 py-1.5 rounded-lg text-xs transition-all ${
                          pathname === child.href
                            ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                            : 'text-gray-500 hover:bg-[#1a1a2e] hover:text-white'
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          }

          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href!}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all ${
                isActive
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'text-gray-400 hover:bg-[#1a1a2e] hover:text-white'
              }`}
            >
              <Icon size={14} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Ask NEXUS + Logout */}
      <div className="p-3 border-t border-[#1e1e2e]">
        <Link
          href="/dashboard/intelligence/ask-nexus"
          className="w-full flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 rounded-lg px-3 py-2 text-xs transition-all"
        >
          <Sparkles size={14} />
          Ask NEXUS
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 text-gray-500 hover:text-red-400 rounded-lg px-3 py-2 text-xs transition-all mt-1"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </aside>
  )
}