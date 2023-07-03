// import { BsGearWide } from "react-icons/bs"
import { MdPostAdd } from "react-icons/md"

import Task from "./Task"

export default function PendingTasks(props) {
  const { tasks, selectedTeam, selectedProject, handleClick } = props

  return (
    <div className="pending bg-primary rounded border blur">
      {selectedProject && selectedProject !=="" &&
        <button
          title="Create new task"
          name="addButton"
          id="addButton"
          className="addButton btn primary hover icon-button"
          onClick={handleClick}
        >
          <i className="icon"><MdPostAdd /></i>
        </button>}
      <h3>Pending completion</h3>
      {selectedTeam && selectedProject && selectedProject !=="" && <ul className="tasks">
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