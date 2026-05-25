import { useEffect, useState, useCallback } from 'react'
import StatsBar from './components/StatsBar'
import DateFilter from './components/DateFilter'
import SessionsTable from './components/SessionsTable'
import { fetchDashboardData, fetchStats } from './lib/api'
import type { UserRow } from './lib/types'

function todayIso() {
  return new Date().toISOString().slice(0, 10)
}

function thirtyDaysAgoIso() {
  const d = new Date()
  d.setDate(d.getDate() - 30)
  return d.toISOString().slice(0, 10)
}

// Append T00:00:00Z / T23:59:59Z so Supabase interprets as full days
function toRangeStart(date: string) { return `${date}T00:00:00.000Z` }
function toRangeEnd(date: string)   { return `${date}T23:59:59.999Z` }

export default function App() {
  const [from, setFrom] = useState(thirtyDaysAgoIso)
  const [to,   setTo]   = useState(todayIso)

  const [stats, setStats] = useState({ totalUsers: 0, totalSessions: 0, totalStories: 0 })
  const [rows, setRows]   = useState<UserRow[]>([])
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [s, r] = await Promise.all([
        fetchStats(toRangeStart(from), toRangeEnd(to)),
        fetchDashboardData(toRangeStart(from), toRangeEnd(to)),
      ])
      setStats(s)
      setRows(r)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setLoading(false)
    }
  }, [from, to])

  useEffect(() => { load() }, [load])

  function handleDateChange(newFrom: string, newTo: string) {
    setFrom(newFrom)
    setTo(newTo)
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Top bar */}
      <header className="border-b border-gray-800 px-8 py-4 flex items-center gap-3">
        <span className="text-lg font-semibold text-white tracking-tight">Reminology</span>
        <span className="text-gray-600 text-lg">·</span>
        <span className="text-sm text-gray-400">Admin Dashboard</span>
        <div className="ml-auto">
          <button
            onClick={load}
            disabled={loading}
            className="text-xs text-gray-400 hover:text-white border border-gray-700 rounded-lg px-3 py-1.5 transition-colors disabled:opacity-40"
          >
            {loading ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>
      </header>

      <main className="px-8 py-6 max-w-[1400px] mx-auto">
        <StatsBar
          totalUsers={stats.totalUsers}
          totalSessions={stats.totalSessions}
          totalStories={stats.totalStories}
          loading={loading}
        />

        <DateFilter from={from} to={to} onChange={handleDateChange} />

        {error && (
          <div className="mb-4 bg-red-950 border border-red-800 text-red-300 rounded-lg px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <SessionsTable rows={rows} loading={loading} />
      </main>
    </div>
  )
}
