import { useState } from "react"
import projectService from "../../../services/ProjectService"

export default function ProjectForm(props) {
  const { token, setFormState, formStates, getProjects, project, setProject, selectedTeam, selectedProject, setSelectedProject, add } = props

  // const projectJSON = project ? JSON.parse(project) : null // Passing an object directly didn't seem to work
  const initialForm = {
    name: project?.name && !add ? project.name : "",
    description: project?.description && !add ? project.description : "",
    requirements: project?.requirements && !add ? project.requirements : "",
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
        if (add) {
          projectService.postProject(selectedTeam, params, token)
            .then(() => {
              // setHidden3(true)
              setFormState(formStates[0])
              setFormInput(initialForm)
              getProjects()
              // setProject(null)
            })
            .catch(err => console.error(err))
        } else if (!add && project) {
          projectService.updateProject(selectedTeam, project.id, params, token)
            .then(() => {
              setFormState(formStates[0])
              // setHidden3(true)
              setFormInput(initialForm)
              getProjects()
              // setProject(null)
            })
            .catch(err => console.error(err))
        }
        break
      case "cancel":
        setFormInput(initialForm)
        setFormState(formStates[0])
        // setHidden3(true)
        break
      case "deleteButton":
        if (window.confirm("Are you sure")) {
          const projectId = e.target.value
          if (projectId) {
            projectService.deleteProject(selectedTeam, selectedProject, token)
              .then(() => {
                // setHidden3(true)
                setFormState(formStates[0])
                setFormInput(initialForm)
                getProjects()
                setSelectedProject("")
                // setProject(null)
              })
              .catch(err => console.error(err))
          }
        }
        break
      default:
        setFormInput(initialForm)
        // setHidden3(true)
        setFormState(formStates[0])
        // setProject(null)
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
      {/* <div name="cancel" className="backdrop" onClick={handleSubmit}></div>
      <div className="formContainer">
        <form className="add"> */}
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
      >{add ? 'Create Project' : 'Update Project'}
      </button>

      <button
        className="btn primary hover"
        name="cancel"
        type="submit"
        onClick={handleSubmit}
      >Cancel</button>

      {project && !add && <button
        className="btn danger hover"
        name="deleteButton"
        type="submit"
        onClick={handleSubmit}
        value={project.id}
      >Delete Project</button>}

      {/* </form>
      </div> */}
    </>
  )
}