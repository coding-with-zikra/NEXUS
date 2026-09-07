'use client'

import { useCallback } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  BackgroundVariant,
} from 'reactflow'
import 'reactflow/dist/style.css'

const nodeStyle = (color: string, textColor = '#fff') => ({
  background: color,
  border: `1px solid ${color}`,
  borderRadius: '12px',
  padding: '10px 16px',
  color: textColor,
  fontSize: '12px',
  fontWeight: 600,
  minWidth: '130px',
  textAlign: 'center' as const,
  boxShadow: `0 0 20px ${color}40`,
})

const initialNodes: Node[] = [
  // Suppliers
  { id: 'supplier-x', position: { x: 0, y: 100 }, data: { label: '🚚 Supplier X\n⚠️ Risk: High' }, style: { ...nodeStyle('#7f1d1d'), border: '2px solid #ef4444' } },
  { id: 'supplier-y', position: { x: 0, y: 220 }, data: { label: '🚚 Supplier Y\n✅ Reliable' }, style: nodeStyle('#1e3a1e') },
  { id: 'supplier-z', position: { x: 0, y: 340 }, data: { label: '🚚 Supplier Z\n✅ Reliable' }, style: nodeStyle('#1e3a1e') },

  // Raw Materials
  { id: 'raw-steel', position: { x: 200, y: 100 }, data: { label: '🔩 Raw Steel\n⚠️ 18 days left' }, style: { ...nodeStyle('#78350f'), border: '2px solid #f59e0b' } },
  { id: 'raw-electronics', position: { x: 200, y: 240 }, data: { label: '⚡ Electronics\n✅ Adequate' }, style: nodeStyle('#1e3a5f') },
  { id: 'raw-packaging', position: { x: 200, y: 360 }, data: { label: '📦 Packaging\n✅ Adequate' }, style: nodeStyle('#1e3a5f') },

  // Production
  { id: 'production', position: { x: 420, y: 220 }, data: { label: '🏭 Production\n24,560 units\n78% efficiency' }, style: { ...nodeStyle('#1e3a8a'), border: '2px solid #3b82f6', minWidth: '150px' } },

  // Machines
  { id: 'machine-04', position: { x: 420, y: 80 }, data: { label: '⚙️ Machine #04\n❌ 4.2% downtime' }, style: { ...nodeStyle('#7f1d1d'), border: '2px solid #ef4444' } },
  { id: 'machine-others', position: { x: 420, y: 380 }, data: { label: '⚙️ Machines #01-12\n✅ Normal' }, style: nodeStyle('#1e3a1e') },

  // Inventory
  { id: 'inventory', position: { x: 640, y: 220 }, data: { label: '📦 Inventory\n1,245 items\n92% in stock' }, style: { ...nodeStyle('#4a1d96'), minWidth: '150px' } },

  // Sales
  { id: 'sales', position: { x: 860, y: 150 }, data: { label: '📈 Sales\n₹12.6 Cr\n+12% growth' }, style: { ...nodeStyle('#065f46'), minWidth: '140px' } },

  // Customers
  { id: 'customers', position: { x: 1060, y: 150 }, data: { label: '👥 Customers\n284 active\n+18 this month' }, style: nodeStyle('#1e3a5f') },

  // Finance
  { id: 'finance', position: { x: 860, y: 320 }, data: { label: '💰 Finance\n₹2.3 Cr profit\n⚠️ Cash tight' }, style: { ...nodeStyle('#713f12'), border: '2px solid #f59e0b', minWidth: '140px' } },

  // HR
  { id: 'hr', position: { x: 640, y: 400 }, data: { label: '👥 HR\n482 employees\n96% attendance' }, style: nodeStyle('#1e3a5f') },

  // Company Health
  { id: 'health', position: { x: 1060, y: 300 }, data: { label: '❤️ Company Health\n76/100 — Good' }, style: { ...nodeStyle('#065f46'), border: '2px solid #10b981', minWidth: '150px' } },
]

const initialEdges: Edge[] = [
  // Suppliers → Raw Materials
  { id: 'e1', source: 'supplier-x', target: 'raw-steel', animated: true, style: { stroke: '#ef4444', strokeWidth: 2 } },
  { id: 'e2', source: 'supplier-y', target: 'raw-electronics', animated: true, style: { stroke: '#10b981', strokeWidth: 1.5 } },
  { id: 'e3', source: 'supplier-z', target: 'raw-packaging', animated: true, style: { stroke: '#10b981', strokeWidth: 1.5 } },

  // Raw Materials → Production
  { id: 'e4', source: 'raw-steel', target: 'production', animated: true, style: { stroke: '#f59e0b', strokeWidth: 2 } },
  { id: 'e5', source: 'raw-electronics', target: 'production', style: { stroke: '#3b82f6', strokeWidth: 1.5 } },
  { id: 'e6', source: 'raw-packaging', target: 'production', style: { stroke: '#3b82f6', strokeWidth: 1.5 } },

  // Machines → Production
  { id: 'e7', source: 'machine-04', target: 'production', animated: true, style: { stroke: '#ef4444', strokeWidth: 2 } },
  { id: 'e8', source: 'machine-others', target: 'production', style: { stroke: '#10b981', strokeWidth: 1.5 } },

  // Production → Inventory
  { id: 'e9', source: 'production', target: 'inventory', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },

  // Inventory → Sales
  { id: 'e10', source: 'inventory', target: 'sales', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },

  // Sales → Customers
  { id: 'e11', source: 'sales', target: 'customers', style: { stroke: '#10b981', strokeWidth: 1.5 } },

  // Sales → Finance
  { id: 'e12', source: 'sales', target: 'finance', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },

  // HR → Production
  { id: 'e13', source: 'hr', target: 'production', style: { stroke: '#6b7280', strokeWidth: 1.5, strokeDasharray: '5,5' } },

  // Finance → Health
  { id: 'e14', source: 'finance', target: 'health', style: { stroke: '#f59e0b', strokeWidth: 1.5 } },

  // Sales → Health
  { id: 'e15', source: 'customers', target: 'health', style: { stroke: '#10b981', strokeWidth: 1.5 } },
]

export default function DigitalTwinPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-white">🌐 Digital Twin</h1>
        <p className="text-gray-400 text-sm mt-1">
          Live simulation of your entire business — see how every part connects and affects each other.
        </p>
      </div>

      {/* Legend */}
      <div className="flex gap-4 flex-wrap">
        {[
          { color: 'bg-red-500', label: 'Critical Issue' },
          { color: 'bg-yellow-500', label: 'Warning' },
          { color: 'bg-green-500', label: 'Healthy' },
          { color: 'bg-blue-500', label: 'Active Flow' },
          { color: 'bg-purple-500', label: 'Processing' },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${l.color}`} />
            <span className="text-gray-400 text-xs">{l.label}</span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-red-500" style={{ background: 'linear-gradient(90deg, #ef4444 50%, transparent 50%)', backgroundSize: '8px' }} />
          <span className="text-gray-400 text-xs">Risk Flow</span>
        </div>
      </div>

      {/* React Flow */}
      <div className="bg-[#0d0d14] border border-[#2a2a3a] rounded-xl overflow-hidden" style={{ height: '600px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          attributionPosition="bottom-left"
        >
          <Background variant={BackgroundVariant.Dots} color="#2a2a3a" gap={20} />
          <Controls style={{ background: '#13131a', border: '1px solid #2a2a3a' }} />
          <MiniMap
            style={{ background: '#13131a', border: '1px solid #2a2a3a' }}
            nodeColor={(node) => node.style?.background as string || '#1a1a2e'}
          />
        </ReactFlow>
      </div>

      {/* Risk Alerts */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { title: 'Supply Chain Risk', desc: 'Supplier X → Raw Steel → Production chain at risk', level: 'critical', icon: '🔴' },
          { title: 'Cash Flow Warning', desc: 'Finance node showing pressure — affects growth decisions', level: 'high', icon: '🟡' },
          { title: 'Machine #04 Impact', desc: 'Machine failure cascading to production efficiency', level: 'high', icon: '🟡' },
        ].map((alert) => (
          <div key={alert.title} className={`bg-[#13131a] border rounded-xl p-4 ${
            alert.level === 'critical' ? 'border-red-500/30' : 'border-yellow-500/30'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <span>{alert.icon}</span>
              <h3 className="text-white text-sm font-medium">{alert.title}</h3>
            </div>
            <p className="text-gray-400 text-xs">{alert.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}