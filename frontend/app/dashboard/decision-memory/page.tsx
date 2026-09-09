'use client'

const decisions = [
  {
    id: 1, title: 'Expanded to Mumbai market', date: 'Mar 2026', status: 'completed',
    prediction: 'Revenue increase of ₹2.5 Cr in 6 months', actual: 'Revenue increased ₹2.1 Cr in 6 months',
    accuracy: 84, lesson: 'Market expansion works but takes 20% longer than projected',
    outcome: 'positive',
  },
  {
    id: 2, title: 'Hired 15 production operators', date: 'Jan 2026', status: 'completed',
    prediction: 'Efficiency increase to 90%, overtime reduction by 30%', actual: 'Efficiency reached 87%, overtime reduced 22%',
    accuracy: 78, lesson: 'Hiring helps but training time reduces initial efficiency gains',
    outcome: 'positive',
  },
  {
    id: 3, title: 'Switched to Supplier Y for electronics', date: 'Nov 2025', status: 'completed',
    prediction: 'Quality improvement, 0 delays', actual: 'Quality improved 18%, 1 minor delay in 6 months',
    accuracy: 92, lesson: 'Supplier diversification significantly reduces quality risk',
    outcome: 'positive',
  },
  {
    id: 4, title: 'Delayed machine maintenance to save ₹4L', date: 'Jun 2025', status: 'completed',
    prediction: 'Save ₹4L in maintenance costs', actual: 'Machine failed, cost ₹18L in repairs + ₹12L lost production',
    accuracy: 12, lesson: 'NEVER delay critical machine maintenance — cost is always higher',
    outcome: 'negative',
  },
]

export default function DecisionMemoryPage() {
  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">🧠 Decision Memory</h1>
        <p className="text-gray-400 text-sm mt-1">
          Learn from past decisions — track predictions vs actual outcomes.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Decisions', value: '24', color: 'text-blue-400' },
          { label: 'Positive Outcomes', value: '18', color: 'text-green-400' },
          { label: 'Negative Outcomes', value: '6', color: 'text-red-400' },
          { label: 'Avg Accuracy', value: '76%', color: 'text-purple-400' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">{kpi.label}</p>
            <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {decisions.map((d) => (
          <div key={d.id} className={`bg-[#13131a] border rounded-xl p-5 ${
            d.outcome === 'positive' ? 'border-green-500/20' : 'border-red-500/20'
          }`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold">{d.title}</h3>
                <p className="text-gray-500 text-xs mt-0.5">{d.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-gray-400 text-xs">Prediction Accuracy</p>
                  <p className={`text-xl font-bold ${d.accuracy >= 80 ? 'text-green-400' : d.accuracy >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {d.accuracy}%
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  d.outcome === 'positive' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>{d.outcome}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-[#1a1a2e] rounded-lg p-3">
                <p className="text-blue-400 text-xs font-medium mb-1">🔮 Prediction</p>
                <p className="text-gray-300 text-sm">{d.prediction}</p>
              </div>
              <div className="bg-[#1a1a2e] rounded-lg p-3">
                <p className="text-purple-400 text-xs font-medium mb-1">📊 Actual Outcome</p>
                <p className="text-gray-300 text-sm">{d.actual}</p>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${d.outcome === 'positive' ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
              <p className={`text-xs font-medium mb-1 ${d.outcome === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
                💡 Lesson Learned
              </p>
              <p className="text-gray-300 text-sm">{d.lesson}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}