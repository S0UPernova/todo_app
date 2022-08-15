import taskService from "../services/TaskService"
export default function CompletedTasks(props) {
  const { tasks, selectedTeam, selectedProject, token } = props

  

  // const handleCancel = (e) => {
  //   e.preventDefault()
  //   setFormInput(initialForm)
  //   setHidden(true)
  // }

  

  const handleDelete = (e) => {
    e.preventDefault()
    if (window.confirm("Are you sure")) {
      const taskId = e.target.value
      if (taskId) {
        taskService.deleteTask(selectedTeam, selectedProject, taskId, token)
          .then(() => props.getTasks())
          .catch(err => console.error(err))
      }
    }
  }
  
  
  return (
    <div className="completed">
      <div>
        <h3>Completed</h3>
        {selectedTeam && selectedProject && <ul>
          {tasks && tasks.map((task, i) => {
            const completed_at = task.completed_at && new Date(task.completed_at)
            const completedAt = task.completed_at && new Intl.DateTimeFormat('en-US').format(completed_at)

            const due_at = task.duedate && new Date(task.duedate)
            const dueAt = task.duedate && new Intl.DateTimeFormat('en-US').format(due_at)

            return task && task.completed === true &&
              <li key={"task index number " + i}>
                {task.name && <h4 key={"name" + i}>{task.name}</h4>}
                {task.duedate !== null && <h5 key={"duedate " + i}>Due by: {dueAt}</h5>}
                {task.completed !== null && <h5 key={"completed " + i}>Completed: {task.completed === true ? "true" : "false"}</h5>}
                {task.completed_at && <p key={"completed_at " + i}>Completed: {completedAt} <i>m/d/y</i></p>}
                <button onClick={handleDelete} value={task.id}>Delete Me!</button>
              </li>
          })}
        </ul>}
      </div>
    </div>
  )
}