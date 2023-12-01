import styles from "./BoardCards.module.css"
import BoardCard from "./BoardCard/BoardCard"
import { useSelector } from "react-redux"
import Loading from "../Loading"
import { useEffect, useState } from "react"
import { WorkspaceProps } from "../../app/App.interface"



const BoardCards = ({ searchVal }: { searchVal: string }) => {
    const workspace = useSelector((state: any) => state.workspace.workspace)
    const loading = useSelector((state: any) => state.workspace.loading)
    const [filteredWorkspace, setFilteredWorkspace] = useState<WorkspaceProps[]>()

    useEffect(() => {
        setFilteredWorkspace(workspace.filter((ws: WorkspaceProps) => ws.title.includes(searchVal)))
    }, [searchVal])


    return (
        <div className={styles.cards}>
            {loading ? (

                <Loading />
            ) : (
                searchVal?.length ? filteredWorkspace?.map((space: any) => (
                    <BoardCard key={space.id} data={space} />
                )) : workspace?.length ? workspace.map((space: any) => (
                    <BoardCard key={space.id} data={space} />
                )) : null
            )}
        </div>
    )
}

export default BoardCards
