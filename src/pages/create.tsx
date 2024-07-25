import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { useCreateRecord, useRecords } from "@/hooks/use-contract"
import { useNavigate, useParams } from "react-router"
import { useEffect } from "react"
import { useAccount, useConnect } from "wagmi"
import { injected } from "wagmi/connectors"
// import { useNavigate } from "react-router"

export const FormSchema = z.object({
  patient_name: z.string().min(2, {
    message: "Patient name is required",
  }),
  diagnosis: z.string().min(2, {
    message: "Diagnosis is required",
  }),
  dob: z.string().min(2, {
    message: "Dob is required",
  }),
  gender: z.string().min(2, {
    message: "Gender is required",
  }),
})

export const  Create = () =>    {
    const {create,update,isPending,isSuccess,isError } = useCreateRecord();
    const {getRecordByid}= useRecords();
    const params = useParams();
   const navigate = useNavigate();
   const { address } = useAccount()
    const {connect} = useConnect();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      patient_name: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {

   try{
    if(params.id){
     await update(data,params.id)
     
    }else{
      await create(data);
    }

   
   }catch(e){
      console.log('Error')
   }
  }

  if(isSuccess){
    toast({
      title: "Record Added",
      description:"You have successfully added a record"});

      if(!params.id){
        navigate('/')
      }

      // form.reset();
  }

  if(isError){
    toast({
      variant:'destructive',
      title: "Uh oh! Something went wrong", 
      description:'There was a problem with your request'})
  }

 

  const getRecord =async ()=>{
   const record = await getRecordByid(params.id!);
   form.reset({
    patient_name:record[1],
    diagnosis:record[2],
    dob:record[3],
    gender:record[4]
   })
  }

  useEffect(()=>{
    if(params.id){
      getRecord();
    }
  },[params.id])


  

  return (
      <section className="sm:max-w-[512px] w-full bg-white rounded-[18px] m-auto mt-[100px] p-6">
        <header className="mb-4">
            <h1 className="text-2xl font-semibold">{params.id ? "Update Record " : "Create Record "}</h1>
            <p className="font-normal text-muted-foreground">{params.id ? "Edit " : "Add "} users health records</p>
        </header>
        
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="patient_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient Name</FormLabel>
              <FormControl>
                <Input disabled={params.id ? true : false} placeholder="Patient Name.." {...field} />
              </FormControl>
              <FormDescription>
                This is your patient fullname.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

     <FormField
          control={form.control}
          name="diagnosis"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diagnosis</FormLabel>
              <FormControl>
                <Input placeholder="Diagnosis.." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient DOB</FormLabel>
              <FormControl>
                <Input className="w-full" type="date" placeholder="" {...field} />
              </FormControl>

              <FormDescription>
                This is your patient date of birth.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            
              <FormMessage />
            </FormItem>
          )}
        />
       {
        address ? <div className="text-center">
        {
           params.id ? <Button disabled={isPending} type="submit" size={'lg'}  >Update</Button> : <Button disabled={isPending} type="submit" size={'lg'}  >Create</Button>
         }
        </div>
        :
        <div className="text-center">
          <Button  onClick={() => connect({ connector: injected() })}>Connect wallet</Button>
       </div>
       }
       
      </form>
    </Form>

    
      </section>
  )
}
