import { FC } from 'react'
import styles from "./styles/SideBar.module.css"
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaAngleDown, FaPlus } from 'react-icons/fa6'



const SideBar: FC = () => {



    return (

        <nav className={styles.sideBar}>
            <div className={styles.btns}>
                <Link to="/boards">
                    <Button variant='light'>Boards</Button>
                </Link>
                <Button variant='light'>Templates</Button>
                <Link to="/home">
                    <Button variant='light'>Home</Button>
                </Link>

                <div className={styles.workspaces}>
                    <div className={styles.workspacesTitle}>
                        <p>Workspaces</p>
                        <div className={styles.plusIconContainer}>
                            <FaPlus />
                        </div>
                    </div>
                </div>

                <div className={styles.userWorkspaceBtn}>
                    <div></div>
                    <div></div>
                    <div><FaAngleDown /></div>
                </div>


            </div>
        </nav>
    )
}

export default SideBar
