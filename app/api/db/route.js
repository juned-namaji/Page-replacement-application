import { dbConnect } from "@/app/lib/db";
import { NextResponse } from "next/server";
import "server-only";

export async function GET() {
    try {
        const conn = await dbConnect();
        return new NextResponse('connected');
    } catch (err) {
        console.log(err);
        return new NextResponse('Unable to connect', err);
    }
}