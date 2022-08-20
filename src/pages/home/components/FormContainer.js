import React, { Children, cloneElement, useState } from "react"
import usersTeamService from "../../../services/UsersTeamService"
// todo make this adapt for project and task forms
export default function FormContainer(props) {
  const {
    user,
    token,
    setFormState,
    formStates,
    getTeams,
    team,
    setTeam,
    add,
    setSelectedTeam,

    getProjects,
    project,
    setProject,
    selectedTeam,
    selectedProject,
    setSelectedProject,

    task,
    setTask,
    getTasks,

    children
  } = props
  // const { setFormState, formStates } = props
  // const arrayChildren = Children.toArray(children)
  const handleBackdrop = () => {
    props.setFormState(props.formStates[0])
  }
  const test = Children.map(children, child => {
    if (React.isValidElement(child,)) {
      return cloneElement(child, {
        user: user,
        token: token,
        setFormState: setFormState,
        formStates: formStates,
        getTeams: getTeams,
        team: team,
        setTeam: setTeam,
        add: add,

        getProjects: getProjects,
        project: project,
        setProject: setProject,
        selectedTeam: selectedTeam,
        selectedProject: selectedProject,
        setSelectedProject: setSelectedProject,

        task: task,
        setTask: setTask,
        getTasks: getTasks,
      })
    }
  })
  return (
    <>
      <div name="cancel" className="backdrop" onClick={handleBackdrop}></div>
      <div className="formContainer">
        <form className="add">
          {test}
          {/* {React.cloneElement(children, {
            user: user,
            token: token,
            setFormState: setFormState,
            formStates: formStates,
            getTeams: getTeams,
            team: team,
            setTeam: setTeam,
            add: add
          })} */}
        </form>
      </div>
    </>
  )
}