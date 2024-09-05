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
import LeadsActionsDialog from "./leads_actions";

interface dynamicRowsProps {
  [Name: string]: {
    Id: string;
    Company: string;
    Title: string;
    Email: string;
    Phone_Number: string;
    Address: string;
  };
}

let user_id: string;

export default function Leads_Table(id: any) {
  // Getting user Id
  user_id = id["id"];
  // Leads Data state
  const [jsonLeads, setjsonLeads] = useState(null);
  // If still loading
  const [isLoading, setLoading] = useState(true);

  // Getting leads api routing
  useEffect(() => {
    fetch(`/api/getLeads?id=${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        setjsonLeads(data);
      });
  }, []);

  // Dynamic Table component
  const DynamicComponent: React.FC<dynamicRowsProps> = (jsonLeads) => {
    const [docTodel, setDecToDel] = useState("initial");
    const [deleting, setDelete] = useState(false);
    const [editing, setEditing] = useState(false);
    const { toast } = useToast();

    // For deleting a lead
    useEffect(() => {
      if (docTodel == "initial")
        return;
      fetch(`/api/deleteLead?id=${user_id}&doc_id=${docTodel}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data !== "Error") {
            setjsonLeads(data);
            toast({
              title: "Lead Deleted successfully",
              action: <ToastAction altText="Ok">Ok</ToastAction>,
            });
          } else {
            toast({
              variant: "destructive",
              title: `${data}`,
              description: "There was a problem while deleteing the lead",
            });
          }
        });
    }, [deleting]);

    return (
      <>
        {jsonLeads ? (
          Object.keys(jsonLeads).map((name, idx) => (
            <TableRow key={idx}>
              <TableCell>{name}</TableCell>
              <TableCell>{jsonLeads[name].Company}</TableCell>
              <TableCell  className="hidden lg:table-cell">{jsonLeads[name].Title}</TableCell>
              <TableCell  className="hidden lg:table-cell">{jsonLeads[name].Email}</TableCell>
              <TableCell  className="hidden lg:table-cell">{jsonLeads[name].Phone_Number}</TableCell>
              <TableCell  className="hidden lg:table-cell">{jsonLeads[name].Address}</TableCell>
              <TableCell>
                <div className="flex flex-row gap-1">
                  <LeadsActionsDialog/>
                  <Button
                  className="h-[24px] md:h-8 px-0 md:px-2 py-2"
                    variant="destructive"
                    onClick={() => {
                      setDecToDel(jsonLeads[name].Id);
                      setDelete(!deleting);
                    }}
                  >
                    <DeleteIcon/>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <> </>
        )}
      </>
    );
  };
  // Creating dynamic Table
  const createDynamicComponent = (
    component: React.ComponentType<any>,
    props: any
  ) => {
    return React.createElement(component, props);
  };

  if (isLoading) return <p>Loading...</p>;
  if (jsonLeads === null) return <p>No Leads</p>;
  const dynamicTable = createDynamicComponent(DynamicComponent, jsonLeads);

  return (
    <Table>
      <TableCaption>Your Company Leads</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Company</TableHead>
          <TableHead className="hidden lg:table-cell">Title</TableHead>
          <TableHead className="hidden lg:table-cell">Email</TableHead>
          <TableHead className="hidden lg:table-cell">Phone Number</TableHead>
          <TableHead className="hidden lg:table-cell">Address</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{dynamicTable}</TableBody>
    </Table>
  );
}
