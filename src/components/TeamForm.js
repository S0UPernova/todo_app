import { useState } from "react"

// import taskService from "../services/TaskService"
import usersTeamService from "../services/UsersTeamService"

export default function TeamForm(props) {
  const { user, token, setHidden2, getTeams, team, setTeam } = props

  const teamJSON = JSON.parse(team) // Passing an object directly didn't seem to work
  const initialForm = {
    name: teamJSON?.name ? teamJSON.name : "",
    description: teamJSON?.description ? teamJSON.description : "",
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
        if (!teamJSON) {
          usersTeamService.postTeam(user.id, params, token)
            .then(() => {
              setHidden2(true)
              setFormInput(initialForm)
              getTeams()
              setTeam(null)
            })
            .catch(err => console.error(err))
        } else if (teamJSON) {
          usersTeamService.updateTeam(user.id, teamJSON.id, params, token)
            .then(() => {
              setHidden2(true)
              setFormInput(initialForm)
              getTeams()
              setTeam(null)
            })
            .catch(err => console.error(err))
        }
        break
      case "cancel":
        setFormInput(initialForm)
        setHidden2(true)
        setTeam(null)
        break
      case "deleteButton":
        if (window.confirm("Are you sure")) {
          const taskId = e.target.value
          if (taskId) {
            usersTeamService.deleteTeam(user.id, teamJSON.id, token)
              .then(() => {
                setHidden2(true)
                setFormInput(initialForm)
                getTeams()
                setTeam(null)
              })
              .catch(err => console.error(err))
          }
        }
        break
      default:
        setFormInput(initialForm)
        setHidden2(true)
        setTeam(null)
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
      <div name="cancel" className="backdrop" onClick={handleSubmit}></div>
      <div className="formContainer">
        <form className="add">
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
            className="btn primary hover"
            name="submit"
            type="submit"
            onClick={handleSubmit}
          >{teamJSON ? 'Update' : 'Add'}</button>

          <button
            className="btn primary hover"
            name="cancel"
            type="submit"
            onClick={handleSubmit}
          >Cancel</button>

          {teamJSON && <button
            className="btn danger hover"
            name="deleteButton"
            type="submit"
            onClick={handleSubmit}
            value={teamJSON.id}
          >Delete Me!</button>}

        </form>
      </div>
    </>
  )
}