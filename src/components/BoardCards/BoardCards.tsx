import styles from "./BoardCards.module.css"
import BoardCard from "./BoardCard/BoardCard"
import { WorkspaceProps } from "../../app/App.interface"

const BoardCards = ({ workspace }: { workspace: WorkspaceProps[] }) => {




    return (
        <div className={styles.cards}>
            {
                workspace.map((space) => {
                    return <BoardCard key={space.title} data={space} />
                })
            }
        </div>
    )
}

export default BoardCards
