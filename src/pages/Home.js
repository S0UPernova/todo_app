import React, { useState, useEffect } from 'react'

import usersTeamService from '../services/UsersTeamService'
import membershipService from '../services/MembershipService'
import projectService from '../services/ProjectService'
import taskService from '../services/TaskService'

import TaskForm from "../components/TaskForm"
import TeamDropdowns from '../components/Dropdowns'
import PendingTasks from '../components/PendingTasks'
import CompletedTasks from '../components/CompletedTasks'

import '../styles/Home.scss'
import TeamForm from '../components/TeamForm'

export default function Home(props) {
  const { user, token } = props
  // todo refactor selectedTeam and selectedProject to be objects of them
  // todo instead of just the id
  const [selectedTeam, setSelectedTeam] = useState("")
  const [selectedProject, setSelectedProject] = useState("")

  const [teams, setTeams] = useState([])
  const [memberships, setMemberships] = useState([])
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])
  const [hidden, setHidden] = useState(true)
  const [hidden2, setHidden2] = useState(true)
  const [task, setTask] = useState()
  const [team, setTeam] = useState()


  useEffect(() => {
    if (user) {
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
        setTask(e.target.value)
        setHidden(!hidden)
        break
      case "teamEditButton":
        setTeam(e.target.value)
        setHidden2(!hidden2)
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
        setTask(e.target.value)
        if (taskId && task) {
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
    const returnVal = await usersTeamService.getTeams(user.id, token)
    returnVal?.length ? setTeams([...returnVal]) : setTeams([returnVal])
  }

  const getMemberships = async () => {
    const returnVal = await membershipService.getMemberships(user.id, token)
    returnVal?.length ? setMemberships([...returnVal]) : setMemberships([returnVal])
  }

  const getProjects = async () => {
    if (user && selectedTeam && selectedTeam !== "") {
      const returnVal = await projectService.getProjects(selectedTeam, token)
      returnVal?.length ? setProjects([...returnVal]) : setProjects([returnVal])

    } else setProjects([])
  }

  const getTasks = async () => {
    if (selectedProject
      && selectedProject !== ""
      && selectedTeam
      && selectedTeam !== "") {
      taskService.getTasks(selectedTeam, selectedProject, token)
        .then(data => data.length ? setTasks([...data]) : setTasks([data]))
        .catch(err => console.error(err))
    } else setTasks([])
  }
  return (
    <div className='main'>

      <button name="teamAddButton" onClick={handleClick}>AddTeam</button>

      {selectedTeam && teams.filter(
        team => Number(team.id) === Number(selectedTeam))?.length
        ? <button
          name="teamEditButton"
          onClick={handleClick}
          value={JSON.stringify(teams.filter(team => Number(team.id) === Number(selectedTeam))[0])}
        >Edit selected Team
        </button>
        : null}

      {selectedTeam && <button name="teamAddButton" onClick={handleClick}>Add Project</button>}

      {selectedProject && <button
          name="teamEditButton"
          onClick={handleClick}
          value={JSON.stringify(projects.filter(project => Number(project.id) === Number(selectedProject))[0])}
        >Edit selected Project
        </button>}
      <TeamDropdowns
        tasks={tasks}
        teams={teams}
        projects={projects}
        memberships={memberships}
        handleChange={handleChange}
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