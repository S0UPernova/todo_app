import { useState } from "react"
import taskService from "../services/TaskService"
export default function AddEditAndRemoveForm(props) {
  const { selectedTeam, selectedProject, token, setHidden, getTasks, task, setTask } = props

  const taskJSON = JSON.parse(task) // Passing an object directly didn't seem to work
  const initialForm = {
    name: taskJSON?.name ? taskJSON.name : null,
    description: taskJSON?.description ? taskJSON.description : null,
    duedate: taskJSON?.duedate ? taskJSON.duedate : null,
    completed: taskJSON?.completed ? taskJSON.completed : null, // could fail
  }
  const [formInput, setFormInput] = useState(initialForm)

  const handleSubmit = (e) => {
    e.preventDefault()
    switch (e.target.name) {
      case "submit":
        const params = {
          name: formInput.name ? formInput.name : null,
          description: formInput.description ? formInput.description : null,
          duedate: formInput.duedate ? formInput.duedate : null,
          completed: formInput.completed === true ? formInput.completed : false
        }

        if (!taskJSON) {
          taskService.postTask(selectedTeam, selectedProject, params, token)
            .then(() => {
              setHidden(true)
              setFormInput(initialForm)
              getTasks()
              setTask(null)
            })
            .catch(err => console.error(err))
        } else if (taskJSON) {
          taskService.updateTask(selectedTeam, selectedProject, Number(taskJSON.id), params, token)
            .then(() => {
              setHidden(true)
              setFormInput(initialForm)
              getTasks()
              setTask(null)
            })
            .catch(err => console.error(err))
        }
        break
      case "cancel":
        setFormInput(initialForm)
        setHidden(true)
        setTask(null)
        break
      case "deleteButton":
        if (window.confirm("Are you sure")) {
          const taskId = e.target.value
          if (taskId) {
            taskService.deleteTask(selectedTeam, selectedProject, taskId, token)
              .then(() => {
                setHidden(true)
                setFormInput(initialForm)
                getTasks()
                setTask(null)
              })
              .catch(err => console.error(err))
          }
        }
        break
      default:
        setFormInput(initialForm)
        setHidden(true)
        setTask(null)
        break
    }
  }

  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        setFormInput({ ...formInput, name: e.target.value })
        break
      case "description":
        setFormInput({ ...formInput, description: e.target.value })
        break
      case "duedate":
        setFormInput({ ...formInput, duedate: e.target.value })
        break
      case "completed":
        setFormInput({ ...formInput, completed: e.target.checked })
        break
      default:
        break
    }
  }

  return (
    <>
      <div name="cancel" className="backdrop" onClick={handleSubmit}>
      </div>
      <div className="formContainer">
        <form className="add">
          <label for="name">Name: </label>
          <input
            id="name"
            type="text"
            onChange={handleChange}
            value={formInput.name}
            name="name"
          ></input>

          <label for="desctription">Description: </label>
          <textarea
            id="desctription"
            onChange={handleChange}
            value={formInput.description}
            name="description"
          ></textarea>

          <label for="duedate">Duedate: </label>
          <input
            id="duedate"
            type="date"
            onChange={handleChange}
            value={formInput.duedate}
            name="duedate"
          ></input>

          {formInput.completed !== undefined && <label>Completed?:
            <input
              id="completed"
              className="completed"
              type="checkbox"
              onChange={handleChange}
              checked={formInput.completed}
              name="completed"
            ></input>
          </label>
          }

          <button
            className="btn primary hover"
            name="submit"
            type="submit"
            onClick={handleSubmit}
          >{taskJSON ? 'update' : 'Add'}</button>

          <button
            className="btn primary hover"
            name="cancel"
            type="submit"
            onClick={handleSubmit}
          >cancel</button>

          {taskJSON && <button
            className="btn danger hover"
            name="deleteButton"
            type="submit"
            onClick={handleSubmit}
            value={taskJSON.id}
          >Delete Me!</button>}

        </form>
      </div>
    </>
  )
}