import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { WorkspaceProps } from "../../app/App.interface";
import { addBoard, getWorkspaceData } from "../thunks/workspaceThunk";

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
    reducers: {
        updateProcessesOrder: (state, action: PayloadAction<any>) => {
            const { singleWorkspace, newColumn } = action.payload;

            return {
                ...state,
                workspace: state.workspace.map((workspaceItem) => {
                    if (workspaceItem.title === singleWorkspace.title) {
                        return {
                            ...workspaceItem,
                            processes: workspaceItem.processes.map((process) =>
                                process.title === newColumn.title ? newColumn : process
                            ),
                        };
                    }
                    return workspaceItem;
                }),
            };
        },
        updateTasksOrder: (state, action: PayloadAction<any>) => {
            const { singleWorkspace, newDestinationColumn, newsourceProcess } = action.payload;

            return {
                ...state,
                workspace: state.workspace.map((workspaceItem) => {
                    if (workspaceItem.title === singleWorkspace.title) {
                        return {
                            ...workspaceItem,
                            processes: workspaceItem.processes.map((process) => {
                                if (process.title === newsourceProcess.title) return newsourceProcess;
                                if (process.title === newDestinationColumn.title) return newDestinationColumn;
                                return process;
                            }),
                        };
                    }
                    return workspaceItem;
                }),
            };
        },
    },
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

    }
});
export const { updateProcessesOrder, updateTasksOrder } = workspaceSlice.actions

export default workspaceSlice.reducer;
