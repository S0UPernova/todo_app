import Home from '../views/home'
import Login from '../views/login_page'
import Logout from '../components/logout'
import ShowProfile from '../views/profile_page'
import { Route, Routes} from 'react-router-dom'
export default function Content(props){
  return (
    <div>
      {props.token && <p>{props.token}</p>}
        <Routes>
          <Route path="/" element={<Home user={props.user} token={props.token}/>}/>
          <Route path="/login" element={<Login handleLogIn={props.handleLogIn} todoURL={props.todoURL} user={props.user}/>}/>
          <Route path="/profile" element={<ShowProfile token={props.token} user={props.user}/>}/>
          <Route path="/logout" element={<Logout />}/>
        </Routes>
    </div>
  )
}