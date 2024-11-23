//send user details

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

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