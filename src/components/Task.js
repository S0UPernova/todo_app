
import { BsGearWide } from "react-icons/bs"
import { GrCheckboxSelected, GrCheckbox } from "react-icons/gr"
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
    < li>
      {
        task.completed !== null | undefined &&
        <button
          className="checkbox"
          onClick={handleClick}
          value={task.id}
          data-completed={!task.completed}
          name="checkbox">{
            task.completed === true
              ? <i style={{ pointerEvents: "none" }}><GrCheckboxSelected /></i>
              : <i style={{ pointerEvents: "none" }}><GrCheckbox /></i>}
        </button>
      }
      {task.name && <>
        <h4>
          <button
            name="editButton"
            onClick={handleClick}
            value={JSON.stringify(task)} // Passing an object directly didn't seem to work
          ><i><BsGearWide /></i>
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