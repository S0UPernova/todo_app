import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React, { useState } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Nav from "./layout/Nav"

import Footer from './layout/Footer'
import Teams from './pages/Teams';
import Team from './pages/Team';
export default function App() {
  let [token, setToken] = useState(null)
  let [user, setUser] = useState(null)
  const handleLogIn = (response) => {
    response && setToken(`${response['token']}`)
    response && setUser(response['user'])
  }
  const handleLogOut = () => {
    setToken(null)
    setUser(null)
  }
  return (
    <div className='container'>
      <Router>
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
      </Router>
    </div>
  )
}