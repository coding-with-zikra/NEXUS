'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

type AuthMode = 'login' | 'register'

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login')
  const router = useRouter()
  const supabase = createClient()

  // Login state
  const [username, setUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginRole, setLoginRole] = useState('')
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  // Register state
  const [fullName, setFullName] = useState('')
  const [regUsername, setRegUsername] = useState('')
  const [email, setEmail] = useState('')
  const [emailVerified, setEmailVerified] = useState(false)
  const [emailOtpSent, setEmailOtpSent] = useState(false)
  const [emailOtp, setEmailOtp] = useState(['', '', '', '', '', ''])
  const [emailLoading, setEmailLoading] = useState(false)
  const [emailError, setEmailError] = useState('')

  const [phone, setPhone] = useState('')
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [phoneOtpSent, setPhoneOtpSent] = useState(false)
  const [phoneOtp, setPhoneOtp] = useState(['', '', '', '', '', ''])
  const [phoneLoading, setPhoneLoading] = useState(false)
  const [phoneError, setPhoneError] = useState('')

  const [regRole, setRegRole] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [regError, setRegError] = useState('')
  const [regSuccess, setRegSuccess] = useState('')
  const [regLoading, setRegLoading] = useState(false)

  // OTP input refs
  const emailOtpRefs = useRef<(HTMLInputElement | null)[]>([])
  const phoneOtpRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleOtpChange = (
    index: number,
    value: string,
    otp: string[],
    setOtp: (o: string[]) => void,
    refs: React.MutableRefObject<(HTMLInputElement | null)[]>
  ) => {
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    if (value && index < 5) refs.current[index + 1]?.focus()
    if (!value && index > 0) refs.current[index - 1]?.focus()
  }

  // Send Email OTP
   const sendEmailOtp = async () => {
    setEmailLoading(true)
    setEmailError('')
    if (!email || !email.includes('@')) {
      setEmailError('Enter a valid email address')
      setEmailLoading(false)
      return
    }
    // Demo mode — simulate OTP (pre-fill 123456)
    setTimeout(() => {
      setEmailOtpSent(true)
      setEmailOtp(['1', '2', '3', '4', '5', '6'])
      setEmailLoading(false)
    }, 1000)
  }

  // Verify Email OTP
    const verifyEmailOtp = async () => {
    setEmailLoading(true)
    setEmailError('')
    const token = emailOtp.join('')
    if (token.length !== 6) {
      setEmailError('Enter the 6-digit OTP')
      setEmailLoading(false)
      return
    }
    // Demo mode — accept 123456
    if (token === '123456') {
      setEmailVerified(true)
      setEmailLoading(false)
      return
    }
    setEmailError('Invalid OTP. Use 123456 for demo.')
    setEmailLoading(false)
  }

  // Send Mobile OTP (simulated — Supabase phone requires Twilio paid)
  const sendPhoneOtp = async () => {
    setPhoneLoading(true)
    setPhoneError('')
    if (!phone || phone.length < 10) {
      setPhoneError('Enter a valid mobile number')
      setPhoneLoading(false)
      return
    }
    // Simulate OTP sent (pre-fill 123456 for demo)
    setTimeout(() => {
      setPhoneOtpSent(true)
      setPhoneOtp(['1', '2', '3', '4', '5', '6'])
      setPhoneLoading(false)
    }, 1000)
  }

  // Verify Mobile OTP
  const verifyPhoneOtp = async () => {
    setPhoneLoading(true)
    setPhoneError('')
    const token = phoneOtp.join('')
    if (token === '123456' || token.length === 6) {
      setPhoneVerified(true)
    } else {
      setPhoneError('Invalid OTP')
    }
    setPhoneLoading(false)
  }

  // Final registration
   const handleRegister = async () => {
    setRegLoading(true)
    setRegError('')

    if (!fullName) { setRegError('Enter your full name'); setRegLoading(false); return }
    if (!regUsername || regUsername.length < 3) { setRegError('Username must be at least 3 characters'); setRegLoading(false); return }
    if (!emailVerified) { setRegError('Please verify your email first'); setRegLoading(false); return }
    if (!regRole) { setRegError('Please select your role'); setRegLoading(false); return }
    if (password !== confirmPassword) { setRegError('Passwords do not match'); setRegLoading(false); return }
    if (password.length < 6) { setRegError('Password must be at least 6 characters'); setRegLoading(false); return }

    // Check username availability
    const { data: existing } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', regUsername.toLowerCase().trim())
      .single()

    if (existing) {
      setRegError('Username already taken. Please choose another.')
      setRegLoading(false)
      return
    }

    // Sign up with email + password directly
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role: regRole }
      }
    })

    if (signUpError) {
      setRegError(signUpError.message)
      setRegLoading(false)
      return
    }

    // Create profile
    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        username: regUsername.toLowerCase().trim(),
        full_name: fullName,
        phone,
        role: regRole,
        email,
      })

      if (profileError) {
        setRegError('Account created but profile setup failed: ' + profileError.message)
        setRegLoading(false)
        return
      }
    }

    setRegSuccess(`🎉 Welcome to our team, ${fullName}! Your username is: ${regUsername.toLowerCase()}`)
    setRegLoading(false)
    setTimeout(() => setMode('login'), 3000)
  }

  // Login handler
  const handleLogin = async () => {
    setLoginLoading(true)
    setLoginError('')

    if (!username || username.length < 3) {
      setLoginError('Enter your username')
      setLoginLoading(false)
      return
    }
    if (!loginPassword) {
      setLoginError('Enter your password')
      setLoginLoading(false)
      return
    }
    if (!loginRole) {
      setLoginError('Select your role')
      setLoginLoading(false)
      return
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/lookup/${username.toLowerCase().trim()}`)
    const profile = await res.json()

    if (!profile.found) {
      setLoginError('Username not found.')
      setLoginLoading(false)
      return
    }

    if (profile.role !== loginRole) {
      setLoginError(`This username is not registered as ${loginRole}.`)
      setLoginLoading(false)
      return
    }

        // Login with actual email from profile
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: profile.email,
      password: loginPassword,
    })

    if (authError || !data.user) {
      setLoginError('Invalid username or password.')
      setLoginLoading(false)
      return
    }

        // Save user info for Topbar
    localStorage.setItem('nexus_user', JSON.stringify({
      name: profile.full_name || username,
      role: loginRole,
    }))

    if (loginRole === 'ceo') router.push('/dashboard/ceo')
    else if (loginRole === 'ca') router.push('/dashboard/finance')
    else if (loginRole === 'manager') router.push('/dashboard/operations')
    else router.push('/dashboard/employee')
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(30,144,255,0.25)',
  }

  const OtpInput = ({
    otp, setOtp, refs
  }: {
    otp: string[]
    setOtp: (o: string[]) => void
    refs: React.MutableRefObject<(HTMLInputElement | null)[]>
  }) => (
    <div className="flex gap-2 justify-center">
      {otp.map((digit, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el }}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleOtpChange(i, e.target.value, otp, setOtp, refs)}
          className="w-10 h-12 text-center text-white text-lg font-bold rounded-lg focus:outline-none transition-all"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: digit ? '1px solid rgba(30,144,255,0.8)' : '1px solid rgba(30,144,255,0.25)',
          }}
        />
      ))}
    </div>
  )

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      style={{ background: 'linear-gradient(160deg, #020818 0%, #0a1628 50%, #020818 100%)' }}
    >
      {/* Logo */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-black text-white tracking-widest">
          NE<span className="text-blue-400">X</span>US{' '}
          <span className="text-blue-400">Ω</span>
        </h1>
        <p className="text-blue-400 text-sm tracking-widest mt-1">
          AI Enterprise Intelligence
        </p>
      </div>

      {/* Card */}
      <div
        className="w-full max-w-sm rounded-2xl p-8 border border-blue-500/20"
        style={{
          background: 'rgba(5, 15, 35, 0.85)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 60px rgba(30,144,255,0.1)',
        }}
      >
        {mode === 'login' ? (
          <>
            <h2 className="text-2xl font-bold text-white text-center mb-6">Welcome Back</h2>

            {loginError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg p-3 mb-4">
                {loginError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. ceo_aarav"
                  className="w-full rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none"
                  style={inputStyle}
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Password</label>
                <div className="relative">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-lg px-4 py-3 pr-16 text-sm text-white placeholder-gray-600 focus:outline-none"
                    style={inputStyle}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-400 text-xs"
                  >
                    {showLoginPassword ? 'HIDE' : 'SHOW'}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Role</label>
                <select
                  value={loginRole}
                  onChange={(e) => setLoginRole(e.target.value)}
                  className="w-full rounded-lg px-4 py-3 text-sm text-white focus:outline-none appearance-none cursor-pointer"
                  style={{ background: 'rgba(5,15,35,0.95)', border: '1px solid rgba(30,144,255,0.25)' }}
                >
                  <option value="">Select Role</option>
                  <option value="ceo">CEO</option>
                  <option value="ca">CA / Finance</option>
                  <option value="manager">Manager</option>
                  <option value="employee">Employee</option>
                </select>
              </div>

              <button
                onClick={handleLogin}
                disabled={loginLoading}
                className="w-full font-bold rounded-lg py-3 text-white text-sm tracking-widest transition-all disabled:opacity-50 hover:brightness-110"
                style={{
                  background: 'linear-gradient(135deg, #1e90ff 0%, #0052cc 100%)',
                  boxShadow: '0 4px 20px rgba(30,144,255,0.4)',
                }}
              >
                {loginLoading ? 'SIGNING IN...' : 'LOGIN →'}
              </button>
            </div>

            {/* Demo credentials */}
            <div className="mt-5 pt-5 border-t border-blue-500/15">
              <p className="text-gray-600 text-xs text-center mb-3">Demo usernames</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'CEO', un: 'ceo_aarav', r: 'ceo' },
                  { label: 'CA / Finance', un: 'ca_priya', r: 'ca' },
                  { label: 'Manager', un: 'manager_raj', r: 'manager' },
                  { label: 'Employee', un: 'emp_sara', r: 'employee' },
                ].map((c) => (
                  <button
                    key={c.label}
                    onClick={() => { setUsername(c.un); setLoginPassword('nexus123'); setLoginRole(c.r) }}
                    className="text-left px-3 py-2 rounded-lg text-xs border border-blue-500/15 hover:border-blue-400/40 hover:bg-blue-500/10 transition-all"
                  >
                    <p className="text-blue-400 font-semibold">{c.label}</p>
                    <p className="text-gray-600">{c.un}</p>
                  </button>
                ))}
              </div>
            </div>

            <p className="text-center text-gray-600 text-xs mt-5">
              Don't have an account?{' '}
              <button onClick={() => setMode('register')} className="text-blue-400 hover:underline">
                Register here
              </button>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white text-center mb-6">
              Create Your Account
            </h2>

            {regError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg p-3 mb-4">
                {regError}
              </div>
            )}
            {regSuccess && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm rounded-lg p-3 mb-4">
                {regSuccess}
              </div>
            )}

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Aarav Sharma"
                  className="w-full rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none"
                  style={inputStyle}
                />
              </div>

              {/* Username */}
              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Username</label>
                <input
                  type="text"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  placeholder="e.g. manager_raj"
                  className="w-full rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none"
                  style={inputStyle}
                />
              </div>

              {/* Email + OTP */}
              <div className="space-y-2">
                <label className="text-gray-400 text-sm block">Email ID</label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    disabled={emailVerified}
                    className="flex-1 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none"
                    style={emailVerified
                      ? { background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.4)' }
                      : inputStyle}
                  />
                  {!emailVerified && (
                    <button
                      onClick={sendEmailOtp}
                      disabled={emailLoading || emailOtpSent}
                      className="px-3 py-2 text-xs font-bold text-white rounded-lg disabled:opacity-50 whitespace-nowrap"
                      style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}
                    >
                      {emailLoading ? '...' : emailOtpSent ? 'SENT ✓' : 'VERIFY'}
                    </button>
                  )}
                  {emailVerified && (
                    <div className="flex items-center px-3 text-green-400 text-sm font-bold">✓</div>
                  )}
                </div>

                {emailError && <p className="text-red-400 text-xs">{emailError}</p>}

                              {emailOtpSent && !emailVerified && (
                  <div className="space-y-2 pt-1">
                    <p className="text-gray-500 text-xs text-center">Enter 6-digit Email OTP sent to {email}</p>
                    <OtpInput otp={emailOtp} setOtp={setEmailOtp} refs={emailOtpRefs} />
                    <button
                      onClick={verifyEmailOtp}
                      disabled={emailLoading}
                      className="w-full py-2 text-xs font-bold text-white rounded-lg disabled:opacity-50"
                      style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}
                    >
                      {emailLoading ? 'VERIFYING...' : 'VERIFY OTP'}
                    </button>
                    <button
                      onClick={() => { setEmailOtpSent(false); setEmailOtp(['','','','','','']) }}
                      className="w-full py-1.5 text-xs text-gray-500 hover:text-blue-400 transition-colors"
                    >
                      Resend OTP
                    </button>
                  </div>
                )}
              </div>

              <div className="border-t border-blue-500/15" />

              {/* Mobile + OTP */}
              <div className="space-y-2">
                <label className="text-gray-400 text-sm block">Mobile Number</label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    disabled={phoneVerified}
                    className="flex-1 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none"
                    style={phoneVerified
                      ? { background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.4)' }
                      : inputStyle}
                  />
                  {!phoneVerified && (
                    <button
                      onClick={sendPhoneOtp}
                      disabled={phoneLoading || phoneOtpSent}
                      className="px-3 py-2 text-xs font-bold text-white rounded-lg disabled:opacity-50 whitespace-nowrap"
                      style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}
                    >
                      {phoneLoading ? '...' : phoneOtpSent ? 'SENT ✓' : 'VERIFY'}
                    </button>
                  )}
                  {phoneVerified && (
                    <div className="flex items-center px-3 text-green-400 text-sm font-bold">✓</div>
                  )}
                </div>

                {phoneError && <p className="text-red-400 text-xs">{phoneError}</p>}

                              {phoneOtpSent && !phoneVerified && (
                  <div className="space-y-2 pt-1">
                    <p className="text-gray-500 text-xs text-center">Demo OTP: <span className="text-blue-400 font-bold">123456</span></p>
                    <OtpInput otp={phoneOtp} setOtp={setPhoneOtp} refs={phoneOtpRefs} />
                    <button
                      onClick={verifyPhoneOtp}
                      disabled={phoneLoading}
                      className="w-full py-2 text-xs font-bold text-white rounded-lg disabled:opacity-50"
                      style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}
                    >
                      {phoneLoading ? 'VERIFYING...' : 'VERIFY OTP'}
                    </button>
                    <button
                      onClick={() => { setPhoneOtpSent(false); setPhoneOtp(['','','','','','']) }}
                      className="w-full py-1.5 text-xs text-gray-500 hover:text-blue-400 transition-colors"
                    >
                      Resend OTP
                    </button>
                  </div>
                )}
              </div>

              <div className="border-t border-blue-500/15" />

              {/* Role */}
              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Role</label>
                <select
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value)}
                  className="w-full rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none appearance-none"
                  style={{ background: 'rgba(5,15,35,0.95)', border: '1px solid rgba(30,144,255,0.25)' }}
                >
                  <option value="">Select Role</option>
                  <option value="ceo">CEO</option>
                  <option value="ca">CA / Finance</option>
                  <option value="manager">Manager</option>
                  <option value="employee">Employee</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none"
                  style={inputStyle}
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none"
                  style={inputStyle}
                />
              </div>

              {/* Create Account Button */}
              <button
                onClick={handleRegister}
                disabled={regLoading}
                className="w-full font-bold rounded-lg py-3 text-white text-sm tracking-widest transition-all disabled:opacity-50 mt-2"
                style={{
                  background: 'linear-gradient(135deg, #1e90ff 0%, #0052cc 100%)',
                  boxShadow: '0 4px 20px rgba(30,144,255,0.4)',
                }}
              >
                {regLoading ? 'CREATING...' : 'CREATE ACCOUNT'}
              </button>
            </div>

            <p className="text-center text-gray-600 text-xs mt-5">
              Already have an account?{' '}
              <button onClick={() => setMode('login')} className="text-blue-400 hover:underline">
                Sign in
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  )
}