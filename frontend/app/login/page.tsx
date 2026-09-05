'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async () => {
    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // Get user role from metadata
    const role = data.user?.user_metadata?.role || 'manager'

    if (role === 'ceo') {
      router.push('/dashboard/ceo')
    } else if (role === 'ca') {
      router.push('/dashboard/finance')
    } else {
      router.push('/dashboard/operations')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-1">
            NEXUS <span className="text-purple-400">Ω</span>
          </h1>
          <p className="text-gray-400 text-sm tracking-widest uppercase">
            Discover · Challenge · Improve
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#13131a] border border-[#2a2a3a] rounded-2xl p-8">
          <h2 className="text-white text-xl font-semibold mb-6">
            Sign in to your workspace
          </h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg p-3 mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ceo@nexus.demo"
                className="w-full bg-[#1a1a2e] border border-[#2a2a3a] text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#1a1a2e] border border-[#2a2a3a] text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-medium rounded-lg py-2.5 text-sm transition-colors mt-2"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          {/* Demo credentials hint */}
          <div className="mt-6 pt-6 border-t border-[#2a2a3a]">
            <p className="text-gray-500 text-xs mb-3">Demo credentials:</p>
            <div className="space-y-1.5">
              {[
                { role: 'CEO', email: 'ceo@nexus.demo' },
                { role: 'CA / Finance', email: 'ca@nexus.demo' },
                { role: 'Manager', email: 'manager@nexus.demo' },
              ].map((cred) => (
                <div
                  key={cred.role}
                  className="flex justify-between items-center cursor-pointer hover:bg-[#1a1a2e] rounded-lg px-3 py-1.5 transition-colors"
                  onClick={() => {
                    setEmail(cred.email)
                    setPassword('nexus123')
                  }}
                >
                  <span className="text-gray-500 text-xs">{cred.role}</span>
                  <span className="text-purple-400 text-xs">{cred.email}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}