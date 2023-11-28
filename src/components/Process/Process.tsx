import { Link, useNavigate, useParams } from "react-router-dom"
import { ProcessProps, TaskProps, WorkspaceProps } from "../../app/App.interface"
import styles from "./Process.module.css"
import { FaComment } from "react-icons/fa6"
import { useEffect, useState } from "react"
import Modal from "../../shared/Modal"
import Task from "../Task"
import { Draggable } from "react-beautiful-dnd"

const Process = ({ data, singleWorkspace }: { data: ProcessProps, singleWorkspace: WorkspaceProps }) => {


    const params = useParams()
    const { taskId } = params

    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState<boolean>(taskId ? true : false)
    const [task, setTask] = useState<TaskProps | undefined>()

    useEffect(() => {
        if (taskId) {
            const currentTask = data.tasks.find((task: TaskProps) => taskId === task.id)
            setTask(currentTask)
        }
    }, [])



    const openModal = (task: TaskProps) => {
        setTask(task)
        setIsOpen(true)
        // navigate(`/${task.id}`, { replace: false });
    }

    return (<div className={styles.processColumn}
    >
        <h5>{data.title}</h5>
        {
            data.tasks.map((task: TaskProps, index) => {
                return <Draggable key={task.id} draggableId={task.id} index={index}>
                    {
                        (provided) => {
                            return (
                                <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    className={styles.link} key={task.id}>
                                    <div className={styles.task} onClick={() => openModal(task)}>
                                        <p>{task.title}</p>
                                        <span><FaComment /> {task.comments.length}</span>
                                    </div>
                                </div>
                            )
                        }}
                </Draggable>

            })

        }
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <Task singleTask={task} setIsOpen={setIsOpen} />
        </Modal>
    </div>

    )
}

export default Process
