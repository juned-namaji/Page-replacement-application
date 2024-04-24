import { dbConnect } from "@/app/lib/db";
import Page from "@/app/models/Page";
import { NextResponse } from "next/server";
import "server-only";

export async function DELETE(req) {
    await dbConnect();
    try {
        const deletedPage = await Page.findOneAndDelete();
        return NextResponse.json({ deletedPage });
    } catch (err) {
        return NextResponse.json({ error: err.message });
    }
}
