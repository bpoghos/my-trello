import { configureStore } from "@reduxjs/toolkit";
import workspacesReducer from './slices/workspaceSlice'
import userSlice from "./slices/userSlice";
import processSlice from "./slices/processSlice";
import taskSlice from "./slices/taskSlice";


export const store = configureStore({
    reducer: {
        workspace: workspacesReducer,
        user: userSlice,
        processes: processSlice,
        tasks: taskSlice

    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch