import { FC, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import styles from "./styles/MainPage.module.css"
import mainInfoImage from "./images/main_page_info_image.png"
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { getWorkspaceData } from '../../../redux/thunks/workspaceThunk'

const MainPage: FC = () => {

    return (
        <div className={styles.mainPage}>
            <Container className={`mt-5 ${styles.container}`}>
                <div className={styles.mainPageInfo}>
                    <h1 className={styles.title}>Trello brings all your tasks, teammates, and tools together</h1>
                    <p>Keep everything in the same place—even if your team isn't.</p>
                </div>
                <div className={styles.mainInfoImageContainer}>
                    <img alt='mainInfoImage' src={mainInfoImage} />
                </div>
            </Container>
        </div>
    )
}

export default MainPage
