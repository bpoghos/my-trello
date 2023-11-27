import styles from "./BoardCards.module.css"
import BoardCard from "./BoardCard/BoardCard"
import { useSelector } from "react-redux"
// import { RootState } from "../../store/store"

const BoardCards = () => {

    const { workspace } = useSelector((state: any) => state.workspace)

    console.log(workspace);

    return (
        <div className={styles.cards}>
            {
                workspace.length ? workspace.map((space: any) => {
                    return <BoardCard key={space.title} data={space} />
                }) : null
            }
        </div>
    )
}

export default BoardCards
