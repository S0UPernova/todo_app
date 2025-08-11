
import { BsGearWide } from "react-icons/bs"
import { GrCheckboxSelected, GrCheckbox } from "react-icons/gr"

import styles from "../home.module.scss"

export default function Task(props) {
  const { task, handleClick } = props
  const due_at = task?.duedate && new Date(task.duedate)
  const dueAt = task?.duedate && new Intl.DateTimeFormat('en-US', {
    dateStyle: `${task.completed ? 'short' : 'full'}`,
    timeStyle: "short",
    timeZone: "UTC"
  })
    .format(due_at);
  return (
    <li className="border blur">
      {
        task.completed !== null | undefined &&
        <button
        title={task.completed === true ? "Mark not completed" : "Mark completed"}
          className={`${styles.checkbox} icon-button`}
          onClick={handleClick}
          value={task.id}
          data-completed={!task.completed}
          name="checkbox">{
            task.completed === true
              ? <i className="icon"><GrCheckboxSelected /></i>
              : <i className="icon"><GrCheckbox /></i>}
        </button>
      }
      {task.name && <>
        <h4>
          <button
            title="Edit task"
            name="editButton"
            onClick={handleClick}
            className="icon-button mr-1"
            value={JSON.stringify(task)} // Passing an object directly didn't seem to work
          ><i className="icon"><BsGearWide /></i>
          </button> {task.name}
        </h4>
      </>}
      {
        task.description &&
        <p>{task.description}</p>
      }
      {
        task.duedate &&
        <h5>Due by: {
          dueAt ? dueAt : ""}
        </h5>
      }
    </li>
  )
}