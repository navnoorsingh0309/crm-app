import { NextResponse } from "next/server";
import leads_methods from "@/appwrite/leads_methods";

export async function DELETE(req) {
    const res = await leads_methods.deleteLead(req.nextUrl.searchParams.get("id"), req.nextUrl.searchParams.get("doc_id"));
    return NextResponse.json(res);
}
