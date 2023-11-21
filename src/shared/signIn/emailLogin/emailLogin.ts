import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

export const signUpWithEmail = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User registered:', userCredential.user);
    } catch (err) {
        if (err instanceof FirebaseError) {
            if (err.code === 'auth/email-already-in-use') {
                console.log('Email is already in use.');
            } else {
                console.error('Firebase authentication error:', err.message);
            }
        } else {
            console.error('Non-Firebase error:', err);
        }
    }
};


export const signiInWithEmail = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User registered:', userCredential.user);
    } catch (err) {
        console.log('error');

    }
}