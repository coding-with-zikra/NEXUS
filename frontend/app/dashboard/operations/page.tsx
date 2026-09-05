export default function OperationsDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Operations</h1>
        <p className="text-gray-400 mt-1">
          Production, machines, wastage, inventory, and suppliers.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Production Output', value: '24,560', unit: 'units', change: '-6%', up: false },
          { label: 'Efficiency', value: '78%', unit: '', change: '-2%', up: false },
          { label: 'Machine Downtime', value: '4.2%', unit: '', change: '+1%', up: false },
          { label: 'Wastage', value: '2.8%', unit: '', change: '-0.5%', up: true },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5"
          >
            <p className="text-gray-400 text-sm mb-2">{kpi.label}</p>
            <p className="text-white text-2xl font-bold">
              {kpi.value}
              <span className="text-gray-400 text-sm ml-1">{kpi.unit}</span>
            </p>
            <p className={`text-sm mt-1 ${kpi.up ? 'text-green-400' : 'text-red-400'}`}>
              {kpi.change} vs last month
            </p>
          </div>
        ))}
      </div>

      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
        <h2 className="text-white font-semibold mb-4">
          Charts coming in Day 2 — Production, Machines, Inventory
        </h2>
        <div className="h-48 flex items-center justify-center border border-dashed border-[#2a2a3a] rounded-lg">
          <p className="text-gray-500 text-sm">Recharts graphs load here</p>
        </div>
      </div>
    </div>
  )
}