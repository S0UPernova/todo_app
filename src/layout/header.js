import Nav from "./nav"
export default function Header(props) {
  return (
    <header>
      <h4>Header</h4>
      {props.user && <p>{props.user.handle}</p>}
      <Nav user={props.user} token={props.token} todoURL={props.todoURL}/>
    </header>
  )
}