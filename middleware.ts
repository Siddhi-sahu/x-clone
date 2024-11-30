
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest) {

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    });
    // const token = null;
    if (!token) {
        const url = new URL("/api/auth/signin", request.url);
        return NextResponse.redirect(url);
    }


    return NextResponse.next();


}

export const config = {
    matcher: ['/home', '/profile/:path*'],
}