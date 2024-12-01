
import prisma from "@/lib/db";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";



//TODO:add custom userid in session
//npm run build and next lint

export const authOptions: AuthOptions = {
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
                    //user object is by signIn contains the user's provider-specific ID (id in the user object) in this case this is google provider id
                    const providerId = user.id;
                    console.log("user id provided by google", providerId)
                    await prisma.user.create({
                        data: {
                            email: user.email,
                            name: user.name ?? "",
                            image: user.image ?? "",
                            provider: "Google",
                            providerId,
                        }
                    });
                }

            } catch (e) {
                console.log(e);
                return false;
            }

            return true;
        },
        async jwt({ token, user }) {
            // console.log("JWT Callback - Before:", token);
            if (user) {
                token.sub = user.id
            }
            // console.log("JWT Callback - After:", token);
            console.log(token.sub)
            return token;
        },

        async session({ session, token }) {
            // console.log("Session Callback - Token:", token);
            // console.log("Session Callback - Session:", session);

            if (session.user) {
                session.user.id = token.sub as string;
            }

            return session;

        }

    }


}