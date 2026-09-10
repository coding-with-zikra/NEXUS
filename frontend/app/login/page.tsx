'use client'
 
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
 
type AuthMode = 'login' | 'register'
 
// ── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  input: {
    width: '100%',
    background: 'rgba(5,12,28,0.85)',
    border: '1px solid rgba(59,130,246,0.22)',
    borderRadius: 10,
    color: '#f0f6ff',
    padding: '11px 14px',
    fontSize: 13,
    outline: 'none',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.2s',
  },
  select: {
    width: '100%',
    background: 'rgba(5,12,28,0.95)',
    border: '1px solid rgba(59,130,246,0.22)',
    borderRadius: 10,
    color: '#f0f6ff',
    padding: '11px 14px',
    fontSize: 13,
    outline: 'none',
    appearance: 'none' as const,
    cursor: 'pointer',
    boxSizing: 'border-box' as const,
  },
  btnPrimary: {
    width: '100%',
    background: 'linear-gradient(135deg,#1d4ed8,#2563eb,#3b82f6)',
    border: 'none',
    borderRadius: 10,
    color: '#fff',
    fontWeight: 700,
    padding: '12px',
    fontSize: 14,
    cursor: 'pointer',
    letterSpacing: '0.05em',
    boxShadow: '0 4px 20px rgba(37,99,235,0.4)',
    transition: 'all 0.2s',
  },
  btnSmall: {
    background: 'linear-gradient(135deg,#1e90ff,#0052cc)',
    border: 'none',
    borderRadius: 8,
    color: '#fff',
    fontSize: 11,
    fontWeight: 700,
    padding: '8px 12px',
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
  },
  btnGhost: {
    background: 'none',
    border: 'none',
    color: '#3b82f6',
    fontSize: 12,
    cursor: 'pointer',
    padding: '6px 0',
    width: '100%',
    textAlign: 'center' as const,
  },
  label: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 6,
    display: 'block',
    fontWeight: 500,
  },
  errorBox: {
    background: 'rgba(239,68,68,0.08)',
    border: '1px solid rgba(239,68,68,0.3)',
    borderRadius: 10,
    padding: '10px 14px',
    color: '#fca5a5',
    fontSize: 12,
    marginBottom: 18,
    lineHeight: 1.5,
  },
  successBox: {
    background: 'rgba(34,197,94,0.08)',
    border: '1px solid rgba(34,197,94,0.3)',
    borderRadius: 10,
    padding: '10px 14px',
    color: '#86efac',
    fontSize: 12,
    marginBottom: 18,
    lineHeight: 1.5,
  },
  otpBox: {
    background: 'rgba(37,99,235,0.06)',
    border: '1px solid rgba(59,130,246,0.18)',
    borderRadius: 12,
    padding: '14px 12px',
    marginTop: 8,
  },
  divider: { borderTop: '1px solid rgba(59,130,246,0.1)', margin: '16px 0' },
}
 
// ── SVG Logo ──────────────────────────────────────────────────────────────────
function NexusLogo({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="12" stroke="#3b82f6" strokeWidth="2" fill="none" />
      <path d="M8 20L14 8l6 12" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M9.5 16.5h9" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
 
// ── Globe visual (left panel) ─────────────────────────────────────────────────
function GlobeVisual() {
  const nodes: [number, number][] = [[80, 95], [145, 68], [215, 80], [270, 100], [120, 118], [235, 122]]
  const lines: [number, number, number, number][] = [
    [80, 95, 145, 68], [145, 68, 215, 80], [215, 80, 270, 100],
    [80, 95, 120, 118], [145, 68, 120, 118], [215, 80, 235, 122], [270, 100, 235, 122],
  ]
  const labels = [
    { label: 'Finance', x: '0%', y: '40%' },
    { label: 'Operations', x: '35%', y: '2%' },
    { label: 'HR', x: '68%', y: '20%' },
    { label: 'Sales', x: '14%', y: '68%' },
    { label: 'Suppliers', x: '65%', y: '70%' },
  ]
  return (
    <div style={{ position: 'relative', height: 155, maxWidth: 360, margin: '0 auto 28px' }}>
      <svg width="100%" height="155" viewBox="0 0 360 155" fill="none">
        <defs>
          <radialGradient id="gGrad" cx="50%" cy="70%" r="55%">
            <stop offset="0%" stopColor="#1e40af" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#030712" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="180" cy="118" rx="148" ry="52" fill="url(#gGrad)" />
        {[0.4, 0.65, 0.85].map((t, i) => (
          <ellipse key={i} cx="180" cy="118" rx={148 * t} ry={52 * t * 0.5}
            fill="none" stroke="#3b82f6" strokeWidth="0.6" opacity="0.35" />
        ))}
        {[0, 40, 80, 120].map((a, i) => (
          <ellipse key={i} cx="180" cy="118" rx="18" ry="52"
            fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.22"
            transform={`rotate(${a} 180 118)`} />
        ))}
        {lines.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#60a5fa" strokeWidth="0.7" opacity="0.28" />
        ))}
        {nodes.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="3.5" fill="#3b82f6" opacity="0.9" />
            <circle cx={x} cy={y} r="7" fill="none" stroke="#3b82f6" strokeWidth="0.8" opacity="0.3" />
          </g>
        ))}
        <circle r="3" fill="#06b6d4" opacity="0.95">
          <animateMotion dur="3.5s" repeatCount="indefinite"
            path="M 80,95 Q 112,72 145,68 Q 178,64 215,80" />
        </circle>
        <circle r="2" fill="#a78bfa" opacity="0.9">
          <animateMotion dur="5s" repeatCount="indefinite"
            path="M 120,118 Q 177,126 235,122 Q 252,120 270,100" />
        </circle>
      </svg>
      {labels.map((n) => (
        <div key={n.label} style={{
          position: 'absolute', left: n.x, top: n.y,
          background: 'rgba(10,18,38,0.88)',
          border: '1px solid rgba(59,130,246,0.28)',
          borderRadius: 6, padding: '3px 8px',
          fontSize: 10, color: '#60a5fa', fontWeight: 700,
          backdropFilter: 'blur(8px)', whiteSpace: 'nowrap',
        }}>{n.label}</div>
      ))}
    </div>
  )
}
 
// ── Feature pill ──────────────────────────────────────────────────────────────
function Pill({ icon, label }: { icon: string; label: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 7,
      background: 'rgba(37,99,235,0.1)',
      border: '1px solid rgba(59,130,246,0.22)',
      borderRadius: 999, padding: '6px 13px',
      fontSize: 12, color: '#93c5fd',
    }}>
      <span>{icon}</span><span>{label}</span>
    </div>
  )
}
 
// ── Main export ───────────────────────────────────────────────────────────────
export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login')
  const router = useRouter()
  const supabase = createClient()
 
  // ── LOGIN STATE (your original) ──
  const [username, setUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginRole, setLoginRole] = useState('')
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
 
  // ── REGISTER STATE (your original) ──
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
 
  const emailOtpRefs = useRef<(HTMLInputElement | null)[]>([])
  const phoneOtpRefs = useRef<(HTMLInputElement | null)[]>([])
 
  // ── YOUR ORIGINAL HANDLERS (untouched) ────────────────────────────────────
  const handleOtpChange = (
    index: number, value: string, otp: string[],
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
 
  const sendEmailOtp = async () => {
    setEmailLoading(true); setEmailError('')
    if (!email || !email.includes('@')) { setEmailError('Enter a valid email address'); setEmailLoading(false); return }
    setTimeout(() => { setEmailOtpSent(true); setEmailOtp(['1','2','3','4','5','6']); setEmailLoading(false) }, 1000)
  }
 
  const verifyEmailOtp = async () => {
    setEmailLoading(true); setEmailError('')
    const token = emailOtp.join('')
    if (token.length !== 6) { setEmailError('Enter the 6-digit OTP'); setEmailLoading(false); return }
    if (token === '123456') { setEmailVerified(true); setEmailLoading(false); return }
    setEmailError('Invalid OTP. Use 123456 for demo.'); setEmailLoading(false)
  }
 
  const sendPhoneOtp = async () => {
    setPhoneLoading(true); setPhoneError('')
    if (!phone || phone.length < 10) { setPhoneError('Enter a valid mobile number'); setPhoneLoading(false); return }
    setTimeout(() => { setPhoneOtpSent(true); setPhoneOtp(['1','2','3','4','5','6']); setPhoneLoading(false) }, 1000)
  }
 
  const verifyPhoneOtp = async () => {
    setPhoneLoading(true); setPhoneError('')
    const token = phoneOtp.join('')
    if (token === '123456' || token.length === 6) setPhoneVerified(true)
    else setPhoneError('Invalid OTP')
    setPhoneLoading(false)
  }
 
  const handleRegister = async () => {
    setRegLoading(true); setRegError('')
    if (!fullName) { setRegError('Enter your full name'); setRegLoading(false); return }
    if (!regUsername || regUsername.length < 3) { setRegError('Username must be at least 3 characters'); setRegLoading(false); return }
    if (!emailVerified) { setRegError('Please verify your email first'); setRegLoading(false); return }
    if (!regRole) { setRegError('Please select your role'); setRegLoading(false); return }
    if (password !== confirmPassword) { setRegError('Passwords do not match'); setRegLoading(false); return }
    if (password.length < 6) { setRegError('Password must be at least 6 characters'); setRegLoading(false); return }
    const { data: existing } = await supabase.from('profiles').select('username').eq('username', regUsername.toLowerCase().trim()).single()
    if (existing) { setRegError('Username already taken. Please choose another.'); setRegLoading(false); return }
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName, role: regRole } } })
    if (signUpError) { setRegError(signUpError.message); setRegLoading(false); return }
    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id, username: regUsername.toLowerCase().trim(),
        full_name: fullName, phone, role: regRole, email,
      })
      if (profileError) { setRegError('Account created but profile setup failed: ' + profileError.message); setRegLoading(false); return }
    }
    setRegSuccess(`🎉 Welcome to our team, ${fullName}! Your username is: ${regUsername.toLowerCase()}`)
    setRegLoading(false)
    setTimeout(() => setMode('login'), 3000)
  }
 
  const handleLogin = async () => {
    setLoginLoading(true); setLoginError('')
    if (!username || username.length < 3) { setLoginError('Enter your username'); setLoginLoading(false); return }
    if (!loginPassword) { setLoginError('Enter your password'); setLoginLoading(false); return }
    if (!loginRole) { setLoginError('Select your role'); setLoginLoading(false); return }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/lookup/${username.toLowerCase().trim()}`)
    const profile = await res.json()
    if (!profile.found) { setLoginError('Username not found.'); setLoginLoading(false); return }
    if (profile.role !== loginRole) { setLoginError(`This username is not registered as ${loginRole}.`); setLoginLoading(false); return }
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email: profile.email, password: loginPassword })
    if (authError || !data.user) { setLoginError('Invalid username or password.'); setLoginLoading(false); return }
    localStorage.setItem('nexus_user', JSON.stringify({ name: profile.full_name || username, role: loginRole }))
    if (loginRole === 'ceo') router.push('/dashboard/ceo')
    else if (loginRole === 'ca') router.push('/dashboard/finance')
    else if (loginRole === 'manager') router.push('/dashboard/operations')
    else router.push('/dashboard/employee')
  }
 
  // ── Focus helpers ──────────────────────────────────────────────────────────
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) =>
    (e.target.style.borderColor = 'rgba(59,130,246,0.7)')
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) =>
    (e.target.style.borderColor = 'rgba(59,130,246,0.22)')
 
  // ── OTP row ────────────────────────────────────────────────────────────────
  const OtpRow = ({
    otp, setOtp, refs,
  }: { otp: string[]; setOtp: (o: string[]) => void; refs: React.MutableRefObject<(HTMLInputElement | null)[]> }) => (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
      {otp.map((digit, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el }}
          type="text" maxLength={1} value={digit}
          onChange={(e) => handleOtpChange(i, e.target.value, otp, setOtp, refs)}
          style={{
            width: 40, height: 46, textAlign: 'center',
            fontSize: 18, fontWeight: 700, color: '#f0f6ff',
            background: 'rgba(5,12,28,0.9)',
            border: digit ? '1px solid rgba(59,130,246,0.8)' : '1px solid rgba(59,130,246,0.25)',
            borderRadius: 9, outline: 'none',
          }}
        />
      ))}
    </div>
  )
 
  // ──────────────────────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg,#020818 0%,#0a1628 55%,#020818 100%)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
 
      {/* Background decorations */}
      <div style={{
        position: 'absolute', top: '15%', left: '-6%',
        width: 420, height: 420,
        background: 'radial-gradient(circle,rgba(37,99,235,0.18) 0%,transparent 70%)',
        borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '8%', right: '-4%',
        width: 300, height: 300,
        background: 'radial-gradient(circle,rgba(6,182,212,0.12) 0%,transparent 70%)',
        borderRadius: '50%', filter: 'blur(50px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(59,130,246,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.035) 1px,transparent 1px)',
        backgroundSize: '60px 60px', pointerEvents: 'none',
      }} />
 
      {/* ── Top bar ── */}
      <header style={{
        position: 'relative', zIndex: 20,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 40px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <NexusLogo />
          <div>
            <div style={{ fontWeight: 900, fontSize: 20, letterSpacing: '0.08em', color: '#f0f6ff' }}>
              NEXUS <span style={{ color: '#3b82f6' }}>Ω</span>
            </div>
            <div style={{ fontSize: 9, letterSpacing: '0.22em', color: '#475569' }}>
              DISCOVER · CHALLENGE · IMPROVE
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 12, color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.6 }}>
          Smarter Decisions<br />
          <span style={{ color: '#60a5fa' }}>for a Better Tomorrow.</span>
          <div style={{ width: 28, height: 2, background: 'linear-gradient(90deg,#3b82f6,transparent)', marginTop: 4, marginLeft: 'auto' }} />
        </div>
      </header>
 
      {/* ── Two-column layout ── */}
      <main style={{
        position: 'relative', zIndex: 10, flex: 1,
        display: 'flex', alignItems: 'center',
        gap: 52, maxWidth: 1120,
        margin: '0 auto', width: '100%',
        padding: '16px 40px 48px',
      }}>
 
        {/* ════ LEFT PANEL ════ */}
        <div style={{ flex: 1, maxWidth: 520 }} data-left="">
          <h1 style={{
            fontSize: 'clamp(28px,3.2vw,46px)',
            fontWeight: 800, lineHeight: 1.15,
            color: '#f0f6ff', marginBottom: 18,
          }}>
            Intelligence<br />
            for a <span style={{ color: '#3b82f6' }}>Smarter Enterprise</span>
          </h1>
 
          <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.75, marginBottom: 32, maxWidth: 420 }}>
            NEXUS Ω integrates people, processes, and AI to help organizations
            make safer, faster, and smarter decisions.
          </p>
 
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 36 }}>
            <Pill icon="🔍" label="Detect Problems Early" />
            <Pill icon="🌿" label="Find Root Causes" />
            <Pill icon="⚡" label="Simulate Decisions" />
            <Pill icon="🛡️" label="Prevent Risks" />
            <Pill icon="📈" label="Achieve Better Outcomes" />
          </div>
 
          <GlobeVisual />
 
          <blockquote style={{
            paddingLeft: 14,
            borderLeft: '2px solid rgba(59,130,246,0.4)',
            color: '#94a3b8', fontStyle: 'italic', fontSize: 13, lineHeight: 1.7,
          }}>
            "Better data. Clearer insights. Stronger decisions."
            <div style={{ color: '#475569', fontStyle: 'normal', fontSize: 11, marginTop: 4 }}>— NEXUS Ω</div>
          </blockquote>
        </div>
 
        {/* ════ RIGHT PANEL — Card ════ */}
        <div style={{ width: '100%', maxWidth: 420, flexShrink: 0 }} data-card-wrap="">
          <div style={{
            background: 'rgba(8,16,36,0.82)',
            border: '1px solid rgba(59,130,246,0.2)',
            borderRadius: 20,
            padding: '36px 32px',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            boxShadow: '0 0 50px rgba(37,99,235,0.18)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Top accent */}
            <div style={{
              position: 'absolute', top: 0, left: '20%', right: '20%', height: 2,
              background: 'linear-gradient(90deg,transparent,#3b82f6,#06b6d4,transparent)',
              borderRadius: '0 0 4px 4px',
            }} />
 
            {/* Card header */}
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 3 }}>Welcome to</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 2 }}>
              <NexusLogo size={24} />
              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#f0f6ff', margin: 0 }}>
                NEXUS <span style={{ color: '#3b82f6' }}>Ω</span>
              </h2>
            </div>
            <p style={{ color: '#64748b', fontSize: 13, margin: '4px 0 24px' }}>Sign in to your account</p>
 
            {/* Tabs */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              background: 'rgba(5,12,28,0.7)',
              border: '1px solid rgba(59,130,246,0.15)',
              borderRadius: 10, padding: 4, marginBottom: 24,
            }}>
              {(['login', 'register'] as AuthMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  style={{
                    padding: '9px 0', borderRadius: 8, border: 'none',
                    fontSize: 13, cursor: 'pointer',
                    ...(mode === m
                      ? { background: 'linear-gradient(135deg,#1d4ed8,#2563eb)', color: '#fff', fontWeight: 700, boxShadow: '0 2px 10px rgba(37,99,235,0.4)' }
                      : { background: 'transparent', color: '#64748b', fontWeight: 400 }),
                  }}
                >
                  {m === 'login' ? 'Login' : 'Register'}
                </button>
              ))}
            </div>
 
            {/* ── LOGIN ── */}
            {mode === 'login' && (
              <>
                {loginError && <div style={C.errorBox}>{loginError}</div>}
 
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={C.label}>Username</label>
                    <input type="text" placeholder="e.g. ceo_aarav"
                      value={username} onChange={(e) => setUsername(e.target.value)}
                      style={C.input} onFocus={onFocus} onBlur={onBlur} />
                  </div>
 
                  <div>
                    <label style={C.label}>Password</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showLoginPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                        style={{ ...C.input, paddingRight: 56 }}
                        onFocus={onFocus} onBlur={onBlur}
                      />
                      <button type="button" onClick={() => setShowLoginPassword(!showLoginPassword)} style={{
                        position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: showLoginPassword ? '#3b82f6' : '#64748b',
                        fontSize: 11, fontWeight: 700,
                      }}>
                        {showLoginPassword ? 'HIDE' : 'SHOW'}
                      </button>
                    </div>
                  </div>
 
                  <div>
                    <label style={C.label}>Role</label>
                    <select value={loginRole} onChange={(e) => setLoginRole(e.target.value)}
                      style={C.select} onFocus={onFocus} onBlur={onBlur}>
                      <option value="">Select your role</option>
                      <option value="ceo">CEO</option>
                      <option value="ca">CA / Finance</option>
                      <option value="manager">Manager</option>
                      <option value="employee">Employee</option>
                    </select>
                  </div>
 
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: '#64748b', cursor: 'pointer' }}>
                      <input type="checkbox" style={{ accentColor: '#2563eb', width: 14, height: 14 }} />
                      Remember me
                    </label>
                    <button style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: 12, cursor: 'pointer' }}>
                      Forgot password?
                    </button>
                  </div>
 
                  <button onClick={handleLogin} disabled={loginLoading}
                    style={{ ...C.btnPrimary, opacity: loginLoading ? 0.6 : 1 }}>
                    {loginLoading ? 'SIGNING IN…' : 'LOGIN →'}
                  </button>
                </div>
 
                {/* Demo accounts */}
                <div style={{ ...C.divider, marginTop: 20 }} />
                <p style={{ color: '#475569', fontSize: 11, textAlign: 'center', marginBottom: 10 }}>Quick fill — Demo accounts</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {[
                    { label: 'CEO', un: 'ceo_aarav', r: 'ceo' },
                    { label: 'CA / Finance', un: 'ca_priya', r: 'ca' },
                    { label: 'Manager', un: 'manager_raj', r: 'manager' },
                    { label: 'Employee', un: 'emp_sara', r: 'employee' },
                  ].map((d) => (
                    <button key={d.label}
                      onClick={() => { setUsername(d.un); setLoginPassword('nexus123'); setLoginRole(d.r) }}
                      style={{
                        textAlign: 'left', padding: '8px 10px', borderRadius: 8,
                        border: '1px solid rgba(59,130,246,0.12)',
                        background: 'rgba(37,99,235,0.05)', cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)'; e.currentTarget.style.background = 'rgba(37,99,235,0.12)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.12)'; e.currentTarget.style.background = 'rgba(37,99,235,0.05)' }}
                    >
                      <p style={{ color: '#60a5fa', fontSize: 11, fontWeight: 700, margin: 0 }}>{d.label}</p>
                      <p style={{ color: '#475569', fontSize: 10, margin: '2px 0 0' }}>{d.un}</p>
                    </button>
                  ))}
                </div>
 
                <p style={{ textAlign: 'center', fontSize: 12, color: '#475569', marginTop: 20 }}>
                  New to NEXUS Ω?{' '}
                  <button onClick={() => setMode('register')} style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                    Register here
                  </button>
                </p>
              </>
            )}
 
            {/* ── REGISTER ── */}
            {mode === 'register' && (
              <>
                {regError && <div style={C.errorBox}>{regError}</div>}
                {regSuccess && <div style={C.successBox}>{regSuccess}</div>}
 
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {/* Full Name */}
                  <div>
                    <label style={C.label}>Full Name</label>
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                      placeholder="Aarav Sharma" style={C.input} onFocus={onFocus} onBlur={onBlur} />
                  </div>
 
                  {/* Username */}
                  <div>
                    <label style={C.label}>Username</label>
                    <input type="text" value={regUsername} onChange={(e) => setRegUsername(e.target.value)}
                      placeholder="e.g. manager_raj" style={C.input} onFocus={onFocus} onBlur={onBlur} />
                  </div>
 
                  {/* Email + OTP */}
                  <div>
                    <label style={C.label}>Email ID</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com" disabled={emailVerified}
                        style={{ ...C.input, flex: 1, ...(emailVerified ? { background: 'rgba(34,197,94,0.08)', borderColor: 'rgba(34,197,94,0.4)' } : {}) }}
                        onFocus={onFocus} onBlur={onBlur} />
                      {!emailVerified && (
                        <button onClick={sendEmailOtp} disabled={emailLoading || emailOtpSent} style={C.btnSmall}>
                          {emailLoading ? '…' : emailOtpSent ? '✓' : 'VERIFY'}
                        </button>
                      )}
                      {emailVerified && <span style={{ color: '#22c55e', fontSize: 18, alignSelf: 'center' }}>✓</span>}
                    </div>
                    {emailError && <p style={{ color: '#fca5a5', fontSize: 11, marginTop: 4 }}>{emailError}</p>}
                    {emailOtpSent && !emailVerified && (
                      <div style={C.otpBox}>
                        <p style={{ color: '#64748b', fontSize: 11, textAlign: 'center', marginBottom: 10 }}>
                          6-digit code sent to {email}
                        </p>
                        <OtpRow otp={emailOtp} setOtp={setEmailOtp} refs={emailOtpRefs} />
                        <button onClick={verifyEmailOtp} disabled={emailLoading}
                          style={{ ...C.btnSmall, width: '100%', marginTop: 10, padding: '9px 0' }}>
                          {emailLoading ? 'VERIFYING…' : 'VERIFY OTP'}
                        </button>
                        <button onClick={() => { setEmailOtpSent(false); setEmailOtp(['','','','','','']) }} style={C.btnGhost}>
                          Resend OTP
                        </button>
                      </div>
                    )}
                  </div>
 
                  <div style={C.divider} />
 
                  {/* Mobile + OTP */}
                  <div>
                    <label style={C.label}>Mobile Number</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210" disabled={phoneVerified}
                        style={{ ...C.input, flex: 1, ...(phoneVerified ? { background: 'rgba(34,197,94,0.08)', borderColor: 'rgba(34,197,94,0.4)' } : {}) }}
                        onFocus={onFocus} onBlur={onBlur} />
                      {!phoneVerified && (
                        <button onClick={sendPhoneOtp} disabled={phoneLoading || phoneOtpSent} style={C.btnSmall}>
                          {phoneLoading ? '…' : phoneOtpSent ? '✓' : 'VERIFY'}
                        </button>
                      )}
                      {phoneVerified && <span style={{ color: '#22c55e', fontSize: 18, alignSelf: 'center' }}>✓</span>}
                    </div>
                    {phoneError && <p style={{ color: '#fca5a5', fontSize: 11, marginTop: 4 }}>{phoneError}</p>}
                    {phoneOtpSent && !phoneVerified && (
                      <div style={C.otpBox}>
                        <p style={{ color: '#64748b', fontSize: 11, textAlign: 'center', marginBottom: 10 }}>
                          Demo OTP: <span style={{ color: '#60a5fa', fontWeight: 700 }}>123456</span>
                        </p>
                        <OtpRow otp={phoneOtp} setOtp={setPhoneOtp} refs={phoneOtpRefs} />
                        <button onClick={verifyPhoneOtp} disabled={phoneLoading}
                          style={{ ...C.btnSmall, width: '100%', marginTop: 10, padding: '9px 0' }}>
                          {phoneLoading ? 'VERIFYING…' : 'VERIFY OTP'}
                        </button>
                        <button onClick={() => { setPhoneOtpSent(false); setPhoneOtp(['','','','','','']) }} style={C.btnGhost}>
                          Resend OTP
                        </button>
                      </div>
                    )}
                  </div>
 
                  <div style={C.divider} />
 
                  {/* Role */}
                  <div>
                    <label style={C.label}>Role</label>
                    <select value={regRole} onChange={(e) => setRegRole(e.target.value)}
                      style={C.select} onFocus={onFocus} onBlur={onBlur}>
                      <option value="">Select your role</option>
                      <option value="ceo">CEO</option>
                      <option value="ca">CA / Finance</option>
                      <option value="manager">Manager</option>
                      <option value="employee">Employee</option>
                    </select>
                  </div>
 
                  {/* Password */}
                  <div>
                    <label style={C.label}>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" style={C.input} onFocus={onFocus} onBlur={onBlur} />
                  </div>
 
                  {/* Confirm Password */}
                  <div>
                    <label style={C.label}>Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••" style={C.input} onFocus={onFocus} onBlur={onBlur} />
                  </div>
 
                  <button onClick={handleRegister} disabled={regLoading}
                    style={{ ...C.btnPrimary, marginTop: 4, opacity: regLoading ? 0.6 : 1 }}>
                    {regLoading ? 'CREATING…' : 'CREATE ACCOUNT'}
                  </button>
                </div>
 
                <p style={{ textAlign: 'center', fontSize: 12, color: '#475569', marginTop: 20 }}>
                  Already have an account?{' '}
                  <button onClick={() => setMode('login')} style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                    Sign in
                  </button>
                </p>
              </>
            )}
          </div>
 
          <p style={{ textAlign: 'center', fontSize: 11, color: '#1e293b', marginTop: 14 }}>
            Protected by enterprise-grade encryption · Role-based access control
          </p>
        </div>
      </main>
 
      {/* Footer */}
      <footer style={{
        position: 'relative', zIndex: 10,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 40px',
        borderTop: '1px solid rgba(59,130,246,0.08)',
      }}>
        <span style={{ fontSize: 11, color: '#334155' }}>© 2025 NEXUS Ω. All rights reserved.</span>
        <span style={{ fontSize: 11, color: '#334155' }}>People · Progress · Together</span>
      </footer>
 
      {/* Responsive */}
      <style>{`
        @media(max-width:860px){
          [data-left]{display:none!important}
          main{justify-content:center!important;padding:12px 20px 48px!important}
          [data-card-wrap]{max-width:100%!important}
        }
        @media(max-width:480px){
          header{padding:16px 20px!important}
          footer{padding:14px 20px!important}
        }
        select option{background:#080f22;color:#f0f6ff}
      `}</style>
    </div>
  )
}
