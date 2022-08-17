import "../styles/login.scss"

export default function Login(props) {
  const { handleLogIn } = props
  return (
    <form id="loginForm" onSubmit={handleLogIn}>
      <label>
        Email:
        <input id="email" type="email" name="email"></input>
      </label>
      <label>
        Password:
        <input id="password" type="password" name="password"></input>
      </label>
      <button type="submit">Log In</button>
    </form>
  )
}