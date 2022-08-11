import {Route, Routes, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'

import Nav from "./layout/Nav"
import Footer from './layout/Footer'

import Home from './pages/Home'
import Login from './pages/Login'
import Team from './pages/Team'
import Teams from './pages/Teams'
import Profile from './pages/Profile'
import sessionService from './services/SessionService'
import './App.css';

export default function App() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  const navigate = useNavigate()
  const handleLogIn = (e) => {
    e.preventDefault()
    sessionService.newSession(e.target.email.value, e.target.password.value)
    .then(res => {
      setToken(`${res['token']}`)
      setUser(res['user'])
    })
    e.target.email.value = ""
    e.target.password.value = ""
    navigate("/")
  }
  
  const handleLogOut = () => {
    setToken(null)
    setUser(null)
  }
  return (
    <div className='container'>
        <header>
          <Nav user={user} token={token} handleLogOut={handleLogOut} />
        </header>
        <Routes>
          <Route path="/" element={<Home user={user} token={token} />} />
          <Route path="/login" element={<Login handleLogIn={handleLogIn} user={user} />} />
          <Route path="/profile" element={<Profile token={token} user={user} />} />
          <Route exaxt path="/teams" element={<Teams user={user} token={token} />} />
          <Route path="/teams/:teamId" element={<Team user={user} token={token} />} />
        </Routes>
        <Footer />
    </div>
  )
}