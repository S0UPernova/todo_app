import { baseUrl } from "../utilities/Statics"

class UserService {

  getUsers = async (token) => {
    return fetch(`${baseUrl}/users`, {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })
      .then(
        response => response.json()
      )
      .catch(err => {
        console.error(err);
      })
  }

  getUser = async (user_id, token) => {
    return fetch(`${baseUrl}/users/1`, {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })
      .then(
        response => response.json()
      )
      .catch(err => {
        console.error(err);
      })
  }

  updateUser = async (user_id, params, token) => {
    return fetch(`${baseUrl}/users/${user_id}`, {
      "method": "PATCH",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": token
      },
      "body": { ...params }
    })
      .then(
        response => response.json()
      )
      .catch(err => {
        console.error(err);
      })
  }

  deleteUser = async (user_id, token) => {
    return fetch(`${baseUrl}/users/${user_id}`, {
      "method": "DELETE",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })
      .then(
        response => response.json()
      )
      .catch(err => {
        console.error(err);
      })
  }
}
const userService = new UserService()
export default userService