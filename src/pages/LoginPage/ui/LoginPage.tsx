import { FC } from "react"
import styles from "./styles/LoginPage.module.css"
import { Button, Container, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FaGoogle, FaGithub } from "react-icons/fa6"
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../../../firebase"
import { ProfilePageProps } from "../../../shared/Header/ui/Header.interface"


const LoginPage: FC<ProfilePageProps> = () => {


    const signInWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();

        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.log(error);
        }
    }

    const signInWithGitHub = async () => {
        const githubProvider = new GithubAuthProvider();
        try {
            await signInWithPopup(auth, githubProvider);
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div className={styles.loginPage}>
            <div className={styles.box}>
                <Container>
                    <h1>Trello</h1>
                    <p>Log in to continue</p>
                    <Form.Group>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter your email"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Button className={`${styles.btn} mt-2 mb-4`} variant="primary">Continue</Button>
                    OR
                    <Button onClick={signInWithGoogle} className={`${styles.socialBtn} mt-4`} variant="light">
                        <div className={styles.iconBox}>
                            <FaGoogle />
                        </div>Continue with Google</Button>
                    <Button onClick={signInWithGitHub} className={`${styles.socialBtn} mt-3 mb-3`} variant="light">
                        <div className={styles.iconBox}>
                            <FaGithub />
                        </div>Continue with GitHub</Button>
                    <Link to='/register' className={styles.link}>
                        <span>Create an account</span>
                    </Link>
                </Container>


            </div>
        </div>
    )
}

export default LoginPage
