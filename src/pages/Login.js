import { Link } from "react-router-dom"
import "../styles/login.scss"

export default function Login(props) {
  const { handleLogIn } = props
  return (

    // <main className="main container bg-primary rounded border blur p-2"></main>
    <main className=" main container bg-primary rounded border blur p-2 d-flex flex-d-col">
      <div className="login-contaner formContainerStatic d-flex flex-d-col  rounded border blur">
        <form className="form" onSubmit={handleLogIn}>
          <label>
            Email:
            <input required id="email" type="text" name="email"></input>
          </label>
          <label>
            Password:
            <input required id="password" type="password" name="password"></input>
          </label>
          <button className="btn success" type="submit">Log In</button>
        </form>
        <p id='signup'>Don't have an account?
          {' '}
          <Link to="/signup">
            {/* <button className='btn primary hover'>Teams</button> */}
            Sign up
          </Link>
        </p>
        <p id="forgot-password">Forgot your password?
          {' '}
          <Link to="/forgot-password">
            reset password
            {/* <button className='btn primary hover'>Teams</button> */}

          </Link>
        </p>
      </div>
    </main>
  )

}