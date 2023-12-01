import { createSlice } from "@reduxjs/toolkit"
import { addReply } from "./workspaceSlice"
import { getRepliesesData } from "../thunks/workspaceThunk"




const initialState: any = {
    replieses: [],
    loading: false,
    error: null
}

const replySlice = createSlice({
    name: "replieses",
    initialState,
    reducers: {},
    extraReducers: {
        [addReply.pending as any]: (state) => {
            state.loading = true
        },
        [addReply.fulfilled as any]: (state, action) => {
            state.loading = false
            state.replieses.push(action.payload)
        },
        [addReply.rejected as any]: (state, action) => {
            state.loading = false
            state.error = action.error.message
        },
        [getRepliesesData.pending as any]: (state, action) => {
            state.loading = true
            if (action && action.payload) {

                state.loading = true;
                state[action.meta.arg] = { replieses: [] };
            }
        },
        [getRepliesesData.fulfilled as any]: (state, action) => {
            if (action && action.payload) {
                console.log(action.meta.arg.commentId);

                state.loading = false;
                state[action.meta.arg.commentId] = { replieses: action.payload }
            }
        },
        [getRepliesesData.rejected as any]: (state, action) => {
            if (action && action.payload) {
                state.loading = false;
                state[action.meta.arg.commentId] = { replieses: [] };
            }
        },
    }
})


export default replySlice.reducer