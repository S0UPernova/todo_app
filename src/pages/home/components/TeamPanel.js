import { MdGroupAdd } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
// todo add memberships support to this
export default function TeamPanel(props) {
  const { handleClick, selectedTeam, team } = props
  return (
    <>
      <div id="teamPanel" className="bg-secondary d-flex flex-d-col rounded">
        <div className='container'>
          <div className="button-container">
            <button name="teamAddButton" onClick={handleClick} className="btn primary icon-button"><i className='icon'><MdGroupAdd /></i></button>
            {selectedTeam && <button
              name="teamEditButton"
              onClick={handleClick}
              className='btn primary icon-button'
            ><i className='icon'><FiEdit /></i>
            </button>}
          </div>
          <h2>About {team?.name ? team.name : ""}:</h2>
          <p>{team?.description ? team.description : "No description"}</p>
        </div>
      </div>
    </>
  )
}