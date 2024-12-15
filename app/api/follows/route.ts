//follows

import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const url = new URL(req.url);
    const followerId = url.searchParams.get("followerId");
    const followingId = url.searchParams.get("followingId");

    if (!followerId || !followingId) {
        return NextResponse.json({
            msg: "No required ids"
        }, {
            status: 400
        })
    }

    if (followerId === followingId) {
        return NextResponse.json({
            msg: "Please dont try to follow yourself:/"
        }, {
            status: 400
        })
    }

    const relationship = await prisma.follows.create({
        data: {
            followerId,
            followingId
        }
    });

    return NextResponse.json(relationship, { status: 200 })
}

//unfollow