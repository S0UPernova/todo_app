import { Link } from 'react-router-dom'
import usersMembershipService from '../../../services/UsersMembershipService'
export default function MapMemberships(props) {
  const { teamMemberships, memberships, user, token, getMemberships, getDiscoverTeams } = props

  const handleClick = async (e) => {
    switch (e.target.name) {
      case "leaveTeam":
        // if (window.confirm("are you sure you want to leave the team?")) {

        // console.log(relationship.id)
        await usersMembershipService.deleteMembership(user.id, e.target.value, token)
          .then(res => res)
          .catch(err => console.error(err))
        // }
        getDiscoverTeams()
        getMemberships()
        // }
        break
      default:
        break
    }
  }

  const MembershipDisplay = (props) => {
    const { team, memberships, handleClick } = props
    const relationship = memberships.filter(membership => {
      return String(membership.team_id) === String(team.id)
    })[0]
    return (
      <>
        {relationship ? <div className="rounded p-1 border blur">
          {team.name && <Link className='team-name' to={`${team.id}`} state={{ fromMyTeams: true }}><h3>{team.name}</h3></Link>}
          {team.description && <p>{team.description && team.description}</p>}
          <button name='leaveTeam' onClick={handleClick} value={relationship.id} className="btn danger hover p-05">Leave team</button>
        </div> : null}
      </>
    )
  }
  
  const Memberships = () => {
    if (teamMemberships?.length > 1) {
      teamMemberships.map(team => {
        return (
          <>
            {team?.id ? <MembershipDisplay
              key={team.id}
              team={team}
              memberships={memberships}
              handleClick={handleClick}
            /> : null}
          </>
        )
      })
    }
    else if (teamMemberships?.length === 1) {
      const team = teamMemberships[0]
      return (
        <>
          {team?.id ? <MembershipDisplay
            team={team}
            memberships={memberships}
            handleClick={handleClick}
          /> : null}
        </>
      )
    }
    else return <></>
  }
  return (
    <div id="memberships" className='bg-secondary border p-1 rounded new-scrollbar blur'>
      <h2>My Memberships</h2>
      <Memberships/>
    </div>

  )
}