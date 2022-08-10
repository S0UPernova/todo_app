import { Link } from 'react-router-dom'
import * as urlSlug from 'url-slug'
export default function Nav(props) {
  return (
    <>
      <ul>
        <li>
          <Link to="/">
            <button>home</button>
          </Link>
        </li>
        <li>
          <Link to="/teams">
            <button>teams</button>
          </Link>
        </li>
        {props.user && <li>
          <Link to={`/profile`}>
            <button>profile</button>
          </Link>
        </li>}
        {!props.user && <li>
          <Link to="/login">
              <button>Log In</button>
          </Link>
        </li>}
        {props.user && <li><Link to="/logout">
          <button>Log Out</button>
        </Link></li>}
      </ul>
    </>
  )
}