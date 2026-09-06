'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { Bell, Search } from 'lucide-react'

export default function Topbar() {
  const [userName, setUserName] = useState('User')
  const [userRole, setUserRole] = useState('CEO')
  const [time, setTime] = useState('')
  const supabase = createClient()

    useEffect(() => {
    // Read from localStorage first (set on login)
    const stored = localStorage.getItem('nexus_user')
    if (stored) {
      const parsed = JSON.parse(stored)
      setUserName(parsed.name?.split(' ')[0] || 'User')
      const role = parsed.role
      setUserRole(
        role === 'ceo' ? 'CEO' :
        role === 'ca' ? 'CA / Finance' :
        role === 'manager' ? 'Operations Manager' : 'Employee'
      )
    } else {
      // Fallback to Supabase metadata
    const stored = localStorage.getItem('nexus_user')
    if (stored) {
      const parsed = JSON.parse(stored)
      setUserName(parsed.name?.split(' ')[0] || 'User')
      const role = parsed.role
      setUserRole(
        role === 'ceo' ? 'CEO' :
        role === 'ca' ? 'CA / Finance' :
        role === 'manager' ? 'Operations Manager' : 'Employee'
      )
    }
    }

    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleDateString('en-IN', {
        weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
      }))
    }
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="h-14 flex items-center justify-between px-6 border-b border-[#1e1e2e]"
      style={{ background: 'rgba(10,10,20,0.95)' }}
    >
      {/* Search */}
      <div className="flex items-center gap-2 bg-[#13131a] border border-[#2a2a3a] rounded-lg px-3 py-2 w-80">
        <Search size={14} className="text-gray-500" />
        <span className="text-gray-500 text-sm">Ask NEXUS or search anything...</span>
        <span className="ml-auto text-gray-600 text-xs">Ctrl + K</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Date */}
        <span className="text-gray-500 text-xs">{time}</span>

        {/* Notifications */}
        <div className="relative cursor-pointer">
          <Bell size={18} className="text-gray-400 hover:text-white transition-colors" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">3</span>
          </div>
        </div>

        {/* User */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">{userName[0]}</span>
          </div>
          <div>
            <p className="text-white text-xs font-medium">{userName}</p>
            <p className="text-gray-500 text-xs">{userRole}</p>
          </div>
        </div>
      </div>
    </div>
  )
}