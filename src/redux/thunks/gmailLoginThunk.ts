import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";




export const signInWithGoogle = createAsyncThunk(
    "user/signInWithGoogle",
    async (_, { rejectWithValue }) => {
        try {
            const googleProvider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, googleProvider);
            const userData = {
                uid: result.user.uid,
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL
            }

            return userData

        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message)
            } else {
                rejectWithValue("my error")
            }
        }
    }
)




