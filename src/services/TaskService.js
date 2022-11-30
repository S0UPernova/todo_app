import { baseUrl, origin } from "../utilities/Statics"
import FilterParams from "../utilities/FilterParams"
import ResAlertHelper from "../utilities/ResAlertHelper"
class TaskService extends ResAlertHelper {
  constructor() {
    this.headers = {
    "Content-Type": "application/json",
    "Authorization": token,
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Credentials': 'true'
  }
  }
  postTask = async (team_id, project_id, params, token) => {
    const justFilledFields = FilterParams(params)
    return fetch(`${baseUrl}/teams/${team_id}/projects/${project_id}/tasks`, {
      "method": "POST",
      "headers": this.headers,
      "body": JSON.stringify({ "task": { ...justFilledFields } })
    })
      .then(
        response => this.resAlert(response)
      )
      .catch(err => {
        console.error(err);
      })
  }

  getTasks = async (team_id, project_id, token) => {
    return fetch(`${baseUrl}/teams/${team_id}/projects/${project_id}/tasks`, {
      "method": "GET",
      "headers": this.headers
    })
      .then(
        response => this.resAlert(response)
      )
      .catch(err => {
        console.error(err);
      })
  }

  getTask = async (team_id, project_id, task_id, token) => {
    return fetch(`${baseUrl}/teams/${team_id}/projects/${project_id}/tasks/${task_id}`, {
      "method": "GET",
      "headers": this.headers
    })
      .then(
        response => this.resAlert(response)
      )
      .catch(err => {
        console.error(err);
      })
  }

  updateTask = async (team_id, project_id, task_id, params, token) => {
    const justFilledFields = FilterParams(params)
    return fetch(`${baseUrl}/teams/${team_id}/projects/${project_id}/tasks/${task_id}`, {
      "method": "PATCH",
      "headers": this.headers,
      "body": JSON.stringify({ "task": { ...justFilledFields } })
    })
      .then(
        response => this.resAlert(response)
      )
      .catch(err => {
        console.error(err);
      })
  }

  deleteTask = async (team_id, project_id, task_id, token) => {
    return fetch(`${baseUrl}/teams/${team_id}/projects/${project_id}/tasks/${task_id}`, {
      "method": "DELETE",
      "headers": this.headers
    })
      .catch(err => {
        console.error(err);
      })
  }
}

const taskService = new TaskService()
export default taskService