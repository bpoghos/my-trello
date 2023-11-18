import { Link } from "react-router-dom"
import { ProcessProps } from "../../app/App.interface"
import styles from "./Process.module.css"
import { FaComment } from "react-icons/fa6"

const Process = ({ data }: { data: ProcessProps }) => {



    return (
        <div className={styles.processColumn}>
            <h5>{data.title}</h5>
            {
                data.data.map((task) => {
                    return <Link className={styles.link} to={`/workspace/${task.title.split(" ").join("")}/${task.id}`} key={task.id} ><div className={styles.task} >
                        <p>{task.title}</p>
                        <span><FaComment /> {task.comments.length}</span>
                    </div>
                    </Link>
                })
            }
        </div>
    )
}

export default Process
