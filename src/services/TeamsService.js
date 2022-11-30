import { baseUrl } from "../utilities/Statics";
import FilterParams from "../utilities/FilterParams"
import ResAlertHelper from "../utilities/ResAlertHelper"
class TeamService extends ResAlertHelper {
  headers = {
    "Content-Type": "application/json",
    "Authorization": token,
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Credentials': 'true'
  }
  postTeam = async (team_id, params, token) => {
    const justFilledFields = FilterParams(params)
    return fetch(`${baseUrl}/teams/${team_id}`, {
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
  
  getTeams = async (token) => {
    return fetch(`${baseUrl}/teams`, {
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

  discoverTeams = async (token) => {
    return fetch(`${baseUrl}/teams/discover`, {
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

  getTeam = async (team_id, token) => {
    return fetch(`${baseUrl}/teams/${team_id}`, {
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

  updateTeam = async (team_id, params, token) => {
    const justFilledFields = FilterParams(params)
    return fetch(`${baseUrl}/teams/${team_id}`, {
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

  deleteTeam = async (team_id, token) => {
    return fetch(`${baseUrl}/teams/${team_id}`, {
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
const teamService = new TeamService()
export default teamService