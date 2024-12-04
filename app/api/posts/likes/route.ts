import { authOptions } from "@/app/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const LikesSchema = z.object({
    postId: z.number()
})

export async function POST(req: NextRequest) {


    try {
        console.log("reached here")
        const session = await getServerSession(authOptions);
        console.log("Session:", session);

        const user = await prisma.user.findUnique({
            where: {
                providerId: session?.user.id
            }
        });
        if (!user) {
            return NextResponse.json({
                message: "Unauthenticated, no user found"
            }, {
                status: 403
            })
        }
        const body = await req.json();
        const data = LikesSchema.parse(body);
        console.log(body);


        await prisma.like.upsert({
            where: { userId_postId: { userId: user.id, postId: data.postId } },
            create: { userId: user.id, postId: data.postId },
            update: {}
        })
        return NextResponse.json({
            msg: "like created successfully"
        }, {
            status: 200
        })

    } catch (e) {
        console.log(e)
        return NextResponse.json({
            message: "Error while liking",
            error: e instanceof Error ? e.message : String(e)
        }, {
            status: 500
        })
    }
}

//get request for like??

export async function GET(req: NextRequest) {
    const body = await req.json();
    const data = LikesSchema.parse(body);
    await prisma.post.findUnique({
        where: {
            id: data.postId
        },
        include: {
            _count: {
                select: {
                    likes: true
                }
            }
        }
    })
}






