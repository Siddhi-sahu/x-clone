"use client"

import { signIn, signOut, useSession } from "next-auth/react"
//logput and see if singin still works
export function Appbar() {
    const { data: session } = useSession()
    return <div>
        {!session?.user && <button onClick={() => {
            signIn()
        }}>signin</button>}

        {session?.user && <button onClick={() => {
            signOut()
        }}>Logout</button>}

        {/* {JSON.stringify(session)} */}
    </div>
}