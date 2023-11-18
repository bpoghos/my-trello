import { Button } from "react-bootstrap"
import styles from "./Comment.module.css"
import { CommentProps } from "../../../app/App.interface"
import Reply from "./Reply"

const Comment = ({ comment }: { comment: CommentProps }) => {




    return (
        <>
            <div className={styles.comment}>
                <div className={styles.imageContainer}>
                    <img alt="profilePic" src={comment.author.profilePhoto} />
                </div>

                <div className={styles.commentContainer}>

                    <div className={styles.info}>
                        <p>{comment.author.name} {comment.author.surname}</p>
                        <span>{comment.author.date}</span>
                    </div>

                    <div className={styles.inputContainer}>
                        <input type="text" value={comment.author.comment} />
                        <div>
                            <Button variant="link">reply</Button>
                        </div>
                    </div>

                </div>



            </div>
            {
                comment.replies.map((reply) => (<Reply replies={reply} key={reply.id} />))
            }
        </>
    )
}

export default Comment
