import ResAlertHelper from "../utilities/ResAlertHelper"

class SessionService extends ResAlertHelper {
  constructor(props) {
    super(props)
    this.headers = {
      "Content-Type": "application/json",
      'Access-Control-Allow-process.env.REACT_APP_ORIGIN': process.env.REACT_APP_ORIGIN,
      'Access-Control-Allow-Credentials': 'true'
    }
  }
  newSession = async (email, password) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
      "method": "POST",
      "headers": this.headers,
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