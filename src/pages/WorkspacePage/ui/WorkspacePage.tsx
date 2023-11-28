import { useParams } from "react-router";
import { ProcessProps, TaskProps, WorkspaceProps } from "../../../app/App.interface";
import Process from "../../../components/Process";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { updateProcessesOrder, updateTasksOrder } from "../../../redux/slices/workspaceSlice";
import Loading from "../../../components/Loading";

import styles from "../styles/Workspace.module.css"

const Workspace = () => {
    const params = useParams();
    const { title } = params;
    const dispatch = useDispatch()
    const workspace = useSelector((state: any) => state.workspace.workspace)
    const loading = useSelector((state: any) => state.workspace.loading)


    const singleWorkspace = workspace.find(
        (ws: WorkspaceProps) => ws.title === title
    );



    const onDragEnd = (result: any) => {
        const { source, destination, draggableId } = result;
        console.log({ source, destination, draggableId });
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }



        const sourceProcess: ProcessProps = singleWorkspace.processes.find(
            (process: ProcessProps) => process.title === source.droppableId) as ProcessProps;
        const destinationColumn: ProcessProps = singleWorkspace.processes.find(
            (process: ProcessProps) => process.title === destination.droppableId) as ProcessProps;

        const newSourceCards: TaskProps[] = Array.from(sourceProcess?.tasks as TaskProps[])
        const [removedCard] = newSourceCards.splice(source.index, 1);

        if (source.droppableId === destination.droppableId) {
            newSourceCards.splice(destination.index, 0, removedCard);

            const newColumn: ProcessProps = {
                ...sourceProcess,
                tasks: newSourceCards,
            };
            console.log(newColumn);

            dispatch(updateProcessesOrder({ newColumn, singleWorkspace }));


        } else {
            const newDestinationCards: TaskProps[] = Array.from(destinationColumn.tasks);
            newDestinationCards.splice(destination.index, 0, removedCard);


            const newsourceProcess: ProcessProps = {
                ...sourceProcess,
                tasks: newSourceCards
            }

            const newDestinationColumn: ProcessProps = {
                ...destinationColumn,
                tasks: newDestinationCards
            }



            dispatch(updateTasksOrder({
                singleWorkspace,
                newDestinationColumn,
                newsourceProcess
            }));
        }




    }


    return (
        <div className="d-flex mt-5">
            {
                loading ? <Loading />
                    :
                    <DragDropContext onDragEnd={onDragEnd}>
                        {singleWorkspace?.processes.map((single: ProcessProps) => (
                            <Droppable droppableId={single.title} key={single.title}>
                                {
                                    (provided) => {
                                        return (
                                            <div className="ms-3"
                                                key={single.title}
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}>
                                                <Process data={single} singleWorkspace={singleWorkspace} />
                                            </div>
                                        )
                                    }
                                }
                            </Droppable>
                        ))
                        }
                    </DragDropContext>
            }
            <div className={styles.addAnotherlistContainer}>
                <p>+ Add another list</p>
            </div>
        </div>
    );
};

export default Workspace;



