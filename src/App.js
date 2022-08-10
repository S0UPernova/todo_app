import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import React, { useState } from 'react'
import Header from './layout/header'
import Content from './layout/content'
import Footer from './layout/footer'
export default function App(){
  const todoURL = "http://localhost:3000"
  let [token, setToken] = useState("")
  let [user, setUser] = useState("")
  const handleLogIn = (response) => {
    response && setToken(`${response['token']}`)
    response && setUser(response['user'])
  }
  return (
    <div>
      <Router>
        <Header user={user} token={token}/>
        <Content user={user} handleLogIn={handleLogIn} todoURL={todoURL} token={token}/>
        <Footer />
      </Router>
    </div>
  )
}