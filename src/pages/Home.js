import React, { useState, useEffect } from 'react'

import usersTeamService from '../services/UsersTeamService'
import membershipService from '../services/MembershipService'
import projectService from '../services/ProjectService'
import taskService from '../services/TaskService'

import TeamDropdowns from '../components/Dropdowns'
import PendingTasks from '../components/PendingTasks'
import CompletedTasks from '../components/CompletedTasks'

import TeamForm from '../components/TeamForm'
import ProjectForm from '../components/ProjectForm'
import TaskForm from "../components/TaskForm"

import TeamPanel from '../components/TeamPanel'
import ProjectPanel from '../components/ProjectPanel'

import '../styles/Home.scss'

export default function Home(props) {
  const { user, token } = props

  const [selectedTeam, setSelectedTeam] = useState("")
  const [selectedProject, setSelectedProject] = useState("")

  const [teams, setTeams] = useState([])
  const [memberships, setMemberships] = useState([])
  const [projects, setProjects] = useState([])

  const [project, setProject] = useState()
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState()
  const [team, setTeam] = useState()

  const [hidden, setHidden] = useState(true)
  const [hidden2, setHidden2] = useState(true)
  const [hidden3, setHidden3] = useState(true)
  const [add, setAdd] = useState(false)
  useEffect(() => {
    if (user) {
      setProject(projects.filter(team => Number(team.id) === Number(selectedProject))[0])
      getTasks()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTeam, selectedProject, user])

  useEffect(() => {
    if (user) {
      getProjects()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTeam, user])

  useEffect(() => {
    if (user) {
      getTeams()
      getMemberships()
    }
    if (!user) {
      setTeams([])
      setMemberships([])
      setProjects([])
      setTasks([])
      setSelectedTeam("")
      setSelectedProject("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleChange = (e) => {
    // console.log(selectedProject)
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

  const handleClick = (e) => {
    e.preventDefault()
    switch (e.target.name) {
      case "addButton":
        setTask(null)
        setHidden(!hidden)
        break
      case "teamAddButton":
        setTeam(null)
        setHidden2(!hidden2)
        break
      case "editButton":
        setTask(JSON.parse(e.target.value))
        setHidden(!hidden)
        break
      case "teamEditButton":
        // getTeams()
        setTeam(teams.filter(team => Number(team.id) === Number(selectedTeam))[0])
        setHidden2(!hidden2)
        break
      case "projectAddButton":
        // setProject(null)
        setAdd(true)
        setHidden3(!hidden3)
        break
      case "projectEditButton":
        setAdd(false)
        getProjects()
        // setProject(projects.filter(team => Number(team.id) === Number(selectedProject))[0])
        setHidden3(!hidden3)
        break
      case "deleteButton":
        if (window.confirm("Are you sure")) {
          const taskId = e.target.value
          if (taskId) {
            taskService.deleteTask(selectedTeam, selectedProject, taskId, token)
              .then(() => getTasks())
              .catch(err => console.error(err))
          }
        }
        break
      case "checkbox":
        const taskId = e.target.value
        if (taskId) {
          taskService.updateTask(
            selectedTeam,
            selectedProject,
            taskId,
            { completed: e.target.dataset.completed },
            token
          )
            .then(() => getTasks())
            .catch(err => console.error(err))
        }
        break
      default:
        break
    }
  }

  const getTeams = async () => {
    setTeam(selectedTeam)
    const returnVal = await usersTeamService.getTeams(user.id, token)
    returnVal?.length ? setTeams([...returnVal]) : setTeams([returnVal])
  }

  const getMemberships = async () => {
    const returnVal = await membershipService.getMemberships(user.id, token)
    returnVal?.length ? setMemberships([...returnVal]) : setMemberships([returnVal])
  }

  const getProjects = async () => {
    // console.log(selectedTeam)
    if (user && selectedTeam) {
      const returnVal = await projectService.getProjects(selectedTeam, token)
      returnVal?.length ? setProjects([...returnVal]) : setProjects([returnVal])
    } else setProjects([])
  }

  const getTasks = async () => {
    setTask("")
    if (selectedProject
      && selectedTeam) {
      taskService.getTasks(selectedTeam, selectedProject, token)
        .then(data => data.length ? setTasks([...data]) : setTasks([data]))
        .catch(err => console.error(err))
    } else setTasks([])
  }
  return (
    <div className='main'>
      <TeamDropdowns
        tasks={tasks}
        teams={teams}
        projects={projects}
        memberships={memberships}
        handleChange={handleChange}
      />
      <TeamPanel 
        team={team}
        handleClick={handleClick}
        selectedTeam={selectedTeam}
      />
      <ProjectPanel
        project={project}
        handleClick={handleClick}
        selectedTeam={selectedTeam}
        selectedProject={selectedProject}
      />
      {hidden === false && <TaskForm
        task={task}
        token={token}
        selectedTeam={selectedTeam}
        selectedProject={selectedProject}
        setTask={setTask}
        getTasks={getTasks}
        setHidden={setHidden}
      />}
      {hidden2 === false && <TeamForm
        user={user}
        token={token}
        setHidden2={setHidden2}
        getTeams={getTeams}
        setTeam={setTeam}
        team={team}
      />}
      {hidden3 === false && <ProjectForm
        user={user}
        token={token}
        setHidden3={setHidden3}
        getProjects={getProjects}
        setProject={setProject}
        project={!hidden3 ? project : null}
        selectedTeam={selectedTeam}
        selectedProject={selectedProject}
        add={add}
        setSelectedProject={setSelectedProject}
      />}
      <PendingTasks
        tasks={tasks}
        selectedTeam={selectedTeam}
        selectedProject={selectedProject}
        handleClick={handleClick}
      />
      <CompletedTasks
        tasks={tasks}
        selectedTeam={selectedTeam}
        selectedProject={selectedProject}
        handleClick={handleClick}
      />
    </div>
  )
}