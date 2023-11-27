import { configureStore } from "@reduxjs/toolkit";
import workspacesReducer from './slices/workspaceSlice'
import userSlice from "./slices/userSlice";
import postSlice from "./slices/postSlice";


export const store = configureStore({
    reducer: {
        workspace: workspacesReducer,
        user: userSlice,
        post: postSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch