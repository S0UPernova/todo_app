import { baseUrl, origin } from "../utilities/Statics"
import FilterParams from "../utilities/FilterParams"
import ResAlertHelper from "../utilities/ResAlertHelper"
class UserService extends ResAlertHelper{
  constructor() {
    this.headers = {
    "Content-Type": "application/json",
    "Authorization": token,
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Credentials': 'true'
  }
  }
  postUser = async (params) => {
    const justFilledFields = FilterParams(params)
    return fetch(`${baseUrl}/users`, {
      "method": "POST",
      "headers": this.headers ,
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
      "headers": this.headers 
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
      "headers": this.headers 
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
      "headers": this.headers ,
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
      "headers": this.headers 
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