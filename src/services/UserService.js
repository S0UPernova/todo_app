import { baseUrl, origin } from "../utilities/Statics"
import FilterParams from "../utilities/FilterParams"
import ResAlertHelper from "../utilities/ResAlertHelper"
class UserService extends ResAlertHelper {
  constructor(props) {
    super(props)
    this.headers = {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': 'true'
    }
  }
  postUser = async (params) => {
    const justFilledFields = FilterParams(params)
    return fetch(`${baseUrl}/users`, {
      "method": "POST",
      "headers": { ...this.headers },
      "body": JSON.stringify({ "user": { ...justFilledFields } })
    })
      .then(
        response => this.resAlert(response)
      )
      .catch(err => {
        console.error(err);
      })
  }

  getUsers = async (token) => {
    return fetch(`${baseUrl}/users`, {
      "method": "GET",
      "headers": { ...this.headers, "Authorization": token, }
    })
      .then(
        response => this.resAlert(response)
      )
      .catch(err => {
        console.error(err);
      })
  }

  getUser = async (user_id, token) => {
    return fetch(`${baseUrl}/users/${user_id}`, {
      "method": "GET",
      "headers": { ...this.headers, "Authorization": token, }
    })
      .then(
        response => this.resAlert(response)
      )
      .catch(err => {
        console.error(err);
      })
  }

  activateUser = async (email, activation_token) => {
    return fetch(`${baseUrl}/account_activations/${activation_token}/edit?email=${email}`, {
      "method": "GET",
      "headers": { ...this.headers }
    })
      .then(
        response => this.resAlert(response)
      )
      .catch(err => {
        console.error(err);
      })
  }

  createPasswordReset = async   (email) => {
    console.log('email', email)
    return fetch(`${baseUrl}/password_resets/?email=${email}`, {
      "method": "POST",
    })
      .then(
        response => this.resAlert(response)
      )
      .catch(err => {
        console.error(err);
      })
  }

  resetPassword = async (email, reset_token, params) => {
    return fetch(`${baseUrl}/password_resets/${reset_token}/?email=${email}`, {
      "method": "PATCH",
      "headers": { ...this.headers },
      "body": JSON.stringify({"user": {...params}})
    })
      .then(
        response => this.resAlert(response)
      )
      .catch(err => {
        console.error(err);
      })
  }

  updateUser = async (user_id, params, token) => {
    const justFilledFields = FilterParams(params)
    return fetch(`${baseUrl}/users/${user_id}`, {
      "method": "PATCH",
      "headers": { ...this.headers, "Authorization": token, },
      "body": JSON.stringify({ "user": { ...justFilledFields } })
    })
      .then(
        response => this.resAlert(response)
      )
      .catch(err => {
        console.error(err);
      })
  }

  deleteUser = async (user_id, token) => {
    return fetch(`${baseUrl}/users/${user_id}`, {
      "method": "DELETE",
      "headers": { ...this.headers, "Authorization": token, }
    })
      .then(
        response => this.resAlert(response)
      )
      .catch(err => {
        console.error(err);
      })
  }
}
const userService = new UserService()
export default userService