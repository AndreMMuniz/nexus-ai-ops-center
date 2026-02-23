import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Admin Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const adminEmail = process.env.ADMIN_EMAIL || "admin@nexus.local";
                if (
                    credentials?.email === adminEmail &&
                    credentials?.password === process.env.ADMIN_PASSWORD
                ) {
                    return { id: "1", name: "Admin", email: adminEmail };
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect to login
            } else if (isLoggedIn) {
                return Response.redirect(new URL("/dashboard", nextUrl));
            }
            return true;
        },
    },
});
