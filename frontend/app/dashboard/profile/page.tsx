'use client'

import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase'

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    fullName: '', username: '', email: '', phone: '', role: '', joinDate: ''
  })
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [emailMsg, setEmailMsg] = useState('')
  const [showEmailChange, setShowEmailChange] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
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
          joinDate: new Date(user.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
        })
      }
      // Check for saved photo in localStorage
      const savedPhoto = localStorage.getItem('nexus_profile_photo')
      if (savedPhoto) setPhotoUrl(savedPhoto)
    })
  }, [])

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadLoading(true)
    const reader = new FileReader()
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      setPhotoUrl(dataUrl)
      localStorage.setItem('nexus_profile_photo', dataUrl)
      setUploadLoading(false)
    }
    reader.readAsDataURL(file)
  }

  const removePhoto = () => {
    setPhotoUrl(null)
    localStorage.removeItem('nexus_profile_photo')
  }

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

  const handleEmailChange = async () => {
    if (!newEmail || !newEmail.includes('@')) {
      setEmailMsg('Please enter a valid email address')
      return
    }
    const { error } = await supabase.auth.updateUser({ email: newEmail })
    if (error) {
      setEmailMsg(`Error: ${error.message}`)
    } else {
      setEmailMsg('✅ Verification email sent to new address. Please check your inbox.')
      setNewEmail('')
      setTimeout(() => { setEmailMsg(''); setShowEmailChange(false) }, 5000)
    }
  }

  const roleLabel = profile.role === 'ceo' ? '👑 CEO' :
    profile.role === 'ca' ? '💰 CA / Finance' :
    profile.role === 'manager' ? '🏭 Operations Manager' : '👤 Employee'

  const roleColor = profile.role === 'ceo' ? 'bg-yellow-500/20 text-yellow-400' :
    profile.role === 'ca' ? 'bg-green-500/20 text-green-400' :
    profile.role === 'manager' ? 'bg-blue-500/20 text-blue-400' :
    'bg-purple-500/20 text-purple-400'

  return (
    <div className="p-6 space-y-5 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">👤 My Profile</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your profile information and account settings.</p>
      </div>

      {saved && (
        <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm rounded-lg p-3">
          ✅ Profile updated successfully!
        </div>
      )}

      {/* Profile Photo + Basic Info */}
      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
        <div className="flex items-center gap-6">
          {/* Photo */}
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500/30">
              {photoUrl ? (
                <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-black text-white">
                  {profile.fullName?.[0] || 'U'}
                </div>
              )}
            </div>
            {uploadLoading && (
              <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
                <span className="text-white text-xs">...</span>
              </div>
            )}
          </div>

          {/* Info + Photo buttons */}
          <div className="flex-1">
            <h2 className="text-white text-xl font-bold">{profile.fullName || 'User'}</h2>
            <p className="text-gray-400 text-sm">@{profile.username}</p>
            <span className={`inline-block mt-1 px-3 py-1 text-xs rounded-full font-medium ${roleColor}`}>
              {roleLabel}
            </span>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => fileRef.current?.click()}
                className="px-3 py-1.5 text-xs font-bold text-white rounded-lg transition-all"
                style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}
              >
                📷 Upload Photo
              </button>
              {photoUrl && (
                <button
                  onClick={removePhoto}
                  className="px-3 py-1.5 text-xs font-medium text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-all"
                >
                  Remove Photo
                </button>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <p className="text-gray-600 text-xs mt-1">JPG, PNG or GIF. Max 5MB.</p>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold">Profile Information</h2>
          <button
            onClick={() => editing ? handleSave() : setEditing(true)}
            className="px-4 py-1.5 text-xs font-bold text-white rounded-lg transition-all"
            style={{ background: editing ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #1e90ff, #0052cc)' }}
          >
            {editing ? '✅ Save Changes' : '✏️ Edit Profile'}
          </button>
        </div>

        <div className="space-y-1">
          {[
            { label: 'Full Name', key: 'fullName', editable: true, icon: '👤' },
            { label: 'Username', key: 'username', editable: false, icon: '@' },
            { label: 'Phone', key: 'phone', editable: true, icon: '📱' },
            { label: 'Role', key: 'role', editable: false, icon: '🏷️', display: roleLabel },
            { label: 'Member Since', key: 'joinDate', editable: false, icon: '📅' },
          ].map((field) => (
            <div key={field.key} className="flex items-center gap-4 py-3 border-b border-[#2a2a3a] last:border-0">
              <span className="text-lg w-6 flex-shrink-0">{field.icon}</span>
              <label className="text-gray-400 text-sm w-28 flex-shrink-0">{field.label}</label>
              {editing && field.editable ? (
                <input
                  type="text"
                  value={profile[field.key as keyof typeof profile]}
                  onChange={(e) => setProfile(prev => ({ ...prev, [field.key]: e.target.value }))}
                  className="flex-1 bg-[#1a1a2e] border border-blue-500/30 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
              ) : (
                <span className="text-white text-sm flex-1">
                  {field.display || profile[field.key as keyof typeof profile] || '—'}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Email Management */}
      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
        <h2 className="text-white font-semibold mb-4">📧 Email Management</h2>

        {/* Current Email */}
        <div className="flex items-center justify-between p-3 bg-[#1a1a2e] rounded-lg border border-[#2a2a3a] mb-3">
          <div>
            <p className="text-gray-400 text-xs mb-0.5">Current Email</p>
            <p className="text-white text-sm font-medium">{profile.email || '—'}</p>
          </div>
          <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">Verified ✓</span>
        </div>

        {/* Change Email */}
        <button
          onClick={() => setShowEmailChange(!showEmailChange)}
          className="text-blue-400 text-sm hover:underline mb-3 block"
        >
          {showEmailChange ? '▲ Cancel' : '✏️ Change Email Address'}
        </button>

        {showEmailChange && (
          <div className="space-y-3 p-4 bg-[#1a1a2e] rounded-lg border border-blue-500/20">
            <p className="text-gray-400 text-xs">
              Enter your new email address. A verification link will be sent to confirm the change.
            </p>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="new@email.com"
              className="w-full bg-[#13131a] border border-[#2a2a3a] text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
            />
            {emailMsg && (
              <p className={`text-xs ${emailMsg.startsWith('✅') ? 'text-green-400' : 'text-red-400'}`}>
                {emailMsg}
              </p>
            )}
            <button
              onClick={handleEmailChange}
              className="w-full py-2.5 text-sm font-bold text-white rounded-lg transition-all"
              style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}
            >
              Send Verification Email
            </button>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Days Present', value: '21/22', color: 'text-green-400', icon: '📅' },
          { label: 'Leave Balance', value: '8 days', color: 'text-blue-400', icon: '🌴' },
          { label: 'Performance', value: '78%', color: 'text-purple-400', icon: '📈' },
        ].map((s) => (
          <div key={s.label} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-4 text-center">
            <span className="text-2xl">{s.icon}</span>
            <p className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}