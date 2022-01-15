import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Task from '../../models/Task'

type State = { tasks: Task[]; loading: boolean }

const initialState: State = {
  tasks: [],
  loading: false,
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Note: No need to worry about immutability since Immer handles it
    createTask: (state: State, { payload }: PayloadAction<{ task: Task }>) => {
      state.tasks.push(payload.task)
    },
    readTasks: (state: State, { payload }: PayloadAction<{ tasks: Task[] }>) => {
      state.tasks = payload.tasks
    },
    updateTask: (state: State, { payload }: PayloadAction<{ updatedTask: Task }>) => {
      const index = state.tasks.findIndex(({ id }) => id === payload.updatedTask.id)
      state.tasks[index] = payload.updatedTask
    },
    deleteTask: (state: State, { payload }: PayloadAction<{ id: number }>) => {
      const index = state.tasks.findIndex(({ id }) => id === payload.id)
      state.tasks.splice(index, 1)
    },
    startLoading: (state: State) => {
      state.loading = true
    },
    stopLoading: (state: State) => {
      state.loading = false
    },
  },
})

export const tasksReducer = tasksSlice.reducer
export const { createTask, readTasks, updateTask, deleteTask } = tasksSlice.actions
