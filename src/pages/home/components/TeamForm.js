import { useState } from "react"

// import taskService from "../services/TaskService"
import usersTeamService from "../../../services/UsersTeamService"

export default function TeamForm(props) {
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
  } = props

  // const teamJSON = JSON.parse(team) // Passing an object directly didn't seem to work
  const initialForm = {
    name: team?.name && !add ? team.name : "",
    description: team?.description && !add ? team.description : "",
  }
  const [formInput, setFormInput] = useState(initialForm)

  const handleSubmit = (e) => {
    e.preventDefault()
    switch (e.target.name) {
      case "submit":
        const params = {
          name: formInput.name ? formInput.name : null,
          description: formInput.description ? formInput.description : null
        }
        if (add) {
          usersTeamService.postTeam(user.id, params, token)
            .then(() => {
              // setHidden2(true)
              getTeams()
              // setTeam("")
              // setFormInput(initialForm)
              setFormState(formStates[0])
            })
            .catch(err => console.error(err))
        } else if (!add) {
          usersTeamService.updateTeam(user.id, team.id, params, token)
            .then(() => {
              // setHidden2(true)
              getTeams()
              // setTeam("")
              // setFormInput(initialForm)
              setFormState(formStates[0])
            })
            .catch(err => console.error(err))
        }
        break
      case "cancel":
        // setHidden2(true)
        getTeams()
        // setTeam("")
        setFormInput(initialForm)
        setFormState(formStates[0])
        break
      case "deleteButton":
        if (window.confirm("Are you sure")) {
          const teamId = e.target.value
          if (teamId) {
            usersTeamService.deleteTeam(user.id, team.id, token)
              .then(() => {
                setFormState(formStates[0])
                getTeams()
                setTeam("")
                setSelectedTeam("")
                setFormInput(initialForm)
              })
              .catch(err => console.error(err))
          }
        }
        break
      default:
        // setHidden2(true)
        setFormState(formStates[0])
        getTeams()
        // setTeam(null)
        setFormInput(initialForm)
        break
    }
  }

  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        setFormInput({ ...formInput, name: e.target.value })
        break
      case "description":
        setFormInput({ ...formInput, description: e.target.value })
        break
      default:
        break
    }
  }

  return (
    <>

      <label>
        Name:
        <input
          id="name"
          type="text"
          onChange={handleChange}
          value={formInput.name}
          name="name"
          required
        ></input>
      </label>

      <label>
        Description:
        <textarea
          id="desctription"
          onChange={handleChange}
          value={formInput.description}
          name="description"
        ></textarea>
      </label>
      <button
        className="btn success hover"
        name="submit"
        type="submit"
        onClick={handleSubmit}
      >{add ? 'Create Team' : 'Update Team'}</button>

      <button
        className="btn primary hover"
        name="cancel"
        type="submit"
        onClick={handleSubmit}
      >Cancel</button>

      {team && !add && <button
        className="btn danger hover"
        name="deleteButton"
        type="submit"
        onClick={handleSubmit}
        value={team.id}
      >Delete Team</button>}

    </>
  )
}