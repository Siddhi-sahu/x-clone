import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {

        const posts = await prisma.post.findMany({
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
                }
            }
        });
        return NextResponse.json({
            posts
        })
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            msg: "Couldnot fetch posts"

        }, {
            status: 500
        })
    }
}