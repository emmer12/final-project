import { Link } from "react-router-dom"
import { useAccount, useConnect } from "wagmi"
import { Button } from "./ui/button"
import { injected } from "wagmi/connectors"
import Blockies from 'react-blockies';

function Nav() {
    const { address } = useAccount()
    const {connect} = useConnect()


  return (
    <header className="h-[70px] bg-white ">
        <div className="container h-full ">
          <div className="flex  items-center justify-between h-full">
          <Link to={'/'}>
            <h4 className="text-3xl font-bold">Project Dia</h4>
          </Link>
       {
        address ?<nav>
        <ul className="flex items-center">
             {/* <li><Link className="text-sm font-semibold px-4" to={'records/'} >Records</Link></li> */}
             {/* <Link  to={'records/create'} >  <Button className="text-sm font-semibold  flex gap-2 items-center">Add Record <PlusIcon /></Button></Link> */}

             <div className="bg-red-200 rounded-full overflow-hidden ml-4">
             <Blockies
            seed={address} 
            size={12}
            scale={3} 
            bgColor= '#e0f7fa' // Background color
            color='#0277bd' // Primary color
            spotColor='#4fc3f7' // Secondary color
            className="identicon"
          />
             </div>
        </ul>
    </nav>
    : <Button  onClick={() => connect({ connector: injected() })}>connect</Button>
       }
          </div>
        </div>
    </header>
  )
}

export default Nav