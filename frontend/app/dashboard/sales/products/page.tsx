'use client'

const products = [
  { id: 'P001', name: 'Product A — Steel Components', category: 'Manufacturing', revenue: '₹4.2 Cr', units: 8400, growth: '+18%', margin: '32%', status: 'top' },
  { id: 'P002', name: 'Product B — Electronic Parts', category: 'Electronics', revenue: '₹3.8 Cr', units: 6200, growth: '+12%', margin: '28%', status: 'good' },
  { id: 'P003', name: 'Product C — Packaging Solutions', category: 'Packaging', revenue: '₹2.9 Cr', units: 12000, growth: '-5%', margin: '18%', status: 'declining' },
  { id: 'P004', name: 'Product D — Custom Parts', category: 'Custom', revenue: '₹1.7 Cr', units: 3400, growth: '+22%', margin: '42%', status: 'top' },
]

export default function ProductsPage() {
  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">📦 Products</h1>
        <p className="text-gray-400 text-sm mt-1">Product performance and revenue breakdown.</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Products', value: '24', icon: '📦', color: 'text-blue-400' },
          { label: 'Top Performers', value: '8', icon: '⭐', color: 'text-yellow-400' },
          { label: 'Declining', value: '3', icon: '📉', color: 'text-red-400' },
          { label: 'Avg Margin', value: '30%', icon: '💰', color: 'text-green-400' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span>{kpi.icon}</span>
              <p className="text-gray-400 text-xs">{kpi.label}</p>
            </div>
            <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a3a] bg-[#1a1a2e]">
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Product</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Category</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Revenue</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Units Sold</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Growth</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Margin</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-[#2a2a3a] hover:bg-[#1a1a2e] transition-colors">
                <td className="px-5 py-3">
                  <p className="text-white font-medium">{p.name}</p>
                  <p className="text-gray-500 text-xs">{p.id}</p>
                </td>
                <td className="px-5 py-3 text-gray-300">{p.category}</td>
                <td className="px-5 py-3 text-white font-bold">{p.revenue}</td>
                <td className="px-5 py-3 text-gray-300">{p.units.toLocaleString()}</td>
                <td className={`px-5 py-3 font-medium ${p.growth.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{p.growth}</td>
                <td className="px-5 py-3 text-purple-400 font-medium">{p.margin}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    p.status === 'top' ? 'bg-yellow-500/20 text-yellow-400' :
                    p.status === 'good' ? 'bg-green-500/20 text-green-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}