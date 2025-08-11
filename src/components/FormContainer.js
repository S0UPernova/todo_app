import React, { Children, cloneElement } from "react"
import styles from '../styles/form.module.scss'
export default function FormContainer(props) {
  const {
    user,
    token,
    setFormState,
    formStates,
    formState,
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

    getUser,

    children
  } = props
  const handleBackdrop = () => {
    props.setFormState(props.formStates[0])
  }
  const childComponents = Children.map(children, child => {
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
        setSelectedTeam: setSelectedTeam,
        selectedProject: selectedProject,
        setSelectedProject: setSelectedProject,

        task: task,
        setTask: setTask,
        getTasks: getTasks,

        getUser: getUser
      })
    }
  })
  return (
    <>
      {formState !== formStates[0] && <>
          <div name="cancel" className="backdrop" onClick={handleBackdrop}></div>
          <div className={styles.formContainer}>
            <form className={`${styles.form} bg-primary rounded border blur`}>
              {childComponents}
            </form>
          </div>
        </>
      }

    </>
  )
}