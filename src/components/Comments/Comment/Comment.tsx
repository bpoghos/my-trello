import { Button } from "react-bootstrap"
import styles from "./Comment.module.css"
import { CommentProps } from "../../../app/App.interface"
import Reply from "./Reply"

const Comment = ({ comment }: { comment: CommentProps }) => {

    const formattedDate = new Date(comment.author.date).toLocaleString();


    return (
        <>
            <div className={styles.comment}>
                <div className={styles.imageContainer}>
                    <img alt="profilePic" src={comment.author.profilePhoto} />
                </div>

                <div className={styles.commentContainer}>

                    <div className={styles.info}>
                        <p>{comment.author.name} {comment.author.surname}</p>
                        <span>{formattedDate}</span>
                    </div>

                    <div className={styles.textContainer}>
                        <p>{comment.author.comment}</p>
                        <div>
                            <Button variant="link">reply</Button>
                            <Button variant="link">edit</Button>
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
