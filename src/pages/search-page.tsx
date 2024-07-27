import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import moment from 'moment';

import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { RecordI, useCreateRecord, useRecords } from "@/hooks/use-contract"
import { useNavigate } from "react-router"

import { useState } from "react"
// import { useNavigate } from "react-router"

export const FormSchema = z.object({
  query: z.string(),
})

export const  SearchPage = () =>    {
    const {isPending,isError } = useCreateRecord();
    const {getRecordByid}= useRecords();
   const navigate = useNavigate();
   const [record,setRecord] = useState<RecordI>()
   const [error,setError] = useState('')
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      query: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
   try{
    setError('')
    setRecord(undefined)
    navigate({
        pathname: '/records/search',
        search: `?s=${data.query}`,
      });
   const record = await getRecordByid(data.query);

        if(record[0] == "0x00000000000000"){
            setError('Record not found')
        }else{
            setRecord({
                recordId:record[0],
                patientName:record[1],
                diagnosis:record[2],
                patientDOB:record[3],
                patientGender:record[4],
                createdAt: parseInt(record[6].toString()) * 1000,
            })
        }
    }catch(e){
    console.log({e})
    setError('Invalid Record id')
    }

  }


  if(isError){
    toast({
      variant:'destructive',
      title: "Uh oh! Something went wrong", 
      description:'There was a problem with your request'})
  }

 
  


  return (
      <section className="sm:max-w-[512px] w-full bg-white rounded-[18px] m-auto mt-[100px] p-6">
        <header className="mb-4">
            <h1 className="text-2xl font-semibold">{ "Search Record "}</h1>
        </header>
        
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex items-center gap-2">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input  className="h-[45px]"  placeholder="Search patient" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<Button disabled={isPending} type="submit" size={'lg'}  >Search</Button>

      </form>
    </Form>

   {
    record ?
    <div className="mt-4">
        <div className="flex justify-between my-3">Record Id :<span className="font-semibold"> {record.recordId}</span></div>
        <div className="flex justify-between my-3"> Name :<span className="font-semibold"> {record.patientName}</span></div>
        <div className="flex justify-between my-3"> Date of Birth :<span className="font-semibold"> {record.patientDOB}</span></div>
        <div className="flex justify-between my-3">Gendar :<span className="font-semibold"> {record.patientGender}</span></div>
        <div className="flex justify-between my-3">Diagnosis :<span className="font-semibold"> {record.diagnosis}</span></div>
        <div className="flex justify-between my-3">Date Created :<span className="font-semibold"> {moment(record.createdAt).format('DD MMM, YYYY, hh:mm A')} </span></div>
    </div> : 
    <div>
        
    </div>
   }
   {
    error.length > 1 && <div className="p-3 bg-red-200 rounded-sm mt-2">{error}</div>
   }
   

    
      </section>
  )
}
