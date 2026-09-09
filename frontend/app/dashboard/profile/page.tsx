'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    fullName: '', username: '', email: '', phone: '', role: '', joinDate: 'Jan 2020'
  })
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: sessionData }) => {
      const user = sessionData.session?.user
      if (!user) return
      const { data: p } = await supabase
        .from('profiles').select('*').eq('id', user.id).single()
      if (p) {
        setProfile({
          fullName: p.full_name || '',
          username: p.username || '',
          email: p.email || user.email || '',
          phone: p.phone || '',
          role: p.role || '',
          joinDate: new Date(user.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
        })
      }
    })
  }, [])

  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('profiles').update({
      full_name: profile.fullName,
      phone: profile.phone,
    }).eq('id', user.id)
    setSaved(true)
    setEditing(false)
    setTimeout(() => setSaved(false), 3000)
  }

  const roleLabel = profile.role === 'ceo' ? 'CEO' :
    profile.role === 'ca' ? 'CA / Finance' :
    profile.role === 'manager' ? 'Operations Manager' : 'Employee'

  return (
    <div className="p-6 space-y-5 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">👤 My Profile</h1>
        <p className="text-gray-400 text-sm mt-1">View and update your profile information.</p>
      </div>

      {saved && (
        <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm rounded-lg p-3">
          ✅ Profile updated successfully!
        </div>
      )}

      {/* Avatar */}
      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-black text-white">
            {profile.fullName?.[0] || 'U'}
          </div>
          <div>
            <h2 className="text-white text-xl font-bold">{profile.fullName || 'User'}</h2>
            <p className="text-gray-400 text-sm">@{profile.username}</p>
            <span className="inline-block mt-1 px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full font-medium">
              {roleLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-white font-semibold">Profile Information</h2>
          <button
            onClick={() => editing ? handleSave() : setEditing(true)}
            className="px-4 py-1.5 text-xs font-bold text-white rounded-lg transition-all"
            style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}
          >
            {editing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        {[
          { label: 'Full Name', key: 'fullName', editable: true },
          { label: 'Username', key: 'username', editable: false },
          { label: 'Email', key: 'email', editable: false },
          { label: 'Phone', key: 'phone', editable: true },
          { label: 'Role', key: 'role', editable: false, display: roleLabel },
          { label: 'Member Since', key: 'joinDate', editable: false },
        ].map((field) => (
          <div key={field.key} className="flex items-center gap-4 py-3 border-b border-[#2a2a3a] last:border-0">
            <label className="text-gray-400 text-sm w-32 flex-shrink-0">{field.label}</label>
            {editing && field.editable ? (
              <input
                type="text"
                value={profile[field.key as keyof typeof profile]}
                onChange={(e) => setProfile(prev => ({ ...prev, [field.key]: e.target.value }))}
                className="flex-1 bg-[#1a1a2e] border border-blue-500/30 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
            ) : (
              <span className="text-white text-sm">{field.display || profile[field.key as keyof typeof profile] || '—'}</span>
            )}
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Days Present', value: '21/22', color: 'text-green-400' },
          { label: 'Leave Balance', value: '8 days', color: 'text-blue-400' },
          { label: 'Performance Score', value: '78%', color: 'text-purple-400' },
        ].map((s) => (
          <div key={s.label} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-4 text-center">
            <p className="text-gray-400 text-xs mb-1">{s.label}</p>
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}