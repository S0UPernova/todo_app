import { baseUrl } from "../utilities/Statics"


class TaskService {

  postTask = async (team_id, project_id, params, token) => {
    return fetch(`${baseUrl}/teams/${team_id}/projects/${project_id}/tasks`, {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": token
      },
      "body": JSON.stringify({
        "task": {
          name: params.name,
          description: params.description ? params.description : null,
          duedate: params.duedate ? params.duedate : null
        }
      })
    })
      .then(
        response => response.json()
      )
      .catch(err => {
        console.error(err);
      })
  }

  getTasks = async (team_id, project_id, token) => {
    return fetch(`${baseUrl}/teams/${team_id}/projects/${project_id}/tasks`, {
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

  getTask = async (team_id, project_id, task_id, token) => {
    return fetch(`${baseUrl}/teams/${team_id}/projects/${project_id}/tasks/${task_id}`, {
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

  updateTask = async (team_id, project_id, task_id, params, token) => {
    return fetch(`${baseUrl}/teams/${team_id}/projects/${project_id}/tasks/${task_id}`, {
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

  deleteTask = async (team_id, project_id, task_id, token) => {
    return fetch(`${baseUrl}/teams/${team_id}/projects/${project_id}/tasks/${task_id}`, {
      "method": "DELETE",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      }
    })
      .catch(err => {
        console.error(err);
      })
  }
}

const taskService = new TaskService()
export default taskService