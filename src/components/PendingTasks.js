import { useState } from "react"
import taskService from "../services/TaskService"

export default function PendingTasks(props) {
  const { tasks, selectedTeam, selectedProject, handleClick } = props



  return (
    <div className="pending">
      {selectedProject && <button name="addButton" className="addButton btn primary hover" onClick={handleClick}>Add</button>}
      <div>
        <h3>Pending completion</h3>
        {selectedTeam && selectedProject && <ul>
          {tasks && tasks.map((task, i) => {

            const due_at = task.duedate && new Date(task.duedate)
            const dueAt = task.duedate && new Intl.DateTimeFormat('en-US').format(due_at);

            return (
              task && task.completed !== true &&

              < li key={"task index number " + i} >
                {task.name && <h4 key={"name" + i}>{task.name}</h4>}
                {
                  task.description &&
                  <p key={"decription " + i}>{task.description}</p>
                }
                {
                  task.duedate !== null &&
                  <h5 key={"duedate " + i}>Due by: {dueAt} <i>m/d/y</i></h5>
                }
                {
                  task.completed !== null &&
                  <h5 key={"completed " + i}>Completed: {
                    task.completed === true ? "true" : "false"}
                  </h5>
                }
                {
                  task.id !== null &&
                  <p key={"id " + i}>id: {task.id}
                  </p>
                }
                <button
                  name="editButton"
                  className="btn secondary hover"
                  onClick={handleClick}
                  value={JSON.stringify(task)} // Passing an object directly didn't seem to work
                >Edit me!</button>
              </li>
            )
          })}
        </ul>}

      </div>
    </div >
  )
}