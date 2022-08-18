import { useState } from "react"
import projectService from "../services/ProjectService"

// import taskService from "../services/TaskService"
import usersTeamService from "../services/UsersTeamService"

export default function ProjectForm(props) {
  const { selectedTeam, token, setHidden3, getProjects, project, setProject } = props
  const initialForm = {
    name: project?.name ? project.name : "",
    description: project?.description ? project.description : "",
  }
  const [formInput, setFormInput] = useState(initialForm)

  const handleSubmit = (e) => {
    e.preventDefault()
    switch (e.target.name) {
      case "submit":
        const params = {
          name: formInput.name ? formInput.name : null,
          description: formInput.description ? formInput.description : null,
          requirements: formInput.requirements ? formInput.requirements : null
        }
        if (!project) {
          projectService.postProject(selectedTeam.id, params, token)
            .then(() => {
              setHidden3(true)
              setFormInput(initialForm)
              getProjects()
            })
            .catch(err => console.error(err))
        } else if (project) {
          projectService.updateProject(selectedTeam.id, project.id, params, token)
            .then(() => {
              setHidden3(true)
              setFormInput(initialForm)
              getProjects()
              // setProject(null)
            })
            .catch(err => console.error(err))
        }
        break
      case "cancel":
        setFormInput(initialForm)
        setHidden3(true)
        break
      case "deleteButton":
        if (window.confirm("Are you sure")) {
          const projectId = e.target.value
          if (projectId) {
            projectService.deleteProject(selectedTeam.id, project.id, token)
              .then(() => {
                setHidden3(true)
                setFormInput(initialForm)
                getProjects()
                setProject("")
              })
              .catch(err => console.error(err))
          }
        }
        break
      default:
        setFormInput(initialForm)
        setHidden3(true)
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
      default:
        break
    }
  }

  return (
    <>
      <div name="cancel" className="backdrop" onClick={handleSubmit}></div>
      <div className="formContainer">
        <form className="add">
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
            Requirements:
            <textarea
              id="Requirements"
              onChange={handleChange}
              value={formInput.requirements}
              name="requirements"
            ></textarea>
          </label>
          <button
            className="btn primary hover"
            name="submit"
            type="submit"
            onClick={handleSubmit}
          >{project ? 'Update' : 'Add'}</button>

          <button
            className="btn primary hover"
            name="cancel"
            type="submit"
            onClick={handleSubmit}
          >Cancel</button>

          {project && <button
            className="btn danger hover"
            name="deleteButton"
            type="submit"
            onClick={handleSubmit}
            value={project.id}
          >Delete Me!</button>}

        </form>
      </div>
    </>
  )
}