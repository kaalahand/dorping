export interface User {
  id: string
  phone: string
  parent_name: string | null
  name: string | null
  language: string | null
  state: string
  created_at: string
}

export interface Session {
  id: string
  user_id: string
  status: string
  room_url: string | null
  recording_url: string | null
  recording_duration: number | null
  created_at: string
}

export interface Story {
  id: string
  user_id: string
  session_id: string | null
  story_text: string | null
  language: string | null
  created_at: string
}

export interface UserRow extends User {
  sessions: Session[]
  stories: Story[]
}
