import { Link } from 'react-router-dom'
export default function TeamsIndex(props) {
    const teams = props.index && props.index.map((indexItem, i) => {
      return (
        <div key={`div ${i}`}>
          {indexItem.name && <Link to={`${indexItem.id}`}><h3 key={`name ${i}`}>{indexItem.name}</h3></Link>}
          {indexItem.description && <p key={`description ${i}`}>{indexItem.description}</p>}
        </div>
      )
    })
    return teams
}