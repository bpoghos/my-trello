import { FC, useEffect } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import styles from "./styles/MainPage.module.css"
import { Link } from 'react-router-dom'
import { FaRegCirclePlay } from 'react-icons/fa6'
import mainInfoImage from "./images/main_page_info_image.png"
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useSelector } from 'react-redux'
import { getPost } from '../../../redux/slices/postSlice'

const MainPage: FC = () => {





    const disputch = useAppDispatch()

    const data = useSelector((state: any) => state.post.posts)

    console.log(data);

    useEffect(() => {
        console.log('use');

        disputch(getPost())
    }, [disputch])


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
