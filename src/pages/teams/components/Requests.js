import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import usersRequestService from '../../../services/UsersRequestService'
import teamService from '../../../services/TeamsService'


export default function Requests(props) {
  const [requests, setRequests] = useState([])
  const { user, token, getMemberships, getDiscoverTeams } = props

  const getRequests = () => {
    if (token) {
      usersRequestService.getRequests(user.id, token)
        .then(res => setRequests(res))
        .catch(err => console.error(err))
    }
  }

  useEffect(() => {
    getRequests()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, token])

  const handleClick = async (e) => {
    switch (e.target.name) {
      case "accept":
        await usersRequestService.accept(user.id, e.target.dataset.request_id, token)
        getRequests()
        getMemberships()
        getDiscoverTeams()
        break
      case "reject":
        await usersRequestService.reject(user.id, e.target.dataset.request_id, token)
        getRequests()
        break
      case "delete":
        if (window.confirm("are you sure")) {
          await usersRequestService.deleteRequest(user.id, e.target.dataset.request_id, token)
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
    }, [request.team_id, token])
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
    <>
      <div id="recieved-requests" className='d-flex flex-d-col gap-1 bg-primary rounded p-1 border new-scrollbar blur'>
        <h2>Recieved requests</h2>
        {requests?.length ? requests.filter(req => req.from_team === true)
          .map((request, i) => {
            return (
              <ShowTeamForRequest
                key={request.id}
                request={request}
                token={token}
                handleClick={handleClick}
                DivClassName="bg-primary rounded p-1 border"
              />
            )
          })
          : <div className='bg-primary rounded p-2 border'>No recieved requests</div>}
      </div>
      <div id="sent-requests" className='d-flex flex-d-col gap-1 bg-secondary rounded border p-1 new-scrollbar blur'>
        <h2>Sent requests</h2>
        {requests.filter(req => req.from_team === false)?.length > 0
          ? requests.filter(req => req.from_team === false).map((request, i) => {
            return (
              <ShowTeamForRequest
                key={request.id}
                request={request}
                token={token}
                handleClick={handleClick}
                DivClassName="bg-secondary rounded p-1 border blur"
              />
            )
          })
          : <div className='bg-secondary rounded p-2 border blur'>No sent requests</div>}
      </div>
    </>
  )
}