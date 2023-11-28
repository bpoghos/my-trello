import { useParams } from "react-router"
import { TaskProps } from "../../../app/App.interface"
import { Button } from "react-bootstrap"
import styles from "./styles/Task.module.css"
import { ChangeEvent, MouseEventHandler, useState } from "react"
import Comments from "../../Comments"
import { useSelector } from "react-redux"


const Task = ({ singleTask, setIsOpen }: { singleTask: TaskProps | undefined, setIsOpen: Function }) => {

    const user = useSelector((state: any) => state.user.profile)


    const [isTextAreaClicked, setIsTextAreaClicked] = useState<boolean>(false)
    const [isLength, setIsLength] = useState<string>('')
    const [isClicked, setIsClicked] = useState<boolean>(false)






    const handleClick = () => {
        setIsTextAreaClicked(true)
    }

    const handleWrite = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setIsLength(event.target.value)
    }

    const btnClick: MouseEventHandler<HTMLButtonElement> = () => {
        setIsClicked(isLength !== '')
    }


    const params = useParams()
    const { id } = params


    console.log(singleTask?.description);


    return (
        <div className={styles.taskPage}>
            <div className={styles.taskBox}>

                <div className={styles.titleBox}>
                    <h4>{singleTask?.title}</h4>

                    <Button onClick={() => setIsOpen(false)}>X</Button>

                </div>


                <h5>Description: <p>{singleTask?.description}</p></h5>
                <h5>Activity</h5>

                <div className={styles.commentBox}>

                    {
                        user.photoURL ?
                            <img alt="profilePic" src={user.photoURL} />
                            : user.displayName || "user Photo"
                    }
                    <div className={styles.commentInputBox}>

                        <textarea
                            placeholder="Write your comment..."
                            onClick={handleClick}
                            onChange={handleWrite}
                            value={isLength} />

                        {
                            isTextAreaClicked ? <Button
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

export default Task
