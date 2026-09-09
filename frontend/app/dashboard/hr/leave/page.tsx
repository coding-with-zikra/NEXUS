'use client'

import { useState } from 'react'

const leaveRequests = [
  { id: 'L001', name: 'Rohan Patel', dept: 'Production', type: 'Sick Leave', from: '5 Sep', to: '7 Sep', days: 3, status: 'approved' },
  { id: 'L002', name: 'Sara Khan', dept: 'Production', type: 'Casual Leave', from: '8 Sep', to: '8 Sep', days: 1, status: 'pending' },
  { id: 'L003', name: 'Amit Singh', dept: 'Sales', type: 'Annual Leave', from: '15 Sep', to: '20 Sep', days: 6, status: 'pending' },
  { id: 'L004', name: 'Neha Gupta', dept: 'Finance', type: 'Sick Leave', from: '3 Sep', to: '4 Sep', days: 2, status: 'approved' },
  { id: 'L005', name: 'Deepa Verma', dept: 'HR', type: 'Casual Leave', from: '10 Sep', to: '10 Sep', days: 1, status: 'rejected' },
]

export default function LeavePage() {
  const [requests, setRequests] = useState(leaveRequests)

  const approve = (id: string) => setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' } : r))
  const reject = (id: string) => setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r))

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">🌴 Leave Management</h1>
        <p className="text-gray-400 text-sm mt-1">Manage employee leave requests.</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Pending Requests', value: '3', color: 'text-yellow-400' },
          { label: 'Approved', value: '18', color: 'text-green-400' },
          { label: 'Rejected', value: '4', color: 'text-red-400' },
          { label: 'On Leave Today', value: '21', color: 'text-blue-400' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">{kpi.label}</p>
            <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#2a2a3a]">
          <h2 className="text-white font-semibold">Leave Requests</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a3a] bg-[#1a1a2e]">
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Employee</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Type</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Duration</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Days</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Status</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="border-b border-[#2a2a3a] hover:bg-[#1a1a2e] transition-colors">
                <td className="px-5 py-3">
                  <p className="text-white font-medium">{r.name}</p>
                  <p className="text-gray-500 text-xs">{r.dept}</p>
                </td>
                <td className="px-5 py-3 text-gray-300">{r.type}</td>
                <td className="px-5 py-3 text-gray-300">{r.from} → {r.to}</td>
                <td className="px-5 py-3 text-white font-bold">{r.days}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    r.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                    r.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>{r.status}</span>
                </td>
                <td className="px-5 py-3">
                  {r.status === 'pending' && (
                    <div className="flex gap-2">
                      <button onClick={() => approve(r.id)} className="px-3 py-1 text-xs font-bold text-white rounded-lg bg-green-600 hover:bg-green-700">Approve</button>
                      <button onClick={() => reject(r.id)} className="px-3 py-1 text-xs font-bold text-white rounded-lg bg-red-600 hover:bg-red-700">Reject</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}