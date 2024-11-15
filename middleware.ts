import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)", // Example: Add a webhook route
]);

export default clerkMiddleware(async (auth, req) => {
  // Allow requests to public routes
  if (isPublicRoute(req)) {
    return NextResponse.next(); // Pass through without authentication
  }

  try {
    // Protect all other routes
    await auth.protect();
    return NextResponse.next();
  } catch (error) {
    console.error("Authentication error:", error);
    return new NextResponse("Unauthorized", { status: 401 });
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|favicon.ico|static|public).*)",
    // Always apply middleware to API routes
    "/(api|trpc)(.*)",
  ],
};
