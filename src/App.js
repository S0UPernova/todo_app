import { Route, Routes, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';

import './App.scss';

import Nav from "./layout/Nav"
import Footer from './layout/Footer'

import Home from './pages/home/Home'
import HomeNotLoggedIn from './pages/StaticHome'
import Login from './pages/Login'
import Team from './pages/Team'
import Teams from './pages/teams/Teams'
import Profile from './pages/Profile'
import sessionService from './services/SessionService'
import SignUp from './pages/Signup';


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
          console.log(res['user'])
          setCookie('token', res['token'], { sameSite: true })
          setCookie('user',{id: res['user'].id}, { sameSite: true })
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
    <div className='container d-flex flex-d-col align-items-center'>
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
      </Routes>
      <Footer />
    </div>
  )
}