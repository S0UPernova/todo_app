import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { RedirectToLogin } from "../App"
import userService from "../services/UserService"
import styles from "../styles/form.module.scss"
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
    if (queryParams.get('amp;reset_token')) {
      setResetToken(queryParams.get('amp;reset_token'))
    }
    else { //? why you do this to me sendgrid?
      setResetToken(queryParams.get('reset_token'))
    } 
  }, [location])
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
    <main>
      {redirect && <RedirectToLogin />}
      {!redirect && <div className="main d-flex justify-content-center">
        <div className={`${styles.formContainerStatic} d-flex flex-d-col mt-5`}>

          <form onSubmit={handleSubmit} className={`${styles.form} bg-primary blur rounded border`}>
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
    </main>
  )
}