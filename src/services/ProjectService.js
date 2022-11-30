import { baseUrl, origin } from "../utilities/Statics"
import FilterParams from "../utilities/FilterParams"
import ResAlertHelper from "../utilities/ResAlertHelper"
class ProjectService extends ResAlertHelper {
  headers = {
    "Content-Type": "application/json",
    "Authorization": token,
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Credentials': 'true'
  }
  postProject = async (team_id, params, token) => {

    const justFilledFields = FilterParams(params)
    return fetch(`${baseUrl}/teams/${team_id}/projects`, {
      "method": "POST",
      "headers": headers,
      "body": JSON.stringify({ "project": { ...justFilledFields } })
    })
      .then(
        response => this.resAlert(response)
      )
      .catch(err => {
        console.error(err);
      })
  }
  getProjects = async (team_id, token) => {
    return fetch(`${baseUrl}/teams/${team_id}/projects`, {
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

  getProject = async (team_id, project_id, token) => {
    return fetch(`${baseUrl}/teams/${team_id}/projects/${project_id}`, {
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

  updateProject = async (team_id, project_id, params, token) => {
    const justFilledFields = FilterParams(params)
    return fetch(`${baseUrl}/teams/${team_id}/projects/${project_id}`, {
      "method": "PATCH",
      "headers": headers,
      "body": JSON.stringify({ "project": { ...justFilledFields } })
    })
      .then(
        response => this.resAlert(response)
      )
      .catch(err => {
        console.error(err);
      })
  }

  deleteProject = async (team_id, project_id, token) => {
    return fetch(`${baseUrl}/teams/${team_id}/projects/${project_id}`, {
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

const projectService = new ProjectService()
export default projectService