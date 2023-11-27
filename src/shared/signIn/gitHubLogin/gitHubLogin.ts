import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signInWithGitHub = createAsyncThunk(
    "user/signInWithGitHub",
    async (_, { rejectWithValue }) => {
        try {
            const githubProvider = new GithubAuthProvider();
            const result = await signInWithPopup(auth, githubProvider);
            const userData = {
                uid: result.user.uid,
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL
            }
            console.log(userData);
            return userData

        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message)
            } else {
                rejectWithValue("My error")
            }
        }
    }
)
