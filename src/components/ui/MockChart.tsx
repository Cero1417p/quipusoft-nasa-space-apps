export function MockChart({ title }: { title: string }) {
  return (
    <div className="w-full h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-2">📊</div>
        <p className="text-gray-600">{title}</p>
        <p className="text-sm text-gray-400">Chart visualization</p>
      </div>
    </div>
  )
}