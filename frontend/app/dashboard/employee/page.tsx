export default function EmployeeDashboard() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Employee Dashboard</h1>
        <p className="text-gray-400 mt-1">Your personal workspace — attendance, leave, payslips.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Days Present', value: '21', change: 'This month', up: true },
          { label: 'Leave Balance', value: '8 days', change: '2 used this year', up: true },
          { label: 'Next Salary', value: '₹45,000', change: 'Due in 12 days', up: true },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <p className="text-gray-400 text-sm mb-2">{kpi.label}</p>
            <p className="text-white text-2xl font-bold">{kpi.value}</p>
            <p className="text-green-400 text-sm mt-1">{kpi.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4">Recent Attendance</h2>
          <div className="space-y-2">
            {[
              { date: 'Mon, 2 Sep', in: '09:02', out: '18:15', status: 'present' },
              { date: 'Tue, 3 Sep', in: '09:18', out: '18:30', status: 'present' },
              { date: 'Wed, 4 Sep', in: '09:05', out: '18:00', status: 'present' },
              { date: 'Thu, 5 Sep', in: '--', out: '--', status: 'leave' },
            ].map((a) => (
              <div key={a.date} className="flex items-center justify-between py-2 border-b border-[#2a2a3a]">
                <span className="text-gray-400 text-sm">{a.date}</span>
                <span className="text-gray-300 text-sm">{a.in} → {a.out}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  a.status === 'present' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { label: 'Apply for Leave', icon: '📅' },
              { label: 'Download Payslip', icon: '📄' },
              { label: 'View Salary Slip', icon: '💰' },
              { label: 'Mark Attendance', icon: '✅' },
            ].map((action) => (
              <button
                key={action.label}
                className="w-full flex items-center gap-3 bg-[#1a1a2e] hover:bg-[#2a2a3e] border border-[#2a2a3a] rounded-lg px-4 py-3 text-sm text-gray-300 transition-colors"
              >
                <span>{action.icon}</span>
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}