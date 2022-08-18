import { useState } from "react"

// import taskService from "../services/TaskService"
import usersTeamService from "../services/UsersTeamService"

export default function TeamForm(props) {
  const { user, token, setHidden2, getTeams, team, setTeam } = props

  const initialForm = {
    name: team?.name ? team.name : "",
    description: team?.description ? team.description : "",
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
        if (!team) {
          usersTeamService.postTeam(user.id, params, token)
            .then(() => {
              setHidden2(true)
              setFormInput(initialForm)
              getTeams()
              setTeam(null)
            })
            .catch(err => console.error(err))
        } else if (team) {
          usersTeamService.updateTeam(user.id, team.id, params, token)
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
          const teamId = e.target.value
          if (teamId) {
            usersTeamService.deleteTeam(user.id, team.id, token)
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
          >{team ? 'Update' : 'Add'}</button>

          <button
            className="btn primary hover"
            name="cancel"
            type="submit"
            onClick={handleSubmit}
          >Cancel</button>

          {team && <button
            className="btn danger hover"
            name="deleteButton"
            type="submit"
            onClick={handleSubmit}
            value={team.id}
          >Delete Me!</button>}

        </form>
      </div>
    </>
  )
}