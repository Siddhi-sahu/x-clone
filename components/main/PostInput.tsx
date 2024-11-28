"use client"

import { useState } from "react"
import { ImageIcon, FileTextIcon, SmileIcon, CalendarIcon, MapPinIcon } from 'lucide-react'
import { useSession } from "next-auth/react";

import axios from "axios";


export default function PostInput() {
    const [content, setContent] = useState("");
    const { data: session } = useSession();
    const providerId = session?.user.id;
    const image = session?.user.image


    const handlePost = async () => {
        // content, userid
        // console.log( postContent);
        if (!providerId) {
            console.error("User ID is not available!");
            return;
        }
        try {
            console.log(providerId, content);

            await axios.post("/api/posts", {
                content,
                providerId
            });

            setContent("")
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <div className="w-full max-w-2xl bg-black text-white border border-gray-700 rounded-lg">
            <div className="p-4">
                <div className="flex gap-4">
                    {image ? <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden">
                        <img src={image ?? "/images/avatar.png"} alt={"/images/avatar.png"} className="w-full h-full object-cover" />
                    </div> : <div className="w-10 h-10 rounded-full bg-gray-600 overflow-hidden"></div>}

                    <div className="flex-1">
                        <textarea
                            className="w-full bg-transparent text-white text-xl resize-none outline-none placeholder-gray-500"
                            placeholder="What is happening?!"
                            rows={3}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}

                        />
                        <div className="flex items-center justify-between mt-4 border-t border-gray-700 pt-4">
                            <div className="flex gap-4">
                                <button className="text-blue-400 hover:text-blue-300 transition-colors" aria-label="Add image">
                                    <ImageIcon size={20} />
                                </button>
                                <button className="text-blue-400 hover:text-blue-300 transition-colors" aria-label="Add poll">
                                    <FileTextIcon size={20} />
                                </button>
                                <button className="text-blue-400 hover:text-blue-300 transition-colors" aria-label="Add emoji">
                                    <SmileIcon size={20} />
                                </button>
                                <button className="text-blue-400 hover:text-blue-300 transition-colors" aria-label="Schedule post">
                                    <CalendarIcon size={20} />
                                </button>
                                <button className="text-blue-400 hover:text-blue-300 transition-colors" aria-label="Add location">
                                    <MapPinIcon size={20} />
                                </button>
                            </div>
                            <button
                                onClick={handlePost}
                                disabled={!content.trim()}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full px-4 py-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}