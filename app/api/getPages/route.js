import { dbConnect } from "@/app/lib/db";
import Page from "@/app/models/Page";
import { NextResponse } from "next/server";
import "server-only";

export async function GET() {
    await dbConnect();
    try {
        const pages = await Page.find();
        return NextResponse.json(pages);
    } catch (err) {
        return NextResponse.json({ error: err.Message });
    }
}