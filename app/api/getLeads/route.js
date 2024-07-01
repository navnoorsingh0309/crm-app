import { NextResponse } from "next/server";
import leads_methods from "@/appwrite/leads_methods";

export async function GET(req) {
    const jsonLeads = await leads_methods.getLeads(req.nextUrl.searchParams.get("id"));
    return NextResponse.json(jsonLeads);
}
