import { baseUrl } from "../utilities/Statics";


class TeamService {

  getTeams = async (token) => {
    return fetch(`${baseUrl}/teams`, {
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

  getTeam = async (team_id, token) => {
    return fetch(`${baseUrl}/teams/${team_id}`, {
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

  updateTeam = async (team_id, params, token) => {
    return fetch(`${baseUrl}/teams/${team_id}`, {
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

  deleteTeam = async (team_id, token) => {
    return fetch(`${baseUrl}/teams/${team_id}`, {
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
const teamService = new TeamService()
export default teamService