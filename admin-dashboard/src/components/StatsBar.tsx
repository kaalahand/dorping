interface Props {
  totalUsers: number
  totalSessions: number
  totalStories: number
  loading: boolean
}

export default function StatsBar({ totalUsers, totalSessions, totalStories, loading }: Props) {
  const tiles = [
    { label: 'Total Users', value: totalUsers, color: 'text-violet-400' },
    { label: 'Sessions (range)', value: totalSessions, color: 'text-sky-400' },
    { label: 'Stories (range)', value: totalStories, color: 'text-emerald-400' },
  ]

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {tiles.map(({ label, value, color }) => (
        <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{label}</p>
          <p className={`text-3xl font-bold ${color}`}>
            {loading ? <span className="opacity-40">—</span> : value.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  )
}
