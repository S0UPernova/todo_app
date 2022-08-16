import { BsGearWide } from "react-icons/bs"

export default function CompletedTasks(props) {
  const { tasks, selectedTeam, selectedProject, handleClick } = props

  return (
    <div className="completed">
      <div>
        <h3>Completed</h3>
        {selectedTeam && selectedProject && <ul className="tasks">
          {tasks && tasks.map((task, i) => {

            const completed_at = task.completed_at && new Date(task.completed_at)
            const completedAt = task.completed_at && new Intl.DateTimeFormat('en-US').format(completed_at)

            const due_at = task.duedate && new Date(task.duedate)
            const dueAt = task.duedate && new Intl.DateTimeFormat('en-US').format(due_at)

            return task && task.completed === true &&
              <li key={"task index number " + i}>
                {task.name && <>
                  <h4 key={"name" + i}>
                    <button
                      name="editButton"
                      onClick={handleClick}
                      value={JSON.stringify(task)} // Passing an object directly didn't seem to work
                    ><i><BsGearWide /></i>
                    </button> {task.name}
                  </h4>
                </>}
                {task.duedate !== null && <h5 key={"duedate " + i}>Due by: {dueAt}</h5>}
                {task.completed !== null && <h5 key={"completed " + i}>Completed: {task.completed === true ? "true" : "false"}</h5>}
                {task.completed_at && <p key={"completed_at " + i}>Completed: {completedAt} <i>m/d/y</i></p>}
              </li>
          })}
        </ul>}
      </div>
    </div>
  )
}