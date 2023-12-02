import { useParams } from "react-router";
import { ProcessProps, TaskProps, WorkspaceProps } from "../../../app/App.interface";
import Process from "../../../components/Process";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { addProcess, editTask } from "../../../redux/slices/workspaceSlice";
import Loading from "../../../components/Loading";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaAngleLeft, FaPlus } from "react-icons/fa6";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { getProcessData, getTasksData } from "../../../redux/thunks/workspaceThunk";

import styles from "../styles/Workspace.module.css"

const Workspace = ({ searchVal }: { searchVal: string }) => {

    const [isAddListClicked, setIsAddListClicked] = useState<boolean>(false)
    const [listName, setListName] = useState<string>("")

    const dispatch = useAppDispatch()


    const params = useParams();
    const { id } = params;
    const dispatchProcess = useDispatch()
    const getDispatchProcess = useAppDispatch()
    const workspace = useSelector((state: any) => state.workspace.workspace)
    const loading = useSelector((state: any) => state.workspace.loading)
    const processes = useSelector((state: any) => state.processes.processes)
    const tasks = useSelector((state: any) => state.tasks)

    const [filteredProcesses, setFilteredProcesses] = useState<ProcessProps[]>()

    useEffect(() => {
        setFilteredProcesses(processes.filter((p: ProcessProps) => p.title.includes(searchVal)))
    }, [searchVal])



    const singleWorkspace = workspace.find(
        (ws: WorkspaceProps) => ws.id === id
    );



    const handleAddListClick = () => {
        setIsAddListClicked(true)
    }
    const handleBackIconClick = () => {
        setIsAddListClicked(false)
    }

    const handleChangeListName = (e: any) => {
        setListName(e.target.value)
    }


    const handliCreateListClick = () => {
        if (listName.trim() !== '') {
            const payload: any = {
                title: listName,
            }


            const { id } = singleWorkspace
            dispatchProcess(addProcess({ payload, id }))
            dispatch(getProcessData(singleWorkspace))
            setListName("")
            setIsAddListClicked(false)
        } else {
            alert('ListName cannot be empty');
        }

    }


    useEffect(() => {
        getDispatchProcess(getProcessData(singleWorkspace))
    }, [getDispatchProcess, singleWorkspace])



    const onDragEnd = (result: any) => {
        const { source, destination, draggableId } = result;
        console.log(result);

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        const tasksById = tasks[source.droppableId]; // vercraci taskern en

        const updatedTaskData = tasksById.tasks.find((task: TaskProps) => task.id === draggableId);
        console.log(updatedTaskData);

        dispatch(editTask({
            payload: updatedTaskData,
            workspaceId: singleWorkspace.id,
            processId: undefined,
            taskId: draggableId,
            sourceProcessId: source.droppableId,
            destinationProcessId: destination.droppableId,
            sourceIndex: source.index,
            destinationIndex: destination.index,
        }))
            .then(() => dispatch(getTasksData({ workspaceId: singleWorkspace.id, processId: source.droppableId })))
            .then(() => dispatch(getTasksData({ workspaceId: singleWorkspace.id, processId: destination.droppableId })))
    }



    const renderProcesses = () => {
        if (searchVal.length > 0) {
            return filteredProcesses?.map((single: ProcessProps) => (
                <Droppable droppableId={single.id} key={single.id}>
                    {(provided) => (
                        <div
                            className={styles.processes}
                            key={single.title}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            <Process data={single} singleWorkspace={singleWorkspace} />
                        </div>
                    )}
                </Droppable>
            ));
        } else {
            return processes?.map((single: ProcessProps) => (
                <Droppable droppableId={single.id} key={single.id}>
                    {(provided) => (
                        <div
                            className={styles.processes}
                            key={single.title}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            <Process data={single} singleWorkspace={singleWorkspace} />
                        </div>
                    )}
                </Droppable>
            ));
        }
    };


    return (
        <>
            <div className={styles.backgroundImage}>
                <img src={singleWorkspace?.image} alt="backPhoto" />
            </div>
            <div className={styles.workspace}>
                {
                    loading ? <Loading />
                        :
                        <DragDropContext onDragEnd={onDragEnd}>
                            {renderProcesses()}
                        </DragDropContext>
                }

                {
                    isAddListClicked ? (
                        <div className={styles.createList}>
                            <input type='text' placeholder="Enter list title..." autoFocus onChange={handleChangeListName} />
                            <div className={styles.createBtnsContainer}>
                                <Button disabled={!id ? true : false} onClick={handliCreateListClick}>Create</Button>
                                <div className={styles.backPageIconContainer} onClick={handleBackIconClick}><FaAngleLeft /></div>
                            </div>
                        </div>
                    ) : <div className={styles.addAnotherlistContainer} onClick={handleAddListClick}>
                        <p><span><FaPlus /></span> Add another list</p>
                    </div>
                }
            </div >
        </>
    );
};

export default Workspace;



