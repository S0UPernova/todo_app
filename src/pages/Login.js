import "../styles/login.scss"
export default function Login(props) {
  const { handleLogIn } = props
  return (
    <form onSubmit={handleLogIn}>
      <label for="email">Email: </label>
        <input id="email" type="email" name="email"></input>
      <label for="password">Password: </label>
        <input id="password" type="password" name="password"></input>
      <button type="submit">Log In</button>

    </form>
  )
}