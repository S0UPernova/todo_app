import React, { useState, useEffect } from 'react'
import taskService from '../services/TaskService'
import usersTeamService from '../services/UsersTeamService'
import membershipService from '../services/MembershipService'
import projectService from '../services/ProjectService'
import PendingTasks from '../components/PendingTasks'
import CompletedTasks from '../components/CompletedTasks'


import '../styles/home.scss'
import TeamDropdowns from '../components/Dropdowns'
export default function Home(props) {
  const [selectedTeam, setSelectedTeam] = useState("")
  const [selectedProject, setSelectedProject] = useState("")

  const [teams, setTeams] = useState([])
  const [memberships, setMemberships] = useState([])
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    if (props.user) {
      getTasks()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTeam, selectedProject, props.user])


  useEffect(() => {
    if (props.user) {
      getProjects()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTeam, props.user])

  useEffect(() => {
    if (props.user) {
      getTeams()
      getMemberships()
    }
    if (!props.user) {
      setTeams([])
      setMemberships([])
      setProjects([])
      setTasks([])
      setSelectedTeam("")
      setSelectedProject("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.user])

  const handleChange = (e) => {
    switch (e.target.getAttribute("data-dropdown")) {
      case 'team':
        setSelectedProject("")
        setSelectedTeam("")

        const teamTimer = setTimeout(() => {
          setSelectedTeam(e.target.value)
        }, 200)
        return () => clearTimeout(teamTimer)
      case 'project':
        setSelectedProject("")
        const projectTimer = setTimeout(() => {
          setSelectedProject(e.target.value)
        }, 200)
        return () => clearTimeout(projectTimer)
      default:
        break
    }
  }

  const getTeams = async () => {
    const returnVal = await usersTeamService.getTeams(props.user.id, props.token)
    returnVal && returnVal.length ? setTeams([...returnVal]) : setTeams([returnVal])
  }

  const getMemberships = async () => {
    const returnVal = await membershipService.getMemberships(props.user.id, props.token)
    returnVal && returnVal.length ? setMemberships([...returnVal]) : setMemberships([returnVal])
  }

  const getProjects = async () => {
    if (props.user && selectedTeam && selectedTeam !== "") {
      const returnVal = await projectService.getProjects(selectedTeam, props.token)
      returnVal && returnVal.length ? setProjects([...returnVal]) : setProjects([returnVal])

    } else setProjects([])
  }

  const getTasks = async () => {
    if (selectedProject && selectedProject !== "" && selectedTeam && selectedTeam !== "") {
      taskService.getTasks(selectedTeam, selectedProject, props.token)
        .then(data => data.length ? setTasks([...data]) : setTasks([data]))
        .catch(err => console.error(err))
    } else setTasks([])
  }

  return (
    <div className='main'>
      <TeamDropdowns
        tasks={tasks}
        projects={projects}
        memberships={memberships}
        handleChange={handleChange}
        teams={teams}
      />
      <PendingTasks
        token={props.token}
        tasks={tasks}
        selectedTeam={selectedTeam}
        selectedProject={selectedProject}
        getTasks={getTasks}
      />
      <CompletedTasks tasks={tasks}
        selectedTeam={selectedTeam}
        selectedProject={selectedProject}
      />
    </div>
  )
}