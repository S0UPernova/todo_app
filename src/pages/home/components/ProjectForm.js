import { useState } from "react"
import projectService from "../../../services/ProjectService"
// todo make json requirements optional
export default function ProjectForm(props) {
  const { token, setFormState, formStates, getProjects, project, selectedTeam, selectedProject, setSelectedProject, add } = props
  const parseReqs = () => {
    // let reqs = requirements
    try {
      if (project?.requirements) {
        return JSON.parse(project.requirements)
      } else {
        return `${project.requirements}`
      }
    } catch (e) {
      console.error(e)

    }
  }
  const initialForm = {
    name: project?.name && !add ? project.name : "",
    description: project?.description && !add ? project.description : "",
    requirements: project?.requirements && !add ? parseReqs() : "",
  }
  const [formInput, setFormInput] = useState(initialForm)
  const [requirementsInput, setRequirementsInput] = useState("")




  // temp for woking on this
  // let reqs = null
  const handleClick = (e) => {
    e.preventDefault()
    setFormInput({
      ...formInput, requirements: [
        ...formInput.requirements.slice(0, e.target.dataset.reqnum),
        ...formInput.requirements.slice(Number(e.target.dataset.reqnum) + 1)
      ]
    })

    // alert(`Clicked ${e.target.dataset.reqnum}`)
  }
  const rtnRequirements = () => {
    if (formInput?.requirements) {
      try {
        // reqs = JSON.parse(formInput.requirements)
        if (formInput?.requirements.length) {
          let rtnVal = []
          formInput.requirements.forEach((req, i) => {
            rtnVal.push(
              <li key={i}
              >{`${req}`}
                <button
                  data-reqnum={i}
                  className="danger hover rounded ml-1"
                  onClick={handleClick}
                >X
                </button></li>
            )
          })
          return (
            <ul className="rounded border new-scrollbar">
              {rtnVal}
            </ul>
          )
        } else {
          return `${formInput.requirements}`
        }
      } catch (e) {
        return formInput.requirements

      }
    } else {
      return "No requirements"
    }
  }


  const reqEnter = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault()
      setFormInput({ ...formInput, requirements: [...formInput.requirements, `${event.target.value}`] })
      setRequirementsInput("")
    }
  }




  const handleSubmit = (e) => {
    e.preventDefault()
    switch (e.target.name) {
      case "submit":
        const params = {
          name: formInput.name ? formInput.name : "",
          description: formInput.description ? formInput.description : "",
          requirements: formInput.requirements ? JSON.stringify(formInput.requirements) : ""
        }
        if (add) {
          projectService.postProject(selectedTeam, params, token)
            .then(() => {
              getProjects()
              // setFormInput(initialForm)
              setFormState(formStates[0])
            })
            .catch(err => console.error(err))
        } else if (!add && project) {
          projectService.updateProject(selectedTeam, project.id, params, token)
            .then(() => {
              getProjects()
              setFormState(formStates[0])
              // setFormInput(initialForm)
            })
            .catch(err => console.error(err))
        }
        break
      case "cancel":
        // setFormInput(initialForm)
        setFormState(formStates[0])
        break
      case "deleteButton":
        if (window.confirm("Are you sure")) {
          const projectId = e.target.value
          if (projectId) {
            projectService.deleteProject(selectedTeam, selectedProject, token)
              .then(() => {
                getProjects()
                // setFormInput(initialForm)
                setSelectedProject("")
                setFormState(formStates[0])
              })
              .catch(err => console.error(err))
          }
        }
        break
      default:
        // setFormInput(initialForm)
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
      case "requirements":
        setRequirementsInput(e.target.value)
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
        Requirements:
        <input
          id="requirements"
          onChange={handleChange}
          onKeyDown={reqEnter}
          value={requirementsInput}
          name="requirements"
        ></input>
      </label>

      {rtnRequirements()}

      <button
        className="btn success hover"
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
    </>
  )
}