export default function PendingTasks(props) {
  const { tasks, selectedTeam, selectedProject } = props

  return (
    <div>
      <h3>Pending completion</h3>
      {selectedTeam && selectedProject && <ul>
        {tasks && tasks.map((task, i) => {

          const due_at = task.duedate && new Date(task.duedate)
          const dueAt = task.duedate && new Intl.DateTimeFormat('en-US').format(due_at);

          return (
            task && task.completed !== true &&
            <li key={"task index number " + i}>
              {task.name && <h4 key={"name" + i}>{task.name}</h4>}
              {task.description &&
                <p key={"decription " + i}>{task.description}</p>}
              {task.duedate !== null &&
                <h5 key={"duedate " + i}>Due by: {dueAt} <i>m/d/y</i></h5>}
              {task.completed !== null &&
                <h5 key={"completed " + i}>Completed: {
                  task.completed === true ? "true" : "false"}
                </h5>}
            </li>
          )
        })}
      </ul>}
    </div>
  )
}