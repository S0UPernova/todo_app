import React, { useState, useEffect } from 'react'
import taskService from '../services/TaskService'
import teamService from '../services/TeamService'
import membershipService from '../services/MembershipService'
import projectService from '../services/ProjectService'

export default function TeamDropdowns(props) {
  const [selectedTeam, setSelectedTeam] = useState(0)
  const [selectedProject, setSelectedProject] = useState(0)

  const [teams, setTeams] = useState([])
  const [memberships, setMemberships] = useState([])
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    if (props.user) {
      getTasks()
    }
  }, [selectedTeam, selectedProject])


  useEffect(() => {
    if (props.user) {
      getProjects()
    }
  }, [selectedTeam])

  useEffect(() => {
    if (props.user) {
      getTeams()
      getMemberships()
    }
  }, [props.user])

  const handleChange = (e) => {
    switch (e.target.getAttribute("data-dropdown")) {
      case 'team':
        setSelectedProject(0)
        setSelectedTeam(0)

        const teamTimer = setTimeout(() => {
          setSelectedTeam(e.target.value)
        }, 200)
        return () => clearTimeout(teamTimer)
      case 'project':
        setSelectedProject(0)
        const projectTimer = setTimeout(() => {
          setSelectedProject(e.target.value)
        }, 200)
        return () => clearTimeout(projectTimer)
    }
  }

  const getTeams = async () => {
    const returnVal = await teamService.getTeams(props.user.id, props.token)
    returnVal && returnVal.length ? setTeams([...returnVal]) : setTeams([returnVal])
  }

  const getMemberships = async () => {
    const returnVal = await membershipService.getMemberships(props.user.id, props.token)
    returnVal && returnVal.length ? setMemberships([...returnVal]) : setMemberships([returnVal])
  }

  const getProjects = async() => {
    if (props.user && selectedTeam && selectedTeam !== 0) {
      const returnVal = await projectService.getProjects(selectedTeam, props.token)
      returnVal && returnVal.length ? setProjects([...returnVal]) : setProjects([returnVal])

    } else setProjects([])
  }
  const getTasks = async () => {
    if (selectedProject && selectedProject !== "" && selectedTeam && selectedTeam !== "") {
      taskService.getTasks(selectedTeam, selectedProject, props.token)
        .then(data => data.length ? setTasks([...data]) : setTasks([data]))
        .catch(err => console.error(err))
      // const returnVal = await taskService.getTasks(selectedTeam, selectedProject, props.token)
      // returnVal && returnVal.length ? setTasks([...returnVal]) : setTasks([returnVal])
    } else setTasks([])
  }

  return (
    <>
      <select data-dropdown="team" onChange={handleChange}>
        <option value="">Select a team</option>
        <optgroup label='Your teams'>
          {teams && teams.map((team, i) => {
            return <option value={team.id} key={i}>{team.name}</option>
          })}
        </optgroup>
        <optgroup label='Your memberships'>
          {memberships && memberships.map((team, j) => {
            return <option value={team.id} key={j}>{team.name}</option>
          })}
        </optgroup>
      </select>
      <select data-dropdown="project" onChange={handleChange}>
        <option value="">Select a project</option>
        {projects && projects.map((project, k) => {
          return <option value={project.id} key={k}>{project.name}</option>
        })}
      </select>
      <div>
        <h3>Pending completion</h3>
        {selectedTeam && selectedProject && <ul>
          {tasks && tasks.map((task, i) => {
            return (
              task && task.completed !== true &&
              <li key={"task index number " + i}>
                {task.name && <h4 key={"name" + i}>{task.name}</h4>}
                {task.description &&
                  <p key={"decription " + i}>{task.description}</p>}
                {task.duedate !== null &&
                  <h5 key={"duedate " + i}>Due by: {task.duedate}</h5>}
                {task.completed !== null &&
                  <h5 key={"completed " + i}>Completed: {
                    task.completed == true ? "true" : "false"}
                  </h5>}
              </li>
            )
          })}
        </ul>}
      </div>
      <div>
        <h3>Completed</h3>
        {selectedTeam && selectedProject && <ul>
          {tasks && tasks.map((task, i) => {
            return task && task.completed === true &&
              <li key={"task index number " + i}>
                {task.name && <h4 key={"name" + i}>{task.name}</h4>}
                {task.duedate !== null && <h5 key={"duedate " + i}>Due by: {task.duedate}</h5>}
                {task.completed !== null && <h5 key={"completed " + i}>Completed: {task.completed === true ? "true" : "false"}</h5>}
                {task.completed_at && <p key={"completed_at " + i}>Completed: {task.completed_at}</p>}
              </li>
          })}
        </ul>}
      </div>
      <div>
        <h1>Test</h1>
        <ul>{tasks !== [] && tasks.map((task, i) => {
          return task &&
            <li key={"task index number " + i}>
              {task.name && <h4 key={"name" + i}>{task.name}</h4>}
              {task.duedate !== null && <h5 key={"duedate " + i}>Due by: {task.duedate}</h5>}
              {task.completed !== null && <h5 key={"completed " + i}>Completed: {task.completed === true ? "true" : "false"}</h5>}
              {task.completed_at && <p key={"completed_at " + i}>Completed: {task.completed_at}</p>}
            </li>
        })}</ul>
      </div>
    </>
  )
}