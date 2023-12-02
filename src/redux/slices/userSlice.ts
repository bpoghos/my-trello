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
    extraReducers: {

        [signInWithGoogle.pending as any]: (state) => {
            state.loading = true;
        },
        [signInWithGoogle.fulfilled as any]: (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        },
        [signInWithGoogle.rejected as any]: (state, action) => {
            state.loading = false;
            state.error = action.error.message
        },
        [signInWithGitHub.pending as any]: (state) => {
            state.loading = true;
        },
        [signInWithGitHub.fulfilled as any]: (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        },
        [signInWithGitHub.rejected as any]: (state, action) => {
            state.loading = false;
            state.error = action.error.message
        },
        [signInWithEmail.pending as any]: (state) => {
            state.loading = true;
        },
        [signInWithEmail.fulfilled as any]: (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        },
        [signInWithEmail.rejected as any]: (state, action) => {
            state.loading = false;
            state.error = action.error.message
        },
        [signUpWithEmail.pending as any]: (state) => {
            state.loading = true;
        },
        [signUpWithEmail.fulfilled as any]: (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        },
        [signUpWithEmail.rejected as any]: (state, action) => {
            console.log('rej');

            state.loading = false;
            state.error = action.error.message
        },
    }
})

export const { logOut } = userSlice.actions;

export default userSlice.reducer