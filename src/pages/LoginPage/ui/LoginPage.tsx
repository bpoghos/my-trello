import { ChangeEvent, FC, useState } from "react"
import styles from "./styles/LoginPage.module.css"
import { Button, Container, Form, InputGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FaGoogle, FaGithub, FaEye, FaEyeSlash } from "react-icons/fa6"
import { ProfilePageProps } from "../../../shared/Header/ui/Header.interface"
import { signInWithGoogle } from "../../../redux/thunks/gmailLoginThunk"
import { signInWithGitHub } from "../../../redux/thunks/gitHubLoginThunk"
import { signInWithEmail } from "../../../redux/thunks/emailLoginThunk"
import { Error, emailRegex } from "../../RegisterPage/ui/errors/RegisterPageErrors"
import { useAppDispatch } from "../../../hooks/useAppDispatch"
import { useSelector } from "react-redux"
import Loading from "../../../components/Loading"


const LoginPage: FC<ProfilePageProps> = () => {

    const [isVisable, setIsVisable] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const error = useSelector((state: any) => state.user.error)
    const loading = useSelector((state: any) => state.user.loading)



    const dispatch = useAppDispatch()

    const handleVisable = () => {
        setIsVisable((prevState) => !prevState)
    }

    const getEmailValue = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        setEmailError(null)
    }
    const getPasswordValue = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        setPasswordError(null)
    }



    const validateInputs = () => {
        let isValid = true;

        if (!email.trim()) {
            setEmailError(Error.emptyEmailInput);
            isValid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError(Error.wrongEmail)
            isValid = false
        } else if (error) {
            setEmailError(Error.emailNotRegistered);
            isValid = false;
        }
        if (!password.trim()) {
            setPasswordError(Error.emptyPasswordInput);
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError(Error.shortPassword);
            isValid = false;
        }


        return isValid;
    };

    const handleSignIn = () => {
        if (validateInputs()) {
            dispatch(signInWithEmail({ email, password }));
        }
    };


    return (
        <div className={styles.loginPage}>
            <div className={styles.box}>

                {

                }
                <Container>
                    <Link to="/" className={styles.title}>
                        <h1>Trello</h1>
                    </Link>
                    <p>Log in to continue</p>
                    <Form.Group>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter your email"
                            className="mb-2"
                            onChange={getEmailValue}
                            isInvalid={!!emailError}
                        />
                        <p className={styles.error}>{emailError}</p>
                        <InputGroup className="mb-1">
                            <Form.Control
                                required
                                type={
                                    isVisable ? "text" : "password"
                                }
                                placeholder="Enter your Password"
                                onChange={getPasswordValue}
                                isInvalid={!!passwordError}
                            />
                            <InputGroup.Text className={styles.visableBtn} onClick={handleVisable}>
                                {
                                    isVisable ? <FaEye /> : <FaEyeSlash />
                                }
                            </InputGroup.Text>
                        </InputGroup>
                        {
                            passwordError ? <p className={styles.error}>{passwordError}</p> : null
                        }
                    </Form.Group>
                    <Button className={`${styles.btn} mt-2 mb-4`} variant="primary" onClick={handleSignIn} disabled={loading}>{loading ? '...' : 'Continue'}</Button>
                    OR
                    <Button onClick={() => dispatch(signInWithGoogle())} className={`${styles.socialBtn} mt-4`} variant="light">
                        <div className={styles.iconBox}>
                            <FaGoogle />
                        </div>Continue with Google</Button>
                    <Button onClick={() => dispatch(signInWithGitHub())} className={`${styles.socialBtn} mt-3 mb-3`} variant="light">
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
