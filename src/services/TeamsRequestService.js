import { baseUrl, origin } from "../utilities/Statics"
import ResAlertHelper from "../utilities/ResAlertHelper"
class TeamsRequestService extends ResAlertHelper {

  getRequests = async (team_id, token) => {
    headers = {
      "Content-Type": "application/json",
      "Authorization": token,
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': 'true'
    }
    return fetch(`${baseUrl}/teams/${team_id}/requests`, {
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

  getRequest = async (team_id, request_id, token) => {
    return fetch(`${baseUrl}/teams/${team_id}/requests/${request_id}`, {
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

  createRequest = async (team_id, token) => {
    return fetch(`${baseUrl}/teams/${team_id}/requests`, {
      "method": "POST",
      "headers": headers
    })
      .then(
        response => this.resAlert(response)
      )
      .catch(err => {
        console.error(err);
      })
  }

  accept = async (team_id, request_id, token) => {
    return fetch(`${baseUrl}/teams/${team_id}/requests/${request_id}/accept`, {
      "method": "PATCH",
      "headers": headers
    })
      .then(
        response => this.resAlert(response)
      )
      .catch(err => {
        console.error(err);
      })
  }

  reject = async (team_id, request_id, token) => {
    return fetch(`${baseUrl}/teams/${team_id}/requests/${request_id}/reject`, {
      "method": "PATCH",
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
const teamsRequestService = new TeamsRequestService()
export default teamsRequestService