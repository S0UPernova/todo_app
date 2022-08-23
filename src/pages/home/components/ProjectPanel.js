import { TbClipboardPlus } from "react-icons/tb"
import { FiEdit } from "react-icons/fi"

export default function ProjectPanel(props) {
  const { handleClick, selectedProject, selectedTeam, project } = props
  const rtnRequirements = () => {
    if (project?.requirements) {
      try {
        // reqs = JSON.parse(formInput.requirements)
        if (project?.requirements) {
          let rtnVal = []
          JSON.parse(project.requirements).forEach((req, i) => {
            rtnVal.push(
              <li key={i}>{`${req}`}</li>
            )
          })
          return (
            <ul>
              {rtnVal}
            </ul>
          )
        } else {
          return `${project.requirements}`
        }
      } catch (e) {
        return project.requirements

      }
    } else {
      return "No requirements"
    }
  }
  return (
    <>
      <div id="projectPanel" className="d-flex flex-d-col bg-secondary rounded new-scrollbar">
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