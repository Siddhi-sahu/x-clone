//send user details

import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({
            msg: "user not found"
        }, {
            status: 404
        })
    }

    return NextResponse.json(session?.user)

}