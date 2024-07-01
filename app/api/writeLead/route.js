import { NextResponse } from "next/server";
import leads_methods from "@/appwrite/leads_methods";

export async function POST(req) {
  const res = await req.json()
  const appwriteResponse = await leads_methods.write_lead(res["id"], {
    Name: res["name"],
    Company: res["company"],
    Title: res["title"],
    Email: res["email"],
    Phone_Number: res["phone"],
    Address: res["address"],
  })
  return NextResponse.json({
    appwriteResponse
  })
  }