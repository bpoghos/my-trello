import styles from "./BoardCard.module.css"
import { Link } from "react-router-dom"
import { WorkspaceProps } from "../../../app/App.interface"

const BoardCard = ({ data }: { data: WorkspaceProps }) => {

    return (
        <Link to={`/workspace/${data.id}`} className={styles.link}>
            <div className={styles.card}>
                <img alt="backImage" src={data.image} />
                <h5>{data.title}</h5>
            </div>
        </Link>
    )
}

export default BoardCard
