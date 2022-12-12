export default function HomeNotLoggedIn() {
  return (
    <div className="main container d-flex flex-d-col align-items-center">

      <h1>Welcome to my todo app</h1>
      <article>
        <h3>Here is a list of some of the things you can do here</h3>
        <ol className='d-flex flex-d-col gap-1'>
          <li>
              Create a user
          </li>
          <li>
            Create a team
          </li>
          <li>
            Request to join an existing team
          </li>
          <li>
            Accept or reject user requests to join your team
          </li>
          <li>
            Accept or reject requests to join someones team
          </li>
          <li>
            Add project or get started on an existing one
          </li>
          <li>
            Add tasks to a project
          </li>
          <li>
            Set duedates for the tasks
          </li>
          <li>
            Complete Tasks
          </li>
        </ol>
      </article>
    </div>
  )
}