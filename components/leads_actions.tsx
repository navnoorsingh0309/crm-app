"use client";
import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import InfoIcon from "@mui/icons-material/Info";

const LeadsActionsDialog = (id: any) => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default"><InfoIcon /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Lead Actions</DialogTitle>
          <DialogDescription>
            Contact with your lead to dicuss over your business :)
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LeadsActionsDialog;