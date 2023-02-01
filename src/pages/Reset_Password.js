import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { RedirectToLogin } from "../App"
import userService from "../services/UserService"
export default function ResetPassword() {
  // const [message, setMessage] = useState("")
  // const [params, setParams] = useState(null)
  const location = useLocation()
  const [email, setEmail] = useState("")
  const [resetToken, setResetToken] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [redirect, setRedirect] = useState(false)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    setEmail(queryParams.get('email'))
    setResetToken(queryParams.get('amp;reset_token'))
  }, [location?.search])
  const handleChange = (e) => {
    switch (e.target.name) {
      case "password":
        setPassword(e.target.value)
        break
      case "password_confirmation":
        setPasswordConfirmation(e.target.value)
        break
      default:
        break
    }
  }
  // console.log('email', email)
  // console.log('token', resetToken)
  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log('here')
    userService.resetPassword(
      email,
      resetToken,
      {
        password: password,
        password_confirmation: passwordConfirmation
      }
    )
      .then(res => {
        if (res) {
          // setPassword("")
          // setPasswordConfirmation("")
          setRedirect(true)
        }
      })
  }
  return (
    <>
      {redirect && <RedirectToLogin/>}
      {!redirect && <div className="main d-flex justify-content-center">
        <h1>this is the reset path</h1>
        <div className="formContainer">

          <form onSubmit={handleSubmit} className="form">
            <label>
              New password
              <input name="password" type='password' value={password} onChange={handleChange} />
            </label>
            <label>
              Please re-enter your new password
              <input name="password_confirmation" type='password' value={passwordConfirmation} onChange={handleChange} />
            </label>
            <button>Submit</button>
          </form>
        </div>
      </div>}
    </>
  )
}