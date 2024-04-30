import { dbConnect } from "@/app/lib/db";
import Page from "@/app/models/Page";
import { NextResponse } from "next/server";
import "server-only";

export async function POST(req) {
    const payload = await req.json();
    const _id = payload.pageId;
    await dbConnect();
    try {
        const pages = await Page.findById(_id);
        return NextResponse.json({ isDuplicate: pages != null });
    } catch (err) {
        return NextResponse.json({ error: err.Message });
    }
}