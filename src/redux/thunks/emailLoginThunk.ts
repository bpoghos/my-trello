import { FirebaseError } from "firebase/app";
import { UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { logOut } from "../slices/userSlice";



export const signUpWithEmail = createAsyncThunk(
    "user/signUpWithEmail",
    async ({ email, password }: { email: string, password: string }) => {
        try {
            const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (err) {
            if (err instanceof FirebaseError) {
                if (err.code === 'auth/email-already-in-use') {
                    console.log('Email already in use');
                } else {
                    console.error('Firebase authentication error:', err.message);
                }
                throw err; // Make sure to re-throw the error for rejection
            } else {
                console.error('Non-Firebase error:', err);
                throw new Error('Unexpected error during authentication');
            }
        }
    }
);



export const signInWithEmail = createAsyncThunk(
    "user/signInWithEmail",
    async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
        try {
            const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user;
        } catch (err) {
            if (err instanceof FirebaseError) {

                console.error('Firebase authentication error:', err.message);
                return rejectWithValue(err.message);
            } else {

                console.error('Non-Firebase error:', err);
                return rejectWithValue('Error during sign-in');
            }
        }
    }
);



