import { useReadContract, useWriteContract } from "wagmi"
import  projectAbi from "../abis/projectAbi.json" 
import { CONTRACT_ADDRESS } from "@/constants";
import { useEffect, useState } from "react";
import { readContract } from "wagmi/actions";
import { config } from "@/lib/config";


interface RecordI{
  recordId:string;
  patientName: string;
  diagnosis:string;
  patientDOB:string;
  patientGender:string;
  createdBy:string;
  createdAt:number
}

interface ResI {
  [key: number]: string;
}

export const useRecords = ()=>{
  const [records,setRecords]  = useState<RecordI[]>([]) 
  const [loading, setLoading] = useState(false);

  const getRecords =async ()=>{
    setLoading(true)
     try {
      setRecords([])
      const ids:string[] = await readContract(config,{
        abi: projectAbi,
        functionName: 'getAllRecordIds',
        address: CONTRACT_ADDRESS
      }) as string[];
      
   
  
      ids.forEach(async (id:string) => {
        const records = await readContract(config,{
          abi: projectAbi,
          functionName: 'records',
          address: CONTRACT_ADDRESS,
          args:[id]
        }) as ResI;   
  
        setRecords((prev:RecordI[])=>{
          return [...prev,
            {
              recordId:records[0],
              patientName:records[1],
              diagnosis:records[2],
              patientDOB:records[3],
              patientGender:records[4],
              createdBy:records[5],
              createdAt:records[6] as unknown as number,
            }
          ]
        })
      });
       setLoading(false)
     } catch (error) {
       setLoading(false)
      console.log(error);
     }
   }

  useEffect(()=>{
    getRecords()
  },[])
  

 
  return {
    records,
    loading
  }

 
}

export const useRecordsCount = ()=>{

  const { data,isLoading,
    isError} = useReadContract({
    abi: projectAbi,
    functionName: 'getAllRecordIds',
    address: CONTRACT_ADDRESS
  })
    
    console.log(data)
    return {
      data,
      isLoading,
      isError
    }
}

export const useCreateRecord = ()=>{
  const { data: hash, writeContract,isPending } = useWriteContract()


  const submit = ()=>{
    writeContract({
      abi: projectAbi,
      functionName: 'createRecord',
      address: CONTRACT_ADDRESS,
      args: ["Olarinwaju Tona","Malaria","28/08/1999","Male"],
    })

    alert('Record Addeds');
  }
    return {
      submit,
      hash,
      isPending
    }
}