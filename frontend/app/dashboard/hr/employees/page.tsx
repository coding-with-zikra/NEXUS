'use client'

import { useState } from 'react'

const employees = [
  { id: 'E001', name: 'Aarav Sharma', role: 'CEO', dept: 'Management', salary: '₹2.5L', status: 'active', attendance: '98%', joined: 'Jan 2020' },
  { id: 'E002', name: 'Priya Mehta', role: 'CA / Finance', dept: 'Finance', salary: '₹1.8L', status: 'active', attendance: '96%', joined: 'Mar 2021' },
  { id: 'E003', name: 'Raj Kumar', role: 'Operations Manager', dept: 'Operations', salary: '₹1.5L', status: 'active', attendance: '94%', joined: 'Jun 2020' },
  { id: 'E004', name: 'Sara Khan', role: 'Employee', dept: 'Production', salary: '₹45K', status: 'active', attendance: '92%', joined: 'Sep 2022' },
  { id: 'E005', name: 'Amit Singh', role: 'Sales Manager', dept: 'Sales', salary: '₹1.2L', status: 'active', attendance: '90%', joined: 'Feb 2021' },
  { id: 'E006', name: 'Deepa Verma', role: 'HR Manager', dept: 'HR', salary: '₹95K', status: 'active', attendance: '97%', joined: 'Apr 2020' },
  { id: 'E007', name: 'Rohan Patel', role: 'Machine Operator', dept: 'Production', salary: '₹38K', status: 'leave', attendance: '85%', joined: 'Jan 2023' },
  { id: 'E008', name: 'Neha Gupta', role: 'Accountant', dept: 'Finance', salary: '₹65K', status: 'active', attendance: '95%', joined: 'Jul 2021' },
]

export default function EmployeesPage() {
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('All')

  const filtered = employees.filter(e =>
    (deptFilter === 'All' || e.dept === deptFilter) &&
    (e.name.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase()))
  )

  const depts = ['All', 'Management', 'Finance', 'Operations', 'Production', 'Sales', 'HR']

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">👥 Employees</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your workforce.</p>
        </div>
        <button className="px-4 py-2 text-sm font-bold text-white rounded-lg"
          style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}>
          + Add Employee
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Employees', value: '482', color: 'text-blue-400' },
          { label: 'Present Today', value: '461', color: 'text-green-400' },
          { label: 'On Leave', value: '21', color: 'text-yellow-400' },
          { label: 'New This Month', value: '+12', color: 'text-purple-400' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">{kpi.label}</p>
            <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search employees..."
          className="flex-1 bg-[#13131a] border border-[#2a2a3a] text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
        />
        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="bg-[#13131a] border border-[#2a2a3a] text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none"
        >
          {depts.map(d => <option key={d} value={d} style={{ background: '#13131a' }}>{d}</option>)}
        </select>
      </div>

      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a3a] bg-[#1a1a2e]">
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Employee</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Department</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Salary</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Attendance</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Joined</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id} className="border-b border-[#2a2a3a] hover:bg-[#1a1a2e] transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      {e.name[0]}
                    </div>
                    <div>
                      <p className="text-white font-medium">{e.name}</p>
                      <p className="text-gray-500 text-xs">{e.role}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-gray-300">{e.dept}</td>
                <td className="px-5 py-3 text-white font-bold">{e.salary}</td>
                <td className="px-5 py-3">
                  <span className={`font-medium ${parseInt(e.attendance) >= 95 ? 'text-green-400' : parseInt(e.attendance) >= 90 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {e.attendance}
                  </span>
                </td>
                <td className="px-5 py-3 text-gray-400">{e.joined}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${e.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {e.status}
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