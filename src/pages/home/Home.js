import React, { useState, useEffect } from 'react'

import usersTeamService from '../../services/UsersTeamService'
import membershipService from '../../services/MembershipService'
import projectService from '../../services/ProjectService'
import taskService from '../../services/TaskService'

import TeamDropdowns from './components/Dropdowns'
import PendingTasks from './components/PendingTasks'
import CompletedTasks from './components/CompletedTasks'

import FormContainer from './components/FormContainer'
import TeamForm from './components/TeamForm'
import ProjectForm from './components/ProjectForm'
import TaskForm from "./components/TaskForm"

import TeamPanel from './components/TeamPanel'
import ProjectPanel from './components/ProjectPanel'

import './home.scss'

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

  const formStates = {
    0: "NONE",
    1: "TEAM",
    2: "PROJECT",
    3: "TASK"
  }
  const [formState, setFormState] = useState(formStates[0])
  const [add, setAdd] = useState(false)

  useEffect(() => {
    if (user) {
      getTeams()
      setProject(projects.filter(project => Number(project.id) === Number(selectedProject))[0])
      getTasks()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTeam, selectedProject, user])

  useEffect(() => {
    setFormState(formStates[0])
    window.addEventListener("resize", () => {
      setFormState(formStates[0])
    })
    return () => {
      window.removeEventListener("resize", () => {
        setFormState(formStates[0])
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (user) {
      getProjects()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTeam, user])

  useEffect(() => {
    if (user) {
      getTeams()
      // getMemberships()
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
        // setTask(null)
        setAdd(true)
        setFormState(formStates[3])
        // setHidden(!hidden)
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
      case "editButton":
        setAdd(false)
        setTask(JSON.parse(e.target.value))
        setFormState(formStates[3])
        break
      case "teamAddButton":
        setAdd(true)
        setFormState(formStates[1])
        break
      case "teamEditButton":
        setAdd(false)
        setFormState(formStates[1])
        break
      case "projectAddButton":
        setAdd(true)
        setFormState(formStates[2])
        break
      case "projectEditButton":
        getProjects()
        setAdd(false)
        setFormState(formStates[2])
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
    const returnVal = await usersTeamService.getTeams(user.id, token)
    returnVal?.length ? setTeams([...returnVal]) : setTeams([returnVal])

    const returnVal2 = await membershipService.getMemberships(user.id, token)
    returnVal2?.length ? setMemberships([...returnVal2]) : setMemberships([returnVal2])

    let setVal
    setVal = returnVal.filter(team => Number(team.id) === Number(selectedTeam))[0]
    if (!setVal) setVal = memberships.filter(team => Number(team.id) === Number(selectedTeam))[0]

    if (!setVal) setVal = returnVal2.filter(team => Number(team.id) === Number(selectedTeam))[0]
    if (!setVal) setVal = memberships.filter(team => Number(team.id) === Number(selectedTeam))[0]


    setTeam(setVal)
  }
  // add membership to be like team for conditionals
  // const getMemberships = async () => {
  //   return
  // }

  const getProjects = async () => {
    if (user && selectedTeam) {
      const returnVal = await projectService.getProjects(selectedTeam, token)
      returnVal?.length ? setProjects([...returnVal]) : setProjects([returnVal])
      setProject(returnVal.filter(project => Number(project.id) === Number(selectedProject))[0])
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
      {/* // ? maybe refactor add team, and add project buttons to be select options */}
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
      {/* // todo refactor api to allow members to add edit, and delete tasks */}
      <FormContainer
        // todo refactor this abomination to use useRducer,and just pass state, and dispatch
        setFormState={setFormState}
        formStates={formStates}
        formState={formState}
        user={user}
        token={token}
        // getMemberships={getMemberships}
        getTeams={getTeams}
        setTeam={setTeam}
        team={team}
        add={add}
        getProjects={getProjects}
        setProject={setProject}
        project={project}
        selectedTeam={selectedTeam}
        selectedProject={selectedProject}
        setSelectedTeam={setSelectedTeam}
        setSelectedProject={setSelectedProject}
        task={task}
        setTask={setTask}
        getTasks={getTasks}
      >
        {formState === formStates[1] && <TeamForm
        />}
        {formState === formStates[2] && <ProjectForm
        />}
        {formState === formStates[3] && <TaskForm
        />}
      </FormContainer>
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