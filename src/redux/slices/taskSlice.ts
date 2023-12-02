import { createSlice } from "@reduxjs/toolkit"
import { addTask, getTasksData } from "../thunks/taskThunk"


const initialState: any = {
    tasks: [],
    loading: false,
    error: null
}

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: {
        [addTask.pending as any]: (state) => {
            state.loading = true
        },
        [addTask.fulfilled as any]: (state, action) => {
            state.loading = false
            state.tasks.push(action.payload)
        },
        [addTask.rejected as any]: (state, action) => {
            state.loading = false
            state.error = action.error.message
        },
        [getTasksData.pending as any]: (state, action) => {
            state.loading = true
            if (action && action.payload) {

                state.loading = true;
                state[action.meta.arg] = { tasks: [] };
            }
        },
        [getTasksData.fulfilled as any]: (state, action) => {
            if (action && action.payload) {

                state.loading = true;
                state[action.meta.arg.processId] = { tasks: action.payload }
            }
        },
        [getTasksData.rejected as any]: (state, action) => {
            if (action && action.payload) {
                state.loading = true;
                state[action.meta.arg.processId] = { tasks: [] };
            }
        }
    }
})

export default taskSlice.reducer
