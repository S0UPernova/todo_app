// import { BsGearWide } from "react-icons/bs"
import { TbClipboardPlus } from "react-icons/tb"

import Task from "./Task"

export default function PendingTasks(props) {
  const { tasks, selectedTeam, selectedProject, handleClick } = props

  return (
    <div className="pending">
      {selectedProject &&
        <button
          name="addButton"
          id="addButton"
          className="addButton btn primary hover"
          onClick={handleClick}
        >
          <i><TbClipboardPlus /></i>
        </button>}
      <h3>Pending completion</h3>
      {selectedTeam && selectedProject && <ul className="tasks">
        {tasks && tasks.map((task, i) => {
          return (
            task?.completed === false &&
            <Task task={task} index={i} handleClick={handleClick} key={i} />
          )
        })}
      </ul>}
    </div >
  )
}