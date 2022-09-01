import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import usersRequestService from '../../../services/UsersRequestService'
import teamService from '../../../services/TeamsService'


export default function Requests(props) {
  const [requests, setRequests] = useState([])
  const { user, token } = props

  const getRequests = () => {
    if (token) {
      usersRequestService.getRequests(user.id, token)
        .then(res => setRequests(res))
        .catch(err => console.error(err))
    }
  }

  useEffect(() => {
    getRequests()
  }, [user, token])

  const handleClick = (e) => {
    switch (e.target.name) {
      case "accept":
        usersRequestService.accept(user.id, e.target.dataset.request_id, token)
        getRequests()
        break
      case "reject":
        usersRequestService.reject(user.id, e.target.dataset.request_id, token)
        getRequests()
        break
      case "delete":
        if (window.confirm("are you sure")) {
          usersRequestService.deleteRequest(user.id, e.target.dataset.request_id, token)
          getRequests()
        }
        break
      default:
        break
    }
  }


  function ShowTeamForRequest(props) {
    const { request, token, handleClick, DivClassName } = props
    const [team, setTeam] = useState({})
    useEffect(() => {
      teamService.getTeam(request.team_id, token)
        .then(res => setTeam(res))
        .catch(err => console.error(err))
    }, [])
    return (
      team && request && <div className={DivClassName}>
        {team.name && <Link className='team-name' to={`${team.id}`}><h3>{team.name}</h3></Link>}
        <p >id: {request.id}</p>
        <p>Accepted: {request.accepted ? "true" : "false"}</p>
        <div className='d-flex gap-1'>
          {request.from_team === true &&
            <button
              name='accept'
              onClick={handleClick}
              data-request_id={request.id}
              className="btn success hover p-05"
            >Accept
            </button>}
          {request.from_team === true &&
            <button
              name='reject'
              onClick={handleClick}
              data-request_id={request.id}
              className="btn danger hover p-05"
            >Reject
            </button>}
          {request.from_team === false &&
            <button
              name='delete'
              onClick={handleClick}
              data-request_id={request.id}
              className="btn danger hover p-05"
            >Delete
            </button>}
        </div>
      </div>
    )
  }
  return (
    <div className='d-flex flex-d-col'>
      <div className='d-flex flex-d-col gap-1'>
        <h2>Recieved requests</h2>
        {requests?.length && requests.filter(req => req.from_team === true)
          .map((request, i) => {
            return (
              <ShowTeamForRequest
                request={request}
                token={token}
                handleClick={handleClick}
                DivClassName="bg-primary rounded p-1"
              />
            )
          })}
      </div>
      <div className='d-flex flex-d-col gap-1'>
        <h2>Sent requests</h2>
        {requests.filter(req => req.from_team === false)?.length > 0
          ? requests.filter(req => req.from_team === false).map((request, i) => {
            return (
              <ShowTeamForRequest
                key={request.id}
                request={request}
                token={token}
                handleClick={handleClick}
                DivClassName="bg-secondary rounded p-1"
              />
            )
          })
          : <div className='bg-secondary rounded p-2'>No sent requests</div>}
      </div>
    </div>
  )
}