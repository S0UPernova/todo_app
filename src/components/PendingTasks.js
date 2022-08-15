import { useState } from "react"
import taskService from "../services/TaskService"
import AddEditAndRemoveForm from "./AddAndEditForm"

export default function PendingTasks(props) {
  const { tasks, selectedTeam, selectedProject, token, getTasks } = props
  const [hidden, setHidden] = useState(true)


  // const handleForm = (e) => {
  //   e.preventDefault()
  //   const params = {
  //     name: formInput.name,
  //     description: formInput.description ? formInput.description : null,
  //     duedate: formInput.duedate ? formInput.duedate : null
  //   }
  //   taskService.postTask(selectedTeam, selectedProject, params, token)
  //     .then(() => {
  //       setHidden(true)
  //       setFormInput(initialForm)
  //       props.getTasks()
  //     })
  //     .catch(err => console.error(err))
  // }

  // const handleCancel = (e) => {
  //   e.preventDefault()
  //   setFormInput(initialForm)
  //   setHidden(true)
  // }

  // const handleChange = (e) => {
  //   switch (e.target.name) {
  //     case "name":
  //       setFormInput({ ...formInput, name: e.target.value })
  //       break
  //     case "description":
  //       setFormInput({ ...formInput, description: e.target.value })
  //       break
  //     case "duedate":
  //       setFormInput({ ...formInput, duedate: e.target.value })
  //       break
  //     default:
  //       break
  //   }
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
    <div className="pending">
      {selectedProject && <button className="addButton" onClick={() => setHidden(false)}>Add</button>}
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
                {task.id !== null &&
                  <p key={"id " + i}>id: {task.id}
                  </p>}
                <button onClick={handleDelete} value={task.id}>Delete Me!</button>
              </li>
            )
          })}
        </ul>}
        {hidden === false && <AddEditAndRemoveForm
          setHidden={setHidden}
          selectedTeam={selectedTeam}
          selectedProject={selectedProject}
          token={token}
          getTasks={getTasks}
        />}
      </div>
    </div>
  )
}