import { Button } from 'react-bootstrap'
import styles from "./Reply.module.css"
import { RepliesProps } from '../../../../app/App.interface'

const Reply = ({ replies }: { replies: RepliesProps }) => {
    return (
        <div className={styles.reply}>
            <div className={styles.imageContainer}>
                <img alt="profilePic" src={replies.profilePhoto} />
            </div>

            <div className={styles.replyContainer}>

                <div className={styles.info}>
                    <p>{replies.name} {replies.surname}</p>
                    <span>{replies.date}</span>
                </div>

                <div className={styles.inputContainer}>
                    <input type="text" value={replies.reply} />
                    <div>
                        <Button variant="link">reply</Button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Reply
