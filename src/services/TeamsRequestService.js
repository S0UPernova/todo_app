import ResAlertHelper from "../utilities/ResAlertHelper"
class TeamsRequestService extends ResAlertHelper {
  constructor(props) {
    super(props)
    this.headers = {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': process.env.REACT_APP_ORIGIN,
      'Access-Control-Allow-Credentials': 'true'
    }
  }
  getRequests = async (team_id, token) => {

    return fetch(`${process.env.REACT_APP_BASE_URL}/teams/${team_id}/requests`, {
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

  getRequest = async (team_id, request_id, token) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/teams/${team_id}/requests/${request_id}`, {
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

  createRequest = async (team_id, token) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/teams/${team_id}/requests`, {
      "method": "POST",
      "headers": { ...this.headers, "Authorization": token, }
    })
      .then(
        response => this.resAlert(response)
      )
      .catch(err => {
        console.error(err);
      })
  }

  accept = async (team_id, request_id, token) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/teams/${team_id}/requests/${request_id}/accept`, {
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

  reject = async (team_id, request_id, token) => {
    return fetch(`${process.env.REACT_APP_BASE_URL}/teams/${team_id}/requests/${request_id}/reject`, {
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
}
const teamsRequestService = new TeamsRequestService()
export default teamsRequestService