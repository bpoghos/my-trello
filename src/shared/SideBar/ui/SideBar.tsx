import { FC } from 'react'
import styles from "./styles/SideBar.module.css"
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


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
            </div>
        </nav>
    )
}

export default SideBar
