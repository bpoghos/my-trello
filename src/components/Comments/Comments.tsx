import styles from "./Comments.module.css"
import Comment from './Comment/Comment'
import { CommentProps } from "../../app/App.interface"

const Comments = ({ comments }: { comments: CommentProps[] }) => {


    return (
        <div className={styles.comments}>
            {
                comments.map((comment: CommentProps) => (
                    <Comment comment={comment} key={comment.id} />
                ))
            }
        </div>
    )
}

export default Comments
