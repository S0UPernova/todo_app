import { useState } from "react"
import taskService from "../../../services/TaskService"

import styles from "../../../styles/form.module.scss"

export default function TaskForm(props) {
  const {
    selectedTeam,
    selectedProject,
    token,
    getTasks,
    task,
    setTask,

    setFormState,
    formStates,
    add
  } = props
  const due_at = task?.duedate && new Date(task.duedate)
  const dueAt = task?.duedate && new Intl.DateTimeFormat('en-us', { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" }).format(due_at);

  const initialForm = {
    name: task?.name && !add ? task.name : "",
    description: task?.description && !add ? task.description : "",
    duedate: task?.duedate && !add ? task.duedate : "",
    completed: task?.completed && !add ? task.completed : "", // could fail
  }

  const [formInput, setFormInput] = useState(initialForm)
  const handleSubmit = (e) => {
    e.preventDefault()
    switch (e.target.name) {
      case "submit":
        const params = {
          name: formInput.name ? formInput.name : null,
          description: formInput.description ? formInput.description : null,
          duedate: formInput.duedate,
          completed: formInput.completed === true ? formInput.completed : false
        }

        if (add) {
          taskService.postTask(selectedTeam, selectedProject, params, token)
            .then(() => {
              getTasks()
              setFormState(formStates[0])
            })
            .catch(err => console.error(err))
        } else if (task && !add) {
          taskService.updateTask(selectedTeam, selectedProject, task.id, params, token)
            .then(() => {
              getTasks()
              setFormState(formStates[0])
            })
            .catch(err => console.error(err))
        }
        break
      case "cancel":
        setFormState(formStates[0])
        break
      case "deleteButton":
        if (window.confirm("Are you sure")) {
          const taskId = e.target.value
          if (taskId) {
            taskService.deleteTask(selectedTeam, selectedProject, taskId, token)
              .then(() => {
                setTask(null)
                getTasks()
                setFormState(formStates[0])
              })
              .catch(err => console.error(err))
          }
        }
        break
      default:
        setFormState(formStates[0])
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
      <label>
        Name:
        <input
          id="name"
          type="text"
          onChange={handleChange}
          value={formInput.name}
          name="name"
          required
        ></input>
      </label>

      <label>
        Description:
        <textarea
          id="desctription"
          onChange={handleChange}
          value={formInput.description}
          name="description"
        ></textarea>
      </label>

      <label>
        Duedate: <i className="ml-1">{!add && dueAt}</i>
        <input
          id="duedate"
          type="datetime-local"
          onChange={handleChange}
          value={formInput.duedate}
          name="duedate"
        ></input>
      </label>


      {formInput.completed !== undefined && <label className={styles.completed_label}>
        Completed?:
        <input
          className={styles.completed_checkbox}
          type="checkbox"
          onChange={handleChange}
          checked={formInput.completed}
          name="completed"
        ></input>
      </label>
      }

      <button
        className="btn success hover"
        name="submit"
        type="submit"
        onClick={handleSubmit}
      >{add ? 'Create Task' : 'Update Task'}</button>

      <button
        className="btn primary hover"
        name="cancel"
        type="submit"
        onClick={handleSubmit}
      >Cancel</button>

      {task && !add && <button
        className="btn danger hover"
        name="deleteButton"
        type="submit"
        onClick={handleSubmit}
        value={task.id}
      >Delete Task</button>}
    </>
  )
}