'use client'

const overtimeData = [
  { name: 'Sara Khan', dept: 'Production', hours: 18, rate: '₹150/hr', amount: '₹2,700', month: 'Sep 2026' },
  { name: 'Rohan Patel', dept: 'Production', hours: 14, rate: '₹150/hr', amount: '₹2,100', month: 'Sep 2026' },
  { name: 'Amit Singh', dept: 'Sales', hours: 10, rate: '₹200/hr', amount: '₹2,000', month: 'Sep 2026' },
  { name: 'Raj Kumar', dept: 'Operations', hours: 8, rate: '₹250/hr', amount: '₹2,000', month: 'Sep 2026' },
  { name: 'Neha Gupta', dept: 'Finance', hours: 6, rate: '₹180/hr', amount: '₹1,080', month: 'Sep 2026' },
]

export default function OvertimePage() {
  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">⏱️ Overtime Management</h1>
        <p className="text-gray-400 text-sm mt-1">Track and manage employee overtime hours and payments.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total OT Hours', value: '312 hrs', color: 'text-blue-400' },
          { label: 'Total OT Cost', value: '₹12.5L', color: 'text-orange-400' },
          { label: 'Employees with OT', value: '84', color: 'text-purple-400' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">{kpi.label}</p>
            <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a3a] bg-[#1a1a2e]">
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Employee</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Department</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">OT Hours</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Rate</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Amount</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Month</th>
            </tr>
          </thead>
          <tbody>
            {overtimeData.map((o) => (
              <tr key={o.name} className="border-b border-[#2a2a3a] hover:bg-[#1a1a2e] transition-colors">
                <td className="px-5 py-3 text-white font-medium">{o.name}</td>
                <td className="px-5 py-3 text-gray-300">{o.dept}</td>
                <td className="px-5 py-3 text-orange-400 font-bold">{o.hours} hrs</td>
                <td className="px-5 py-3 text-gray-300">{o.rate}</td>
                <td className="px-5 py-3 text-white font-bold">{o.amount}</td>
                <td className="px-5 py-3 text-gray-400">{o.month}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}