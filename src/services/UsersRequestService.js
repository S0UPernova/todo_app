import { baseUrl } from "../utilities/Statics"

class UsersRequestService {

  getRequests = async (user_id, token) => {
    return fetch(`${baseUrl}/users/${user_id}/requests`, {
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

  getRequest = async (user_id, request_id, token) => {
    return fetch(`${baseUrl}/users/${user_id}/requests/${request_id}`, {
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
  // todo get users version working
  // createRequest = async (user_id, request_id, token) => {
  //   return fetch(`${baseUrl}/teams/${user_id}/requests`, {
  //     "method": "POST",
  //     "headers": {
  //       "Content-Type": "application/json",
  //       "Authorization": token
  //     }
  //   })
  //     .then(
  //       response => response.json()
  //     )
  //     .catch(err => {
  //       console.error(err);
  //     })
  // }

  accept = async (user_id, request_id, token) => {
    return fetch(`${baseUrl}/users/${user_id}/requests/${request_id}/accept`, {
      "method": "PATCH",
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

  reject = async (user_id, request_id, token) => {
    return fetch(`${baseUrl}/users/${user_id}/requests/${request_id}/reject`, {
      "method": "PATCH",
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
const usersRequestService = new UsersRequestService()
export default usersRequestService