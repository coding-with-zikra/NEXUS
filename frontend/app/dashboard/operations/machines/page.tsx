'use client'

const machines = [
  { id: 'M-01', name: 'CNC Machine #01', type: 'CNC', status: 'running', efficiency: 92, lastMaint: '15 Aug', nextMaint: '15 Nov', downtime: '0.8%' },
  { id: 'M-02', name: 'Lathe Machine #02', type: 'Lathe', status: 'running', efficiency: 88, lastMaint: '20 Aug', nextMaint: '20 Nov', downtime: '1.2%' },
  { id: 'M-03', name: 'Drill Press #03', type: 'Drill', status: 'running', efficiency: 91, lastMaint: '10 Aug', nextMaint: '10 Nov', downtime: '0.9%' },
  { id: 'M-04', name: 'Hydraulic Press #04', type: 'Press', status: 'maintenance', efficiency: 45, lastMaint: '1 Jun', nextMaint: 'OVERDUE', downtime: '18.5%' },
  { id: 'M-05', name: 'Welding Station #05', type: 'Welding', status: 'running', efficiency: 85, lastMaint: '5 Sep', nextMaint: '5 Dec', downtime: '2.1%' },
  { id: 'M-06', name: 'Assembly Line #06', type: 'Assembly', status: 'running', efficiency: 89, lastMaint: '12 Aug', nextMaint: '12 Nov', downtime: '1.5%' },
  { id: 'M-07', name: 'Grinder #07', type: 'Grinder', status: 'warning', efficiency: 72, lastMaint: '10 Mar', nextMaint: 'OVERDUE', downtime: '5.8%' },
]

export default function MachinesPage() {
  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">⚙️ Machine Health</h1>
        <p className="text-gray-400 text-sm mt-1">Monitor all machines, downtime and maintenance schedules.</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Machines', value: '14', color: 'text-blue-400' },
          { label: 'Running', value: '11', color: 'text-green-400' },
          { label: 'Under Maintenance', value: '2', color: 'text-red-400' },
          { label: 'Warning', value: '1', color: 'text-yellow-400' },
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
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Machine</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Type</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Efficiency</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Downtime</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Last Maintenance</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Next Maintenance</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {machines.map((m) => (
              <tr key={m.id} className="border-b border-[#2a2a3a] hover:bg-[#1a1a2e] transition-colors">
                <td className="px-5 py-3">
                  <p className="text-white font-medium">{m.name}</p>
                  <p className="text-gray-500 text-xs">{m.id}</p>
                </td>
                <td className="px-5 py-3 text-gray-300">{m.type}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-[#2a2a3a] rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${m.efficiency >= 80 ? 'bg-green-400' : m.efficiency >= 60 ? 'bg-yellow-400' : 'bg-red-400'}`}
                        style={{ width: `${m.efficiency}%` }} />
                    </div>
                    <span className={`text-xs font-bold ${m.efficiency >= 80 ? 'text-green-400' : m.efficiency >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {m.efficiency}%
                    </span>
                  </div>
                </td>
                <td className={`px-5 py-3 font-medium ${parseFloat(m.downtime) > 5 ? 'text-red-400' : parseFloat(m.downtime) > 2 ? 'text-yellow-400' : 'text-green-400'}`}>
                  {m.downtime}
                </td>
                <td className="px-5 py-3 text-gray-400">{m.lastMaint}</td>
                <td className={`px-5 py-3 font-medium ${m.nextMaint === 'OVERDUE' ? 'text-red-400' : 'text-gray-300'}`}>
                  {m.nextMaint}
                </td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    m.status === 'running' ? 'bg-green-500/20 text-green-400' :
                    m.status === 'maintenance' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>{m.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}