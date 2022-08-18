export default function TeamDropdowns(props) {
  const { handleChange, teams, memberships, projects, selectedTeam, selectedProject } = props

  return (
    <>
      <select id="selectTeam" className='hover' value={JSON.stringify(selectedTeam)} data-dropdown="team" onChange={handleChange}>
        <option value="">Select a team</option>
        <optgroup label='Your teams'>
          {teams && teams.map((team, i) => {
            return <option value={JSON.stringify(team)} key={i}>{team.name}</option>
          })}
        </optgroup>
        <optgroup label='Your memberships'>
          {memberships && memberships.map((team, j) => {
            return <option value={team.id} key={j}>{team.name}</option>
          })}
        </optgroup>
      </select>
      <select id="selectProject" className='hover' data-dropdown="project" value={JSON.stringify(selectedProject)} onChange={handleChange}>
        <option value="">Select a project</option>
        {projects && projects.map((project, k) => {
          return <option value={JSON.stringify(project)} key={k}>{project.name}</option>
        })}
      </select>
    </>
  )
}