import leads_methods from "@/appwrite/leads_methods";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

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
  return (
    <>
      {Object.keys(jsonLeads).map((name) => (
        <TableRow>
          <TableCell>{name}</TableCell>
          <TableCell>{jsonLeads[name].Company}</TableCell>
          <TableCell>{jsonLeads[name].Title}</TableCell>
          <TableCell>{jsonLeads[name].Email}</TableCell>
          <TableCell>{jsonLeads[name].Phone_Number}</TableCell>
          <TableCell>{jsonLeads[name].Address}</TableCell>
        </TableRow>
      ))}
    </>
  );
};
const createDynamicComponent = (component: React.ComponentType<any>, props: any) => {
  return React.createElement(component, props);
};

export async function Leads_Table(id: any) {
  const jsonLeads = await leads_methods.getLeads(id["id"]);
  const dynamicTable = createDynamicComponent(dynamicComponent, jsonLeads);
  return (
    <Table>
      <TableCaption>Your Company Leads</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Address</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
          {dynamicTable}
      </TableBody>
    </Table>
  );
}
