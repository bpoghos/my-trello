import { FC } from "react"
import styles from "./UserWorkspaceSideBar.module.css"
import { FaAngleDown } from "react-icons/fa6"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


const UserWorkspaceSideBar: FC = () => {

    const user = useSelector((state: any) => state.user.profile)





    return (
        <Link to={"/boards"}>
            <div className={styles.userWorkspaceBtn}>
                <div className={styles.imageContainer}>
                    <img alt="profilePic" src={user?.photoURL} loading='lazy' />
                </div>
                <div className={styles.titleContainer}>
                    <p>{user?.displayName}'s</p>
                    <p>Workspace</p>
                </div>
            </div>
        </Link>
    )
}

export default UserWorkspaceSideBar
