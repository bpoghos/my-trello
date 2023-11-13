import { FC, useState } from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { HeaderProps } from './Header.interface'
import styles from "./Header.module.css"


const Header: FC<HeaderProps> = ({ handleSingOut, user }) => {

    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const openDropDown = () => {
        setIsOpen((prevState) => !prevState)
    }

    const openProfilePage = () => {
        navigate(`${user?.displayName?.split(' ').join('')}`)
        setIsOpen(false)
    }




    return (
        <>
            {
                user ?
                    <Navbar bg="dark" variant='dark' data-bs-theme="light" >
                        <Container fluid className='text-light'>
                            <Navbar.Brand href="/boards">Trello</Navbar.Brand>
                            <div onClick={openDropDown} className={styles.profileBtn}>
                                {
                                    user.photoURL ?
                                        <img
                                            alt='profilePic'
                                            src={user.photoURL}
                                        />
                                        :
                                        user.displayName
                                }
                            </div>
                            {
                                isOpen ?
                                    <div className={styles.profileDropDown}>
                                        <p>ACCOUNT</p>
                                        <div onClick={openProfilePage} className={styles.profileInfoBox}>

                                            {
                                                user ? <div className={styles.profilePicture}>
                                                    {
                                                        user?.photoURL ?
                                                            <img
                                                                alt='profilePic'
                                                                src={user.photoURL}
                                                            />
                                                            :
                                                            user.displayName

                                                    }
                                                </div> : null
                                            }
                                            <div className={styles.profileInfo}>
                                                <p className={styles.nameSurname}>{user.displayName}</p>
                                                <p className={styles.email}>{user.email}</p>
                                            </div>
                                        </div>
                                        <hr className={styles.line} />

                                        <Button
                                            onClick={handleSingOut}
                                            className={styles.signOutBtn} variant='light'>Sign out
                                        </Button>

                                    </div> : null
                            }
                        </Container>
                    </Navbar>
                    :
                    <Navbar bg="dark" variant='dark' data-bs-theme="light">
                        <Container>
                            <Navbar.Brand href="/">Trello</Navbar.Brand>
                            <Link to="/login">
                                <Button size='lg' variant='primary'>Login</Button>
                            </Link>
                        </Container>
                    </Navbar>
            }
        </>
    )
}

export default Header
