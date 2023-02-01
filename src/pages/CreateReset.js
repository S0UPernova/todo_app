import { useState, useEffect } from "react"
import { json } from "react-router-dom"
import userService from "../services/UserService"
export default function CreateReset() {
  // const [message, setMessage] = useState("")
  // const [params, setParams] = useState(null)
  const [email, setEmail] = useState("")
  const [completed, setCompleted] = useState(false)
  const handleChange = (e) => {
    setEmail(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    userService.createPasswordReset(email)
      .then(res => {
        if (json(res)?.status === 200) {
          // setEmail("")
          setCompleted(true)
        }
      })
  }
  return (
    <>
      <div className="main d-flex justify-content-center">
        {completed && <h1>Check your email</h1>}
        {!completed && <div className="formContainer">
          <form onSubmit={handleSubmit} className="form">
            <label>
              Please enter your email
              <input name="email" type='text' value={email} onChange={handleChange} />
            </label>

            <button className="btn success">Submit</button>
          </form>
        </div>}
      </div>
    </>
  )
}