import { createAsyncThunk, createSlice, isPending, isRejected } from '@reduxjs/toolkit'
import tasksService from '../../api/services/tasksService'
import { Task } from '../../models'

type State = { entities: Task[]; loading: boolean; error: string | null }

const initialState: State = {
  entities: [],
  loading: false,
  error: null,
}

export const createTask = createAsyncThunk('tasks/create', async (task: Task) => {
  return await tasksService.create(task)
})

export const fetchTasks = createAsyncThunk('tasks/fetch', async () => {
  return await tasksService.read()
})

export const updateTask = createAsyncThunk(
  'tasks/update',
  async ({ id, task }: { id: number; task: Task }) => {
    return await tasksService.update(id, task)
  },
)

export const deleteTask = createAsyncThunk('tasks/delete', async (id: number) => {
  return await tasksService.delete(id)
})

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  // Note: No need to worry about immutability since Immer handles it
  extraReducers: (builder) => {
    // Add specific fulfilled behavior for each
    builder.addCase(createTask.fulfilled, (state, { payload }) => {
      state.entities.push(payload)
    })
    builder.addCase(fetchTasks.fulfilled, (state, { payload }) => {
      state.entities = payload
    })
    builder.addCase(updateTask.fulfilled, (state, { payload }) => {
      const index = state.entities.findIndex(({ id }) => id === payload.id)
      state.entities[index] = payload
    })
    builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
      const index = state.entities.findIndex(({ id }) => id === payload)
      state.entities.splice(index, 1)
    })

    // Use default pending and rejected behavior for all actions
    builder.addMatcher(isPending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addMatcher(isRejected, (state) => {
      state.loading = false
      state.error = 'An error occurred!'
    })
  },
})

export const tasksReducer = tasksSlice.reducer
