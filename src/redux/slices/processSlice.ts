import { createSlice } from "@reduxjs/toolkit"
import { getProcessData } from "../thunks/workspaceThunk"




const initialState = {
    processes: [],
    loading: false,
    error: null
}

const processSlice = createSlice({
    name: "processes",
    initialState,
    reducers: {},
    extraReducers: {
        [getProcessData.pending as any]: (state) => {
            state.loading = true
        },
        [getProcessData.fulfilled as any]: (state, action) => {
            state.loading = false
            state.processes = action.payload
        },
        [getProcessData.rejected as any]: (state, action) => {
            state.loading = false
            state.error = action.error.message
        }
    }
})


export default processSlice.reducer