import { FC, useState } from 'react'
import { Button, Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { HeaderProps } from './Header.interface'
import { BsBell, BsFillGrid3X3GapFill, BsInfoCircle, BsSearch } from "react-icons/bs"
import logo from "./images/trello_logo_2.png"
import logo_user from "./images/Trello_logo_user.png"
import styles from "./styles/Header.module.css"
import {
    CREATE,
    CREATE_BOARD,
    CREATE_BOARD_TEXT,
    CREATE_WOEKSPACE,
    CREATE_WOEKSPACE_TEXT,
    START_WITH_A_TEMPLATE,
    START_WITH_A_TEMPLATE_TEXT
} from '../../constant/constant'




const Header: FC<HeaderProps> = ({ handleSingOut, user }) => {

    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false)


    const openDropDown = () => {
        setIsOpen((prevState) => !prevState)

    }

    const openCreateDropDown = () => {
        setIsCreateOpen((prevState) => !prevState)
    }


    const openProfilePage = () => {
        navigate(`${user?.displayName?.split(' ').join('')}`)
        setIsOpen(false)
    }




    return (
        <>
            {
                user ?
                    <Navbar bg="white" variant='light' data-bs-theme="light" className={styles.navBarUser}>
                        <Container fluid className='text-light'>
                            <div className={styles.menuIconContainer}>
                                <BsFillGrid3X3GapFill />
                            </div>
                            <Navbar.Brand href="/home">
                                <div className={styles.logoUserContainer}>
                                    <img className={styles.logoUser} alt='brand-logo' src={logo_user} />
                                </div>
                            </Navbar.Brand>
                            <Nav className={`me-auto ${styles.links}`}>
                                <NavDropdown className={`me-3 ${styles.navLinksUser}`} title="Features" id="basic-nav-dropdown">
                                </NavDropdown>
                                <NavDropdown className={`me-3 ${styles.navLinksUser}`} title="Solutions" id="basic-nav-dropdown">
                                </NavDropdown>
                                <NavDropdown className={`me-3 ${styles.navLinksUser}`} title="Plans" id="basic-nav-dropdown">
                                </NavDropdown>
                                <NavDropdown className={`me-3 ${styles.navLinksUser}`} title="Resources" id="basic-nav-dropdown">
                                </NavDropdown>
                                <Button size='sm' className='me-auto' onClick={openCreateDropDown}>{CREATE}</Button>
                            </Nav>
                            <div className={styles.searchContainer}>
                                <Form.Control
                                    type='text'
                                    placeholder={`Search`}
                                    className={styles.searchInput}
                                />
                                <div className={styles.notificationIconContainer}>
                                    <BsBell />
                                </div>
                                <div className={styles.informationIconContainer}>
                                    <BsInfoCircle />
                                </div>
                            </div>
                            {
                                isCreateOpen ?
                                    <div className={styles.createDropDown}>
                                        <div className={styles.dropDownBtn}>
                                            <p>{CREATE_BOARD}</p>
                                            <span>{CREATE_BOARD_TEXT}</span>
                                        </div>
                                        <div className={styles.dropDownBtn}>
                                            <p>{START_WITH_A_TEMPLATE}</p>
                                            <span>{START_WITH_A_TEMPLATE_TEXT}</span>
                                        </div>
                                        <div className={styles.dropDownBtn}>
                                            <p>{CREATE_WOEKSPACE}</p>
                                            <span>{CREATE_WOEKSPACE_TEXT}</span>
                                        </div>
                                    </div> : null
                            }
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
                    <Navbar bg="white" variant='light' data-bs-theme="light" className='p-0'>
                        <Container >
                            <Navbar.Brand href="/" className='p-0'>
                                <img className={styles.logo} alt='brand-logo' src={logo} />
                            </Navbar.Brand>
                            <Nav className={`me-auto ${styles.links}`}>
                                <NavDropdown className={`me-3 ${styles.navLinks}`} title="Features" id="basic-nav-dropdown">
                                </NavDropdown>
                                <NavDropdown className={`me-3 ${styles.navLinks}`} title="Solutions" id="basic-nav-dropdown">
                                </NavDropdown>
                                <NavDropdown className={`me-3 ${styles.navLinks}`} title="Plans" id="basic-nav-dropdown">
                                </NavDropdown>
                                <Nav.Link className={`me-3 ${styles.navLinks}`} href="#link">Pricing</Nav.Link>
                                <NavDropdown className={`me-3 ${styles.navLinks}`} title="Resources" id="basic-nav-dropdown">
                                </NavDropdown>
                            </Nav>
                            <Link to="#"></Link>
                            <div className={styles.btnsContainer}>
                                <Link to="/login">
                                    <Button size='lg' variant='light'>Login</Button>
                                </Link>
                                <div className={styles.getFreeBtn}>Get Trello for free</div>
                            </div>
                        </Container>
                    </Navbar >
            }
        </>
    )
}

export default Header
