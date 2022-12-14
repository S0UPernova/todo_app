import { baseUrl, origin } from "../utilities/Statics";
import FilterParams from "../utilities/FilterParams"
import ResAlertHelper from "../utilities/ResAlertHelper"
class TeamService extends ResAlertHelper {
  constructor(props) {
    super(props)
    this.headers = {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': 'true'
    }
  }
  postTeam = async (team_id, params, token) => {
    const justFilledFields = FilterParams(params)
    return fetch(`${baseUrl}/teams/${team_id}`, {
      "method": "POST",
      "headers": { ...this.headers, "Authorization": token, },
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
      "headers": { ...this.headers, "Authorization": token, }
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
      "headers": { ...this.headers, "Authorization": token, }
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
      "headers": { ...this.headers, "Authorization": token, }
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
      "headers": { ...this.headers, "Authorization": token, },
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
const teamService = new TeamService()
export default teamService