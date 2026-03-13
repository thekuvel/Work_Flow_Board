import { Outlet } from 'react-router-dom'
import Header from '../components/Header.tsx'
import SideBar from '../components/SideBar.tsx'

function Layout() {
  return (
    <div className="mx-10 grid grid-cols-12">
      <div className="py-5 col-span-12">
        <Header />
      </div>
      <div className="py-5 col-span-2">
        <SideBar />
      </div>
      <div className="py-5 col-span-10">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
