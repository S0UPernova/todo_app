import { NavLink } from "react-router-dom"
import "../styles/login.scss"

export default function Login(props) {
  const { handleLogIn } = props
  return (
    <>
      <div className="main d-flex flex-d-col">
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
        <p>Don't have an account?
          {' '}
          <NavLink to="/signup">
            {/* <button className='btn primary hover'>Teams</button> */}
            Sign up
          </NavLink>
        </p>
      </div>





    </>
  )

}