import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import teamService from '../../services/TeamsService'
import usersTeamService from '../../services/UsersTeamService'
import usersMembershipService from '../../services/UsersMembershipService'
import Requests from './components/Requests'

export default function Teams(props) {
  const [discoverTeams, setDiscoverTeams] = useState([])
  const [myTeams, setMyTeams] = useState([])
  const [myMemberships, setMyMemberships] = useState([])
  const { user, token } = props
  useEffect(() => {
    if (user && token) {
      teamService.discoverTeams(token)
        .then(res => setDiscoverTeams(res))
        .catch(err => console.error(err))
    }
    if (user && token) {
      usersTeamService.getTeams(user.id, token)
        .then(res => setMyTeams(res))
        .catch(err => console.error(err))
    }
    if (user && token) {
      usersMembershipService.getMemberships(user.id, token)
        .then(res => setMyMemberships(res))
        .catch(err => console.error(err))
    }
  }, [user, token])

  const handleClick = (e) => {
    alert('stubbed... does not currently work')
  }

  return (
    <div className='main d-flex container gap-2 justify-content-around'>
      <div className='d-flex flex-d-col gap-1'>
      <h2>Discover new Teams</h2>
      {discoverTeams?.length ? discoverTeams.map((team, i) => {
        return (
          <div key={team.id} className="bg-primary rounded p-1">
            {team.name && <Link to={`${team.id}`} state={{ fromDiscover: true }}><h3 key={`name ${i}`}>{team.name}</h3></Link>}
            {team.description && <p key={`description ${i}`}>{team.description && team.description}</p>}
          </div>
        )
      }) : "No teams found"}
      </div>
      <div className='d-flex flex-d-col gap-1'>
        <h2>My Teams</h2>
        {myTeams?.length && myTeams.map((team, i) => {
          return (
            <div key={team.id} className="bg-primary rounded p-1">
              {team.name && <Link to={`${team.id}`} state={{ fromMyTeams: true }}><h3 key={`name ${i}`}>{team.name}</h3></Link>}
              {team.description && <p key={`description ${i}`}>{team.description && team.description}</p>}
            </div>
          )
        })}
        <h2>My Memberships</h2>
        {myMemberships?.length && myMemberships.map((team, i) => {
          return (
            <div key={team.id} className="bg-secondary rounded p-1">
              {team.name && <Link to={`${team.id}`} state={{ fromMyTeams: true }}><h3 key={`name ${i}`}>{team.name}</h3></Link>}
              {team.description && <p key={`description ${i}`}>{team.description && team.description}</p>}
              <button onClick={handleClick} className="btn danger hover">Leave team</button>
            </div>
          )
        })}
      </div>
      <Requests user={user} token={token} />
    </div >
  )
}