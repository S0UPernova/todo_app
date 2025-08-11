import userService from '../services/UserService'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function UserForm(props) {
  const {
    user,
    token,
    add,
    formStates,
    setFormState,
    getUser,
  } = props

  // const teamJSON = JSON.parse(team) // Passing an object directly didn't seem to work
  const initialForm = {
    name: user?.name && !add ? user.name : "",
    handle: user?.handle && !add ? user.handle : "",
    email: user?.email && !add ? user.email : "",
    password: "",
    passwordConfirmation: "",

  }
  const [formInput, setFormInput] = useState(initialForm)
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    switch (e.target.name) {
      case "submit":
        const params = {
          name: formInput.name ? formInput.name : null,
          handle: formInput.handle ? formInput.handle : null,
          email: formInput.email ? formInput.email : null,
          password: formInput.password ? formInput.password : null,
          password_confirmation: formInput.passwordConfirmation ? formInput.passwordConfirmation : null,
          current_password: formInput.currentPassword ? formInput.currentPassword : null,
        }
        if (add === true) {
          if (
            formInput.name &&
            formInput.handle &&
            formInput.email &&
            formInput.password &&
            formInput.passwordConfirmation
          ) {
            userService.postUser(params)
              .then((res) => {
                if (res) {
                  setFormState(formStates[0])
                  setFormInput(initialForm)
                  navigate('/login')
                }
              })
              .catch(err => console.error(err))
          }
          else {
            return
          }
        } else if (add === false) {
          userService.updateUser(user.id, params, token)
            .then(() => {
              getUser()
              setFormState(formStates[0])
              setFormInput(initialForm)
            })
            .catch(err => console.error(err))
        }
        break
      case "cancel":
        setFormState(formStates[0])
        setFormInput(initialForm)
        break
      // case "deleteButton":
      //   if (window.confirm("Are you sure")) {
      //     const teamId = e.target.value
      //     if (teamId) {
      //       usersTeamService.deleteTeam(user.id, team.id, token)
      //         .then(() => {
      //           setFormState(formStates[0])
      //           getTeams()
      //           setTeam("")
      //           setSelectedTeam("")
      //           setFormInput(initialForm)
      //         })
      //         .catch(err => console.error(err))
      //     }
      //   }
      // break
      default:
        setFormState(formStates[0])
        setFormInput(initialForm)
        break
    }
  }

  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        setFormInput({ ...formInput, name: e.target.value })
        break
      case "handle":
        setFormInput({ ...formInput, handle: e.target.value })
        break
      case "email":
        setFormInput({ ...formInput, email: e.target.value })
        break
      case "password":
        setFormInput({ ...formInput, password: e.target.value })
        break
      case "passwordConfirmation":
        setFormInput({ ...formInput, passwordConfirmation: e.target.value })
        break
      case "currentPassword":
        setFormInput({ ...formInput, currentPassword: e.target.value })
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
          type="text"
          onChange={handleChange}
          value={formInput.name}
          name="name"
        ></input>
      </label>

      <label>
        Handle:
        <input
          onChange={handleChange}
          value={formInput.handle}
          name="handle"
        ></input>
      </label>

      <label>
        Email:
        <input
          onChange={handleChange}
          value={formInput.email}
          name="email"
        ></input>
      </label>

      <label>
        New Password:
        <input
          onChange={handleChange}
          value={formInput.password}
          type="password"
          name="password"
        ></input>
      </label>

      <label>
        Confirm New Password:
        <input
          onChange={handleChange}
          value={formInput.passwordConfirmation}
          type="password"
          name="passwordConfirmation"
        ></input>
      </label>

      {add === false && <label>
        Current Password:
        <input
          onChange={handleChange}
          value={formInput.currentPassword}
          type="password"
          name="currentPassword"
        ></input>
      </label>}

      <button
        className="btn success hover"
        name="submit"
        type="submit"
        onClick={handleSubmit}
      >{add ? 'Create User' : 'Update Profile'}</button>

      {add === false && <button
        className="btn primary hover"
        name="cancel"
        type="submit"
        onClick={handleSubmit}
      >Cancel</button>}

      {/* // todo add delete with password confirmation */}
      {/* {user && !add && <button
        className="btn danger hover"
        name="deleteButton"
        type="submit"
        onClick={handleSubmit}
        value={user.id}
      >Delete account</button>} */}

    </>
  )
}