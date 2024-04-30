import { dbConnect } from "@/app/lib/db";
import Page from "@/app/models/Page";
import { NextResponse } from "next/server";
import "server-only";

export async function POST(request) {
    const comment = await request.json();
    const { _id, pageName } = comment;
    await dbConnect();
    try {
        const newPage = new Page({ _id, pageName });
        const savedPage = await newPage.save();
        return NextResponse.json(savedPage);
    } catch (err) {
        return NextResponse.error(err.message, 500);
    }
}

export async function GET() {
    await dbConnect();
    try {
        const pages = await Page.find();
        return NextResponse.json(pages);
    } catch (err) {
        return NextResponse.json({ error: err.Message });
    }
}