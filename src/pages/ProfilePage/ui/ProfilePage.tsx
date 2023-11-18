import { FC } from "react"
import { ProfilePageProps } from "../../../shared/Header/ui/Header.interface"
import { Container } from "react-bootstrap"
import styles from "./styles/ProfilePage.module.css"



const ProfilePage: FC<ProfilePageProps> = ({ user }) => {
    return (

        <Container className="mt-5 d-flex align-items-center">
            <div className={styles.profilePictureBox}>
                {
                    user?.photoURL ?
                        <img
                            alt='profilePic'
                            src={user.photoURL}
                        />
                        :
                        user?.displayName
                }
            </div>
            <div>
                <h1>{user?.displayName}</h1>
                <span>{user?.email}</span>
            </div>

        </Container>

    )
}

export default ProfilePage
