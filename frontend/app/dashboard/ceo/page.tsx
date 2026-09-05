export default function CEODashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Good Evening, Aarav 👋
        </h1>
        <p className="text-gray-400 mt-1">
          Your company is stable, but there are important insights to act on.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Revenue', value: '₹12.6 Cr', change: '+12%', up: true },
          { label: 'Net Profit', value: '₹2.3 Cr', change: '+8%', up: true },
          { label: 'Production Output', value: '24,560 units', change: '-6%', up: false },
          { label: 'Inventory Value', value: '₹3.4 Cr', change: '+4%', up: true },
          { label: 'Cash Balance', value: '₹1.8 Cr', change: '-12%', up: false },
          { label: 'Outstanding Receivables', value: '₹2.1 Cr', change: '+15%', up: true },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5"
          >
            <p className="text-gray-400 text-sm mb-2">{kpi.label}</p>
            <p className="text-white text-2xl font-bold">{kpi.value}</p>
            <p className={`text-sm mt-1 ${kpi.up ? 'text-green-400' : 'text-red-400'}`}>
              {kpi.change} vs last month
            </p>
          </div>
        ))}
      </div>

      {/* Placeholder sections */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4">Company Health Score</h2>
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <p className="text-6xl font-bold text-purple-400">76</p>
              <p className="text-gray-400 text-sm mt-1">/ 100 — Good</p>
            </div>
          </div>
        </div>

        <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
          <h2 className="text-white font-semibold mb-4">Critical Alerts</h2>
          <div className="space-y-3">
            {[
              { msg: 'Cash balance dropped 12% this month', level: 'high' },
              { msg: 'Supplier X delivery delayed 3 times', level: 'high' },
              { msg: 'Production efficiency below target', level: 'medium' },
            ].map((alert) => (
              <div
                key={alert.msg}
                className={`flex items-start gap-3 p-3 rounded-lg ${
                  alert.level === 'high'
                    ? 'bg-red-500/10 border border-red-500/20'
                    : 'bg-yellow-500/10 border border-yellow-500/20'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    alert.level === 'high' ? 'bg-red-400' : 'bg-yellow-400'
                  }`}
                />
                <p className="text-gray-300 text-sm">{alert.msg}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}