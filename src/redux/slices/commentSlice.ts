import { createSlice } from "@reduxjs/toolkit"
import { addcomment } from "./workspaceSlice"
import { getCommentsData } from "../thunks/workspaceThunk"






const initialState: any = {
    comments: [],
    loading: false,
    error: null,
}


const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: {
        [addcomment.pending as any]: (state) => {
            state.loading = true
        },
        [addcomment.fulfilled as any]: (state, action) => {
            state.loading = false
            state.comments.push(action.payload)
        },
        [addcomment.rejected as any]: (state, action) => {
            state.loading = false
            state.error = action.error.message
        },
        [getCommentsData.pending as any]: (state, action) => {
            state.loading = true
        },
        [getCommentsData.fulfilled as any]: (state, action) => {
            state.loading = false;
            state.comments = action.payload
        },

        [getCommentsData.rejected as any]: (state, action) => {
            state.loading = false;
            state.error = action.error.message
        },
    }
})

export default commentSlice.reducer