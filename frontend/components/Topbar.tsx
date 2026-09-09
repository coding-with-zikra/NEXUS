'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Bell, Search, LogOut, User, Settings } from 'lucide-react'

const SEARCH_ITEMS = [
  { label: 'CEO Dashboard', href: '/dashboard/ceo', icon: '👑' },
  { label: 'Decision Contradiction Engine', href: '/dashboard/contradictions', icon: '🧩' },
  { label: 'Decision Safety Gate', href: '/dashboard/decision-safety', icon: '🛡️' },
  { label: 'Root Cause Analysis', href: '/dashboard/intelligence/root-cause', icon: '🔍' },
  { label: 'Ask NEXUS', href: '/dashboard/intelligence/ask-nexus', icon: '🧠' },
  { label: 'Future Lab', href: '/dashboard/future-lab', icon: '🔮' },
  { label: 'Decision Center', href: '/dashboard/decision-center', icon: '⚔️' },
  { label: 'Digital Twin', href: '/dashboard/digital-twin', icon: '🌐' },
  { label: 'Blind Spot Discovery', href: '/dashboard/intelligence/blind-spots', icon: '👁️' },
  { label: 'Finance Dashboard', href: '/dashboard/finance', icon: '💰' },
  { label: 'Sales Dashboard', href: '/dashboard/sales', icon: '📈' },
  { label: 'Operations Dashboard', href: '/dashboard/operations', icon: '🏭' },
  { label: 'Employees', href: '/dashboard/hr/employees', icon: '👥' },
  { label: 'Attendance', href: '/dashboard/hr/attendance', icon: '🕐' },
  { label: 'Leave Management', href: '/dashboard/hr/leave', icon: '🌴' },
  { label: 'Salary', href: '/dashboard/hr/salary', icon: '💵' },
  { label: 'Inventory', href: '/dashboard/operations/inventory', icon: '📦' },
  { label: 'Suppliers', href: '/dashboard/operations/suppliers', icon: '🚚' },
  { label: 'Machines', href: '/dashboard/operations/machines', icon: '⚙️' },
  { label: 'Critical Alerts', href: '/dashboard/alerts', icon: '🚨' },
  { label: 'Decision Memory', href: '/dashboard/decision-memory', icon: '🧠' },
  { label: 'Customers', href: '/dashboard/sales/customers', icon: '👥' },
  { label: 'Products', href: '/dashboard/sales/products', icon: '📦' },
  { label: 'Sales Forecast', href: '/dashboard/sales/forecast', icon: '📊' },
]

const NOTIFICATIONS = [
  { id: 1, msg: 'Machine #04 downtime critical', time: '2 hrs ago', level: 'critical', read: false },
  { id: 2, msg: 'Supplier X delayed delivery again', time: '4 hrs ago', level: 'high', read: false },
  { id: 3, msg: 'Cash flow warning for next quarter', time: '6 hrs ago', level: 'high', read: false },
  { id: 4, msg: 'New leave request from Rohan Patel', time: '1 day ago', level: 'medium', read: true },
  { id: 5, msg: 'Sales target achieved for September', time: '2 days ago', level: 'low', read: true },
]

export default function Topbar() {
  const router = useRouter()
  const supabase = createClient()
  const [userName, setUserName] = useState('User')
  const [userRole, setUserRole] = useState('CEO')
  const [time, setTime] = useState('')
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [notifications, setNotifications] = useState(NOTIFICATIONS)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: sessionData }) => {
      const user = sessionData.session?.user
      if (!user) return
      const meta = user.user_metadata
      const name = meta?.full_name?.split(' ')[0]
      if (name) { setUserName(name); return }
      const { data: profile } = await supabase
        .from('profiles').select('full_name, role').eq('id', user.id).single()
      if (profile?.full_name) setUserName(profile.full_name.split(' ')[0])
      const role = meta?.role || profile?.role || 'employee'
      setUserRole(
        role === 'ceo' ? 'CEO' :
        role === 'ca' ? 'CA / Finance' :
        role === 'manager' ? 'Operations Manager' : 'Employee'
      )
    })

    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }))
    }
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  const filteredSearch = search.length > 0
    ? SEARCH_ITEMS.filter(item => item.label.toLowerCase().includes(search.toLowerCase()))
    : []

  const unreadCount = notifications.filter(n => !n.read).length

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })))

  return (
    <div className="h-14 flex items-center justify-between px-6 border-b border-[#1e1e2e] relative z-50"
      style={{ background: 'rgba(10,10,20,0.97)' }}>

      {/* Search */}
      <div className="relative" ref={searchRef}>
        <div
          className="flex items-center gap-2 bg-[#13131a] border border-[#2a2a3a] rounded-lg px-3 py-2 w-80 cursor-text hover:border-blue-500/50 transition-all"
          onClick={() => setShowSearch(true)}
        >
          <Search size={14} className="text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setShowSearch(true)}
            placeholder="Ask NEXUS or search anything..."
            className="bg-transparent text-gray-400 text-sm focus:outline-none flex-1 placeholder-gray-600"
          />
          <span className="text-gray-600 text-xs">Ctrl+K</span>
        </div>

        {/* Search Results */}
        {showSearch && filteredSearch.length > 0 && (
          <div className="absolute top-12 left-0 w-80 bg-[#13131a] border border-[#2a2a3a] rounded-xl shadow-2xl overflow-hidden z-50">
            {filteredSearch.slice(0, 8).map((item) => (
              <div
                key={item.href}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#1a1a2e] cursor-pointer transition-colors border-b border-[#2a2a3a] last:border-0"
                onClick={() => { router.push(item.href); setShowSearch(false); setSearch('') }}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-gray-300 text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        )}

        {showSearch && search.length === 0 && (
          <div className="absolute top-12 left-0 w-80 bg-[#13131a] border border-[#2a2a3a] rounded-xl shadow-2xl p-4 z-50">
            <p className="text-gray-500 text-xs mb-3">Quick navigation</p>
            <div className="grid grid-cols-2 gap-2">
              {SEARCH_ITEMS.slice(0, 6).map((item) => (
                <div
                  key={item.href}
                  className="flex items-center gap-2 p-2 hover:bg-[#1a1a2e] rounded-lg cursor-pointer"
                  onClick={() => { router.push(item.href); setShowSearch(false) }}
                >
                  <span>{item.icon}</span>
                  <span className="text-gray-400 text-xs">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {showSearch && (
        <div className="fixed inset-0 z-40" onClick={() => { setShowSearch(false); setSearch('') }} />
      )}

      {/* Right */}
      <div className="flex items-center gap-4">
        <span className="text-gray-500 text-xs">{time}</span>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false) }}
            className="relative cursor-pointer p-1"
          >
            <Bell size={18} className="text-gray-400 hover:text-white transition-colors" />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{unreadCount}</span>
              </div>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-10 w-80 bg-[#13131a] border border-[#2a2a3a] rounded-xl shadow-2xl z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2a3a]">
                <h3 className="text-white font-semibold text-sm">Notifications</h3>
                <button onClick={markAllRead} className="text-blue-400 text-xs hover:underline">Mark all read</button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className={`flex items-start gap-3 px-4 py-3 border-b border-[#2a2a3a] last:border-0 ${!n.read ? 'bg-blue-500/5' : ''}`}>
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      n.level === 'critical' ? 'bg-red-400' :
                      n.level === 'high' ? 'bg-orange-400' :
                      n.level === 'medium' ? 'bg-yellow-400' : 'bg-blue-400'
                    }`} />
                    <div className="flex-1">
                      <p className={`text-xs ${!n.read ? 'text-white' : 'text-gray-400'}`}>{n.msg}</p>
                      <p className="text-gray-600 text-xs mt-0.5">{n.time}</p>
                    </div>
                    {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />}
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-[#2a2a3a]">
                <button
                  onClick={() => { router.push('/dashboard/alerts'); setShowNotifications(false) }}
                  className="text-blue-400 text-xs hover:underline"
                >
                  View all alerts →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false) }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">{userName[0]}</span>
            </div>
            <div className="text-left">
              <p className="text-white text-xs font-medium">{userName}</p>
              <p className="text-gray-500 text-xs">{userRole}</p>
            </div>
          </button>

          {showProfile && (
            <div className="absolute right-0 top-12 w-56 bg-[#13131a] border border-[#2a2a3a] rounded-xl shadow-2xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-[#2a2a3a]">
                <p className="text-white font-medium text-sm">{userName}</p>
                <p className="text-gray-500 text-xs">{userRole}</p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => { router.push('/dashboard/profile'); setShowProfile(false) }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-[#1a1a2e] transition-colors text-sm"
                >
                  <User size={14} />
                  My Profile
                </button>
                <button
                  onClick={() => { router.push('/dashboard/settings'); setShowProfile(false) }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-[#1a1a2e] transition-colors text-sm"
                >
                  <Settings size={14} />
                  Settings
                </button>
                <div className="border-t border-[#2a2a3a] mt-1 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-red-500/10 transition-colors text-sm"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showNotifications || showProfile) && (
        <div className="fixed inset-0 z-40" onClick={() => { setShowNotifications(false); setShowProfile(false) }} />
      )}
    </div>
  )
}