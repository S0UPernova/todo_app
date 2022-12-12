import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie';

import './App.scss';

import Nav from "./layout/Nav"

import Home from './pages/home/Home'
import HomeNotLoggedIn from './pages/StaticHome'
import Login from './pages/Login'
import Team from './pages/Team'
import Teams from './pages/teams/Teams'
import Profile from './pages/Profile'
import sessionService from './services/SessionService'
import SignUp from './pages/Signup';

import Contact from './pages/Contact';
import Disclaimer from './pages/Disclaimer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Activate from './pages/Activate';


export function RedirectToLogin() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/login')
  })
  return (<></>)
}

export default function App() {
  // const [token, setToken] = useState(null)
  // const [user, setUser] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const navigate = useNavigate()
  const handleLogIn = (e) => {
    e.preventDefault()
    sessionService.newSession(e.target.email.value, e.target.password.value)
      .then(res => {
        // res['token'] && setToken(res['token'])
        // res['user'] && setUser(res['user'])
        if (res['token'] && res['user']) {
          setCookie('token', res['token'], { sameSite: true })
          setCookie('user', res['user'], { sameSite: true })
        }

      })
      .then(() => {
        e.target.email.value = ""
        e.target.password.value = ""
        navigate("/")
      })
      .catch(err => console.error(err))
  }

  const handleLogOut = () => {
    // setToken(null)
    // setUser(null)
    removeCookie('token')
    removeCookie('user')
  }
  // console.log(cookies.token)

  return (
    <div className='main d-flex flex-d-col align-items-center'>
      <header>
        <Nav user={cookies.user} token={cookies.token} handleLogOut={handleLogOut} />
      </header>
      <Routes>
        <Route path="/" element={cookies.user ? <Home user={cookies.user} token={cookies.token} /> : <HomeNotLoggedIn />} />
        <Route path="/login" element={<Login user={cookies.user} handleLogIn={handleLogIn} />} />
        <Route path="/profile" element={cookies.user ? <Profile user={cookies.user} token={cookies.token} /> : <RedirectToLogin />} />
        <Route exaxt path="/teams" element={cookies.user ? <Teams user={cookies.user} token={cookies.token} /> : <RedirectToLogin />} />
        <Route path="/teams/:teamId" element={cookies.user ? <Team user={cookies.user} token={cookies.token} /> : <RedirectToLogin />} />
        <Route path="/signup" element={!cookies.user ? <SignUp /> : <Home user={cookies.user} token={cookies.token} />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/disclaimer' element={<Disclaimer />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/terms-of-service' element={<TermsOfService />} />
        <Route path='/activate'>
          <Route path=':activation'>
            <Route path=':email' element={<Activate />}></Route>
          </Route>
        </Route>
      </Routes>
      <footer className='bg-secondary rounded border d-flex justify-content-center'>
        <ul className='border-right d-flex flex-d-col align-items-end'>
          <li>
            <Link to="/contact">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/disclaimer">
              Disclaimer
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/privacy-policy">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/terms-of-service">
              Terms of Service
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  )
}