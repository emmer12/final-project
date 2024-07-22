import { Button } from "@/components/ui/button"
// import { useCreateRecord, useRecords } from "@/hooks/use-contract"
// import { useAccount, useConnect, useDisconnect } from "wagmi"


function Home() {

  // const { address } = useAccount()
  // const { connectors, connect } = useConnect()
  // const { disconnect } = useDisconnect()
  //  const {records} =  useRecords()
  //  const {data} = useRecordsCount()
  //  const {submit,isPending} = useCreateRecord();


  return (
    <>
    <div className="text-center m-auto max-w-[620px] w-full mt-[100px]">
        <h1 className="text-[42px] font-extrabold tracking-tight">Manage Patient <br /> Information <span className="text-muted-foreground">Efficiently</span></h1>
        <p>Our healthcare admin portal provides a seamless way to store, update, and view patient records securely.</p>
        <br /><br />
        <div className="flex gap-2 justify-center align-center" >
          <Button variant={'default'} size={'lg'}>Get Started</Button>
          <Button variant={'outline'} size={'lg'}>View Records</Button>
        </div>
    </div>
      <div className="p-3">
     
      {/* <p>{address}</p>
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
      </div> */}

      {/* <Button variant={"destructive"} onClick={()=>disconnect()}>
          Disconnect
      </Button>


      <Button disabled={isPending} variant={"secondary"} onClick={()=>submit()}>
          Add Record
      </Button> */}
      </div>
    </>
  )
}

export default Home
