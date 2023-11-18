import { Container } from "react-bootstrap"
import SideBar from "../../../shared/SideBar"
import BoardCards from "../../../components/BoardCards"
import { YOUR_WORKSPACES } from "../../../shared/constant/constant"
import styles from "./BoardPage.module.css"
import { WorkspaceProps } from "../../../app/App.interface"


const BoardPage = ({ workspace }: { workspace: WorkspaceProps[] }) => {
    return (
        <Container className="mt-5 d-flex">
            <SideBar />
            <div className={styles.workspaceContainer}>
                <h2 className={styles.title}>{YOUR_WORKSPACES}</h2>
                <BoardCards workspace={workspace} />
            </div>

        </Container>
    )
}

export default BoardPage
