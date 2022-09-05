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
        response => response.json()
      )
      .catch(err => {
        console.error(err);
      })
  }

}
const sessionService = new SessionService()
export default sessionService