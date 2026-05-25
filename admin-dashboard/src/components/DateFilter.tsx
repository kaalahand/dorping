interface Props {
  from: string
  to: string
  onChange: (from: string, to: string) => void
}

export default function DateFilter({ from, to, onChange }: Props) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-xs text-gray-500 uppercase tracking-widest">Date range</span>
      <input
        type="date"
        value={from}
        onChange={e => onChange(e.target.value, to)}
        className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-violet-500"
      />
      <span className="text-gray-600">→</span>
      <input
        type="date"
        value={to}
        onChange={e => onChange(from, e.target.value)}
        className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-violet-500"
      />
    </div>
  )
}
