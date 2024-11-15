import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define the public routes
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook",
]);

export default clerkMiddleware(async (auth, request) => {
  // Skip authentication if the route is public
  if (isPublicRoute(request)) {
    return;
  }

  // Enforce authentication for protected routes
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
