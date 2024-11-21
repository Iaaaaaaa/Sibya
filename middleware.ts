import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/api/webhooks",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
]);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) {
    console.log("Public route accessed:", req.nextUrl.pathname);
    return; // Allow access to public routes
  }
});

export const config = {
  matcher: ["/api/webhooks", "/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
