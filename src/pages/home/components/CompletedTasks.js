import Task from "./Task"

export default function CompletedTasks(props) {
  const { tasks, selectedTeam, selectedProject, handleClick } = props

  return (
    <div id="completed" className="bg-secondary rounded border">
      <h3>Completed</h3>
      {selectedTeam && selectedProject && <ul className="tasks">
        {tasks && tasks.map((task, i) => {
          return task && task.completed === true &&
            <Task
              task={{
                id: task.id,
                name: task.name,
                duedate: task.duedate,
                completed: task.completed
              }}
              handleClick={handleClick}
              key={i}
            />
        })}
      </ul>}
    </div>
  )
}