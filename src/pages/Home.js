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
import ProjectForm from '../components/ProjectForm'

export default function Home(props) {
  const { user, token } = props
  // todo refactor selectedTeam and selectedProject to be objects of them
  // todo instead of just the id
  // const [team, setTeam] = useState("")
  // const [project, setProject] = useState("")

  const [teams, setTeams] = useState([])
  const [memberships, setMemberships] = useState([])

  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])

  const [team, setTeam] = useState()
  const [project, setProject] = useState()
  const [task, setTask] = useState()

  const [hidden, setHidden] = useState(true)
  const [hidden2, setHidden2] = useState(true)
  const [hidden3, setHidden3] = useState(true)




  useEffect(() => {
    if (user) {
      getTasks()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team, project, user])


  useEffect(() => {
    if (user) {
      getProjects()
      setProject("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team, user])
  
  
  
  // useEffect(() => {
  //   if (user && team) {
  //     getProjects()
  //     setProject("")
  //   }
  //   if (project) {
  //     getTasks()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [team, user])

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
      setTeam(null)
      setProject(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleChange = (e) => {
    switch (e.target.getAttribute("data-dropdown")) {
      case 'team':
        if (e.target.value === "") {
          setTeam("")
          setProject("")
          setTasks([])
        } else {
          setTeam(JSON.parse(e.target.value))
          setProject("")
          setTasks([])
        }
      case 'project':
        if (e.target.value === "") {
          setProject("")
          setTasks([])
        } else {
          setProject(JSON.parse(e.target.value))
          setTasks([])
        }
      default:
        break
    }
  }

  const handleClick = (e) => {
    e.preventDefault()
    switch (e.target.name) {
      case "addButton":
        setTask("")
        setHidden(!hidden)
        break
      case "teamAddButton":
        setHidden2(!hidden2)
        break
      case "editButton":
        setHidden(!hidden)
        break
      case "teamEditButton":
        setHidden2(!hidden2)
        break
      case "projectEditButton":
        setHidden3(!hidden3)
        break
      case "projectAddButton":
        setHidden3(!hidden3)
        break
      case "deleteButton":
        if (window.confirm("Are you sure")) {
          const taskId = e.target.value
          if (taskId) {
            taskService.deleteTask(team.id, project.id, taskId, token)
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
            team.id,
            project.id,
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
    if (user && team?.id && team !== "") {
      const returnVal = await projectService.getProjects(team.id, token)
      returnVal?.length ? setProjects([...returnVal]) : setProjects([returnVal])
    } else setProjects([])
  }

  const getTasks = async () => {
    if (token && project?.id && team?.id) {
      taskService.getTasks(team.id, project.id, token)
      .then(data => {
        data.length ? setTasks([...data]) : setTasks([data])
      })
      .catch(err => console.error(err))
    } else setTasks("")
  }
  return (
    <div className='main'>

      <button name="teamAddButton" onClick={handleClick}>AddTeam</button>

      {team?.id
        ? <button
          name="teamEditButton"
          onClick={handleClick}
          value={JSON.stringify(team)}
        >Edit selected Team
        </button>
        : null}

      {team && <button name="projectAddButton" onClick={handleClick}>Add Project</button>}

      {project && <button
        name="projectEditButton"
        onClick={handleClick}
        value={JSON.stringify(project)}
      >Edit selected Project
      </button>}

      {hidden === false && <TaskForm
        task={task}
        token={token}
        selectedTeam={team?.id ? team.id : ""}
        selectedProject={project?.id ? project.id: ""}
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
        project={project}
        selectedTeam={team}
      />}
      <TeamDropdowns
        tasks={tasks}
        teams={teams}
        projects={projects}
        memberships={memberships}
        handleChange={handleChange}
        selectedProject={project}
        selectedTeam={team}
      />
      <PendingTasks
        tasks={tasks}
        selectedTeam={team?.id ? team.id : ""}
        selectedProject={project?.id ? project.id : ""}
        handleClick={handleClick}
      />
      <CompletedTasks
        tasks={tasks}
        selectedTeam={team?.id ? team.id : ""}
        selectedProject={project?.id ? project.id : ""}
        handleClick={handleClick}
      />
    </div>
  )
}