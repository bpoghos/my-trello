import styles from "./BoardCard.module.css"
import { Link } from "react-router-dom"
import { WorkspaceProps } from "../../../app/App.interface"

const BoardCard = ({ data }: { data: WorkspaceProps }) => {

    return (
        <Link to={`/workspace/${data.title}`} className={styles.link}>
            <div className={styles.card}>
                <h5>{data.title}</h5>
            </div>
        </Link>


    )
}

export default BoardCard
