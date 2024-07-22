import { Button } from "@/components/ui/button"
import { useCreateRecord, useRecords } from "@/hooks/use-contract"
import { useAccount, useConnect, useDisconnect } from "wagmi"


function Home() {

  const { address } = useAccount()
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()
   const {records} =  useRecords()
  //  const {data} = useRecordsCount()
   const {submit} = useCreateRecord();

   console.log(records)

  return (
    <>
      <div className="p-3">
     
      <p>{address}</p>
      {
        connectors.map((connector) => (
          <Button key={connector.uid} onClick={() => connect({ connector })}>
            {connector.name}
          </Button>
        ))
      }

      <div>
          {
            // isLoading ? <>Loading..</> :

            <div>
              Data Loaded

            </div>
          }
      </div>

      <Button variant={"destructive"} onClick={()=>disconnect()}>
          Disconnect
      </Button>


      <Button variant={"secondary"} onClick={()=>submit()}>
          Add Record
      </Button>
      </div>
    </>
  )
}

export default Home
