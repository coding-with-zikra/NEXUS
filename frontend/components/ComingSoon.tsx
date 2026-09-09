export default function ComingSoon({ title, icon }: { title: string; icon?: string }) {
  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-96">
      <div className="text-6xl mb-4">{icon || '🚧'}</div>
      <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
      <p className="text-gray-400 text-sm">This page is under construction. Check back soon.</p>
    </div>
  )
}