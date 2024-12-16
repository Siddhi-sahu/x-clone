import prisma from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

//get following state and whatt??

export async function GET(req: NextRequest) {
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

    try {


        const isFollowing = await prisma.follows.findUnique({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId
                }
            }
        });
        //number

        const followerCount = await prisma.follows.count({
            where: {
                followingId,
            }
        })

        return NextResponse.json({ isFollowing: !!isFollowing, followerCount: followerCount }, {
            status: 200
        })
    } catch (e) {
        console.log("error in get function of follows", e);
        return NextResponse.json({
            msg: "error"
        })
    }


}

//follows

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

    try {
        await prisma.follows.create({
            data: {
                followerId,
                followingId
            }
        });
        const followerCount = await prisma.follows.count({
            where: {
                followingId
            }
        })

        return NextResponse.json({ followerCount }, { status: 200 })

    } catch (e) {
        console.log("error in posts request of follows", e);
        return NextResponse.json({
            msg: "error"
        });

    }

}

//unfollow

export async function DELETE(req: NextRequest) {
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

    try {
        await prisma.follows.delete({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId
                }
            }
        });

        const followerCount = await prisma.follows.count({
            where: {
                followingId
            }
        })

        return NextResponse.json({
            followerCount
        }, {
            status: 200
        })

    } catch (e) {
        console.log("error in delete request of follows", e);
        return NextResponse.json({
            msg: "error"
        });
    }
}