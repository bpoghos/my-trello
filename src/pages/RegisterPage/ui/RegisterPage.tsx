import { FC } from "react"
import styles from "./RegisterPage.module.css"
import { Button, Container, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { FaGoogle, FaGithub } from "react-icons/fa6"
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../../../firebase"
import { ProfilePageProps } from "../../../shared/header/ui/Header.interface"


const RegisterPage: FC<ProfilePageProps> = ({ user }) => {


    const navigate = useNavigate()

    const signInWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();

        try {
            await signInWithPopup(auth, googleProvider);
            navigate(`/boards`)
        } catch (error) {
            console.log(error);
        }
    }

    const signInWithGitHub = async () => {
        const githubProvider = new GithubAuthProvider();
        try {
            await signInWithPopup(auth, githubProvider);
            navigate(`/boards`);
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div className={styles.loginPage}>
            <div className={styles.box}>
                <Container>
                    <h1>Trello</h1>
                    <p>Sign up to continue</p>
                    <Form.Group>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter your email"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Button className={`${styles.btn} mt-2 mb-4`} variant="primary">Sign up</Button>
                    OR
                    <Button onClick={signInWithGoogle} className={`${styles.socialBtn} mt-4`} variant="light">
                        <div className={styles.iconBox}>
                            <FaGoogle />
                        </div>Continue with Google</Button>
                    <Button onClick={signInWithGitHub} className={`${styles.socialBtn} mt-3 mb-3`} variant="light">
                        <div className={styles.iconBox}>
                            <FaGithub />
                        </div>Continue with GitHub</Button>
                    <Link to='/login' className={styles.link}>
                        <span>Already have an account? Log in</span>
                    </Link>
                </Container>


            </div>
        </div>
    )
}

export default RegisterPage







