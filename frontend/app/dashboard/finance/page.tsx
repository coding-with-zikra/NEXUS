export default function FinanceDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Finance & CA</h1>
        <p className="text-gray-400 mt-1">
          P&L, cash flow, invoices, and audit intelligence.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Revenue', value: '₹12.6 Cr', change: '+12%', up: true },
          { label: 'Total Expenses', value: '₹10.3 Cr', change: '+18%', up: false },
          { label: 'Net Profit', value: '₹2.3 Cr', change: '+8%', up: true },
          { label: 'Cash Balance', value: '₹1.8 Cr', change: '-12%', up: false },
          { label: 'Pending Invoices', value: '₹2.1 Cr', change: '23 invoices', up: true },
          { label: 'GST Liability', value: '₹0.9 Cr', change: 'Due in 12 days', up: false },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5"
          >
            <p className="text-gray-400 text-sm mb-2">{kpi.label}</p>
            <p className="text-white text-2xl font-bold">{kpi.value}</p>
            <p className={`text-sm mt-1 ${kpi.up ? 'text-green-400' : 'text-red-400'}`}>
              {kpi.change}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6">
        <h2 className="text-white font-semibold mb-4">
          Charts coming in Day 2 — P&L, Cash Flow, Expenses
        </h2>
        <div className="h-48 flex items-center justify-center border border-dashed border-[#2a2a3a] rounded-lg">
          <p className="text-gray-500 text-sm">Recharts graphs load here</p>
        </div>
      </div>
    </div>
  )
}