import styles from "./BoardCards.module.css"
import BoardCard from "./BoardCard/BoardCard"
import { WorkspaceProps } from "../../app/App.interface"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"

const BoardCards = () => {

    const { workspace } = useSelector((state: RootState) => state)


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
