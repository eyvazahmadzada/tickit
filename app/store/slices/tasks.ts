import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit'
import tasksService from '../../api/services/tasksService'
import { Task } from '../../models'

type State = {
  entities: Task[]
  loading: boolean
  error: string | null
  success: string | null
}

const initialState: State = {
  entities: [],
  loading: false,
  error: null,
  success: null,
}

export const createTask = createAsyncThunk('tasks/create', async (task: Task) => {
  return await tasksService.create(task)
})

export const fetchTasks = createAsyncThunk(
  'tasks/fetch',
  async (searchKeyword: string | null = null) => {
    return await tasksService.read(searchKeyword)
  },
)

export const updateTask = createAsyncThunk(
  'tasks/update',
  async ({ id, task }: { id: number; task: Task }) => {
    return await tasksService.update(id, task)
  },
)

export const deleteTask = createAsyncThunk('tasks/delete', async (id: number) => {
  await tasksService.delete(id)
  return id
})

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    sortTasks(state, { payload }: PayloadAction<{ key: string; isAsc: boolean }>) {
      const sortBy = payload.key
      const isAsc = payload.isAsc ?? true

      // Sort by content length
      if (sortBy === 'length') {
        state.entities.sort((a, b) => {
          return isAsc ? a.content.length - b.content.length : b.content.length - a.content.length
        })
      }

      // Sort by content in alphabetical order
      else if (sortBy === 'alphabetical') {
        if (isAsc) {
          state.entities.sort((a, b) => {
            return a.content.localeCompare(b.content)
          })
        } else {
          state.entities.sort((a, b) => {
            return b.content.localeCompare(a.content)
          })
        }
      }

      // Sort by date
      else if (sortBy === 'date') {
        state.entities.sort((a, b) => {
          return isAsc ? a.updated_at - b.updated_at : b.updated_at - a.updated_at
        })
      }
    },
  },
  // Note: No need to worry about immutability since Immer handles it
  extraReducers: (builder) => {
    // Add specific fulfilled behavior for each
    builder.addCase(createTask.fulfilled, (state, { payload }) => {
      state.entities.push(payload)
      state.success = 'Task was created'
    })
    builder.addCase(fetchTasks.fulfilled, (state, { payload }) => {
      state.entities = payload
    })
    builder.addCase(updateTask.fulfilled, (state, { payload }) => {
      const index = state.entities.findIndex(({ id }) => id === payload.id)
      state.entities[index] = payload
      state.success = 'Task was updated'
    })
    builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
      const index = state.entities.findIndex(({ id }) => id === payload)
      state.entities.splice(index, 1)
      state.success = 'Task was deleted'
    })

    // Use default loading behavior for all actions
    builder.addMatcher(isPending, (state) => {
      state.loading = true
      state.success = null
    })
    builder.addMatcher(isFulfilled, (state) => {
      state.loading = false
      state.error = null
    })
    builder.addMatcher(isRejected, (state) => {
      state.loading = false
      state.error = 'An error occurred!'
      state.success = null
    })
  },
})

export const { sortTasks } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
