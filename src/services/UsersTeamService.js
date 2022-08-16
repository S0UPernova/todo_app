import { baseUrl } from "../utilities/Statics";
import FilterParams from "../utilities/FilterParams"

class UsersTeamService {

  postTeam = async (user_id, params, token) => {
    const justFilledFields = FilterParams(params)
    return fetch(`${baseUrl}/users/${user_id}/teams`, {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": token
      },
      "body": JSON.stringify({ "team": { ...justFilledFields } })
    })
      .then(
        response => response.json()
      )
      .catch(err => {
        console.error(err);
      })
  }


  getTeams = async (user_id, token) => {
    return fetch(`${baseUrl}/users/${user_id}/teams`, {
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

  getTeam = async (user_id, team_id, token) => {
    return fetch(`${baseUrl}/users/${user_id}teams/${team_id}`, {
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

  updateTeam = async (user_id, team_id, params, token) => {
    const justFilledFields = FilterParams(params)
    return fetch(`${baseUrl}/users/${user_id}/teams/${team_id}`, {
      "method": "PATCH",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": token
      },
      "body": JSON.stringify({ "team": { ...justFilledFields } })
    })
      .then(
        response => response.json()
      )
      .catch(err => {
        console.error(err);
      })
  }

  deleteTeam = async (user_id, team_id, token) => {
    return fetch(`${baseUrl}/users/${user_id}/teams/${team_id}`, {
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
const usersTeamService = new UsersTeamService()
export default usersTeamService