import { Button } from "react-bootstrap"
import styles from "./Comment.module.css"
import { CommentProps } from "../../../app/App.interface"
import Reply from "./Reply"
import { useAppDispatch } from "../../../hooks/useAppDispatch"
import { addReply } from "../../../redux/slices/workspaceSlice"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getRepliesesData } from "../../../redux/thunks/workspaceThunk"

const Comment = ({ comment, workspaceId, processId, taskId }: { comment: any, workspaceId: any, processId: any, taskId: any }) => {
    const user = useSelector((state: any) => state.user.profile)


    const commentId = comment.id

    const replieses = useSelector((state: any) => state.replieses[commentId])
    const [isReplyBtnClick, setIsReplyBtnClick] = useState<boolean>(false)
    const [reply, setReply] = useState<string>("")





    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getRepliesesData({ workspaceId, processId, taskId, commentId }))
    }, [])

    const formattedDate = new Date(comment.date).toLocaleString();


    const handleReplyBtnClick = () => {
        setIsReplyBtnClick(true)
    }

    const handleReplyWrite = (e: any) => {
        setReply(e.target.value)
    }

    const handleCancelReply = () => {
        setIsReplyBtnClick(false)

    }




    const handleReplyComment = () => {
        const payload = {
            userId: user.uid,
            userName: user.displayName,
            userPhoto: user.photoURL,
            reply,
            date: Date.now()
        }
        dispatch(addReply({ payload, workspaceId, processId, taskId, commentId }))
        dispatch(getRepliesesData({ workspaceId, processId, taskId, commentId }))
        setIsReplyBtnClick(false)

    }

    return (
        <>
            <div className={styles.comment}>
                <div className={styles.imageContainer}>
                    <img alt="profilePic" src={comment.userPhoto} loading='lazy' />
                </div>

                <div className={styles.commentContainer}>

                    <div className={styles.info}>
                        <p>{comment.userName}</p>
                        <span>{formattedDate}</span>
                    </div>

                    <div className={styles.textContainer}>
                        <p>{comment.comment}</p>
                        <div>
                            {
                                isReplyBtnClick ? (
                                    <div className={styles.replyBox}>

                                        {
                                            user.photoURL ?
                                                <img alt="profilePic" src={user.photoURL} loading='lazy' />
                                                : user.displayName || "user Photo"
                                        }
                                        <div className={styles.replyInputBox}>

                                            <textarea
                                                placeholder="Write your comment..."
                                                onChange={handleReplyWrite}
                                                value={reply}
                                                autoFocus
                                            />

                                            <div className={styles.btnsContainer}>
                                                <Button
                                                    className={styles.saveBtn}
                                                    variant="success"
                                                    disabled={!reply}
                                                    onClick={handleReplyComment}
                                                >Save</Button>

                                                <Button
                                                    className={styles.cancelBtn}
                                                    variant="outline-dark"
                                                    onClick={handleCancelReply}
                                                >Cancel</Button>
                                            </div>
                                        </div>


                                    </div>
                                ) : (
                                    <>
                                        <Button variant="link" className={styles.linkBtns} onClick={handleReplyBtnClick}>reply</Button>
                                        <Button variant="link" className={styles.linkBtns}>edit</Button>
                                        <Button variant="link" className={styles.linkBtns}>delete</Button>
                                    </>
                                )
                            }

                        </div>
                    </div>

                </div>



            </div>
            {
                replieses && replieses.replieses?.length ? (
                    replieses.replieses
                        .slice()
                        .sort((a: CommentProps, b: CommentProps) => b.date - a.date)
                        .map((replies: any) => (
                            <Reply replies={replies} key={replies.id} handleReplyComment={handleReplyComment} />
                        ))
                ) : null
            }
        </>
    )
}

export default Comment
