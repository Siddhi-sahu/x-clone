import prisma from "@/lib/db";



import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

//TODO: add image/etc
//TODO: add likes
const createPostSchema = z.object({
    content: z.string(),
    providerId: z.string()
});
export async function POST(req: NextRequest) {

    try {
        const parseResult = createPostSchema.safeParse(await req.json());
        if (!parseResult.success) {
            return NextResponse.json({
                msg: "Invalid Input"
            }, {
                status: 400
            });

        }

        const data = parseResult.data;
        const providerId = data.providerId;
        const user = await prisma.user.findUnique({
            where: { providerId }
        })
        if (!user) {
            return NextResponse.json({
                msg: "No user with the providerId"
            }, {
                status: 404
            })
        }

        //create db entry
        const post = await prisma.post.create({
            data: {
                content: data.content,
                userId: user?.id
            }
        });

        return NextResponse.json({
            msg: "Post Added successfully",
            postId: post.id

        });


    } catch (e) {
        console.log(e);
        return NextResponse.json({
            msg: "Error while adding post"
        }, {
            status: 411
        })
    }
}


export async function GET(req: NextRequest) {

    const providerId = req.nextUrl.searchParams.get("providerId");
    if (!providerId) {
        return NextResponse.json({
            msg: "User id is required"
        }, {
            status: 400
        })
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                providerId,
            }
        });

        if (!user) {
            return NextResponse.json({
                msg: "no user found"
            }, {
                status: 500
            })

        }
        const userId = user.id;

        const posts = await prisma.post.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        image: true
                    }
                },
                _count: {
                    select: {
                        likes: true
                    }
                }
            }

        });

        return NextResponse.json({
            posts
        })
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            msg: "error fetching user posts"
        }, {
            status: 500
        })

    }


}
//all posts

