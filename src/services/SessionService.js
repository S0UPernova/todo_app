import { baseUrl } from "../utilities/Statics"

class SessionService {

  newSession = async (email, password) => {
    return fetch(`${baseUrl}/login`, {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": JSON.stringify({ "user": {email: email, password: password} })
    })
      .then(
        response => {
          if (response.status === 200) {
            return response.json()
          }
          return alert('That does not seem to be the right password')
        }
      )
      .catch(err => {
        console.error(err);
      })
  }
}
const sessionService = new SessionService()
export default sessionService