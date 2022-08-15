import { useState } from "react"
import taskService from "../services/TaskService"
export default function AddEditAndRemoveForm(props) {
  const { selectedTeam, selectedProject, token, setHidden, getTasks } = props
  const initialForm = {
    name: null,
    description: null,
    duedate: null,
    completed: null
  }

  const [formInput, setFormInput] = useState(initialForm)

  const handleForm = (e) => {
    e.preventDefault()
    const params = {
      name: formInput.name ? formInput.name : null,
      description: formInput.description ? formInput.description : null,
      duedate: formInput.duedate ? formInput.duedate : null,
      completed: formInput.completed === true ? formInput.completed : false
    }

    taskService.postTask(selectedTeam, selectedProject, params, token)
      .then(() => {
        setHidden(true)
        setFormInput(initialForm)
        getTasks()
      })
      .catch(err => console.error(err))
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
  const handleCancel = (e) => {
    e.preventDefault()
    setFormInput(initialForm)
    setHidden(true)
  }

  return (
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
      <button type="submit" onClick={handleForm}>Add</button>
      <button type="submit" onClick={handleCancel}>cancel</button>
    </form>
  )
}