'use client'

import { useState } from 'react'

const initialTasks = [
  { id: 1, title: 'Prepare monthly production report', priority: 'high', status: 'completed', due: 'Today', dept: 'Operations' },
  { id: 2, title: 'Inspect machine #04 and report findings', priority: 'high', status: 'in-progress', due: 'Today', dept: 'Maintenance' },
  { id: 3, title: 'Review supplier delivery schedule', priority: 'medium', status: 'pending', due: 'Tomorrow', dept: 'Procurement' },
  { id: 4, title: 'Plan next week production targets', priority: 'medium', status: 'pending', due: '12 Sep', dept: 'Planning' },
  { id: 5, title: 'Training session for new equipment', priority: 'low', status: 'pending', due: '15 Sep', dept: 'HR' },
  { id: 6, title: 'Submit overtime report', priority: 'high', status: 'pending', due: 'Today', dept: 'HR' },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? tasks : tasks.filter(t => t.status === filter)

  const updateStatus = (id: number, status: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t))
  }

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">📋 My Tasks</h1>
        <p className="text-gray-400 text-sm mt-1">Track your assigned tasks and update progress.</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Tasks', value: tasks.length, color: 'text-blue-400' },
          { label: 'Completed', value: tasks.filter(t => t.status === 'completed').length, color: 'text-green-400' },
          { label: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length, color: 'text-yellow-400' },
          { label: 'Pending', value: tasks.filter(t => t.status === 'pending').length, color: 'text-red-400' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-1">{kpi.label}</p>
            <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {['all', 'pending', 'in-progress', 'completed'].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
              filter === f ? 'bg-blue-600 text-white' : 'bg-[#13131a] text-gray-400 border border-[#2a2a3a] hover:text-white'
            }`}>{f}</button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((task) => (
          <div key={task.id} className={`bg-[#13131a] border rounded-xl p-4 ${
            task.status === 'completed' ? 'border-green-500/20 opacity-70' :
            task.priority === 'high' ? 'border-red-500/20' :
            task.priority === 'medium' ? 'border-yellow-500/20' : 'border-[#2a2a3a]'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 cursor-pointer ${
                  task.status === 'completed' ? 'bg-green-500 border-green-500' :
                  task.status === 'in-progress' ? 'border-blue-400' : 'border-gray-600'
                }`} onClick={() => updateStatus(task.id, task.status === 'completed' ? 'pending' : 'completed')}>
                  {task.status === 'completed' && <span className="text-white text-xs">✓</span>}
                </div>
                <div>
                  <p className={`text-sm font-medium ${task.status === 'completed' ? 'text-gray-500 line-through' : 'text-white'}`}>
                    {task.title}
                  </p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-gray-500 text-xs">{task.dept}</span>
                    <span className="text-gray-600 text-xs">•</span>
                    <span className={`text-xs ${task.due === 'Today' ? 'text-red-400' : 'text-gray-500'}`}>Due: {task.due}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                  task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>{task.priority}</span>
                {task.status !== 'completed' && (
                  <select
                    value={task.status}
                    onChange={(e) => updateStatus(task.id, e.target.value)}
                    className="bg-[#1a1a2e] border border-[#2a2a3a] text-gray-300 rounded text-xs px-2 py-1 focus:outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}