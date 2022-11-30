import { baseUrl } from "../utilities/Statics";
import FilterParams from "../utilities/FilterParams"
import ResAlertHelper from "../utilities/ResAlertHelper"
class UsersTeamService extends ResAlertHelper {
  headers = {
    "Content-Type": "application/json",
    "Authorization": token,
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Credentials': 'true'
  }
  postTeam = async (user_id, params, token) => {
    const justFilledFields = FilterParams(params)
    return fetch(`${baseUrl}/users/${user_id}/teams`, {
      "method": "POST",
      "headers": headers,
      "body": JSON.stringify({ "team": { ...justFilledFields } })
    })
      .then(
        response => this.resAlert(response)
      )
      .catch(err => {
        console.error(err);
      })
  }


  getTeams = async (user_id, token) => {
    return fetch(`${baseUrl}/users/${user_id}/teams`, {
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

  getTeam = async (user_id, team_id, token) => {
    return fetch(`${baseUrl}/users/${user_id}teams/${team_id}`, {
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

  updateTeam = async (user_id, team_id, params, token) => {
    const justFilledFields = FilterParams(params)
    return fetch(`${baseUrl}/users/${user_id}/teams/${team_id}`, {
      "method": "PATCH",
      "headers": headers,
      "body": JSON.stringify({ "team": { ...justFilledFields } })
    })
      .then(
        response => this.resAlert(response)
      )
      .catch(err => {
        console.error(err);
      })
  }

  deleteTeam = async (user_id, team_id, token) => {
    return fetch(`${baseUrl}/users/${user_id}/teams/${team_id}`, {
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
const usersTeamService = new UsersTeamService()
export default usersTeamService