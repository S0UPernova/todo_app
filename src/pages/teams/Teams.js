import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import teamService from '../../services/TeamsService'
import usersTeamService from '../../services/UsersTeamService'
import usersMembershipService from '../../services/UsersMembershipService'
import Requests from './components/Requests'

export default function Teams(props) {
  const [discoverTeams, setDiscoverTeams] = useState([])
  const [teams, setTeams] = useState([])
  const [teamMemberships, setTeamMemberships] = useState([])
  const [memberships, setMemberships] = useState([])
  const { user, token } = props
  useEffect(() => {
    if (user && token) {
      teamService.discoverTeams(token)
        .then(res => setDiscoverTeams(res))
        .catch(err => console.error(err))
    }
    if (user && token) {
      usersTeamService.getTeams(user.id, token)
        .then(res => setTeams(res))
        .catch(err => console.error(err))
    }
    if (user && token) {
      usersMembershipService.getMemberships(user.id, token)
        .then(res => {
          setMemberships(res)
          res.forEach(relationship => {
            teamService.getTeam(relationship.team_id, token)
              .then(res => {
                if (teamMemberships?.length > 0 &&
                  !memberships.find(membership => {
                    if (membership.id === res.id) {
                      return true
                    }
                    return false
                  })) {
                  setTeamMemberships([...teamMemberships, res])
                }
                else if (teamMemberships?.length === 0) {
                  setTeamMemberships([res])
                }
                else return
              })
          })
        })
        .catch(err => console.error(err))
    }
  }, [user, token])

  const handleClick = (e) => {
    switch (e.target.name) {
      case "leaveTeam":
        if (window.confirm("are you sure you want to leave the team?")) {
          const relationship = memberships.filter(membership => {
            return String(membership.team_id) === String(e.target.value)
          })[0]
          usersMembershipService.deleteMembership(user.id, relationship.id, token)
        }
        break
      default:
        break
    }
  }

  return (
    <div className='main d-flex container gap-2 justify-content-around'>
      <div className='d-flex flex-d-col gap-1'>
        <h2>Discover new Teams</h2>
        {discoverTeams?.length ? discoverTeams.map((team, i) => {
          return (
            <div key={team.id} className="bg-primary rounded p-1">
              {team.name && <Link className='team-name' to={`${team.id}`} state={{ fromDiscover: true }}><h3 key={`name ${i}`}>{team.name}</h3></Link>}
              {team.description && <p key={`description ${i}`}>{team.description && team.description}</p>}
            </div>
          )
        }) : "No teams found"}
      </div>
      <div className='d-flex flex-d-col gap-1'>
        <h2>My Teams</h2>
        {teams?.length && teams.map((team, i) => {
          return (
            <div key={team.id} className="bg-primary rounded p-1">
              {team.name && <Link className='team-name' to={`${team.id}`} state={{ fromMyTeams: true }}><h3 key={`name ${i}`}>{team.name}</h3></Link>}
              {team.description && <p key={`description ${i}`}>{team.description && team.description}</p>}
            </div>
          )
        })}
        <h2>My Memberships</h2>
        {teamMemberships?.length ? teamMemberships.map((team, i) => {
          return (
            <div key={team.id} className="bg-secondary rounded p-1">
              {team.name && <Link className='team-name' to={`${team.id}`} state={{ fromMyTeams: true }}><h3 key={`name ${i}`}>{team.name}</h3></Link>}
              {team.description && <p key={`description ${i}`}>{team.description && team.description}</p>}
              <button name='leaveTeam' onClick={handleClick} value={team.id} className="btn danger hover p-05">Leave team</button>
            </div>
          )
        }): null}
      </div>
      <Requests user={user} token={token} />
    </div >
  )
}