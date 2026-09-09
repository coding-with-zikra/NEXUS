'use client'

const inventoryItems = [
  { id: 'INV-001', name: 'Raw Steel', category: 'Raw Material', quantity: 180, unit: 'tons', minStock: 300, value: '₹54L', status: 'critical' },
  { id: 'INV-002', name: 'Electronic Components', category: 'Components', quantity: 4500, unit: 'units', minStock: 2000, value: '₹22.5L', status: 'good' },
  { id: 'INV-003', name: 'Packaging Material', category: 'Packaging', quantity: 12000, unit: 'boxes', minStock: 5000, value: '₹6L', status: 'good' },
  { id: 'INV-004', name: 'Chemical Solvent', category: 'Chemicals', quantity: 450, unit: 'liters', minStock: 500, value: '₹9L', status: 'low' },
  { id: 'INV-005', name: 'Finished Product A', category: 'Finished Goods', quantity: 3200, unit: 'units', minStock: 1000, value: '₹128L', status: 'good' },
  { id: 'INV-006', name: 'Finished Product B', category: 'Finished Goods', quantity: 1800, unit: 'units', minStock: 800, value: '₹72L', status: 'good' },
  { id: 'INV-007', name: 'Spare Parts Kit', category: 'Maintenance', quantity: 85, unit: 'kits', minStock: 100, value: '₹8.5L', status: 'low' },
]

export default function InventoryPage() {
  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">📦 Inventory</h1>
        <p className="text-gray-400 text-sm mt-1">Track stock levels, value and reorder points.</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Items', value: '1,245', color: 'text-blue-400' },
          { label: 'Critical Stock', value: '1', color: 'text-red-400' },
          { label: 'Low Stock', value: '2', color: 'text-yellow-400' },
          { label: 'Total Value', value: '₹3.4 Cr', color: 'text-green-400' },
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
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Item</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Category</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Quantity</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Min Stock</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Value</th>
              <th className="text-left px-5 py-3 text-gray-400 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map((item) => (
              <tr key={item.id} className="border-b border-[#2a2a3a] hover:bg-[#1a1a2e] transition-colors">
                <td className="px-5 py-3">
                  <p className="text-white font-medium">{item.name}</p>
                  <p className="text-gray-500 text-xs">{item.id}</p>
                </td>
                <td className="px-5 py-3 text-gray-300">{item.category}</td>
                <td className="px-5 py-3 text-white font-bold">{item.quantity.toLocaleString()} {item.unit}</td>
                <td className="px-5 py-3 text-gray-400">{item.minStock.toLocaleString()}</td>
                <td className="px-5 py-3 text-blue-400 font-medium">{item.value}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'good' ? 'bg-green-500/20 text-green-400' :
                    item.status === 'low' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}