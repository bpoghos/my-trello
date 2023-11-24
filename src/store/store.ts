import { configureStore } from "@reduxjs/toolkit";
import workspacesReducer from '../app/workspaceSlice'


export const store = configureStore({
    reducer: workspacesReducer
})

export type RootState = ReturnType<typeof store.getState>
