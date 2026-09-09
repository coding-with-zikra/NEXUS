'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const weeklyData = [
  { day: 'Mon', Present: 461, Absent: 12, Leave: 9 },
  { day: 'Tue', Present: 458, Absent: 14, Leave: 10 },
  { day: 'Wed', Present: 465, Absent: 10, Leave: 7 },
  { day: 'Thu', Present: 452, Absent: 18, Leave: 12 },
  { day: 'Fri', Present: 448, Absent: 20, Leave: 14 },
]

const recentAttendance = [
  { name: 'Aarav Sharma', dept: 'Management', checkIn: '09:02', checkOut: '18:30', status: 'present' },
  { name: 'Priya Mehta', dept: 'Finance', checkIn: '08:55', checkOut: '18:15', status: 'present' },
  { name: 'Raj Kumar', dept: 'Operations', checkIn: '08:45', checkOut: '18:00', status: 'present' },
  { name: 'Sara Khan', dept: 'Production', checkIn: '--', checkOut: '--', status: 'leave' },
  { name: 'Amit Singh', dept: 'Sales', checkIn: '09:30', checkOut: '--', status: 'present' },
  { name: 'Rohan Patel', dept: 'Production', checkIn: '--', checkOut: '--', status: 'absent' },
]

export default function AttendancePage() {
  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">🕐 Attendance</h1>
        <p className="text-gray-400 text-sm mt-1">Track employee attendance across all departments.</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Present Today', value: '461', sub: '95.6%', color: 'text-green-400' },
          { label: 'Absent', value: '12', sub: '2.5%', color: 'text-red-400' },
          { label: 'On Leave', value: '9', sub: '1.9%', color: 'text-yellow-400' },
          { label: 'Total Employees', value: '482', sub: 'Active workforce', color: 'text-blue-400' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">{kpi.label}</p>
            <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
            <p className="text-gray-500 text-xs mt-0.5">{kpi.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
        <h2 className="text-white font-semibold mb-4">Weekly Attendance Trend</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
            <XAxis dataKey="day" stroke="#444" tick={{ fill: '#666', fontSize: 11 }} />
            <YAxis stroke="#444" tick={{ fill: '#666', fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: '#13131a', border: '1px solid #2a2a3a', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
            <Bar dataKey="Present" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Absent" fill="#ef4444" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Leave" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#2a2a3a]">
          <h2 className="text-white font-semibold">Today&apos;s Attendance Log</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a3a] bg-[#1a1a2e]">
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Employee</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Department</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Check In</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Check Out</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentAttendance.map((a) => (
              <tr key={a.name} className="border-b border-[#2a2a3a] hover:bg-[#1a1a2e] transition-colors">
                <td className="px-5 py-3 text-white font-medium">{a.name}</td>
                <td className="px-5 py-3 text-gray-400">{a.dept}</td>
                <td className="px-5 py-3 text-gray-300">{a.checkIn}</td>
                <td className="px-5 py-3 text-gray-300">{a.checkOut}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    a.status === 'present' ? 'bg-green-500/20 text-green-400' :
                    a.status === 'leave' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>{a.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}