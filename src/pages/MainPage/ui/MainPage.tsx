import { FC } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import styles from "./styles/MainPage.module.css"
import { Link } from 'react-router-dom'
import { FaRegCirclePlay } from 'react-icons/fa6'
import mainInfoImage from "./images/main_page_info_image.png"

const MainPage: FC = () => {
    return (
        <div className={styles.mainPage}>
            <Container className={`mt-5 ${styles.container}`}>
                <div className={styles.mainPageInfo}>
                    <h1 className={styles.title}>Trello brings all your tasks, teammates, and tools together</h1>
                    <p>Keep everything in the same place—even if your team isn't.</p>
                    <div className={styles.imputBtnContainer}>
                        <Form.Control
                            type='email'
                            placeholder='Email'
                            className={styles.input}
                        />
                        <Button size='lg'>Sign up - it's free</Button>
                    </div>
                    <Link className={styles.link} to="#">
                        <div className={styles.linkContainer}>
                            <p>Watch video</p>
                            <FaRegCirclePlay className={`${styles.playIcon} customPlayIcon`} />
                        </div>
                    </Link>
                </div>
                <div className={styles.mainInfoImageContainer}>
                    <img alt='mainInfoImage' src={mainInfoImage} />
                </div>
            </Container>
        </div>
    )
}

export default MainPage
