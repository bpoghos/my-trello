import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ProcessProps, WorkspaceProps } from "../../app/App.interface";
import { addBoard, getProcessData, getWorkspaceData } from "../thunks/workspaceThunk";
import { addDoc, collection, deleteDoc, doc, setDoc } from "@firebase/firestore";
import { db } from "../../firebase";
import { log } from "console";

interface WorkspaceInitialStateType {
    workspace: WorkspaceProps[];
    loading: boolean;
    error: string | null
}

export const addProcess: any = createAsyncThunk(
    'process/addProcess',
    async ({ payload, id }: { payload: any, id: any }) => {

        try {
            if (!payload) {
                console.error('Error: Payload is undefined.');
                throw new Error('Invalid payload.');
            }

            const docRef = await addDoc(collection(db, "workspace", id, "processes"), payload)
            return { id: docRef.id, ...payload }


        } catch (err) {
            console.log(err);

        }
    }
)


export const addTask = createAsyncThunk(
    "task/addTask",
    async ({ payload, workspaceId, processId }: { payload: any; workspaceId: string; processId: string }) => {
        try {
            if (!payload) {
                console.error('Error: Payload is undefined.');
                throw new Error('Invalid payload.');
            }

            const docRef = await addDoc(collection(db, "workspace", workspaceId, "processes", processId, "tasks"), payload)
            return { id: docRef.id, ...payload }


        } catch (err) {
            console.log(err);

        }

    }
)


export const addcomment = createAsyncThunk(
    "comments/addcomment",
    async ({ payload, workspaceId, processId, taskId }: { payload: any; workspaceId: string; processId: string, taskId: string }) => {
        try {
            if (!payload) {
                console.error('Error: Payload is undefined.');
                throw new Error('Invalid payload.');
            }

            const docRef = await addDoc(collection(db, "workspace", workspaceId, "processes", processId, "tasks", taskId, "comments"), payload)
            return { id: docRef.id, ...payload }


        } catch (err) {
            console.log(err);

        }

    }
)

export const addReply = createAsyncThunk(
    "reply/addReply",
    async ({ payload, workspaceId, processId, taskId, commentId }: { payload: any; workspaceId: string; processId: string, taskId: string, commentId: string }) => {
        try {
            if (!payload) {
                console.error('Error: Payload is undefined.');
                throw new Error('Invalid payload.');
            }

            const docRef = await addDoc(collection(db, "workspace", workspaceId, "processes", processId, "tasks", taskId, "comments", commentId, "replieses"), payload)
            return { id: docRef.id, ...payload }


        } catch (err) {
            console.log(err);

        }

    }
)


export const editTask = createAsyncThunk(
    "task/editTask",
    async ({ payload, workspaceId, processId, taskId }: { payload: any; workspaceId: string; processId: string, taskId: any }) => {
        try {
            if (!payload) {
                console.error('Error: Payload is undefined.');
                throw new Error('Invalid payload.');
            }

            const taskRef = doc(db, 'workspace', workspaceId, 'processes', processId, "tasks", taskId);
            await setDoc(taskRef, payload, { merge: true });
            return { processId, ...payload };

        } catch (err) {
            console.log(err);

        }

    }
)


export const editProcess = createAsyncThunk(
    'process/editProcess',
    async ({ payload, workspaceId, processId }: { payload: any; workspaceId: string; processId: string }) => {
        try {
            if (!payload) {
                console.error('Error: Payload is undefined.');
                throw new Error('Invalid payload.');
            }

            const processRef = doc(db, 'workspace', workspaceId, 'processes', processId);
            await setDoc(processRef, payload, { merge: true });
            return { processId, ...payload };
        } catch (err) {
            console.error('Error editing process:', err);
            throw err;
        }
    }
);

export const deleteProcess = createAsyncThunk(
    'blog/deleteProcess',
    async ({ workspaceId, processId }: { workspaceId: string; processId: string }) => {
        try {
            const processRef = doc(db, 'workspace', workspaceId, 'processes', processId);
            await deleteDoc(processRef);

            return { workspaceId, processId };
        } catch (err) {
            console.error('Error deleting process:', err);
            throw err;
        }
    }
);





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
