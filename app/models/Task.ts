export default interface Task {
  id?: number
  content: string
  status: 'progress' | 'done'
  created_at?: Date
  updated_at?: Date
}
