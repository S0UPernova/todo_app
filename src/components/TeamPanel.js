import { MdGroupAdd } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
export default function TeamPanel(props) {
  const { handleClick, selectedTeam, team } = props
  return (
    <>
      <div id="teamPanel" className="bg-secondary d-flex flex-d-col rounded">
        <div className='container'>
          <h2>Description:</h2>
          <p>{team?.description ? team.description : "No description"}</p>
          <button name="teamAddButton" onClick={handleClick} className="btn primary icon-button"><i className='icon'><MdGroupAdd /></i></button>
          {selectedTeam && <button
            name="teamEditButton"
            onClick={handleClick}
            className='btn primary icon-button'
          ><i className='icon'><FiEdit /></i>
          </button>}
        </div>
      </div>
    </>
  )
}