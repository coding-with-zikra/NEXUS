'use client'

import { useRouter } from 'next/navigation'

export default function AttendancePage() {
  const router = useRouter()

  const records = [
    { date: '11 Sep 2026', checkIn: '09:02 AM', checkOut: '06:15 PM', status: 'Present' },
    { date: '10 Sep 2026', checkIn: '09:10 AM', checkOut: '06:05 PM', status: 'Present' },
    { date: '09 Sep 2026', checkIn: '—', checkOut: '—', status: 'Absent' },
    { date: '08 Sep 2026', checkIn: '09:00 AM', checkOut: '05:58 PM', status: 'Present' },
    { date: '07 Sep 2026', checkIn: '09:25 AM', checkOut: '06:20 PM', status: 'Late' },
  ]

  return (
    <div className="p-6 max-w-4xl">
      <button
        onClick={() => router.push('/dashboard/employee')}
        className="text-blue-400 text-sm mb-4 hover:underline"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-2xl font-bold text-white mb-6">My Attendance</h1>

      <div className="rounded-2xl border border-[#2a2a3a]" style={{ background: 'rgba(15,20,40,0.8)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 text-left border-b border-[#2a2a3a]">
              <th className="p-4">Date</th>
              <th className="p-4">Check In</th>
              <th className="p-4">Check Out</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.date} className="border-b border-[#2a2a3a] last:border-0">
                <td className="p-4 text-white">{r.date}</td>
                <td className="p-4 text-gray-300">{r.checkIn}</td>
                <td className="p-4 text-gray-300">{r.checkOut}</td>
                <td className="p-4">
                  <span className={
                    r.status === 'Present' ? 'text-green-400' :
                    r.status === 'Late' ? 'text-yellow-400' : 'text-red-400'
                  }>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}