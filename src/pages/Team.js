import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import teamService from '../services/TeamsService'
export default function Team(props) {
  const [team, setTeam] = useState([])
  const { user, token } = props
  const {teamId} = useParams()
  useEffect(() => {
    if (user && token) {
      teamService.getTeam(teamId, token)
        .then(res => setTeam(res))
        .catch(err => console.error(err))
    }
  }, [user, token, teamId])

  if (team) {
    return (
      <div>
        {team.name && <h3>{team.name}</h3>}
        {team.description && <p>{team.description}</p>}
      </div>
    )
  } else {
    return (
      <div>Nothing to show</div>
    )
  }
}