import { dbConnect } from "@/app/lib/db";
import Page from "@/app/models/Page";
import { NextResponse } from "next/server";
import "server-only";

export async function POST(request) {
    const comment = await request.json();
    const _id = comment.pageId;
    console.log(_id);
    await dbConnect();
    try {
        const page = await Page.findByIdAndDelete(_id);
        console.log(page);
        const pageName = page.pageName;
        console.log(pageName);
        const newPage = new Page({ _id, pageName })
        const savedPage = await newPage.save();
        console.log(savedPage);
        return NextResponse.json(savedPage);
    } catch (err) {
        console.log(err);
        return NextResponse.error(err, 500);
    }
}