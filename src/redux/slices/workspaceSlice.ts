import { createSlice } from "@reduxjs/toolkit"
import { WorkspaceProps } from "../../app/App.interface";
import { getWorkspaceData } from "../thunks/workspaceThunk";
import { addProcess } from "../thunks/processThunk";
import { addBoard } from "../thunks/boardThunk";

interface WorkspaceInitialStateType {
    workspace: WorkspaceProps[];
    loading: boolean;
    error: string | null
}







const initialState: WorkspaceInitialStateType = {
    workspace: [],
    loading: false,
    error: null
}

export const workspaceSlice = createSlice({
    name: "workspace",
    initialState,
    reducers: {},
    extraReducers: {
        [getWorkspaceData.pending as any]: (state) => {
            state.loading = true
        },
        [getWorkspaceData.fulfilled as any]: (state, action) => {
            state.loading = false
            state.workspace = action.payload
        },
        [getWorkspaceData.rejected as any]: (state, action) => {
            state.loading = false
            state.error = action.error.message
        },
        [addBoard.pending as any]: (state) => {
            state.loading = true
        },
        [addBoard.fulfilled as any]: (state, action) => {
            state.loading = false
            state.workspace.push(action.payload)
        },
        [addBoard.rejected as any]: (state, action) => {
            state.loading = false
            state.error = action.error.message
        },
        [addProcess.pending as any]: (state) => {
            state.loading = true
        },
        [addProcess.fulfilled as any]: (state, action) => {
            state.loading = false
            state.workspace.push(action.payload)
        },
        [addProcess.rejected as any]: (state, action) => {
            state.loading = false
            state.error = action.error.message
        },

    }
});

export default workspaceSlice.reducer;
