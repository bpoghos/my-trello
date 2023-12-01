import { FirebaseError } from "firebase/app";
import { UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";




export const signUpWithEmail = createAsyncThunk(
    "user/signUpWithEmail",
    async ({ email, password }: { email: string, password: string }) => {
        try {
            const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User registered:', userCredential.user);
            return userCredential.user
        } catch (err) {
            if (err instanceof FirebaseError) {
                if (err.code === 'auth/email-already-in-use') {
                    console.log('already have');

                } else {
                    console.error('Firebase authentication error:', err.message);
                }
            } else {
                console.error('Non-Firebase error:', err);
            }
        }
    }
)


export const signInWithEmail = createAsyncThunk(
    "user/signInWithEmail",
    async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
        try {
            const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User signed in:', userCredential.user);
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
