import { TbClipboardPlus } from "react-icons/tb"
import { FiEdit } from "react-icons/fi"

export default function ProjectPanel(props) {
  const { handleClick, selectedProject, selectedTeam, project } = props
  const rtnRequirements = () => {
    if (project?.requirements) {
      try {
        // reqs = JSON.parse(formInput.requirements)
        let rtnVal = []
        if (project?.requirements.length > 0) {
          JSON.parse(project.requirements).forEach((req, i) => {
            rtnVal.push(
              <li key={i}>{`${req}`}</li>
            )
          })
          return (
            rtnVal?.length > 0 ? <ul>
              {rtnVal}
            </ul> : <p>No requirements</p>
          )
        } else {
          return `${project.requirements} else`
        }
      } catch (e) {
        return `catch ${project.requirements}`

      }
    } else {
      return "No requirements"
    }
  }
  return (
    <>
      <div id="projectPanel" className="d-flex flex-d-col bg-secondary rounded new-scrollbar border">
        <div className="container">
          <div className="button-container">
            {selectedTeam && <button name="projectAddButton" className="btn primary icon-button" onClick={handleClick}>
              <i className="icon"><TbClipboardPlus /></i>
            </button>}
            {selectedProject !== "" && <button
              name="projectEditButton"
              onClick={handleClick}
              className="btn primary icon-button"
            >
              <i className="icon"><FiEdit /></i>
            </button>}
          </div>
          <h3>Description:</h3>
          <p>{project?.description ? project.description : "No description"}</p>
          <h3>Requirements:</h3>
          {rtnRequirements()}
        </div>
      </div>

    </>
  )
}