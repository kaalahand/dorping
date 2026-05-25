import { useState } from 'react'
import type { UserRow, Session } from '../lib/types'
import StoryCell from './StoryCell'

interface Props {
  rows: UserRow[]
  loading: boolean
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    pending: 'bg-yellow-900 text-yellow-300',
    link_sent: 'bg-sky-900 text-sky-300',
    recording_received: 'bg-indigo-900 text-indigo-300',
    story_pending: 'bg-orange-900 text-orange-300',
    story_delivered: 'bg-emerald-900 text-emerald-300',
    archived: 'bg-gray-800 text-gray-500',
  }
  const cls = map[status] ?? 'bg-gray-800 text-gray-400'
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cls}`}>
      {status.replace(/_/g, ' ')}
    </span>
  )
}

function SessionSubRows({ sessions }: { sessions: Session[] }) {
  return (
    <div className="ml-10 border-l-2 border-gray-800 pl-4 pb-2 flex flex-col gap-2">
      {sessions.map(s => (
        <div key={s.id} className="grid grid-cols-[200px_160px_1fr_1fr_140px] gap-3 items-center text-xs py-1">
          <span className="text-gray-400 font-mono truncate" title={s.id}>{s.id.slice(0, 16)}…</span>
          <span>{statusBadge(s.status)}</span>

          {/* Recording URL */}
          {s.recording_url ? (
            <a
              href={s.recording_url}
              target="_blank"
              rel="noreferrer"
              className="text-sky-400 hover:text-sky-300 underline underline-offset-2 truncate"
              title={s.recording_url}
            >
              Recording
              {s.recording_duration ? ` (${Math.round(s.recording_duration / 60)}m)` : ''}
            </a>
          ) : (
            <span className="text-gray-600">—</span>
          )}

          {/* Room URL */}
          {s.room_url ? (
            <a
              href={s.room_url}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 truncate"
              title={s.room_url}
            >
              Room link
            </a>
          ) : (
            <span className="text-gray-600">—</span>
          )}

          <span className="text-gray-500">
            {new Date(s.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function SessionsTable({ rows, loading }: Props) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  function toggle(id: string) {
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-600 text-sm">
        Loading…
      </div>
    )
  }

  if (rows.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-600 text-sm">
        No sessions found for this date range.
      </div>
    )
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[32px_160px_160px_80px_80px_180px_140px] gap-3 items-center px-4 py-3 border-b border-gray-800 text-xs text-gray-500 uppercase tracking-widest">
        <span />
        <span>Contact</span>
        <span>Parent</span>
        <span>Sessions</span>
        <span>Stories</span>
        <span>Story URLs</span>
        <span>Joined</span>
      </div>

      {/* Rows */}
      {rows.map(row => {
        const open = expanded.has(row.id)
        return (
          <div key={row.id} className="border-b border-gray-800 last:border-0">
            {/* User row */}
            <div
              className="grid grid-cols-[32px_160px_160px_80px_80px_180px_140px] gap-3 items-center px-4 py-3 hover:bg-gray-800/50 cursor-pointer select-none"
              onClick={() => toggle(row.id)}
            >
              {/* Expand chevron */}
              <span className={`text-gray-500 text-xs transition-transform ${open ? 'rotate-90' : ''}`}>
                {row.sessions.length > 0 ? '▶' : '·'}
              </span>

              {/* Phone */}
              <span className="font-mono text-sm text-gray-200 truncate">{row.phone}</span>

              {/* Parent name */}
              <span className="text-sm text-gray-400 truncate">{row.parent_name ?? '—'}</span>

              {/* Session count */}
              <span className="text-sm text-sky-400 font-semibold">{row.sessions.length}</span>

              {/* Story count */}
              <span className="text-sm text-emerald-400 font-semibold">{row.stories.length}</span>

              {/* Story URLs */}
              <StoryCell stories={row.stories} />

              {/* Joined */}
              <span className="text-xs text-gray-500">
                {new Date(row.created_at).toLocaleDateString('en-GB', {
                  day: '2-digit', month: 'short', year: '2-digit',
                })}
              </span>
            </div>

            {/* Expanded session sub-rows */}
            {open && row.sessions.length > 0 && (
              <div className="bg-gray-950 pb-1">
                {/* Sub-header */}
                <div className="grid grid-cols-[200px_160px_1fr_1fr_140px] gap-3 px-10 py-1 border-b border-gray-800 text-xs text-gray-600 uppercase tracking-widest ml-10 pl-4">
                  <span>Session ID</span>
                  <span>Status</span>
                  <span>Recording</span>
                  <span>Room</span>
                  <span>Date</span>
                </div>
                <SessionSubRows sessions={row.sessions} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
