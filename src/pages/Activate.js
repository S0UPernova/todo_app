import { useState, useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"
import userService from "../services/UserService"
export default function Activate() {
  const [message, setMessage] = useState("")
  const [params, setParams] = useState(null)
  const location = useLocation()
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const email = queryParams.get('amp;email')
    const activation = queryParams.get('activation')
    if (email && activation) setParams({ email: email, activation: activation })
  }, [])
  useEffect(() => {
    if (params) {
      userService.activateUser(params.email, params.activation).then(res => {
        setMessage("Your account has been activated")
      })
        .catch(err => setMessage("Something seems to have gone wrong"))
    }
    else {
      setMessage("Something might have gone wrong")
    }
  }, [params])
  return (
    <main>
      <div className="main d-flex justify-content-center">
        <h1 className="mt-5">{message}</h1>
      </div>
    </main>
  )
}