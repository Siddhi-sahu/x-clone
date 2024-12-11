"use client"

import Header from "@/components/Header";
import { useSession } from "next-auth/react";

export default function Explore() {
    const { data: session } = useSession();

    const providerId = session?.user.id;
    return <div className="bg-black w-full h-screen">
        <div className="grid grid-cols-10">
            <div className="grid col-span-3">
                <Header />
            </div>
            <div className="grid col-span-7">

                <div className="text-white flex items-center justify-center">
                    <div className="text-2xl">

                        oh no! this page is not made by me yet:/ go to <a className=" text-blue-600 underline" href={`/profile/${providerId}`}>profile</a> if you want.
                    </div>

                </div>
            </div>
        </div>
    </div>
}