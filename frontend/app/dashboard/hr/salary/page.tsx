'use client'

const salaryData = [
  { dept: 'Management', employees: 5, totalSalary: '₹18.5L', avgSalary: '₹3.7L', overtime: '₹0.8L' },
  { dept: 'Finance', employees: 12, totalSalary: '₹14.2L', avgSalary: '₹1.18L', overtime: '₹0.5L' },
  { dept: 'Operations', employees: 45, totalSalary: '₹38.5L', avgSalary: '₹85K', overtime: '₹4.2L' },
  { dept: 'Production', employees: 280, totalSalary: '₹84.0L', avgSalary: '₹30K', overtime: '₹6.5L' },
  { dept: 'Sales', employees: 38, totalSalary: '₹28.5L', avgSalary: '₹75K', overtime: '₹1.2L' },
  { dept: 'HR', employees: 15, totalSalary: '₹11.3L', avgSalary: '₹75K', overtime: '₹0.3L' },
]

export default function SalaryPage() {
  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">💰 Salary Management</h1>
        <p className="text-gray-400 text-sm mt-1">Department-wise salary breakdown and payroll management.</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Monthly Payroll', value: '₹1.8 Cr', color: 'text-blue-400' },
          { label: 'Total Overtime', value: '₹13.5L', color: 'text-orange-400' },
          { label: 'Avg Salary', value: '₹37.3K', color: 'text-purple-400' },
          { label: 'Next Payroll Date', value: '30 Sep', color: 'text-green-400' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">{kpi.label}</p>
            <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#2a2a3a]">
          <h2 className="text-white font-semibold">Department-wise Salary Breakdown</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a3a] bg-[#1a1a2e]">
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Department</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Employees</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Total Salary</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Avg Salary</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Overtime</th>
            </tr>
          </thead>
          <tbody>
            {salaryData.map((s) => (
              <tr key={s.dept} className="border-b border-[#2a2a3a] hover:bg-[#1a1a2e] transition-colors">
                <td className="px-5 py-3 text-white font-medium">{s.dept}</td>
                <td className="px-5 py-3 text-gray-300">{s.employees}</td>
                <td className="px-5 py-3 text-white font-bold">{s.totalSalary}</td>
                <td className="px-5 py-3 text-blue-400">{s.avgSalary}</td>
                <td className="px-5 py-3 text-orange-400">{s.overtime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}