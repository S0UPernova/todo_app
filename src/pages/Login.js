import "../styles/login.scss"

export default function Login(props) {
  const { handleLogIn } = props
  return (
    <div className="main container d-flex flex-d-col align-items-center">
      <form id="loginForm" onSubmit={handleLogIn}>
        <label>
          Email:
          <input required id="email" type="email" name="email"></input>
        </label>
        <label>
          Password:
          <input required id="password" type="password" name="password"></input>
        </label>
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}