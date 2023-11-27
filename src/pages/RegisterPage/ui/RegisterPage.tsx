import { ChangeEvent, FC, useState } from "react"
import styles from "./styles/RegisterPage.module.css"
import { Button, Container, Form, InputGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FaGoogle, FaGithub, FaEyeSlash, FaEye } from "react-icons/fa6"
import { ProfilePageProps } from "../../../shared/Header/ui/Header.interface"
import { signInWithGoogle } from "../../../shared/signIn/gmailLogin/gmailLogin"
import { signInWithGitHub } from "../../../shared/signIn/gitHubLogin/gitHubLogin"
import { signUpWithEmail } from "../../../shared/signIn/emailLogin/emailLogin"
import { Error, emailRegex } from "./errors/RegisterPageErrors"
import { useDispatch } from "react-redux"
import { useAppDispatch } from "../../../hooks/useAppDispatch"


const RegisterPage: FC<ProfilePageProps> = () => {

    const [isVisable, setIsVisable] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<any>('')
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);


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

    const handleSignUp = () => {
        if (validateInputs()) {
            dispatch(signUpWithEmail({ email, password }));
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
                            type="email"
                            placeholder="Email"
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
                                placeholder="Password"
                                onChange={getPasswordValue}
                                isInvalid={!!passwordError}

                            />
                            <InputGroup.Text className={styles.visableBtn} onClick={handleVisable}>
                                {
                                    isVisable ? <FaEye /> : <FaEyeSlash />
                                }
                            </InputGroup.Text>
                        </InputGroup>
                        <p className={styles.error}>{passwordError}</p>
                    </Form.Group>
                    <Button
                        className={`${styles.btn} mt-2 mb-4`}
                        variant="primary"
                        onClick={handleSignUp}>Sign up</Button>
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







