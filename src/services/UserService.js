import { baseUrl } from "../utilities/Statics"
import FilterParams from "../utilities/FilterParams"
import ResAlertHelper from "../utilities/ResAlertHelper"
class UserService extends ResAlertHelper{
  headers = {
    "Content-Type": "application/json",
    "Authorization": token,
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Credentials': 'true'
  }
  postUser = async (params) => {
    const justFilledFields = FilterParams(params)
    return fetch(`${baseUrl}/users`, {
      "method": "POST",
      "headers": headers,
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
      "headers": headers
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
      "headers": headers
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
      "headers": headers,
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
      "headers": headers
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