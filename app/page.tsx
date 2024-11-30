"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Main() {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status == "authenticated") {
      router.push("/home")

    } else if (status == "unauthenticated") {

      router.push("/api/auth/signin")
    }

  }, [status, router])

  return (
    null
  );
}
