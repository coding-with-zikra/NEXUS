'use client'

const payslips = [
  { month: 'August 2026', basic: '₹35,000', hra: '₹7,000', overtime: '₹2,500', gross: '₹44,500', pf: '₹4,200', tax: '₹2,100', net: '₹38,200', status: 'paid' },
  { month: 'July 2026', basic: '₹35,000', hra: '₹7,000', overtime: '₹1,800', gross: '₹43,800', pf: '₹4,200', tax: '₹2,000', net: '₹37,600', status: 'paid' },
  { month: 'June 2026', basic: '₹35,000', hra: '₹7,000', overtime: '₹3,200', gross: '₹45,200', pf: '₹4,200', tax: '₹2,200', net: '₹38,800', status: 'paid' },
  { month: 'May 2026', basic: '₹35,000', hra: '₹7,000', overtime: '₹1,200', gross: '₹43,200', pf: '₹4,200', tax: '₹1,900', net: '₹37,100', status: 'paid' },
]

export default function PayslipsPage() {
  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">📄 Payslips</h1>
        <p className="text-gray-400 text-sm mt-1">View and download your monthly payslips.</p>
      </div>

      <div className="space-y-3">
        {payslips.map((p) => (
          <div key={p.month} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">{p.month}</h2>
              <div className="flex gap-3 items-center">
                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">{p.status}</span>
                <button className="px-4 py-1.5 text-xs font-bold text-white rounded-lg"
                  style={{ background: 'linear-gradient(135deg, #1e90ff, #0052cc)' }}>
                  Download PDF
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <p className="text-gray-500 text-xs mb-1">Earnings</p>
                <div className="space-y-1">
                  <div className="flex justify-between"><span className="text-gray-400 text-xs">Basic</span><span className="text-white text-xs">{p.basic}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400 text-xs">HRA</span><span className="text-white text-xs">{p.hra}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400 text-xs">Overtime</span><span className="text-white text-xs">{p.overtime}</span></div>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Deductions</p>
                <div className="space-y-1">
                  <div className="flex justify-between"><span className="text-gray-400 text-xs">PF</span><span className="text-red-400 text-xs">-{p.pf}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400 text-xs">Tax</span><span className="text-red-400 text-xs">-{p.tax}</span></div>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Gross Salary</p>
                <p className="text-white font-bold text-lg">{p.gross}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Net Salary</p>
                <p className="text-green-400 font-bold text-lg">{p.net}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}