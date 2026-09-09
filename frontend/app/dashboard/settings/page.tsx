'use client'

import { useState } from 'react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReport: true,
    criticalAlerts: true,
    darkMode: true,
    language: 'English',
    timezone: 'Asia/Kolkata',
    currency: 'INR',
  })

  const [saved, setSaved] = useState(false)

  const toggle = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
  }

  const save = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="p-6 space-y-5 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">⚙️ Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Customize your NEXUS Ω experience.</p>
      </div>

      {saved && (
        <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm rounded-lg p-3">
          ✅ Settings saved successfully!
        </div>
      )}

      {/* Notifications */}
      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
        <h2 className="text-white font-semibold mb-4">🔔 Notifications</h2>
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive alerts and reports via email' },
            { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser push notifications for critical alerts' },
            { key: 'weeklyReport', label: 'Weekly Report', desc: 'Get a weekly summary of your business performance' },
            { key: 'criticalAlerts', label: 'Critical Alerts Only', desc: 'Only notify for critical issues (reduces noise)' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-2 border-b border-[#2a2a3a] last:border-0">
              <div>
                <p className="text-white text-sm font-medium">{item.label}</p>
                <p className="text-gray-500 text-xs">{item.desc}</p>
              </div>
              <button
                onClick={() => toggle(item.key)}
                className={`relative w-12 h-6 rounded-full transition-all ${settings[item.key as keyof typeof settings] ? 'bg-blue-600' : 'bg-[#2a2a3a]'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings[item.key as keyof typeof settings] ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
        <h2 className="text-white font-semibold mb-4">🎨 Preferences</h2>
        <div className="space-y-4">
          {[
            { key: 'language', label: 'Language', options: ['English', 'Hindi', 'Marathi'] },
            { key: 'timezone', label: 'Timezone', options: ['Asia/Kolkata', 'Asia/Dubai', 'Europe/London', 'America/New_York'] },
            { key: 'currency', label: 'Currency', options: ['INR', 'USD', 'EUR', 'GBP'] },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-2 border-b border-[#2a2a3a] last:border-0">
              <p className="text-white text-sm font-medium">{item.label}</p>
              <select
                value={settings[item.key as keyof typeof settings] as string}
                onChange={(e) => setSettings(prev => ({ ...prev, [item.key]: e.target.value }))}
                className="bg-[#1a1a2e] border border-[#2a2a3a] text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none"
              >
                {item.options.map(o => <option key={o} value={o} style={{ background: '#13131a' }}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
        <h2 className="text-white font-semibold mb-4">🔐 Security</h2>
        <div className="space-y-3">
          <button className="w-full text-left px-4 py-3 bg-[#1a1a2e] rounded-lg text-gray-300 text-sm hover:text-white hover:bg-[#2a2a3e] transition-colors border border-[#2a2a3a]">
            🔑 Change Password
          </button>
          <button className="w-full text-left px-4 py-3 bg-[#1a1a2e] rounded-lg text-gray-300 text-sm hover:text-white hover:bg-[#2a2a3e] transition-colors border border-[#2a2a3a]">
            📱 Setup Two-Factor Authentication
          </button>
          <button className="w-full text-left px-4 py-3 bg-[#1a1a2e] rounded-lg text-gray-300 text-sm hover:text-white hover:bg-[#2a2a3e] transition-colors border border-[#2a2a3a]">
            📋 View Login History
          </button>
        </div>
      </div>

      <button
        onClick={save}
        className="w-full py-3 text-sm font-bold text-white rounded-xl transition-all"
        style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}
      >
        Save Settings
      </button>
    </div>
  )
}