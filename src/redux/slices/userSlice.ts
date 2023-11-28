import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { signInWithGoogle } from "../thunks/gmailLoginThunk";
import { InitialStateType } from "../../app/App.interface";
import { signInWithGitHub } from "../thunks/gitHubLoginThunk";
import { signInWithEmail, signUpWithEmail } from "../thunks/emailLoginThunk";



const initialState: InitialStateType = {
    profile: null,
    loading: false,
    error: null,
}




const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logOut: (state, action: PayloadAction<any>) => {
            state.profile = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signInWithGoogle.pending as any, (state) => {
                state.loading = true;
            })
            .addCase(signInWithGoogle.fulfilled as any, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(signInWithGoogle.rejected as any, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            .addCase(signInWithGitHub.pending as any, (state) => {
                state.loading = true;
            })
            .addCase(signInWithGitHub.fulfilled as any, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(signInWithGitHub.rejected as any, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            .addCase(signInWithEmail.pending as any, (state) => {
                state.loading = true;
            })
            .addCase(signInWithEmail.fulfilled as any, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(signInWithEmail.rejected as any, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            .addCase(signUpWithEmail.pending as any, (state) => {
                state.loading = true;
            })
            .addCase(signUpWithEmail.fulfilled as any, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(signUpWithEmail.rejected as any, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })


    }
})

export const { logOut } = userSlice.actions;

export default userSlice.reducer