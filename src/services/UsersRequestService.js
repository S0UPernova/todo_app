import ResAlertHelper from "../utilities/ResAlertHelper"
class UsersRequestService extends ResAlertHelper {
  constructor(props) {
    super(props)
    this.headers = {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': process.env.REACT_APP_ORIGIN,
      'Access-Control-Allow-Credentials': 'true'
    }
  }
  getRequests = async (user_id, token) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/users/${user_id}/requests`, {
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

  getRequest = async (user_id, request_id, token) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/users/${user_id}/requests/${request_id}`, {
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
  // todo get users version working
  // createRequest = async (user_id, request_id, token) => {
  //   return fetch(`${process.env.REACT_APP_BASE_URL}/teams/${user_id}/requests`, {
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
    return fetch(`${process.env.REACT_APP_BASE_URL}/users/${user_id}/requests/${request_id}/accept`, {
      "method": "PATCH",
      "headers": { ...this.headers, "Authorization": token, }
    })
      .then(
        response => this.resAlert(response)
      )
      .catch(err => {
        console.error(err);
      })
  }

  reject = async (user_id, request_id, token) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/users/${user_id}/requests/${request_id}/reject`, {
      "method": "PATCH",
      "headers": { ...this.headers, "Authorization": token, }
    })
      .then(
        response => this.resAlert(response)
      )
      .catch(err => {
        console.error(err);
      })
  }

  deleteRequest = async (user_id, request_id, token) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/users/${user_id}/requests/${request_id}`, {
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
const usersRequestService = new UsersRequestService()
export default usersRequestService