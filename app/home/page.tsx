//header and main

import Header from "@/components/Header";
import Main from "@/components/Main";

export default function Home() {
    return <div >
        <div className="grid grid-cols-10">
            <div className="grid col-span-3">

                <Header />
            </div>
            <div className="grid col-span-7">

                <Main />
            </div>


        </div>

    </div>
}