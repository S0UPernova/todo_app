import React, { useState, useEffect } from 'react'
import userService from '../services/UserService.js'
import FormContainer from '../components/FormContainer'

// import taskService from "../services/TaskService"
// import usersTeamService from "../../../services/UsersTeamService"


export default function Profile(props) {
  let [user, setUser] = useState("")
  const [add, setAdd] = useState(false)

  const formStates = {
    0: "NONE",
    1: "PROFILE"
  }
  const [formState, setFormState] = useState(formStates[0])

  const getUser = () => {
    if (props.user.id) {
      userService.getUser(props.user.id, props.token)
        .then(data => setUser(data))
        .catch(err => console.error(err))
    } else setUser([])
  }
  useEffect(() => {
    getUser()
  }, [props.user.id, props.token])
  return (
    <>
      <div className='container d-flex flex-d-col align-items-center border bg-primary'>
        <h1>Profile </h1>
        <button onClick={() => setFormState(formStates[1])}>edit</button>
        {user && <div>
          <h2>id: {user.id}</h2>
          <h2>handle: {user.handle}</h2>
          <h2>name: {user.name}</h2>
          <h2>email: {user.email}</h2>
        </div>}
      </div>
      <FormContainer
        user={user}
        token={props.token}
        formState={formState}
        formStates={formStates}
        setFormState={setFormState}
        getUser={getUser}
      >
        <ProfileForm />
      </FormContainer>
    </>

  )
}
function ProfileForm(props) {
  const {
    user,
    token,
    add,
    formState,
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
          if (add) {
            userService.postUser(params)
              .then(() => {
                // setHidden2(true)
                // getTeams()
                // setTeam("")
                getUser()
                setFormState(formStates[0])
                setFormInput(initialForm)
              })
              .catch(err => console.error(err))
          } else if (!add) {
            userService.updateUser(user.id, params, token)
              .then(() => {
                // setHidden2(true)
                // getTeams()
                // setTeam("")
                getUser()
                setFormState(formStates[0])
                setFormInput(initialForm)
              })
              .catch(err => console.error(err))
          }
          
          
        break
      case "cancel":
        // setHidden2(true)
        // getTeams()
        // setTeam("")
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
        // setHidden2(true)
        setFormState(formStates[0])
        // getTeams()
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
          id="name"
          type="text"
          onChange={handleChange}
          value={formInput.name}
          name="name"
          required
        ></input>
      </label>

      <label>
        Handle:
        <input
          id="handle"
          onChange={handleChange}
          value={formInput.handle}
          name="handle"
        ></input>
      </label>

      <label>
        Email:
        <input
          id="email"
          onChange={handleChange}
          value={formInput.email}
          name="email"
        ></input>
      </label>

      <label>
        New Password:
        <input
          id="password"
          onChange={handleChange}
          value={formInput.password}
          name="password"
        ></input>
      </label>

      <label>
        Confirm New Password:
        <input
          id="passwordConfirmation"
          onChange={handleChange}
          value={formInput.passwordConfirmation}
          name="passwordConfirmation"
        ></input>
      </label>

      <label>
        Current Password:
        <input
          id="currentPassword"
          onChange={handleChange}
          value={formInput.currentPassword}
          name="currentPassword"
        ></input>
      </label>

      <button
        className="btn success hover"
        name="submit"
        type="submit"
        onClick={handleSubmit}
      >{add ? 'Create Profile' : 'Update Profile'}</button>

      <button
        className="btn primary hover"
        name="cancel"
        type="submit"
        onClick={handleSubmit}
      >Cancel</button>

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