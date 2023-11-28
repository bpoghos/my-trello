import styles from "./BoardCards.module.css"
import BoardCard from "./BoardCard/BoardCard"
import { useSelector } from "react-redux"
import Loading from "../Loading"



const BoardCards = () => {

    const workspace = useSelector((state: any) => state.workspace.workspace)
    const loading = useSelector((state: any) => state.workspace.loading)




    return (
        <div className={styles.cards}>
            {loading ? (

                <Loading />
            ) : (
                workspace ? workspace.map((space: any) => (
                    <BoardCard key={space.title} data={space} />
                )) : null
            )}
        </div>
    )
}

export default BoardCards
