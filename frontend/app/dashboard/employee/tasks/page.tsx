'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TasksPage() {
  const router = useRouter()

  const [tasks, setTasks] = useState([
    { id: 1, task: 'Complete report', done: true },
    { id: 2, task: 'Team meeting', done: false },
    { id: 3, task: 'Update records', done: false },
    { id: 4, task: 'Reply to client email', done: false },
    { id: 5, task: 'Submit timesheet', done: false },
  ])

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  return (
    <div className="p-6 max-w-3xl">
      <button
        onClick={() => router.push('/dashboard/employee')}
        className="text-blue-400 text-sm mb-4 hover:underline"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-2xl font-bold text-white mb-6">My Tasks</h1>

      <div className="rounded-2xl border border-[#2a2a3a] p-5 space-y-3" style={{ background: 'rgba(15,20,40,0.8)' }}>
        {tasks.map((t) => (
          <div key={t.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer" onClick={() => toggleTask(t.id)}>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
              t.done ? 'bg-green-500' : 'border-2 border-gray-600'
            }`}>
              {t.done && <span className="text-white text-xs">✓</span>}
            </div>
            <span className={`text-sm ${t.done ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
              {t.task}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}