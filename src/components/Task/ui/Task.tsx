import { Button } from "react-bootstrap"
import { ChangeEvent, MouseEventHandler, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { addcomment, editTask } from "../../../redux/slices/workspaceSlice"
import { useAppDispatch } from "../../../hooks/useAppDispatch"
import { getCommentsData, getProcessData, getTasksData } from "../../../redux/thunks/workspaceThunk"

import { AiOutlineClose } from "react-icons/ai";
import styles from "./styles/Task.module.css"
import Comments from "../../Comments"


const Task = ({ data, setIsOpen, workspaceId, processId }: { data: any | undefined, setIsOpen: Function, workspaceId: string, processId: string }) => {

    const user = useSelector((state: any) => state.user.profile)


    const [isTextAreaClicked, setIsTextAreaClicked] = useState<boolean>(false)
    const [isDescriptionArea, setIsDescriptionArea] = useState<boolean>(false)
    const [isDescriptionSave, setIsDescriptionSave] = useState<boolean>(false)
    const [isTitleClick, setIsTitleClick] = useState<boolean>(false)
    const [description, setDescription] = useState<string>(data?.description || '')
    const [comment, setComment] = useState<string>('')
    const [title, setTitle] = useState<string>(data?.title || '')


    const dispatch = useAppDispatch()


    const handleEditTask = () => {
        if (title.trim() !== '') {
            const payload = {
                title,
                description,
            }

            dispatch(editTask({ payload, workspaceId, processId, taskId }))
        } else {
            alert('Title cannot be empty');
        }

    }


    const taskId = data?.id


    const handleClick = () => {
        setIsTextAreaClicked(true)
    }
    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const handleWrite = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value)
    }

    const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value)
    }
    const handleDescriptionSaveClick = () => {
        setIsDescriptionSave((prevState) => !prevState)
        handleEditTask()
    }
    const handleSaveTitle = () => {
        setIsTitleClick(false)
        handleEditTask()
    }




    const handleDesciptionClick = () => {
        setIsDescriptionArea(true)
    }
    const handleClose = () => {
        setIsOpen(false)
        dispatch(getTasksData({ workspaceId, processId }))
    }




    const handleAddComment = () => {
        const payload = {
            userId: user.uid,
            userName: user.displayName,
            userPhoto: user.photoURL,
            comment,
            date: Date.now()
        }
        dispatch(addcomment({ payload, workspaceId, processId, taskId }))
        setComment('')
    }





    return (
        <div className={styles.taskPage}>
            <div className={styles.taskBox}>

                <div className={styles.titleBox}>
                    {
                        isTitleClick ? (
                            <div className={styles.titleInputBox}>
                                <input
                                    className={styles.titleInput}
                                    onChange={handleTitleChange}
                                    value={title}
                                    autoFocus
                                />
                                <Button
                                    className={styles.titleSave}
                                    onClick={handleSaveTitle}
                                    variant="success"
                                >Save</Button>
                            </div>
                        ) : (
                            <h4 className={styles.title} onClick={() => setIsTitleClick(true)}>{data?.title}</h4>
                        )
                    }

                    <Button
                        onClick={handleClose}
                        className={styles.closeModal}
                        variant="outline-dark"
                    >
                        <AiOutlineClose />
                    </Button>

                </div>
                <h5>Description<p>{data?.description}</p></h5>
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
                            <img alt="profilePic" src={user.photoURL} loading='lazy' />
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
                                onClick={handleAddComment}>Save</Button>
                                : null
                        }

                    </div>

                </div>

                <Comments workspaceId={workspaceId} processId={processId} taskId={taskId} />

            </div>
        </div>
    )
}

export default Task
