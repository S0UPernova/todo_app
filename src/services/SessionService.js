import { baseUrl } from "../utilities/Statics"
import ResAlertHelper from "../utilities/ResAlertHelper"

class SessionService extends ResAlertHelper {
  headers = {
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Credentials': 'true'
  }
  newSession = async (email, password) => {
    return fetch(`${baseUrl}/login`, {
      "method": "POST",
      "headers": headers,
      "body": JSON.stringify({ "user": { email: email, password: password } })
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