import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import teamService from '../../services/TeamsService'
import usersTeamService from '../../services/UsersTeamService'
import usersMembershipService from '../../services/UsersMembershipService'

import Requests from './components/Requests'
import MapMemberships from './components/MapMemberships'

import './teams.scss'

export default function Teams(props) {
  const [discoverTeams, setDiscoverTeams] = useState([])
  const [teams, setTeams] = useState([])
  const [teamMemberships, setTeamMemberships] = useState([])
  const [memberships, setMemberships] = useState([])
  const { user, token } = props
  const getDiscoverTeams = () => {
    if (user && token) {
      teamService.discoverTeams(token)
        .then(res => setDiscoverTeams(res))
        .catch(err => console.error(err))
    }
  }
  const getTeams = () => {
    if (user && token) {
      usersTeamService.getTeams(user.id, token)
        .then(res => setTeams(res))
        .catch(err => console.error(err))
    }
  }
  const getMemberships = async () => {
    if (user && token) {

      await usersMembershipService.getMemberships(user.id, token)
        .then(res => {
          setMemberships(res)
          return res
        })
        .then(res => {
          res.forEach(relationship => {
            relationship && teamService.getTeam(relationship.team_id, token)
              .then(res => {
                if (res?.length > 1 && !memberships.find(membership => {
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

  }

  useEffect(() => {
    getDiscoverTeams()
    getTeams()
    getMemberships()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, token])
  return (
    <div id='teams' className='main'>
      <div id="discover" className='d-flex flex-d-col gap-1 bg-primary rounded border p-1 new-scrollbar blur'>
        <h2>Discover new Teams</h2>
        {discoverTeams?.length ? discoverTeams.map((team, i) => {
          return (
            <div key={team.id} className="bg-primary rounded p-1 border">
              {team.name && <Link className='team-name' to={`${team.id}`} state={{ fromDiscover: true }}><h3 key={`name ${i}`}>{team.name}</h3></Link>}
              {team.description && <p key={`description ${i}`}>{team.description && team.description}</p>}
            </div>
          )
        }) : "No teams found"}
      </div>
      <div id="my-teams" className='d-flex flex-d-col gap-1 bg-primary rounded border p-1 new-scrollbar blur'>
        <h2>My Teams</h2>
        {teams?.length ? teams.map((team, i) => {
          return (
            <div key={team.id} className="bg-primary rounded p-1 border blur">
              {team.name && <Link className='team-name' to={`${team.id}`} state={{ fromMyTeams: true }}><h3 key={`name ${i}`}>{team.name}</h3></Link>}
              {team.description && <p key={`description ${i}`}>{team.description && team.description}</p>}
            </div>
          )
        }): "No teams found"}
      </div>
        <MapMemberships
          teamMemberships={teamMemberships}
          memberships={memberships}
          user={user}
          token={token}
          getDiscoverTeams={getDiscoverTeams}
          getMemberships={getMemberships}
        />
      <Requests
        user={user}
        token={token}
        getMemberships={getMemberships}
        getDiscoverTeams={getDiscoverTeams}
      />
    </div >
  )
}