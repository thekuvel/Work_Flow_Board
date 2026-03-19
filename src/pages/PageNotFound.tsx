import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div className="min-h-dvh grid justify-center items-center ">
      <div className="text-center">
        <p>Page Not found</p>
        <Link to="/" className="text-blue-500">
          Home
        </Link>
      </div>
    </div>
  )
}

export default PageNotFound
