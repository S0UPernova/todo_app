import TeamDropdowns from "../components/team_dropdowns"
export default function Home(props) {
  return (
    <>
      <h4>home</h4>
      <TeamDropdowns user={props.user} token={props.token}/>
    </>
  )
}

