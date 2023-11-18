import { useParams } from "react-router"
import { TaskProps } from "../../../app/App.interface"
import { Button } from "react-bootstrap"
import { User } from "firebase/auth"
import styles from "./styles/TaskPage.module.css"
import { ChangeEvent, MouseEventHandler, useState } from "react"
import Comments from "../../../components/Comments"


const TaskPage = ({ task, user }: { task: TaskProps[], user: User | null }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isLength, setIsLength] = useState<string>('')
    const [isClicked, setIsClicked] = useState<boolean>(false)


    const handleClick = () => {
        setIsOpen(true)
    }

    const handleWrite = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setIsLength(event.target.value)
    }

    const btnClick: MouseEventHandler<HTMLButtonElement> = () => {
        setIsClicked(isLength !== '')
    }


    const params = useParams()
    const { id } = params

    const singleTask = task.find((t: TaskProps) => t.id === id)


    return (
        <div className={styles.taskPage}>
            <div className={styles.taskBox}>

                <div className={styles.titleBox}>
                    <h4>{singleTask?.title}</h4>
                    <Button>X</Button>
                </div>

                <h5>Description: <p>{singleTask?.description}</p></h5>
                <h5>Activity</h5>

                <div className={styles.commentBox}>

                    {
                        user?.photoURL ?
                            <img alt="profilePic" src={user?.photoURL} />
                            : user?.displayName
                    }
                    <div className={styles.commentInputBox}>

                        <textarea
                            placeholder="Write your comment..."
                            onClick={handleClick}
                            onChange={handleWrite}
                            value={isLength} />

                        {
                            isOpen ? <Button
                                className={styles.saveBtn}
                                variant="success"
                                disabled={!isLength ? true : false}
                                onClick={btnClick}>Save</Button>
                                : null
                        }

                    </div>

                </div>

                <Comments comments={singleTask!.comments} />

            </div>
        </div>
    )
}

export default TaskPage
