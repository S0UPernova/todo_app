import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import teamService from '../services/TeamsService'
export default function Teams(props) {
  const [teams, setTeams] = useState([])
  const { user, token } = props
  useEffect(() => {
    if (user && token) {
      teamService.getTeams(token)
        .then(res => setTeams(res))
        .catch(err => console.error(err))
    }
  }, [user])


  return (
    <div className='main container'>
      <h1>Teams</h1>
      {teams && teams.map((team, i) => {
        return (
          <div key={`div ${i}`}>
            {team.name && <Link to={`${team.id}`}><h3 key={`name ${i}`}>{team.name}</h3></Link>}
            {team.description && <p key={`description ${i}`}>{team.description}</p>}
          </div>
        )
      })}
    </div>
  )
}