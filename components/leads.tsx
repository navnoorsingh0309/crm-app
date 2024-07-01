"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastAction } from "./ui/toast";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

interface dynamicRowsProps {
  [Name: string]: {
    Company: string;
    Title: string;
    Email: string;
    Phone_Number: string;
    Address: string;
  };
}

const dynamicComponent: React.FC<dynamicRowsProps> = (jsonLeads) => {
  const [docTodel, setDecToDel] = useState("initial");
  const [deleting, setDelete] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    fetch(`/api/deleteLead?id=${user_id}&doc_id=${docTodel}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === "Done") {
          toast({
            title: "Lead Deleted successfully",
            action: <ToastAction altText="Ok">Ok</ToastAction>,
          });
        }
      })
  }, [deleting]);
  return (
    <>
      {Object.keys(jsonLeads).map((name) => (
        <TableRow>
          <TableCell>{name}</TableCell>
          <TableCell>{jsonLeads[name].Id}</TableCell>
          <TableCell>{jsonLeads[name].Company}</TableCell>
          <TableCell>{jsonLeads[name].Title}</TableCell>
          <TableCell>{jsonLeads[name].Email}</TableCell>
          <TableCell>{jsonLeads[name].Phone_Number}</TableCell>
          <TableCell>{jsonLeads[name].Address}</TableCell>
          <TableCell>
            <Button
              variant="destructive"
              onClick={() => {
                setDecToDel(jsonLeads[name].Id);
                setDelete(true);
              }}
            >
              <DeleteIcon />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
const createDynamicComponent = (
  component: React.ComponentType<any>,
  props: any
) => {
  return React.createElement(component, props);
};

let user_id: string;

export default function Leads_Table(id: any) {
  user_id = id["id"];
  const [jsonLeads, setjsonLeads] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`/api/getLeads?id=${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        setjsonLeads(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!jsonLeads) return <p>No Leads</p>;
  const dynamicTable = createDynamicComponent(dynamicComponent, jsonLeads);

  return (
    <Table>
      <TableCaption>Your Company Leads</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Lead Id</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Address</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{dynamicTable}</TableBody>
    </Table>
  );
}
