import { useReadContract, useWriteContract } from "wagmi"
import  projectAbi from "../abis/projectAbi.json" 
import { CONTRACT_ADDRESS } from "@/constants";
import { useEffect, useState } from "react";
import { readContract } from "wagmi/actions";
import { config } from "@/lib/config";
import { FormSchema } from "@/pages/create";
import { z } from "zod";
// import { toast } from "@/components/ui/use-toast";


export interface RecordI{
  recordId:string;
  patientName: string;
  diagnosis:string;
  patientDOB:string;
  patientGender:string;
  createdBy?:string;
  createdAt?:number;
  viewsCount?:number;
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
      
       const records = await  getRecordByid(id);
        setRecords((prev:RecordI[])=>{
          return [...prev,
            {
              recordId:records[0],
              patientName:records[1],
              diagnosis:records[2],
              patientDOB:records[3],
              patientGender:records[4],
              createdBy:records[5],
              viewsCount:parseInt(records[8]),
              createdAt:parseInt(records[6].toString()) * 1000,
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


   const getRecordByid = async (id:string)=>{
    console.log("Got Here")
    const record = await readContract(config,{
      abi: projectAbi,
      functionName: 'records',
      address: CONTRACT_ADDRESS,
      args:[id]
    }) as ResI; 
    
    return record
   }

  useEffect(()=>{
    getRecords()
  },[])
  

  return {
    records,
    loading,
    getRecordByid
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
      isError,
      
    }
}

export const useCreateRecord = ()=>{
  const { data: hash, isPending,isSuccess,isError,writeContract } = useWriteContract()


  const create = async  (data:z.infer<typeof FormSchema>)=>{
     try {
    await  writeContract({
        abi: projectAbi,
        functionName: 'createRecord',
        address: CONTRACT_ADDRESS,
        args: [data.patient_name,data.diagnosis,data.dob,data.gender],
      })
      
     } catch (error) {
      console.log(error)
     }
  }
     const update = async  (data:z.infer<typeof FormSchema>,id?:string)=>{
      try {
       await  writeContract({
         abi: projectAbi,
         functionName: 'updateRecord',
         address: CONTRACT_ADDRESS,
         args: [id,data.diagnosis,data.dob,data.gender],
       });
    
      } catch (error) {
       console.log(error)
      }
    }
 


    return {
      create,update,
      hash,
      isPending,
      isSuccess,isError 
    }
}