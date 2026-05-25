import { supabase } from './supabase'
import type { User, Session, Story, UserRow } from './types'

export async function fetchStats(from: string, to: string) {
  const [usersRes, sessionsRes, storiesRes] = await Promise.all([
    supabase.from('users').select('id', { count: 'exact', head: true }),
    supabase.from('sessions').select('id', { count: 'exact', head: true })
      .gte('created_at', from).lte('created_at', to),
    supabase.from('stories').select('id', { count: 'exact', head: true })
      .gte('created_at', from).lte('created_at', to),
  ])

  return {
    totalUsers: usersRes.count ?? 0,
    totalSessions: sessionsRes.count ?? 0,
    totalStories: storiesRes.count ?? 0,
  }
}

export async function fetchDashboardData(from: string, to: string): Promise<UserRow[]> {
  const [usersRes, sessionsRes, storiesRes] = await Promise.all([
    supabase
      .from('users')
      .select('id,phone,parent_name,name,language,state,created_at')
      .order('created_at', { ascending: false }),
    supabase
      .from('sessions')
      .select('id,user_id,status,room_url,recording_url,recording_duration,created_at')
      .gte('created_at', from)
      .lte('created_at', to)
      .order('created_at', { ascending: false }),
    supabase
      .from('stories')
      .select('id,user_id,session_id,story_text,language,created_at')
      .gte('created_at', from)
      .lte('created_at', to)
      .order('created_at', { ascending: false }),
  ])

  if (usersRes.error) throw new Error(`Users: ${usersRes.error.message}`)
  if (sessionsRes.error) throw new Error(`Sessions: ${sessionsRes.error.message}`)
  if (storiesRes.error) throw new Error(`Stories: ${storiesRes.error.message}`)

  const users = (usersRes.data ?? []) as User[]
  const sessions = (sessionsRes.data ?? []) as Session[]
  const stories = (storiesRes.data ?? []) as Story[]

  const sessionsByUser = new Map<string, Session[]>()
  for (const s of sessions) {
    if (!sessionsByUser.has(s.user_id)) sessionsByUser.set(s.user_id, [])
    sessionsByUser.get(s.user_id)!.push(s)
  }

  const storiesByUser = new Map<string, Story[]>()
  for (const s of stories) {
    if (!storiesByUser.has(s.user_id)) storiesByUser.set(s.user_id, [])
    storiesByUser.get(s.user_id)!.push(s)
  }

  return users
    .map(u => ({
      ...u,
      sessions: sessionsByUser.get(u.id) ?? [],
      stories: storiesByUser.get(u.id) ?? [],
    }))
    .filter(u => u.sessions.length > 0 || u.stories.length > 0)
}
