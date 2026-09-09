'use client'

const suppliers = [
  { id: 'S-001', name: 'Supplier X — Steel Corp', material: 'Raw Steel', contact: 'Vikram Shah', reliability: 42, onTime: '67%', quality: '58%', delays: 3, status: 'critical', spend: '₹28L/month' },
  { id: 'S-002', name: 'Supplier Y — ElecParts', material: 'Electronics', contact: 'Anita Roy', reliability: 84, onTime: '91%', quality: '88%', delays: 0, status: 'good', spend: '₹18L/month' },
  { id: 'S-003', name: 'Supplier Z — PackMart', material: 'Packaging', contact: 'Suresh Kumar', reliability: 79, onTime: '88%', quality: '82%', delays: 1, status: 'good', spend: '₹8L/month' },
  { id: 'S-004', name: 'Supplier W — ChemLabs', material: 'Chemicals', contact: 'Meera Nair', reliability: 61, onTime: '73%', quality: '71%', delays: 2, status: 'warning', spend: '₹12L/month' },
  { id: 'S-005', name: 'Supplier V — SpareParts', material: 'Spare Parts', contact: 'Raj Iyer', reliability: 88, onTime: '92%', quality: '90%', delays: 0, status: 'good', spend: '₹5L/month' },
]

export default function SuppliersPage() {
  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">🚚 Suppliers</h1>
        <p className="text-gray-400 text-sm mt-1">Supplier performance, reliability and risk assessment.</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Suppliers', value: '24', color: 'text-blue-400' },
          { label: 'Critical Risk', value: '1', color: 'text-red-400' },
          { label: 'Warning', value: '2', color: 'text-yellow-400' },
          { label: 'Reliable', value: '21', color: 'text-green-400' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">{kpi.label}</p>
            <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {suppliers.map((s) => (
          <div key={s.id} className={`bg-[#13131a] border rounded-xl p-5 ${
            s.status === 'critical' ? 'border-red-500/30' :
            s.status === 'warning' ? 'border-yellow-500/30' : 'border-[#2a2a3a]'
          }`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold">{s.name}</h3>
                <p className="text-gray-400 text-xs mt-0.5">{s.material} • Contact: {s.contact} • {s.spend}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                s.status === 'critical' ? 'bg-red-500/20 text-red-400' :
                s.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-green-500/20 text-green-400'
              }`}>{s.status}</span>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Reliability Score', value: `${s.reliability}/100`, color: s.reliability >= 75 ? 'text-green-400' : s.reliability >= 50 ? 'text-yellow-400' : 'text-red-400' },
                { label: 'On-Time Delivery', value: s.onTime, color: 'text-blue-400' },
                { label: 'Quality Score', value: s.quality, color: 'text-purple-400' },
                { label: 'Delays This Quarter', value: `${s.delays} delays`, color: s.delays === 0 ? 'text-green-400' : s.delays >= 3 ? 'text-red-400' : 'text-yellow-400' },
              ].map((metric) => (
                <div key={metric.label} className="bg-[#1a1a2e] rounded-lg p-3">
                  <p className="text-gray-500 text-xs mb-1">{metric.label}</p>
                  <p className={`font-bold ${metric.color}`}>{metric.value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}