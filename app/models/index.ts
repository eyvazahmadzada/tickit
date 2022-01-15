export interface Task {
  id?: number
  content: string
  status: 'progress' | 'done'
  created_at?: Date
  updated_at?: Date
}

export interface Theme {
  body: string
  text: string
}
