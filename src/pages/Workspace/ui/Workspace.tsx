import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { WorkspaceProps } from "../../../app/App.interface";
import Process from "../../../components/Process";

const Workspace = ({ workspace }: { workspace: WorkspaceProps[] }) => {
    const params = useParams();
    const { title } = params;

    const singleWorkspace = workspace.find(
        (ws: WorkspaceProps) => ws.title === title
    );

    return (
        <Container className="d-flex mt-5">
            <Row>
                {singleWorkspace?.processes.map((single) => (
                    <Col lg={3} key={single.title}>
                        <Process data={single} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Workspace;



