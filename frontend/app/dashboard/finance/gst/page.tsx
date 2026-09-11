'use client'

export default function GSTPage() {
  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">🧮 GST / Tax</h1>
        <p className="text-gray-400 text-sm mt-1">GST filings, tax liability and compliance status.</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'GST Collected', value: '₹1.8 Cr', sub: 'This month', color: 'text-green-400' },
          { label: 'GST Payable', value: '₹0.9 Cr', sub: 'Net after ITC', color: 'text-red-400' },
          { label: 'Next Filing', value: '16 Sep', sub: '6 days remaining', color: 'text-yellow-400' },
          { label: 'Filing Status', value: 'On Track', sub: 'All returns filed', color: 'text-green-400' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">{kpi.label}</p>
            <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
            <p className="text-gray-500 text-xs mt-0.5">{kpi.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
          <h2 className="text-white font-semibold mb-4">GST Summary This Month</h2>
          <div className="space-y-3">
            {[
              { label: 'Output GST (Sales)', value: '₹1.8 Cr', color: 'text-green-400' },
              { label: 'Input Tax Credit (ITC)', value: '₹0.9 Cr', color: 'text-blue-400' },
              { label: 'Net GST Payable', value: '₹0.9 Cr', color: 'text-red-400' },
              { label: 'CGST', value: '₹0.45 Cr', color: 'text-gray-300' },
              { label: 'SGST', value: '₹0.45 Cr', color: 'text-gray-300' },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-2 border-b border-[#2a2a3a] last:border-0">
                <span className="text-gray-400 text-sm">{item.label}</span>
                <span className={`font-bold ${item.color}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-5">
          <h2 className="text-white font-semibold mb-4">Filing Calendar</h2>
          <div className="space-y-3">
            {[
              { return: 'GSTR-1', period: 'Aug 2026', due: '11 Sep 2026', status: 'filed' },
              { return: 'GSTR-3B', period: 'Aug 2026', due: '20 Sep 2026', status: 'pending' },
              { return: 'GSTR-1', period: 'Sep 2026', due: '11 Oct 2026', status: 'upcoming' },
              { return: 'GSTR-3B', period: 'Sep 2026', due: '20 Oct 2026', status: 'upcoming' },
            ].map((f) => (
              <div key={f.return + f.period} className="flex items-center justify-between p-3 bg-[#1a1a2e] rounded-lg">
                <div>
                  <p className="text-white text-sm font-medium">{f.return} — {f.period}</p>
                  <p className="text-gray-500 text-xs">Due: {f.due}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  f.status === 'filed' ? 'bg-green-500/20 text-green-400' :
                  f.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>{f.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#13131a] border border-yellow-500/20 rounded-xl p-5">
        <h2 className="text-white font-semibold mb-3">⚠️ GST Issues Found</h2>
        <div className="space-y-2">
          {[
            { issue: 'GST mismatch in Invoice #INV-2026-4421 — ₹2.4L discrepancy', severity: 'high' },
            { issue: 'GST mismatch in Invoice #INV-2026-4438 — ₹1.1L discrepancy', severity: 'high' },
            { issue: 'Supplier X ITC claim may be disallowed due to quality disputes', severity: 'medium' },
          ].map((issue, i) => (
            <div key={i} className={`flex gap-3 p-3 rounded-lg ${
              issue.severity === 'high' ? 'bg-red-500/10 border border-red-500/20' : 'bg-yellow-500/10 border border-yellow-500/20'
            }`}>
              <span className={issue.severity === 'high' ? 'text-red-400' : 'text-yellow-400'}>⚠️</span>
              <p className="text-gray-300 text-sm">{issue.issue}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}