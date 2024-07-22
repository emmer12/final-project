import { Link } from "react-router-dom"
import { useAccount, useConnect } from "wagmi"
import { Button } from "./ui/button"
import { injected } from "wagmi/connectors"
import { PlusIcon } from "lucide-react"

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
             <li><Link className="text-sm font-semibold px-4" to={'records/'} >Records</Link></li>
             <Button ><Link className="text-sm font-semibold  flex gap-2 items-center" to={'records/create'} > Add Record <PlusIcon /></Link></Button>
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