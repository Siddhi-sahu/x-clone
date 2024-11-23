import PostBox from "./main/PostBox";
import PostInput from "./main/PostInput";

export default function Main() {

    return <div className="h-screen grid grid-cols-1  lg:grid-cols-10">
        <div className="flex flex-col h-screen w-full lg:col-span-6  bg-black border-y-0 border-2 border-gray-500 border-solid	">
            {/* navbar */}
            {/* post input box */}
            <PostInput />
            {/* posts */}
            <PostBox />

        </div>
        <div className="hidden lg:flex flex-col h-screen lg:col-span-4  bg-black">

        </div>

    </div>
}