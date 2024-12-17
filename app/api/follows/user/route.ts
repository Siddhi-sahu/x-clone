import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    if (!userId) {
        return NextResponse.json({
            msg: "sessions user id is required"
        }, {
            status: 404
        });
    }

    const followerCount = await prisma.follows.count({
        where: {
            followingId: userId
        }
    });

    const followingCount = await prisma.follows.count({
        where: {
            followerId: userId
        }
    });

    return NextResponse.json({
        followerCount,
        followingCount
    }, {
        status: 200
    })

}