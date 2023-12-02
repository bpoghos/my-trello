import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Button, Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { HeaderProps } from './Header.interface'
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



const Header = ({ handleSingOut, setSearchVal, photos }: { handleSingOut: any, setSearchVal: any, photos: any }) => {

    const user = useSelector((state: any) => state.user.profile)
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")
    const [createBoard, setCreateBoard] = useState<boolean>(false)
    const [image, setImage] = useState<string>('')
    const [selectedPhoto, setSelectedPhoto] = useState(photos[0].imageUrl);
    const workspace = useSelector((state: any) => state.workspace.workspace)


    const profileDropDownOut: any = useRef(null);
    const createOut: any = useRef(null)






    useEffect(() => {
        const handleClickOutside = (event: { target: any }) => {
            if (profileDropDownOut.current && !profileDropDownOut.current.contains(event.target)) {
                setIsOpen(false)

            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [profileDropDownOut]);


    useEffect(() => {
        const handleClickOutside = (event: { target: any }) => {
            if (createOut.current && !createOut.current.contains(event.target)) {
                setIsCreateOpen(false)
                setCreateBoard(false)
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [createOut]);



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

    const handleImageClick = (photoUrl: any) => {
        const url = String(photoUrl)
        setSelectedPhoto(photoUrl);
        setImage(url)
    };

    console.log(image);



    const handleCreateBoard = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle.length === 0) {
            alert('Title cannot be empty');
            return
        }
        const postData: any = {
            title,
            image,
        };

        dispatch(addBoard(postData));
        setTitle("");
        setCreateBoard(false)
        setIsCreateOpen(false)

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
                    <Navbar variant='dark' data-bs-theme="light" className={styles.navBarUser}>
                        <Container fluid className='text-light'>

                            <Navbar.Brand href="/boards">
                                <div className={styles.logoUserContainer}>
                                    <img className={styles.logoUser} alt='brand-logo' src={logo_user} loading='lazy' />
                                </div>
                            </Navbar.Brand>
                            <Nav className={`me-auto ${styles.links}`}>
                                <NavDropdown className={`me-3 ${styles.navLinksUser}`} title="Workspaces" id="basic-nav-dropdown">
                                    <NavDropdown.Item eventKey="4.1" className={styles.navDropdownItem} href='/boards'>
                                        <img className={styles.workspacePhoto} alt='profilePic' src={user.photoURL} loading='lazy' />
                                        <p className={styles.navDropdownItemText}>{user.displayName}'s Workspace</p>
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown className={`me-3 ${styles.navLinksUser}`} title="Recent" id="basic-nav-dropdown">
                                    {

                                        workspace.length ? workspace.map((board: WorkspaceProps) => {
                                            return <NavDropdown.Item className={styles.boardLink} key={board.title}>
                                                {
                                                    <Link to={`/workspace/${board.id}`} className={styles.recentContainer}>
                                                        <div className={styles.boardPhoto}>
                                                            <img alt='backPhoto' src={board.image} loading='lazy' />
                                                            <p>{board.title}</p>
                                                        </div>
                                                        <p>{board.title}</p>
                                                    </Link>
                                                }
                                            </NavDropdown.Item>
                                        }) : <p className={styles.noBoards}>No Boards</p>
                                    }
                                </NavDropdown>
                                <Button size='sm' className='me-auto' onClick={openCreateDropDown}>{CREATE}</Button>
                            </Nav>
                            <div className={styles.searchContainer}>
                                <Form.Control
                                    type='text'
                                    onChange={(e) => setSearchVal(e.target.value)}
                                    placeholder={`Search`}
                                    className={styles.searchInput}
                                />
                            </div>
                            {
                                isCreateOpen ?
                                    <div className={styles.createDropDown} ref={createOut}>
                                        <div className={styles.dropDownBtn} onClick={openCreateBoard}>
                                            <p>{CREATE_BOARD}</p>
                                            <span>{CREATE_BOARD_TEXT}</span>
                                        </div>
                                    </div> : null
                            }

                            {
                                createBoard ?
                                    <div className={styles.createBoard} ref={createOut}>
                                        <div className={styles.backgroundBox}>
                                            {photos.map((photo: any) => (
                                                <img
                                                    key={photo.id}
                                                    alt={photo.name}
                                                    src={photo.imageUrl}
                                                    style={selectedPhoto === photo.imageUrl ? { border: '2px solid red' } : {}}
                                                    onClick={() => handleImageClick(photo.imageUrl)}
                                                    loading='lazy'
                                                />
                                            ))}
                                        </div>
                                        <div className={styles.createBoardPage}>
                                            <div className={styles.backPageIconContainer} onClick={handleBackIconClick}><FaAngleLeft /></div>
                                            <p aria-required>Board title<span>*</span></p>
                                            <input type='text' onChange={handleBoardNameChange} autoFocus />
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
                                            loading='lazy'
                                        />
                                        :
                                        user.displayName
                                }
                            </div>
                            {
                                isOpen ?
                                    <div className={styles.profileDropDown} ref={profileDropDownOut}>
                                        <p>ACCOUNT</p>
                                        <div onClick={openProfilePage} className={styles.profileInfoBox}>

                                            {
                                                user ? <div className={styles.profilePicture}>
                                                    {
                                                        user?.photoURL ?
                                                            <img
                                                                alt='profilePic'
                                                                src={user.photoURL}
                                                                loading='lazy'
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
                                <img className={styles.logo} alt='brand-logo' src={logo} loading='lazy' />
                            </Navbar.Brand>
                            <Link to="#"></Link>
                            <div className={styles.btnsContainer}>
                                <Link to="/login">
                                    <Button size='lg' variant='light' className={styles.loginBtn}>Login</Button>
                                </Link>
                            </div>
                        </Container>
                    </Navbar >
            }
        </>
    )
}

export default Header
