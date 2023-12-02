import { FC } from "react"
import { ProfilePageProps } from "../../../shared/Header/ui/Header.interface"
import { Container } from "react-bootstrap"
import styles from "./styles/ProfilePage.module.css"
import { useSelector } from "react-redux"



const ProfilePage: FC<ProfilePageProps> = () => {


    const user = useSelector((state: any) => state.user.profile)


    return (

        <Container className="mt-5 d-flex align-items-center">
            <div className={styles.profilePictureBox}>
                {
                    user?.photoURL ?
                        <img
                            alt='profilePic'
                            src={user.photoURL}
                            loading='lazy'
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
