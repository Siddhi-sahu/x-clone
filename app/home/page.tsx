//header and main
"use client"

import Header from "@/components/Header";
import Main from "@/components/Main";
import { useRef } from "react";

export default function Home() {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    function focusTextArea() {
        if (textAreaRef.current) {
            textAreaRef.current.focus()
        }
    }
    return <div >
        <div className="grid grid-cols-10">
            <div className="grid col-span-3">

                <Header focusTextArea={focusTextArea} />
            </div>
            <div className="grid col-span-7">

                <Main textAreaRef={textAreaRef} />
            </div>


        </div>

    </div>
}