import { ChangeEvent, FC, useState } from 'react'
import { Button, Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { HeaderProps } from './Header.interface'
import { BsBell, BsFillGrid3X3GapFill, BsInfoCircle, } from "react-icons/bs"
import logo from "./images/trello_logo_2.png"
import logo_user from "./images/Trello_logo_user.png"
import styles from "./styles/Header.module.css"
import {
    CREATE,
    CREATE_BOARD,
    CREATE_BOARD_TEXT,
} from '../../constant/constant'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { WorkspaceProps } from '../../../app/App.interface'
import { addBoard } from '../../../redux/thunks/workspaceThunk'
import { FaAngleLeft } from 'react-icons/fa6'




const Header: FC<HeaderProps> = ({ handleSingOut }) => {

    const user = useSelector((state: any) => state.user.profile)
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")
    const [createBoard, setCreateBoard] = useState<boolean>(false)


    const openDropDown = () => {
        setIsOpen((prevState) => !prevState)

    }

    const openCreateDropDown = () => {
        setIsCreateOpen((prevState) => !prevState)
        setCreateBoard(false)
    }


    const openProfilePage = () => {
        navigate(`${user?.displayName?.split(' ').join('')}`)
        setIsOpen(false)
    }



    const handleCreateBoard = () => {
        const postData: WorkspaceProps = {
            title,
            processes: []
        };

        dispatch(addBoard(postData));
        setTitle("");
        setCreateBoard(false)
        navigate(`/workspace/${title}`)

    };

    const handleBoardNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const openCreateBoard = () => {
        setCreateBoard(true)
    }
    const handleBackIconClick = () => {
        setCreateBoard(false)
        setIsCreateOpen(true)
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
                                <NavDropdown className={`me-3 ${styles.navLinksUser}`} title="Workspaces" id="basic-nav-dropdown">
                                    <NavDropdown.Item eventKey="4.1" className={styles.navDropdownItem} href='/boards'>
                                        <img className={styles.workspacePhoto} alt='profilePic' src={user.photoURL} />
                                        <p>{user.displayName}'s Workspace</p>
                                    </NavDropdown.Item>
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
                                        <div className={styles.dropDownBtn} onClick={openCreateBoard}>
                                            <p>{CREATE_BOARD}</p>
                                            <span>{CREATE_BOARD_TEXT}</span>
                                        </div>
                                    </div> : null
                            }

                            {
                                createBoard ?
                                    <div className={styles.createBoard}>
                                        <div className={styles.createBoardPage}>
                                            <div className={styles.backPageIconContainer} onClick={handleBackIconClick}><FaAngleLeft /></div>
                                            <p aria-required>Board title<span>*</span></p>
                                            <input type='text' onChange={handleBoardNameChange} />
                                            <Button disabled={!title ? true : false} onClick={handleCreateBoard}>Create</Button>
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
                    </Navbar >
                    :
                    <Navbar bg="white" variant='light' data-bs-theme="light" className='p-0'>
                        <Container >
                            <Navbar.Brand href="/" className='p-0'>
                                <img className={styles.logo} alt='brand-logo' src={logo} />
                            </Navbar.Brand>
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
