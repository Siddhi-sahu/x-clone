import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "../auth/[...nextauth]/route";
import next from "next";

//TODO: add image/etc
//TODO: add likes
const createPostSchema = z.object({
    content: z.string(),
    userId: z.number()
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

        //create db entry
        const post = await prisma.post.create({
            data: {
                content: data.content,
                userId: data.userId
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

    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId) {
        return NextResponse.json({
            msg: "User id is required"
        }, {
            status: 400
        })
    }
    try {

        const posts = await prisma.post.findMany({
            where: {
                userId: Number(userId),
            },
            orderBy: {
                createdAt: "desc"
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
            status: 411
        })

    }


}
//all posts
// export async function GET(req: NextRequest) {

//     //not make session null
//     const session = await getServerSession(authOptions);
//     //code status
//     if (!session || !session?.user || !session?.user.id) {
//         console.log("session: ", session, "session.user :", session?.user, "session.user.id: ", session?.user.id)
//         return NextResponse.json({
//             msg: "Unauthenticated"
//         }, {
//             status: 401
//         })
//     }
//     try {

//         const posts = await prisma.post.findMany({
//             where: {
//                 userId: session?.user?.id,
//             },
//             orderBy: {
//                 createdAt: "desc"
//             }
//         });

//         return NextResponse.json({
//             posts
//         })
//     } catch (e) {
//         console.log(e);
//         return NextResponse.json({
//             msg: "error fetching user posts"
//         }, {
//             status: 411
//         })

//     }


// }

