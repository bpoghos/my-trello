import { useParams } from "react-router-dom";
import { ProcessProps, TaskProps, WorkspaceProps } from "../../app/App.interface";
import styles from "./Process.module.css";
import { FaAngleLeft, FaComment, FaList, FaPlus } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import Modal from "../../shared/Modal";
import Task from "../Task";
import { Draggable } from "react-beautiful-dnd";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addTask, deleteProcess, editProcess } from "../../redux/slices/workspaceSlice";
import { AppDispatch } from "../../redux/store";
import { getCommentsData, getProcessData, getTasksData } from "../../redux/thunks/workspaceThunk";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const Process = ({ data, singleWorkspace }: { data: ProcessProps; singleWorkspace: WorkspaceProps }) => {
    const params = useParams();
    const dispatch = useDispatch<AppDispatch>()
    const { taskId } = params;
    const workspaceId = singleWorkspace.id
    const processId = data.id

    const tasks = useSelector((state: any) => state.tasks[processId])
    const [isOpen, setIsOpen] = useState<boolean>(taskId ? true : false)
    const [openMenu, setOpenMenu] = useState<boolean>(false)
    const [changeTitleClick, setChangeTitleClick] = useState<boolean>(false)
    const [title, setTitle] = useState(changeTitleClick ? data.title : '')
    const [isAddTaskClicked, setIsAddTaskClicked] = useState<boolean>(false)
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [singleTask, setSingleTask] = useState<string>('')

    const [taskComments, setTaskComments] = useState<{ [taskId: string]: any }>({})

    useEffect(() => {
        const fetchComments = async () => {
            const commentsPromises = (tasks?.tasks || []).map((task: TaskProps) => {
                console.log('asd')
                return dispatch(getCommentsData({ workspaceId, processId, taskId: task.id }))
            });

            const commentsResults = await Promise.all(commentsPromises);

            const updatedTaskComments = commentsResults.reduce((acc, comments, index) => {
                const taskId = tasks.tasks[index].id;
                acc[taskId] = comments;
                return acc;
            }, {} as { [taskId: string]: Comment[] })

            setTaskComments((prevComments) => ({
                ...prevComments,
                ...updatedTaskComments,
            }));

        };

        fetchComments();
    }, [tasks, dispatch, workspaceId, processId]);

    useEffect(() => {
        dispatch(getTasksData({ workspaceId, processId }))
    }, [dispatch, processId, workspaceId])



    const openModal = (task: any) => {
        setSingleTask(task);
        setIsOpen(true);
    };

    const handleClickChangeTitle = () => {
        setChangeTitleClick(true);
    };

    const handleChangeTaskName = (e: any) => {
        setTaskTitle(e.target.value)
    }

    const handliCreateTaskClick = () => {
        const payload = {
            title: taskTitle,
            description: ''
        }

        dispatch(addTask({ payload, workspaceId, processId }))
        dispatch(getTasksData({ workspaceId, processId }))
        setIsAddTaskClicked(false)
        setTaskTitle("")

    }


    const menuRef: any = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event: { target: any; }) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);



    const handleAddTaskClick = () => {
        setIsAddTaskClicked(true)
    }

    const handleBackIconClick = () => {
        setIsAddTaskClicked(false)
    }


    const handleBlur = () => {
        setChangeTitleClick(false);

        const trimmedTitle = title.trim();

        if (trimmedTitle.length === 0) {
            alert('Title cannot be empty');
            return
        }

        const payload: any = {
            title
        }

        dispatch(editProcess({ payload, workspaceId, processId }))
        dispatch(getProcessData(singleWorkspace))
    };

    const handleDeleteProcess = () => {
        dispatch(deleteProcess({ workspaceId, processId }))
        dispatch(getProcessData(singleWorkspace))
    }



    return (
        <div className={styles.processColumn}>
            <div className={styles.processContent}>
                <div className={styles.processTitle} onClick={handleClickChangeTitle}>
                    {changeTitleClick ? (
                        <input type="text" value={title} autoFocus onChange={(e) => setTitle(e.target.value)} onBlur={handleBlur} />
                    ) : (
                        <h5>{data.title}</h5>
                    )}
                </div>
                <div className={styles.menuIconContainer} onClick={() => setOpenMenu((prevState) => !prevState)}>
                    <BsThreeDots />
                </div>
                {openMenu && (
                    <div ref={menuRef} className={styles.menuDropDown}>
                        <div className={styles.menuContent}>
                            <div className={styles.delete} onClick={handleDeleteProcess}>
                                <p>Delete</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {
                tasks && tasks.tasks?.length ? (
                    tasks.tasks?.map((task: TaskProps, index: any) => {
                        const commentsForTask = taskComments[task.id]?.payload || []

                        return (
                            < Draggable key={task.id} draggableId={task.id} index={index} >
                                {(provided) => (
                                    <div
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                        className={styles.link}
                                        key={task.id}
                                    >
                                        <div className={styles.task} onClick={() => openModal(task)}>
                                            <p>{task.title}</p>
                                            {task.description.length ? <span><FaList /></span> : null}
                                            {commentsForTask.length > 0 ? <span><FaComment /></span> : null}
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        );
                    })
                ) : null
            }
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
                <Task data={singleTask} setIsOpen={setIsOpen} workspaceId={workspaceId} processId={processId} />
            </Modal>

            {
                isAddTaskClicked ? (
                    <div className={styles.createTask}>
                        <input type='text' placeholder="Enter list title..." autoFocus onChange={handleChangeTaskName} />
                        <div className={styles.createBtnsContainer}>
                            <Button disabled={!taskTitle ? true : false} onClick={handliCreateTaskClick}>Create</Button>
                            <div className={styles.backPageIconContainer} onClick={handleBackIconClick}><FaAngleLeft /></div>
                        </div>
                    </div>
                ) :
                    <div className={styles.addAnotherlistContainer} onClick={handleAddTaskClick}>
                        <p> <span><FaPlus /></span>{" "} Add a card</p>
                    </div>
            }

        </div >
    );
};

export default Process;
