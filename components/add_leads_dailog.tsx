"use client";
import React, { useState } from "react";
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
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

const AddLeadsDailog = (id: any) => {
  const [name, setName] = useState("name");
  const [company, setCompany] = useState("c");
  const [title, setTitle] = useState("t");
  const [email, setEmail] = useState("e");
  const [phone, setPhone] = useState("p");
  const [address, setAddress] = useState("a");
  const user_id = id["id"];
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/writeLead", {
      method: "POST",
      body: JSON.stringify({
        id: user_id,
        name,
        company,
        title,
        email,
        phone,
        address,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (res.status === 200) {
      toast({
        title: "Lead Added successfully",
        action: <ToastAction altText="Ok">Ok</ToastAction>,
      });
      setOpen(false);
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem while added lead",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-[10px] md:text-[16px]">Add Lead</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Lead</DialogTitle>
          <DialogDescription>
            Add potential leads to your company :)
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Name"
                className="col-span-3"
                required
                onChange={(e) => {
                  setName((e.target as HTMLInputElement).value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-right">
                Company
              </Label>
              <Input
                id="company"
                name="company"
                placeholder="Company"
                className="col-span-3"
                required
                onChange={(e) => {
                  setCompany((e.target as HTMLInputElement).value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Title"
                className="col-span-3"
                required
                onChange={(e) => {
                  setTitle((e.target as HTMLInputElement).value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                className="col-span-3"
                required
                onChange={(e) => {
                  setEmail((e.target as HTMLInputElement).value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                placeholder="Phone Number"
                className="col-span-3"
                required
                onChange={(e) => {
                  setPhone((e.target as HTMLInputElement).value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                name="address"
                placeholder="Address"
                className="col-span-3"
                required
                onChange={(e) => {
                  setAddress((e.target as HTMLInputElement).value);
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Lead</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLeadsDailog;
