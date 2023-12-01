import { Button } from "react-bootstrap"
import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { editTask } from "../../../redux/slices/workspaceSlice"
import { useAppDispatch } from "../../../hooks/useAppDispatch"
import { getTasksData } from "../../../redux/thunks/workspaceThunk"
import styles from "./styles/Task.module.css"


const Task = ({ data, setIsOpen, workspaceId, processId }: { data: any | undefined, setIsOpen: Function, workspaceId: string, processId: string }) => {

    const user = useSelector((state: any) => state.user.profile)


    const [isTextAreaClicked, setIsTextAreaClicked] = useState<boolean>(false)
    const [isDescriptionArea, setIsDescriptionArea] = useState<boolean>(false)
    const [comment, setComment] = useState<string>('')
    const [isClicked, setIsClicked] = useState<boolean>(false)
    const [isDescriptionSave, setIsDescriptionSave] = useState<boolean>(false)
    const [description, setDescription] = useState<string>('')

    const dispatch = useAppDispatch()

    console.log(data);

    const handleEditTask = () => {
        const payload = {
            title: data?.title,
            description,
        }

        dispatch(editTask({ payload, workspaceId, processId, taskId }))
    }

    const taskId = data?.id

    const handleClick = () => {
        setIsTextAreaClicked(true)
    }


    const handleWrite = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value)
    }

    const btnClick: MouseEventHandler<HTMLButtonElement> = () => {
        setIsClicked(comment !== '')
    }

    const handleDescriptionSaveClick = () => {
        setIsDescriptionSave((prevState) => !prevState)
        handleEditTask()
    }


    const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value)
    }
    const handleDesciptionClick = () => {
        setIsDescriptionArea(true)
    }
    const handleClose = () => {
        setIsOpen(false);
        dispatch(getTasksData({ workspaceId, processId }))
    }



    return (
        <div className={styles.taskPage}>
            <div className={styles.taskBox}>

                <div className={styles.titleBox}>
                    <h4>{data?.title}</h4>

                    <Button onClick={handleClose}>X</Button>

                </div>
                <h5>Description: <p>{data?.description}</p></h5>
                <div className={styles.descriptionBox}>

                    <div className={styles.descriptionInputBox}>
                        <div className={styles.emptyBox}></div>

                        {

                            isDescriptionSave ? (
                                <p className={styles.descriptionText} onClick={handleDescriptionSaveClick}>{description}</p>
                            ) : (
                                <div>
                                    {
                                        !data?.description.length ?
                                            <textarea
                                                placeholder="Write your comment..."
                                                onClick={handleDesciptionClick}
                                                onChange={handleChangeDescription}
                                                value={description}
                                            /> : null
                                    }
                                    {
                                        isDescriptionArea ? (
                                            <Button
                                                className={styles.saveBtn}
                                                variant="success"
                                                disabled={!description}
                                                onClick={handleDescriptionSaveClick}
                                            >
                                                Save
                                            </Button>
                                        ) : null
                                    }
                                </div>
                            )
                        }


                    </div>

                </div>
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
                            value={comment} />

                        {
                            isTextAreaClicked ? <Button
                                className={styles.saveBtn}
                                variant="success"
                                disabled={!comment}
                                onClick={btnClick}>Save</Button>
                                : null
                        }

                    </div>

                </div>

                {/* <Comments comments={data!.comments} /> */}

            </div>
        </div>
    )
}

export default Task
