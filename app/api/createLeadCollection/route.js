import { NextResponse } from "next/server";
import leads_methods from "@/appwrite/leads_methods";

export async function POST(req) {
  const res = await req.json()
  const appwriteResponse = await leads_methods.createLeadCollection(res["id"]);
  return NextResponse.json({
    appwriteResponse
  })
  }