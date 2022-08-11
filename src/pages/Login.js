export default function Login(props) {
  const { handleLogIn } = props
  return (
    <form onSubmit={handleLogIn}>
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