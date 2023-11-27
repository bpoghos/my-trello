import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { ProcessProps, TaskProps, WorkspaceProps } from "../../../app/App.interface";
import Process from "../../../components/Process";
import { useSelector } from "react-redux";
// import { RootState } from "../../../redux/store";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { updateProcessesOrder, updateTasksOrder } from "../../../redux/slices/workspaceSlice";

const Workspace = () => {
    const params = useParams();
    const { title } = params;
    const dispatch = useDispatch()
    const { workspace } = useSelector((state: any) => state.workspace)



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

        const newSourceCards: TaskProps[] = Array.from(sourceProcess?.data as TaskProps[])
        const [removedCard] = newSourceCards.splice(source.index, 1);

        if (source.droppableId === destination.droppableId) {
            newSourceCards.splice(destination.index, 0, removedCard);

            const newColumn: ProcessProps = {
                ...sourceProcess,
                data: newSourceCards,
            };
            console.log(newColumn);

            dispatch(updateProcessesOrder({ newColumn, singleWorkspace }));


        } else {
            const newDestinationCards: TaskProps[] = Array.from(destinationColumn.data);
            newDestinationCards.splice(destination.index, 0, removedCard);


            const newsourceProcess: ProcessProps = {
                ...sourceProcess,
                data: newSourceCards
            }

            const newDestinationColumn: ProcessProps = {
                ...destinationColumn,
                data: newDestinationCards
            }



            dispatch(updateTasksOrder({
                singleWorkspace,
                newDestinationColumn,
                newsourceProcess
            }));
        }




    }
    return (
        <Container className="d-flex mt-5">
            <DragDropContext onDragEnd={onDragEnd}>
                <Row>
                    {singleWorkspace?.processes.map((single: ProcessProps) => (
                        <Droppable droppableId={single.title} key={single.title}>
                            {
                                (provided) => {
                                    return (
                                        <Col lg={3} key={single.title}
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}>
                                            <Process data={single} singleWorkspace={singleWorkspace} />
                                        </Col>
                                    )
                                }
                            }
                        </Droppable>
                    ))
                    }
                </Row>
            </DragDropContext>
        </Container>
    );
};

export default Workspace;



