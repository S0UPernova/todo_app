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
    setParams({ email: email, activation: activation })
  }, [])
  useEffect(() => {
    if (params) {
      userService.activateUser(params.email, params.activation).then(res => {
        if(res.ok) {
          setMessage("Your account has been activated")
        }
      })
        .catch(err => setMessage("Something might have gone wrong"))
    }
  }, [params])
  return (
    <>
    <div className="main d-flex justify-content-center">
      <h1 className="mt-5">{message}</h1>
    </div>
    </>
  )
}