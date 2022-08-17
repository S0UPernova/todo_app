import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
// import * as urlSlug from 'url-slug'

export default function Nav(props) {
  const [hidden, setHidden] = useState(true)
  const [smallWindow, setSmallWindow] = useState(false)
  const navigate = useNavigate()
  const handleClick = (e) => {
    console.log(e.name)
    switch (e.target.name) {
      case "logout":
        if (window.confirm("are you sure")) {
          props.handleLogOut()
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
      {/* //todo add backdrop and have it close dropdown on click */}
      <nav>
        {!hidden | !smallWindow ? <ul>
          <li>
            <Link to="/">
              <button className='btn primary hover'>Home</button>
            </Link>
          </li>
          <li>
            <Link to="/teams">
              <button className='btn primary hover'>Teams</button>
            </Link>
          </li>
          {props.user && <li className='ml-auto'>
            <Link to={`/profile`}>
              <button className='btn primary hover'>Profile</button>
            </Link>
          </li>}
          {!props.user && <li className='ml-auto'>
            <Link to="/login">
              <button className='btn primary hover'>Log In</button>
            </Link>
          </li>}
          {props.user && <li>
            <button name='logout' onClick={handleClick} className='btn primary hover'>Log Out</button>
          </li>}
        </ul> : null}
      </nav>
      {!hidden && <div name={"backdrop"} className="backdrop" onClick={handleClick}></div>}
      {smallWindow && <button name='hamburger' className='hamburger' onClick={handleClick}><i><GiHamburgerMenu /></i></button>}
    </>
  )
}