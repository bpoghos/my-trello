import styles from "./Comments.module.css"
import Comment from './Comment/Comment'
import { CommentProps } from "../../app/App.interface"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { getCommentsData } from "../../redux/thunks/workspaceThunk"

const Comments = ({ workspaceId, processId, taskId }: { workspaceId: any, processId: any, taskId: any }) => {

    const comments = useSelector((state: any) => state.comments.comments)

    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(getCommentsData({ workspaceId, processId, taskId, }))
    }, [getCommentsData])



    const sortedComments = comments.slice().sort((a: CommentProps, b: CommentProps) => b.date - a.date);

    return (
        <div className={styles.comments}>
            {
                sortedComments.map((comment: CommentProps) => (
                    <Comment comment={comment} key={comment.id} workspaceId={workspaceId} processId={processId} taskId={taskId} />
                ))
            }
        </div>
    )
}

export default Comments
