import { MdGroupAdd } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import styles from '../home.module.scss'
// todo add memberships support to this
export default function TeamPanel(props) {
  const { handleClick, selectedTeam, team } = props
  return (
    <>
      <div id={styles.teamPanel} className="bg-secondary d-flex flex-d-col rounded new-scrollbar border blur">
        <div className='container'>
          <div className={styles.button_container}>
            <button
              title='Create new team'
              name="teamAddButton"
              onClick={handleClick}
              className="btn primary icon-button"
            >
              <i className='icon'><MdGroupAdd /></i>
            </button>
            {selectedTeam &&
              <button
                title='Edit current team'
                name="teamEditButton"
                onClick={handleClick}
                className='btn primary icon-button'
              >
                <i className='icon'><FiEdit /></i>
              </button>}
          </div>
          <h2>About {team?.name ? team.name : ""}:</h2>
          <p>{team?.description ? team.description : "No description"}</p>
        </div>
      </div>
    </>
  )
}