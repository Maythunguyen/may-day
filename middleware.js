// middleware.js
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect everything except static files and Next.js internals
    '/((?!_next|.*\\..*|favicon.ico).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
