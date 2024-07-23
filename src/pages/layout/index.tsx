import Nav from '@/components/Nav'
import { Toaster } from '@/components/ui/toaster'
import { Outlet } from 'react-router'

function Layout() {
  return (
    <div>
        <Nav />
       <div className="container">
       <Outlet />
       <Toaster />
       </div>
    </div>
  )
}

export default Layout