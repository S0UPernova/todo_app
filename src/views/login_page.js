import Form from '../components/form'
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
      <Form />
      <button type="submit">Log In</button>

    </form>
  )
}