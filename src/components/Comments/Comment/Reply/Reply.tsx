import { Button } from 'react-bootstrap'
import styles from "./Reply.module.css"
import { RepliesProps } from '../../../../app/App.interface'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const Reply = ({ replies, handleReplyComment }: { replies: any, handleReplyComment: any }) => {

    const user = useSelector((state: any) => state.user.profile)
    const [isReplyBtnClick, setIsReplyBtnClick] = useState<boolean>(false)
    const [reply, setReply] = useState<string>("")




    const formattedDate = new Date(replies.date).toLocaleString();


    const handleReplyBtnClick = () => {
        setIsReplyBtnClick(true)
    }

    const handleReplyWrite = (e: any) => {
        setReply(e.target.value)
    }

    const handleCancelReply = () => {
        setIsReplyBtnClick(false)

    }

    return (
        <div className={styles.reply}>
            <div className={styles.imageContainer}>
                <img alt="profilePic" src={replies.userPhoto} />
            </div>

            <div className={styles.replyContainer}>

                <div className={styles.info}>
                    <p>{replies.userName}</p>
                    <span>{formattedDate}</span>
                </div>

                <div className={styles.textContainer}>
                    <p>{replies.reply}</p>
                    <div>
                        <Button variant="link" className={styles.linkBtns}>edit</Button>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Reply
