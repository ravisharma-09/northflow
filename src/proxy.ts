import { withAuth } from "next-auth/middleware"

// In Next.js 16, the export must be named 'proxy' instead of 'middleware'
export const proxy = withAuth({
  pages: {
    signIn: "/login",
  },
})

export const config = {
  matcher: ["/admin/:path*"]
}
