"use client"
import Header from "@/components/Header";
import UsersProfileSection from "@/components/UserProfileSection";

// import dynamic from "next/dynamic";

// const UsersProfileSection = dynamic(() => import("@/components/ProfileSection"), {
//     ssr: false
// })

export default function Profile() {

    return <div >
        <div className="grid grid-cols-10">
            <div className="grid col-span-3">

                <Header />
            </div>
            <div className="grid col-span-7">

                <div className="h-screen grid grid-cols-1 lg:grid-cols-10">
                    <div className="flex flex-col  w-full lg:col-span-6 bg-black border-y-0 border-2 border-gray-700 border-solid overflow-y-auto scrollbar-none">
                        {/* the code of profile component starts from here */}
                        <UsersProfileSection />

                        {/* ends here */}
                    </div>
                    <div className="hidden lg:flex flex-col h-screen lg:col-span-4 bg-black">

                    </div>
                </div>
            </div>


        </div>

    </div>
}