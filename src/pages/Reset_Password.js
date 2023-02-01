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
    setResetToken(queryParams.get('&amp;reset_token'))
    if (!resetToken) setResetToken(queryParams.get('&reset_token')) //? why you do this to me sendgrid?
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
  const handleSubmit = (e) => {
    e.preventDefault()
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
          setRedirect(true)
        }
      })
  }
  return (
    <>
      {redirect && <RedirectToLogin />}
      {!redirect && <div className="main d-flex justify-content-center">
        <div className="formContainerStatic d-flex flex-d-col mt-5">

          <form onSubmit={handleSubmit} className="form">
            <label>
              New password
              <input name="password" type='password' value={password} onChange={handleChange} />
            </label>
            <label>
              Please re-enter your new password
              <input name="password_confirmation" type='password' value={passwordConfirmation} onChange={handleChange} />
            </label>
            <button className="btn success">Submit</button>
          </form>
        </div>
      </div>}
    </>
  )
}