import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase";

export const signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();

    try {
        await signInWithPopup(auth, googleProvider);
    } catch (error) {
        console.log(error);
    }
}