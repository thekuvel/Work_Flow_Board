import { Link } from 'react-router-dom'

function SideBar() {
  return (
    <div>
      <ul className="grid gap-5">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/setting">Setting</Link>
        </li>
      </ul>
    </div>
  )
}

export default SideBar
