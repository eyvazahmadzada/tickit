export interface Task {
  id?: number
  content: string
  status: 'progress' | 'done'
  created_at?: number
  updated_at?: number
}

export interface Theme {
  body: string
  text: string
}
