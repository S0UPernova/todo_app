import { Link, useNavigate } from 'react-router-dom'

// import * as urlSlug from 'url-slug'

export default function Nav(props) {
  const navigate = useNavigate()
  const handleClick = () => {
    if(window.confirm("are you sure")) {
      props.handleLogOut()
      navigate(`/`)
    }
    return
  }
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <button className='btn secondary hover'>Home</button>
          </Link>
        </li>
        <li>
          <Link to="/teams">
            <button className='btn secondary hover'>Teams</button>
          </Link>
        </li>
        {props.user && <li className='ml-auto'>
          <Link to={`/profile`}>
            <button className='btn secondary hover'>Profile</button>
          </Link>
        </li>}
        {!props.user && <li className='ml-auto'>
          <Link to="/login">
            <button className='btn secondary hover'>Log In</button>
          </Link>
        </li>}
        {props.user && <li>
          <button onClick={handleClick} className='btn secondary hover'>Log Out</button>
          </li>}
      </ul>
    </nav>
  )
}