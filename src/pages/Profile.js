import React, { useState, useEffect } from 'react'
import userService from '../services/UserService.js'
export default function Profile(props) {
  let [user, setUser] = useState("")

  useEffect(() => {
    if (props.user.id) {
      userService.getUser(props.user.id, props.token)
        .then(data => setUser(data))
        .catch(err => console.error(err))
    } else setUser([])
  }, [props.user.id, props.token])
  return (
    <div className='main container d-flex flex-d-col align-items-center'>
      <h1>Profile</h1>
      {user && <div>
        <h2>id: {user.id}</h2>
        <h2>handle: {user.handle}</h2>
        <h2>name: {user.name}</h2>
        <h2>email: {user.email}</h2>
      </div>}
    </div>
  )
}