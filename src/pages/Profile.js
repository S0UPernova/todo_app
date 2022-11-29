import React, { useState, useEffect } from 'react'
import FormContainer from '../components/FormContainer'
import UserForm from '../components/UserForm'
import userService from '../services/UserService';
import { BsGearWide } from "react-icons/bs"

// import taskService from "../services/TaskService"
// import usersTeamService from "../../../services/UsersTeamService"


export default function Profile(props) {
  let [user, setUser] = useState("")
  const formStates = {
    0: "NONE",
    1: "PROFILE"
  }
  const [formState, setFormState] = useState(formStates[0])

  const getUser = () => {
    if (props.user.id) {
      userService.getUser(props.user.id, props.token)
        .then(data => data ? setUser(data) : null)
        .catch(err => console.error(err))
    } else setUser([])
  }
  useEffect(() => {
    getUser()
  }, [props.user.id, props.token])
  return (
    <>
      <div id='profile' className='container d-flex flex-d-col align-items-center justify-content-center border bg-primary'>
        <h1 className='d-flex'>Profile <button
            onClick={() => setFormState(formStates[1])}
            className="icon-button ml-1 icon-button-no-background"><i className="icon"><BsGearWide /></i>
          </button></h1>
        
        {/* <button onClick={() => setFormState(formStates[1])}>edit</button> */}
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
        add={false}
      >
        <UserForm />
      </FormContainer>
    </>

  )
}