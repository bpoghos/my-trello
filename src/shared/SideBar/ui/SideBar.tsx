import { FC } from 'react'
import styles from "./styles/SideBar.module.css"
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa6'
import UserWorkspaceSideBar from '../../../components/UserWorkspaceSideBar/UserWorkspaceSideBar'



const SideBar: FC = () => {



    return (

        <nav className={styles.sideBar}>
            <div className={styles.btns}>
                <Link to="/boards">
                    <Button variant='light'>Boards</Button>
                </Link>
                <Link to="/home">
                    <Button variant='light'>Home</Button>
                </Link>

                <div className={styles.workspaces}>
                    <div className={styles.workspacesTitle}>
                        <p>Workspaces</p>
                    </div>
                </div>

                <UserWorkspaceSideBar />

            </div>
        </nav>
    )
}

export default SideBar
