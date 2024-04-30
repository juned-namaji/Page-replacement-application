'use server';
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = cookies().getAll();
    return NextResponse.json({ cookieStore });
}

export async function POST(request) {
    try {
        const res = await request.json();
        const { cacheType, maxPages } = res;
        cookies().set("cacheType", cacheType);
        cookies().set("maxPages", maxPages);
        const response = new Response(
            `<h1>Cookie set successfully</h1>`, {
            headers: {
                "Content-Type": "text/html"
            }
        });
        return response;
    } catch (error) {
        console.error("Error setting cookie:", error);
        return new Response(
            `<h1>Error setting cookie</h1>`, {
            status: 500,
            headers: {
                "Content-Type": "text/html"
            }
        });
    }
}

export async function DELETE() {
    try {
        cookies().delete('cacheType');
        cookies().delete('maxPages');
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting cookies:", error);
        return NextResponse.json({ error: "Error" });
    }
}