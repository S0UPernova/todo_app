import { useState, useEffect } from "react"
import { json } from "react-router-dom"
import userService from "../services/UserService"
import styles from "../styles/form.module.scss"
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
    <main className="main">
      <div className="d-flex justify-content-center">
        {completed && <div className="bg-primary blur rounded border p-2"><h1>Check your email</h1></div>}
        {!completed && <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={`${styles.form} bg-primary blur rounded border p-2`}>
            <label>
              Please enter your email
              <input name="email" type='text' value={email} onChange={handleChange} />
            </label>

            <button className="btn success">Submit</button>
          </form>
        </div>}
      </div>
    </main>
  )
}