import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
// import * as urlSlug from 'url-slug'

export default function Nav(props) {
  const [hidden, setHidden] = useState(true)
  const [smallWindow, setSmallWindow] = useState(false)
  const navigate = useNavigate()
  const handleClick = (e) => {
    switch (e.target.name) {
      case "logout":
        if (window.confirm("are you sure")) {
          props.handleLogOut()
          setHidden(true)
          navigate(`/`)
        }
        break
      case "hamburger":
        setHidden(!hidden)
        break
      default:
        setHidden(true)
        break
    }
    return
  }

  const resize = () => {
    if (window.innerWidth > 1200) {
      setSmallWindow(false)
    } else {
      if (smallWindow) setHidden(true)
      setSmallWindow(true)
    }
  }

  useEffect(() => {
    resize()
    window.addEventListener("resize", () => {
      resize()
    })
    return () => {
      window.removeEventListener("resize", () => {
        resize()
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <nav>
        {!hidden | !smallWindow ? <ul>
          <li>
            <NavLink to="/" onClick={() => {setHidden(true)}} className='btn primary hover'>
              {/* <button className='btn primary hover'>Home</button> */}
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/teams" onClick={() => {setHidden(true)}} className='btn primary hover'>
              {/* <button className='btn primary hover'>Teams</button> */}
              Teams
            </NavLink>
          </li>
          {props.user && <li className='ml-auto'>
            <NavLink to={`/profile`} onClick={() => {setHidden(true)}} className='btn primary hover'>
              {/* <button className='btn primary hover'>Profile</button> */}
              Profile
            </NavLink>
          </li>}
          {!props.user && <li className='ml-auto'>
            <NavLink to="/login" onClick={() => {setHidden(true)}} className='btn primary hover'>
              {/* <button className='btn primary hover'>Log In</button> */}
              Log In
            </NavLink>
          </li>}
          {props.user && <li>
            <button name='logout' onClick={handleClick} className='btn danger hover'>Log Out</button>
          </li>}
        </ul> : null}
      </nav>
      {!hidden && <div name={"backdrop"} className="backdrop" onClick={handleClick}></div>}
      {smallWindow && <button name='hamburger' className='hamburger' onClick={handleClick}><i><GiHamburgerMenu /></i></button>}
    </>
  )
}