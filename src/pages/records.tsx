import { EditIcon } from "@/components/icons"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useRecords } from "@/hooks/use-contract"
import { Link } from "react-router-dom"

export function Records() {

  const {records} =  useRecords()

  
  return (
     <div className="mt-[50px]">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Patients  Records </h1>
      </header>
      <Table>
      <TableCaption>A list of patients records.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">S/N</TableHead>
          <TableHead>Patient Name</TableHead>
          <TableHead>Diagnosis</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>DOB</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.map((record,i) => (
          <TableRow key={record.recordId}>
            <TableCell className="font-medium">{i + 1}</TableCell>
            <TableCell className="font-medium">{record.patientName}</TableCell>
            <TableCell>{record.diagnosis}</TableCell>
            <TableCell>{record.patientGender}</TableCell>
            <TableCell>{record.patientDOB}</TableCell>
            <TableCell className="text-right">
              <Link className="flex justify-end" to={"/records/edit/asdfd"}>
                <EditIcon />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Number</TableCell>
          <TableCell className="text-right">{records.length} Patients</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
     </div>
  )
}
