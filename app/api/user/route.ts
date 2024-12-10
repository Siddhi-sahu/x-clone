//send user details

import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const providerId = req.nextUrl.searchParams.get("providerId")?.trim();

    if (!providerId) {
        return NextResponse.json({
            msgg: "providerId is required"
        }, {
            status: 411
        })
    };

    try {


        const user = await prisma.user.findUnique({
            where: {
                providerId,
            },
            select: {
                providerId: true,
                name: true,
                image: true,
                email: true,
                createdAt: true

            }
        });
        console.log("Fetched user from DB:", user);

        if (!user) {
            return NextResponse.json({
                msg: "user not founndd"
            }, {
                status: 404
            })
        };



        return NextResponse.json({
            user: {
                ...user,
                createdAt: user.createdAt.toISOString()
            }


        })
    } catch (e) {
        console.error(e);
        return NextResponse.json({ msg: "main error" }, { status: 500 });
    }


}