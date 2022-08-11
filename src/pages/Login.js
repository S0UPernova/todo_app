import sessionService from '../services/SessionService'
import { useNavigate } from 'react-router-dom'
export default function Login(props) {
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    let response = await sessionService.newSession(e.target.email.value, e.target.password.value)
    props.handleLogIn(response)
    e.target.email.value = ""
    e.target.password.value = ""
    navigate("/")
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="text" name="email"></input>
      </label>
      <label>
        Password:
        <input type="text" name="password"></input>
      </label>
      <button type="submit">Log In</button>

    </form>
  )
}