import Nav from '@/components/Nav'
import { Outlet } from 'react-router'

function Layout() {
  return (
    <div>
        <Nav />
       <div className="container">
       <Outlet />
       </div>
    </div>
  )
}

export default Layout