'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import {
  LayoutDashboard,
  Shield,
  GitFork,
  Brain,
  Factory,
  DollarSign,
  TrendingUp,
  FlaskConical,
  Swords,
  Network,
  Settings,
  LogOut,
  Sparkles,
} from 'lucide-react'

const navItems = [
  { label: 'CEO Command Center', href: '/dashboard/ceo', icon: LayoutDashboard },
  { label: 'Decision Safety', href: '/dashboard/decision-safety', icon: Shield },
  { label: 'Contradictions', href: '/dashboard/contradictions', icon: GitFork },
  { label: 'AI Intelligence', href: '/dashboard/intelligence', icon: Brain },
  { label: 'Operations', href: '/dashboard/operations', icon: Factory },
  { label: 'Finance & CA', href: '/dashboard/finance', icon: DollarSign },
  { label: 'Sales', href: '/dashboard/sales', icon: TrendingUp },
  { label: 'Future Lab', href: '/dashboard/future-lab', icon: FlaskConical },
  { label: 'Decision Center', href: '/dashboard/decision-center', icon: Swords },
  { label: 'Digital Twin', href: '/dashboard/admin', icon: Network },
  { label: 'Admin', href: '/dashboard/admin', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <aside className="w-64 min-h-screen bg-[#0d0d14] border-r border-[#1e1e2e] flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[#1e1e2e]">
        <h1 className="text-2xl font-bold text-white">
          NEXUS <span className="text-purple-400">Ω</span>
        </h1>
        <p className="text-gray-500 text-xs tracking-widest mt-0.5">
          DISCOVER · CHALLENGE · IMPROVE
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href + item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                isActive
                  ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                  : 'text-gray-400 hover:bg-[#1a1a2e] hover:text-white'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Ask NEXUS Button */}
      <div className="p-4 border-t border-[#1e1e2e]">
        <button className="w-full flex items-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-400 rounded-lg px-3 py-2.5 text-sm transition-all">
          <Sparkles size={16} />
          Ask NEXUS
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 text-gray-500 hover:text-red-400 rounded-lg px-3 py-2.5 text-sm transition-all mt-2"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  )
}