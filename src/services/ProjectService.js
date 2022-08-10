import { baseUrl } from "../utilities/Statics"

class ProjectService {

  getProjects = async (team_id, token) => {
    return fetch(`${baseUrl}/teams/${team_id}/projects`, {
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

  getProject = async (team_id, project_id, token) => {
    return fetch(`${baseUrl}/teams/${team_id}/projects/${project_id}`, {
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

  updateProject = async (team_id, project_id, params, token) => {
    return fetch(`${baseUrl}/teams/${team_id}/projects/${project_id}`, {
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

  deleteProject = async (team_id, project_id, token) => {
    return fetch(`${baseUrl}/teams/${team_id}/projects/${project_id}`, {
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

const projectService = new ProjectService()
export default projectService