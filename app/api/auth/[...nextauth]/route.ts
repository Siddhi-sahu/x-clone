import prisma from "@/lib/db";
import NextAuth, { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import GoogleProvider from "next-auth/providers/google";




const authOptions: NextAuthOptions = {
    providers: [

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    //db entry
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {

        async signIn({ user }) {
            console.log(user)
            if (!user.email) {
                return false;
            }
            try {
                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: user.email
                    }
                });

                if (!existingUser) {
                    await prisma.user.create({
                        data: {
                            email: user.email,
                            name: user.name ?? "",
                            image: user.image ?? "",
                            provider: "Google"
                        }
                    });
                }

            } catch (e) {
                console.log(e);
                return false;
            }

            return true;
        }
    }


}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }