import { NextResponse } from "next/server";
import leads_methods from "@/appwrite/leads_methods";

export async function DELETE(req) {
    if (req.nextUrl.searchParams.get("doc_id") === "initial") {
        return NextResponse.json("Error");
    }
    const res = await leads_methods.deleteLead(req.nextUrl.searchParams.get("id"), req.nextUrl.searchParams.get("doc_id"));
    const jsonLeads = await leads_methods.getLeads(req.nextUrl.searchParams.get("id"));
    return NextResponse.json(jsonLeads);
}
