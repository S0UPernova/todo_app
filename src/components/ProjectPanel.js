import { TbClipboardPlus } from "react-icons/tb"
import { FiEdit } from "react-icons/fi"

export default function ProjectPanel(props) {
  const { handleClick, selectedProject, selectedTeam, project } = props
  return (
    <>
      <div id="projectPanel" className="d-flex flex-d-col bg-secondary rounded">
        <div className="container">
          <h3>Description:</h3>
          <p>{project?.description ? project.description : "No description"}</p>
          <h3>Requirements:</h3>
          <p>{project?.requirements ? project.requirements : "No requirements"}</p> {/* //todo add json parse option to make ul with li */}
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
      </div>

    </>
  )
}