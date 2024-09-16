import { EditIcon, PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRecords } from "@/hooks/use-contract";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

export function Records() {
  const { address } = useAccount();
  const { connect } = useConnect();

  const { records } = useRecords();
  const [filteredRecord, setFilteredRecord] = useState(records || []);
  const [searchTerm, setSearchTerm] = useState("");

  const filterItems = (term: string) => {
    return records.filter((item) => {
      console.log(item);
      const records =
        item?.recordId.toLowerCase().includes(term.toLowerCase()) ||
        item?.patientName.toLowerCase().includes(term.toLowerCase());

      return records;
    });
  };

  useEffect(() => {
    if (filteredRecord.length == 0) {
      setFilteredRecord(records);
    }
  }, [records]);

  // Update the filtered items whenever the search term changes
  useEffect(() => {
    setFilteredRecord(filterItems(searchTerm));
  }, [searchTerm]);

  return (
    <div className="mt-[50px]">
      <header className="mb-4 flex justify-between">
        <h1 className="text-2xl font-semibold">Patients Records </h1>

        {address && (
          <div className="flex gap-3 items-center">
            <div className="flex">
              <Input
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                className="h-[45px] min-w-full w-[300px]"
                placeholder="Search patient"
                type="search"
              />
            </div>
            <Link to={"/records/create"}>
              {" "}
              <Button className="text-sm font-semibold  flex gap-2 items-center">
                Add Record <PlusIcon />
              </Button>
            </Link>
          </div>
        )}
      </header>

      {address ? (
        <Table>
          <TableCaption>A list of patients records.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">S/N</TableHead>
              <TableHead>Record Id</TableHead>
              <TableHead>Patient Name</TableHead>
              <TableHead>Diagnosis</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>DOB</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Views count</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecord.reverse().map((record, i) => (
              <TableRow key={record.recordId}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell className="font-medium">{record.recordId}</TableCell>
                <TableCell className="font-medium">
                  {record.patientName}
                </TableCell>
                <TableCell>{record.diagnosis}</TableCell>
                <TableCell>{record.patientGender}</TableCell>
                <TableCell>{record.patientDOB}</TableCell>
                <TableCell>{record.createdBy}</TableCell>
                <TableCell>{record.viewsCount}</TableCell>
                <TableCell>
                  {moment(record.createdAt).format("DD MMM, YYYY, hh:mm A")}
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    className="flex justify-end"
                    to={`/records/edit/${record.recordId}`}
                  >
                    <EditIcon />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total Number</TableCell>
              <TableCell className="text-right">
                {records.length} Patients
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <Button onClick={() => connect({ connector: injected() })}>
          connect
        </Button>
      )}
    </div>
  );
}
