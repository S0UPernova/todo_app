import { baseUrl } from "../utilities/Statics"
import ResAlertHelper from "../utilities/ResAlertHelper"

class SessionService extends ResAlertHelper {

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
            return this.resAlert(response)
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