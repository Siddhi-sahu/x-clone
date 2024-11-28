import Header from "@/components/Header";
import ProfileSection from "@/components/ProfileSection";



export default function Profile() {
    return <div >
        <div className="grid grid-cols-10">
            <div className="grid col-span-3">

                <Header />
            </div>
            <div className="grid col-span-7">

                <div className="h-screen grid grid-cols-1 lg:grid-cols-10">
                    <div className="flex flex-col  w-full lg:col-span-6 bg-black border-y-0 border-2 border-gray-500 border-solid overflow-y-auto scrollbar-none">
                        {/* the code of profile component starts from here */}
                        <ProfileSection />

                        {/* ends here */}
                    </div>
                    <div className="hidden lg:flex flex-col h-screen lg:col-span-4 bg-black">

                    </div>
                </div>
            </div>


        </div>

    </div>
}