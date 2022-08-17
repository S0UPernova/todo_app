import { Route, Routes, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import Nav from "./layout/Nav"
import Footer from './layout/Footer'

import Home from './pages/Home'
import HomeNotLoggedIn from './pages/StaticHome'
import Login from './pages/Login'
import Team from './pages/Team'
import Teams from './pages/Teams'
import Profile from './pages/Profile'
import sessionService from './services/SessionService'
import './App.scss';

export function RedirectToLogin() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/login')
  })
  return (<></>)
}

export default function App() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  const navigate = useNavigate()
  const handleLogIn = (e) => {
    e.preventDefault()
    sessionService.newSession(e.target.email.value, e.target.password.value)
      .then(res => {
        res['token'] && setToken(res['token'])
        res['user'] && setUser(res['user'])
      })
      .then(() => {
        e.target.email.value = ""
        e.target.password.value = ""
        navigate("/")
      })
      .catch(err => console.error(err))
  }

  const handleLogOut = () => {
    setToken(null)
    setUser(null)
  }

  return (
    <div className='container d-flex flex-d-col align-items-center'>
      <header>
        <Nav user={user} token={token} handleLogOut={handleLogOut} />
      </header>
      <Routes>
        <Route path="/" element={user ? <Home user={user} token={token} /> : <HomeNotLoggedIn />} />
        <Route path="/login" element={<Login handleLogIn={handleLogIn} user={user} />} />
        <Route path="/profile" element={user ? <Profile token={token} user={user} /> : <RedirectToLogin />} />
        <Route exaxt path="/teams" element={user ? <Teams user={user} token={token} /> : <RedirectToLogin />} />
        <Route path="/teams/:teamId" element={user ? <Team user={user} token={token} /> : <RedirectToLogin />} />
      </Routes>
      <Footer />
    </div>
  )
}