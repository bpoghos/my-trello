import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase";

export const signInWithGitHub = async () => {
    const githubProvider = new GithubAuthProvider();
    try {
        await signInWithPopup(auth, githubProvider);
    } catch (error) {
        console.error(error);
    }
};