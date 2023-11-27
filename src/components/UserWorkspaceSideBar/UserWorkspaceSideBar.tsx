import { FC } from "react"
import styles from "./UserWorkspaceSideBar.module.css"
import { FaAngleDown } from "react-icons/fa6"

const UserWorkspaceSideBar: FC = () => {
    return (
        <div className={styles.userWorkspaceBtn}>
            <div className={styles.imageContainer}>
                <img alt="profilePic" src="" />
            </div>
            <div className={styles.titleContainer}>
                <p>Poghos Baarseghyan's</p>
                <p>Workspace</p>
            </div>
            <div><FaAngleDown /></div>
        </div>
    )
}

export default UserWorkspaceSideBar
