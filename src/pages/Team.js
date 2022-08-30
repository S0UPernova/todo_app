import { useParams, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import teamService from '../services/TeamsService'
import teamsRequestService from '../services/TeamsRequestService'
import userService from '../services/UserService'

import '../styles/team.scss'

export default function Team(props) {
  const { user, token } = props

  const [team, setTeam] = useState([])
  const [requests, setRequests] = useState([])

  const { teamId } = useParams()
  let location = useLocation()

  useEffect(() => {
    if (user && token) {
      teamService.getTeam(teamId, token)
        .then(res => setTeam(res))
        .catch(err => console.error(err))
    }
  }, [user, token, teamId])

  useEffect(() => {
    if (user && token && team && user.id === team.user_id) {
      teamsRequestService.getRequests(teamId, token)
        .then(res => setRequests(res))
        .catch(err => console.error(err))
    }

  }, [user, token, teamId, team])

  const handleClick = (e) => {
    switch (e.target.name) {
      case "newRequest":
        teamsRequestService.createRequest(team.id, token)
          .then(res => { alert(res) })
        break
      case "acceptRequest":
        teamsRequestService.accept(team.id, e.target.dataset.request_id, token)
          .then(res => { alert(res) })

        break
    }
  }
  const HandleFromRequest = (props) => {
    const { request } = props
    const [handle, setHandle] = useState()
    if (request) {
      userService.getUser(request.user_id, token)
        .then(res => setHandle(res.handle))
        .catch(err => console.error(err))
    }
    return handle ? handle : null
  }

  if (team) {
    return (
      <div>
        <div className='bg-primary p-1 rounded'>
          {team.name && <p><b>Team name:</b> {team.name}</p>}
          {team.description && <p><b>Team description:</b><br></br>{team.description}</p>}
        </div>

        {location?.state?.fromDiscover && <button name='newRequest' onClick={handleClick}>Request membership</button>}
        <h3>Requests</h3>
        {requests?.length ?
          <div className='d-flex flex-d-col gap-1'>
            {requests.map(request => {
              return (
                <div className='bg-secondary rounded p-1 d-flex gap-1'>
                  {user && <h3 className='handle'>From: <br></br> <HandleFromRequest request={request} /></h3>} {/* // todo add link to user profile */}
                  <button name='acceptRequest' className='btn primary hover' data-request_id={request.id} onClick={handleClick}>Accept request</button>
                </div>
              )
            })}
          </div> : null}

      </div>
    )
  } else {
    return (
      <div>Nothing to show</div>
    )
  }
}